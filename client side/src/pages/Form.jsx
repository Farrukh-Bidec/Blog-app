import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Eye, EyeOff, Mail, Lock, User, CheckCircle2 } from 'lucide-react';
import { Login, Signup } from '@/lib/form';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

export default function Form() {
  const [showPassword, setShowPassword] = useState(false);
  const [activeForm, setActiveForm] = useState("login");
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ---------------- LOGIN -------------------
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await Login(loginData.email, loginData.password);
      console.log(response);
      setMessage({ type: 'success', text: 'Login successful! Redirecting...' });
      setTimeout(() => setMessage(""), 5000);
      setLoginData({ email: '', password: '' });
      navigate('/');
      toast.success("Welcome back !" , response.user.name);

    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Login failed. Please try again.' });

    }


  };

  // ---------------- SIGNUP -------------------
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });
    try {
      if (!signupData.name || !signupData.email || !signupData.password || !signupData.confirmPassword) {
        setMessage({ type: 'error', text: 'Please fill in all fields.' });
      } else if (signupData.password !== signupData.confirmPassword) {
        setMessage({ type: 'error', text: 'Passwords do not match.' });
      } else if (signupData.password.length < 6) {
        setMessage({ type: 'error', text: 'Password must be at least 6 characters.' });
      } else {
        const response = await Signup(signupData.name, signupData.email, signupData.password);
        console.log(response);
        setMessage({ type: 'success', text: 'Account created successfully! Login now' });
        setTimeout(() => setMessage(""), 5000);
        setSignupData({ name: '', email: '', password: '', confirmPassword: '' });
        setActiveForm("login");
      }
    } catch (error) {
      console.log("Catch error", error)
      setMessage({ type: 'error', text: `${error.message} , Signup failed. ` });

    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-white to-black bg-clip-text text-transparent">
            Welcome
          </CardTitle>
        </CardHeader>

        <CardContent>

          {/* 🔥 CUSTOM TOGGLE BUTTONS */}
          <div className="w-full grid grid-cols-2 mb-6 bg-gray-200 rounded-lg p-1">
            <button
              className={`py-2 rounded-md text-sm font-semibold transition ${activeForm === "login" ? "bg-white shadow" : "text-gray-500"
                }`}
              onClick={() => setActiveForm("login")}
            >
              Login
            </button>

            <button
              className={`py-2 rounded-md text-sm font-semibold transition ${activeForm === "signup" ? "bg-white shadow" : "text-gray-500"
                }`}
              onClick={() => setActiveForm("signup")}
            >
              Sign Up
            </button>
          </div>

          {/* ---------------- LOGIN FORM ---------------- */}
          {activeForm === "login" && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label>Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    className="pl-10"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button className="w-full" type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>
          )}

          {/* ---------------- SIGNUP FORM ---------------- */}
          {activeForm === "signup" && (
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="John Doe"
                    className="pl-10"
                    value={signupData.name}
                    onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    className="pl-10"
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    value={signupData.password}
                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="pl-10"
                    value={signupData.confirmPassword}
                    onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                  />
                </div>
              </div>

              <Button className="w-full" type="submit" disabled={loading}>
                {loading ? "Creating account..." : "Sign Up"}
              </Button>
            </form>
          )}

          {/* ---------------- ALERT MESSAGE ---------------- */}
          {message.text && (
            <Alert
              className={`mt-4 ${message.type === "success"
                ? "border-green-500 bg-green-50"
                : "border-red-500 bg-red-50"
                }`}
            >
              <CheckCircle2
                className={`h-4 w-4 ${message.type === "success" ? "text-green-600" : "text-red-600"
                  }`}
              />
              <AlertDescription
                className={`${message.type === "success" ? "text-green-800" : "text-red-800"
                  }`}
              >
                {message.text}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
