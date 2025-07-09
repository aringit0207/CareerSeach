import React from "react";
import { Button } from "../ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";

export default function Job({job}) {
  const navigate = useNavigate();

  const daysAgo = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentDate = new Date();
    const dateDiff = currentDate - createdAt;
    return Math.floor(dateDiff / (1 * 24 * 60 * 60 * 1000));
  }

  return (
    <div className="p-5 rounded-lg shadow-md bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-200 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">
          {daysAgo(job?.createdAt) == 0 ? "Today" : `${daysAgo(job?.createdAt)} days ago`}
        </p>
      </div>
      
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-shrink-0">
          <Avatar className="h-12 w-12">
            <AvatarImage src={job?.company?.logo} alt={job?.company?.name} />
          </Avatar>
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="font-semibold text-lg text-gray-800 truncate">{job?.company?.name}</h2>
          <p className="text-sm text-gray-600 truncate">{job?.location}</p>
        </div>
      </div>
      
      <div className="flex-1 mb-4">
        <h3 className="font-bold text-lg mb-2 text-gray-900 line-clamp-2">{job?.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-3">
          {job?.description}
        </p>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        <Badge className="text-blue-700 font-semibold bg-blue-50 hover:bg-blue-100" variant="secondary">
          {job?.position} Positions
        </Badge>
        <Badge className="text-orange-700 font-semibold bg-orange-50 hover:bg-orange-100" variant="secondary">
          {job?.jobType}
        </Badge>
        <Badge className="text-purple-700 font-semibold bg-purple-50 hover:bg-purple-100" variant="secondary">
          {job?.salary} LPA
        </Badge>
      </div>
      
      <div className="flex gap-3 mt-auto">
        <Button 
          onClick={() => navigate(`/description/${job?._id}`)} 
          variant="outline" 
          className="flex-1 hover:bg-gray-50 transition-colors"
        >
          Details
        </Button>
        <Button 
          className="flex-1 bg-[#7209b7] hover:bg-[#5f32ad] transition-colors"
        >
          Save For Later
        </Button>
      </div>
    </div>
  );
}