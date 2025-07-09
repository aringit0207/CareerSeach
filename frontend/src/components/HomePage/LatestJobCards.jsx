import React from "react";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "../ui/avatar";

export default function LatestJobCards({ job }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer hover:shadow-2xl transition-shadow"
    > 
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-shrink-0">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={job?.company?.logo}
              alt={job?.company?.name}
              className="object-contain p-1"
            />
          </Avatar>
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="font-medium text-lg truncate">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500 truncate">{job?.location}</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className="text-[#F83002] font-bold" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-bold" variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  );
}
