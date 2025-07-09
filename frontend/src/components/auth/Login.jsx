import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar.jsx";
import { Label } from "../ui/label.jsx";
import { Input } from "../ui/input.jsx";
import { RadioGroup } from "../ui/radio-group.jsx";
import { Button } from "../ui/button.jsx";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant.js";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice.js";
import { Loader2 } from "lucide-react";

export default function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);

  useEffect(() => {
    if(user) {
      navigate("/");
    }
  }, []);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-lg p-6 sm:p-8 my-4 sm:my-10"
        >
          <h1 className="font-bold text-2xl sm:text-3xl mb-6 sm:mb-8 text-center text-gray-800">
            Welcome Back
          </h1>

          <div className="space-y-4 sm:space-y-5">
            <div>
              <Label className="text-gray-700 font-medium text-sm sm:text-base">
                Email
              </Label>
              <Input
                type="email"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                placeholder="Enter your email address"
                className="mt-1 h-11 sm:h-12 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <Label className="text-gray-700 font-medium text-sm sm:text-base">
                Password
              </Label>
              <Input
                type="password"
                value={input.password}
                name="password"
                onChange={changeEventHandler}
                placeholder="Enter your password"
                className="mt-1 h-11 sm:h-12 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <Label className="text-gray-700 font-medium mb-3 block text-sm sm:text-base">
                Select Role
              </Label>
              <RadioGroup className="flex items-center gap-4 sm:gap-6">
                <div className="flex items-center gap-2">
                  <Input
                    type="radio"
                    name="role"
                    value="student"
                    checked={input.role === "student"}
                    onChange={changeEventHandler}
                    className="cursor-pointer w-4 h-4"
                  />
                  <Label htmlFor="r1" className="cursor-pointer text-gray-700 text-sm sm:text-base">
                    Student
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={input.role === "recruiter"}
                    onChange={changeEventHandler}
                    className="cursor-pointer w-4 h-4"
                  />
                  <Label htmlFor="r2" className="cursor-pointer text-gray-700 text-sm sm:text-base">
                    Recruiter
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          {loading ? (
            <Button
              disabled
              className="w-full mt-6 sm:mt-8 bg-blue-600 hover:bg-blue-700 h-11 sm:h-12 text-sm sm:text-base"
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing In...
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full mt-6 sm:mt-8 bg-blue-600 hover:bg-blue-700 text-white font-medium h-11 sm:h-12 text-sm sm:text-base transition-colors duration-200"
            >
              Sign In
            </Button>
          )}

          <div className="text-center mt-4 sm:mt-6">
            <span className="text-gray-600 text-xs sm:text-sm">
              New User?{" "}
              <Link
                to="/signup"
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
              >
                Create Account
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}