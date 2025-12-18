import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import { Field, FieldGroup, FieldLabel } from "../components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Logout } from "@/lib/form"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { MoreHorizontalIcon, User as UserIcon } from "lucide-react";
import editUser from "@/lib/user.edit"
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "@/store/slice.auth"

export function Dropdown() {
  const [showShareDialog, setShowShareDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  // const [imageFile, setImageFile] = useState(null)
  // const [imagePreview, setImagePreview] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.user);
  const fetchLogout = async () => {
    try {
      const response = await Logout()
      toast.success(response.message)
      navigate('/form')
    } catch (error) {
      console.error("Catch : " + error.message)
      toast.error("Failed to logout ! Something went wrong.")

    }
  }

  // useEffect(() => {
  //   if (!imageFile) {
  //     setImagePreview(null)
  //     return
  //   }

  //   const url = URL.createObjectURL(imageFile)
  //   setImagePreview(url)
  //   return () => URL.revokeObjectURL(url)
  // }, [imageFile])

  const [editProfileData, setEditProfileData] = useState({
    name: "",
    bio: "",
    password: "",
    // imageFile: null,
  });

  const handleEditProfileSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await editUser(user._id, editProfileData);
      toast.success(response.message);
      dispatch(setUser(response.data));
      setShowEditDialog(false);
    } catch (err) {
      toast.error(err.message);
      console.error(err);
    }
  };



  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" aria-label="Open menu" size="icon-sm">
            <UserIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <div className="px-3 py-3 border-b">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-muted overflow-hidden border">
                {/* {imagePreview ? (
                  <img src={imagePreview} alt="avatar" className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full" />
                )} */}
              </div>
              <div className="flex flex-col">
                <span className="font-medium">{user.name}</span>
                <span className="text-sm text-muted-foreground">{user.email}</span>
              </div>
            </div>
          </div>

          <DropdownMenuGroup>
            <DropdownMenuItem onSelect={() => setShowEditDialog(true)}>
              Edit Profile
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setShowShareDialog(true)}>
              Share Profile
            </DropdownMenuItem>
            <DropdownMenuItem className={"hover:bg-transparent focus:bg-transparent"} onClick={fetchLogout}>
              <Button className={"mx-auto w-full"} variant="ghost">
                Logout
              </Button>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Dialog  */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Share File</DialogTitle>
            <DialogDescription>
              Anyone with the link will be able to view this file.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="py-3">
            <Field>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="shadcn@vercel.com"
                autoComplete="off"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="message">Message (Optional)</FieldLabel>
              <Textarea
                id="message"
                name="message"
                placeholder="Check out this file"
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Send Invite</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Profile Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[540px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>Update your display name, bio, image and password.</DialogDescription>
          </DialogHeader>

          <form
            onSubmit={handleEditProfileSubmit}
            className="grid gap-4"
          >
            <div className="grid gap-2">
              <div className="grid gap-1">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="Your name " value={editProfileData.name} key="name" onChange={(e)=> setEditProfileData(prev =>({ ...prev,  name: e.target.value}))} />
              </div>

              <div className="grid gap-1">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" name="bio" placeholder="Short bio" value={editProfileData.bio} key="bio" onChange={(e)=> setEditProfileData(prev =>({ ...prev,  bio: e.target.value}))} />
              </div>

              {/* <div className="grid gap-3 py-2">
                <Label htmlFor="image">Profile image</Label>
                <div className="flex items-center gap-3">
                  <div className="h-20 w-20 rounded-full bg-muted overflow-hidden border">
                    {imagePreview ? (
                      <img src={imagePreview} alt="preview" className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full" />
                    )}
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="image" className="inline-flex items-center rounded-md border px-3 py-2 text-sm cursor-pointer hover:bg-accent">
                      Choose image
                    </label>
                    <span className="text-sm text-muted-foreground">Optional — PNG, JPG, max 2MB</span>
                  </div>

                  <input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files && e.target.files[0]
                      setImageFile(f || null)
                    }}
                  />
                </div>
              </div> */}

              <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
                <div>
                  <Label htmlFor="password">New password</Label>
                  <Input id="password" name="password" type="password" placeholder="Leave blank to keep current pt-10" value={editProfileData.password} key="password" onChange={(e)=> setEditProfileData(prev =>({ ...prev,  password: e.target.value}))} />
                </div>
              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" type="button">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
export default Dropdown