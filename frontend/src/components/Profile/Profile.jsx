import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import AppliedJobs from "./AppliedJobs";
import UpdateProfile from "./UpdateProfile";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

export default function Profile() {
  useGetAppliedJobs();
  const isResume = true;
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-4 sm:p-6 md:p-8">
        {/* Profile Header - Responsive Layout */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Avatar className="h-20 w-20 sm:h-24 sm:w-24">
              <AvatarImage
                src={
                  user?.profile?.profilePhoto ||
                  "https://github.com/shadcn.png"
                }
              />
            </Avatar>
            <div className="text-center sm:text-left">
              <h1 className="font-medium text-xl sm:text-2xl">{user?.fullname}</h1>
              <p className="text-gray-600 text-sm sm:text-base mt-1">{user?.profile?.bio}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="self-end sm:self-auto"
            variant="outline"
            size="sm"
          >
            <Pen className="h-4 w-4" />
          </Button>
        </div>

        {/* Contact Information */}
        <div className="my-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 my-3">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gray-600" />
              <span className="text-sm sm:text-base break-all">{user?.email}</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 my-3">
            <div className="flex items-center gap-2">
              <Contact className="h-4 w-4 text-gray-600" />
              <span className="text-sm sm:text-base">{user?.phoneNumber}</span>
            </div>
          </div>
          
          {/* Skills Section */}
          <div className="my-6">
            <h2 className="font-semibold text-lg mb-3">Skills</h2>
            <div className="flex flex-wrap items-center gap-2">
              {user?.profile?.skills?.length > 0 ? (
                user?.profile?.skills.map((item, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">{item}</Badge>
                ))
              ) : (
                <span className="text-gray-500 text-sm">No skills added yet</span>
              )}
            </div>
          </div>
        </div>

        {/* Resume Section */}
        <div className="grid w-full max-w-sm items-center gap-2">
          <Label className="text-md font-bold">Resume</Label>
          {isResume ? (
            <a
              target="_blank"
              href={user?.profile?.resume}
              className="text-blue-500 hover:text-blue-700 hover:underline cursor-pointer text-sm break-all"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span className="text-gray-500 text-sm">No resume uploaded</span>
          )}
        </div>
      </div>

      {/* Applied Jobs Section */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl p-4 sm:p-6 md:p-8 mt-4">
        <h1 className="font-bold text-lg sm:text-xl my-5">Applied Jobs</h1>
        <AppliedJobs />
      </div>
      
      <UpdateProfile open={open} setOpen={setOpen} />
    </div>
  );
}