import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "@/redux/authSlice.js";
import { setSearchedQuery } from "@/redux/jobSlice";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant.js";

export default function Navbar() {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

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

  const handleBrowseClick = () => {
    dispatch(setSearchedQuery(""));
    navigate("/browse");
    setMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Helper function to render navigation links based on user role
  const renderNavigationLinks = (mobile = false) => {
    if (!user) return null;

    const linkClass = mobile 
      ? "block py-2 px-4 hover:bg-gray-100 rounded-md transition-colors"
      : "hover:text-[#F83000] cursor-pointer transition-colors";

    if (user.role === "recruiter") {
      return (
        <ul className={mobile ? "space-y-2" : "flex font-medium items-center gap-5"}>
          <li>
            <Link
              to="/admin/companies"
              className={linkClass}
              onClick={mobile ? closeMobileMenu : undefined}
            >
              Companies
            </Link>
          </li>
          <li>
            <Link
              to="/admin/jobs"
              className={linkClass}
              onClick={mobile ? closeMobileMenu : undefined}
            >
              Jobs
            </Link>
          </li>
        </ul>
      );
    }

    if (user.role === "student") {
      return (
        <ul className={mobile ? "space-y-2" : "flex font-medium items-center gap-5"}>
          <li>
            <Link 
              to="/jobs" 
              className={linkClass}
              onClick={mobile ? closeMobileMenu : undefined}
            >
              Jobs
            </Link>
          </li>
          <li>
            <button
              onClick={handleBrowseClick}
              className={linkClass}
            >
              Browse
            </button>
          </li>
        </ul>
      );
    }

    // Default navigation for other roles or fallback
    return (
      <ul className={mobile ? "space-y-2" : "flex font-medium items-center gap-5"}>
        <li>
          <Link 
            to="/" 
            className={linkClass}
            onClick={mobile ? closeMobileMenu : undefined}
          >
            Home
          </Link>
        </li>
      </ul>
    );
  };

  return (
    <div className="bg-white shadow-sm sticky top-0 z-50">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        <div>
          <Link to="/" className="cursor-pointer">
            <h1 className="text-2xl font-bold">
              Career<span className="text-[#F83000]">Search</span>
            </h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-12">
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
                <Avatar className="cursor-pointer hover:ring-2 hover:ring-[#F83000] transition-all">
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
                  <div className="flex gap-3 p-2 hover:bg-gray-100 rounded-md transition-colors">
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src={
                          user?.profile?.profilePhoto ||
                          "https://github.com/shadcn.png"
                        }
                        alt={user?.fullname || "Profile"}
                      />
                    </Avatar>
                    <div className="flex-1">
                      <Link to="/profile" className="cursor-pointer block">
                        <h4 className="font-medium text-gray-800">
                          {user?.fullname || "User"}
                        </h4>
                      </Link>
                    </div>
                  </div>
                  <div className="flex flex-col my-2 text-gray-600">
                    <div className="flex w-full items-center gap-2 cursor-pointer p-2 hover:bg-gray-100 rounded-md transition-colors">
                      <LogOut className="w-4 h-4" />
                      <Button variant="link" onClick={logoutHandler} className="p-0">
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-4">
          {user && (
            <Avatar className="cursor-pointer hover:ring-2 hover:ring-[#F83000] transition-all">
              <AvatarImage
                src={
                  user?.profile?.profilePhoto ||
                  "https://github.com/shadcn.png"
                }
                alt={user?.fullname || "Profile"}
              />
            </Avatar>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-white absolute w-full shadow-md">
          <div className="px-4 py-4 space-y-3">
            {renderNavigationLinks(true)}
            
            {!user ? (
              <div className="flex flex-col space-y-2 pt-4 border-t">
                <Link to="/login" onClick={closeMobileMenu}>
                  <Button variant="outline" className="w-full">Login</Button>
                </Link>
                <Link to="/signup" onClick={closeMobileMenu}>
                  <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] w-full">
                    SignUp
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="pt-4 border-t">
                <Link to="/profile" className="block p-2 hover:bg-gray-100 rounded-md">
                  <div className="flex items-center gap-3">
                    <div>
                      <h4 className="font-medium text-gray-800">
                        {user?.fullname || "User"}
                      </h4>
                    </div>
                  </div>
                </Link>
                <Button
                  variant="ghost"
                  onClick={logoutHandler}
                  className="w-full justify-start p-2 mt-2"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}