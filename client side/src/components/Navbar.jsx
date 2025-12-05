import { Search, User } from 'lucide-react';
import React from 'react';
import { Button } from './ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { setLogout } from '@/store/slice.auth';
import { Logout } from '@/lib/form';
import { useNavigate } from 'react-router-dom';
import Dropdown from './Dropdown';

const Navbar = () => {
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await Logout()
      navigate('/form')
      dispatch(setLogout());

    } catch (error) {
      console.log("Caught Error" , error)
    }
  }

  return (
    <nav className="flex flex-col sm:flex-row sm:justify-between items-center px-6 py-4 sm:h-20 w-full bg-white text-black shadow-md z-11">
      {/* Logo */}
      <h1 className="font-extrabold text-3xl sm:text-5xl my-2 sm:my-0 tracking-tight">
        News
      </h1>

      {/* Search bar */}
      <div className="flex items-center w-full sm:w-96 my-2 sm:my-0 px-4 py-2 border border-black rounded-full bg-gray-100/50">
        <input
          type="text"
          placeholder="Search"
          className="flex-grow bg-transparent outline-none placeholder-black"
        />
        <Search className="ml-2" />
      </div>

      {/* Logout button */}
      {isLogin ? 
      <Dropdown />
       :

        <Button className="my-2 sm:my-0 bg-black text-white hover:bg-gray-800" onClick={()=> navigate('/form')}>
          Log in / Register
        </Button>
      }
    </nav>
  );
};

export default Navbar;
