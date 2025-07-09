import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar.jsx";
import { Label } from "../ui/label.jsx";
import { Input } from "../ui/input.jsx";
import { RadioGroup } from "../ui/radio-group.jsx";
import { Button } from "../ui/button.jsx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant.js";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice.js";
import { Loader2 } from "lucide-react";

export default function SignUp() {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);

  useEffect(() => {
      if(user) {
        navigate("/");
      }
    }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const validatePassword = (password) => {
    // At least 5 characters, at least one special character
    const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{5,}$/;
    return passwordRegex.test(password);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!input.fullname.trim()) {
      newErrors.fullname = "Full name is required";
    }

    if (!input.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(input.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!input.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!validatePhoneNumber(input.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be exactly 10 digits";
    }

    if (!input.password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(input.password)) {
      newErrors.password = "Password must be at least 8 characters long and contain at least one special character";
    }

    if (!input.role) {
      newErrors.role = "Please select a role";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    if (value.length <= 10) {
      setInput({ ...input, phoneNumber: value });
      // Clear error when user starts typing
      if (errors.phoneNumber) {
        setErrors({ ...errors, phoneNumber: "" });
      }
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors!");
      return;
    }

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true
      });

      if(res.data.success) {
        navigate("/login");
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
          <h1 className="font-bold text-2xl sm:text-3xl mb-6 text-center text-gray-800">
            Create Account
          </h1>
          
          <div className="space-y-4 sm:space-y-5">
            <div>
              <Label className="text-gray-700 font-medium text-sm sm:text-base">
                Full Name
              </Label>
              <Input
                type="text"
                value={input.fullname}
                name="fullname"
                onChange={changeEventHandler}
                placeholder="Enter your full name"
                className={`mt-1 h-11 sm:h-12 ${errors.fullname ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"}`}
              />
              {errors.fullname && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.fullname}</p>}
            </div>

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
                className={`mt-1 h-11 sm:h-12 ${errors.email ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"}`}
              />
              {errors.email && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <Label className="text-gray-700 font-medium text-sm sm:text-base">
                Phone Number
              </Label>
              <Input
                type="tel"
                value={input.phoneNumber}
                name="phoneNumber"
                onChange={handlePhoneChange}
                placeholder="Enter 10-digit phone number"
                maxLength="10"
                className={`mt-1 h-11 sm:h-12 ${errors.phoneNumber ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"}`}
              />
              {errors.phoneNumber && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.phoneNumber}</p>}
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
                placeholder="Create a strong password"
                className={`mt-1 h-11 sm:h-12 ${errors.password ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"}`}
              />
              {errors.password && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.password}</p>}
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
              {errors.role && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.role}</p>}
            </div>

            <div>
              <Label className="text-gray-700 font-medium text-sm sm:text-base">
                Profile Picture{" "}
                <span className="text-gray-500 font-normal">(Optional)</span>
              </Label>
              <Input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="mt-1 h-11 sm:h-12 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <p className="text-gray-500 text-xs mt-1">
                You can add a profile picture now or later
              </p>
            </div>
          </div>
          
          {loading ? (
            <Button 
              disabled 
              className="w-full mt-6 sm:mt-8 bg-blue-600 hover:bg-blue-700 h-11 sm:h-12 text-sm sm:text-base"
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating Account...
            </Button>
          ) : (
            <Button 
              type="submit" 
              className="w-full mt-6 sm:mt-8 bg-blue-600 hover:bg-blue-700 text-white font-medium h-11 sm:h-12 text-sm sm:text-base transition-colors duration-200"
            >
              Create Account
            </Button>
          )}
          
          <div className="text-center mt-4 sm:mt-6">
            <span className="text-gray-600 text-xs sm:text-sm">
              Already have an account?{" "}
              <Link 
                to="/login" 
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
              >
                Sign In
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}