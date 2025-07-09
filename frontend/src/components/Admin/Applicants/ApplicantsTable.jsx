import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { MoreHorizontal, Check, X } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const shortlistingStatus = ["Accepted", "Rejected"];

export default function ApplicantsTable() {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const getStatusIcon = (status) => {
    if (status === "Accepted") {
      return <Check className="h-4 w-4 text-green-600" />;
    } else if (status === "Rejected") {
      return <X className="h-4 w-4 text-red-600" />;
    }
    return null;
  };

  const getStatusColor = (status) => {
    if (status === "Accepted") {
      return "text-green-600 hover:bg-green-50";
    } else if (status === "Rejected") {
      return "text-red-600 hover:bg-red-50";
    }
    return "hover:bg-gray-100";
  };

  const getStatusBadgeColor = (status) => {
    if (status === "accepted") {
      return "bg-green-100 text-green-800";
    } else if (status === "rejected") {
      return "bg-red-100 text-red-800";
    } else if (status === "pending") {
      return "bg-yellow-100 text-yellow-800";
    }
    return "bg-gray-100 text-gray-800";
  };

  // Safe access to applications array with proper type checking
  const applications = Array.isArray(applicants?.applications) ? applicants.applications : [];

  return (
    <div className="w-full">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <Table>
          <TableCaption>List of applied users</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>FullName</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Resume</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((item) => (
              <TableRow key={item._id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-900 font-medium">
                      {item?.applicant?.fullname}
                    </span>
                    {item?.status && (
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(item.status)}`}>
                        {getStatusIcon(item.status)}
                        <span className="ml-1">{item.status}</span>
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>{item?.applicant?.email}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                <TableCell>
                  {item.applicant?.profile?.resume ? (
                    <a
                      className="text-blue-600 cursor-pointer hover:underline"
                      href={item?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item?.applicant?.profile?.resumeOriginalName}
                    </a>
                  ) : (
                    <span>NA</span>
                  )}
                </TableCell>
                <TableCell>{item?.applicant?.createdAt?.split("T")[0]}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger className="cursor-pointer">
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32" align="end" sideOffset={5}>
                      {shortlistingStatus.map((status, index) => {
                        return (
                          <div
                            onClick={() => statusHandler(status, item?._id)}
                            key={index}
                            className={`flex w-fit items-center gap-2 my-2 cursor-pointer p-2 rounded ${getStatusColor(status)}`}
                          >
                            {getStatusIcon(status)}
                            <span>{status}</span>
                          </div>
                        );
                      })}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile/Tablet Card Layout */}
      <div className="lg:hidden space-y-4">
        {applications.map((item) => (
          <div key={item._id} className="bg-white border rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-gray-900 font-medium">
                    {item?.applicant?.fullname}
                  </h3>
                  {item?.status && (
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(item.status)}`}>
                      {getStatusIcon(item.status)}
                      <span className="ml-1">{item.status}</span>
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">{item?.applicant?.email}</p>
              </div>
              <Popover>
                <PopoverTrigger className="cursor-pointer p-2">
                  <MoreHorizontal className="h-4 w-4" />
                </PopoverTrigger>
                <PopoverContent className="w-32" align="end" sideOffset={5}>
                  {shortlistingStatus.map((status, index) => {
                    return (
                      <div
                        onClick={() => statusHandler(status, item?._id)}
                        key={index}
                        className={`flex w-fit items-center gap-2 my-2 cursor-pointer p-2 rounded ${getStatusColor(status)}`}
                      >
                        {getStatusIcon(status)}
                        <span>{status}</span>
                      </div>
                    );
                  })}
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium">Contact: </span>
                <span className="text-gray-600">{item?.applicant?.phoneNumber}</span>
              </div>
              
              <div>
                <span className="font-medium">Resume: </span>
                {item.applicant?.profile?.resume ? (
                  <a
                    className="text-blue-600 cursor-pointer hover:underline"
                    href={item?.applicant?.profile?.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item?.applicant?.profile?.resumeOriginalName}
                  </a>
                ) : (
                  <span className="text-gray-600">NA</span>
                )}
              </div>
              
              <div>
                <span className="font-medium">Applied: </span>
                <span className="text-gray-600">
                  {item?.applicant?.createdAt?.split("T")[0]}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {applications.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No applicants found</p>
        </div>
      )}
    </div>
  );
}