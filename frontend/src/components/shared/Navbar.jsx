import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "@/redux/authSlice.js";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant.js";

export default function Navbar() {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  // Helper function to render navigation links based on user role
  const renderNavigationLinks = () => {
    if (!user) return null;

    if (user.role === "recruiter") {
      return (
        <ul className="flex font-medium items-center gap-5">
          <li>
            <Link
              to="/admin/companies"
              className="hover:text-[#F83000] cursor-pointer"
            >
              Companies
            </Link>
          </li>
          <li>
            <Link
              to="/admin/jobs"
              className="hover:text-[#F83000] cursor-pointer"
            >
              Jobs
            </Link>
          </li>
        </ul>
      );
    }

    if (user.role === "student") {
      return (
        <ul className="flex font-medium items-center gap-5">
          <li>
            <Link to="/jobs" className="hover:text-[#F83000] cursor-pointer">
              Jobs
            </Link>
          </li>
          <li>
            <Link to="/browse" className="hover:text-[#F83000] cursor-pointer">
              Browse
            </Link>
          </li>
        </ul>
      );
    }

    // Default navigation for other roles or fallback
    return (
      <ul className="flex font-medium items-center gap-5">
        <li>
          <Link to="/" className="hover:text-[#F83000] cursor-pointer">
            Home
          </Link>
        </li>
      </ul>
    );
  };

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <Link to="/" className="cursor-pointer">
            <h1 className="text-2xl font-bold">
              Career<span className="text-[#F83000]">Search</span>
            </h1>
          </Link>
        </div>
        <div className="flex items-center gap-12">
          {renderNavigationLinks()}

          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">
                  SignUp
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={
                      user?.profile?.profilePhoto ||
                      "https://github.com/shadcn.png"
                    }
                    alt={user?.fullname || "Profile"}
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div>
                  <div className="flex gap-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src={
                          user?.profile?.profilePhoto ||
                          "https://github.com/shadcn.png"
                        }
                        alt={user?.fullname || "Profile"}
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">
                        {user?.fullname || "User"}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {user?.profile?.bio || "Welcome to CareerSearch"}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col my-2 text-gray-600">
                    {user && user.role === "student" && (
                      <div className="flex w-fit items-center gap-2 cursor-pointer">
                        <User2 />
                        <Button variant="link">
                          <Link to="/profile">View Profile</Link>
                        </Button>
                      </div>
                    )}
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <LogOut />
                      <Button variant="link" onClick={logoutHandler}>
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
}
