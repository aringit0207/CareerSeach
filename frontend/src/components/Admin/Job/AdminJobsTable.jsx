import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AdminJobsTable() {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredJobs = allAdminJobs.length > 0 
      ? allAdminJobs.filter((job) => {
          if (!searchJobByText) return true;
          return (
            job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
            job?.company?.name
              .toLowerCase()
              .includes(searchJobByText.toLowerCase())
          );
        })
      : [];
    
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div className="w-full">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <Table>
          <TableCaption>A list of your recent posted jobs</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Company Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filterJobs?.map((job) => (
              <TableRow key={job._id}>
                <TableCell>{job?.company?.name}</TableCell>
                <TableCell>{job?.title}</TableCell>
                <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger className="cursor-pointer">
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className="flex items-center w-fit gap-2 cursor-pointer mt-2">
                        <Eye className="w-4"/>
                        <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card Layout */}
      <div className="md:hidden space-y-4">
        {filterJobs?.map((job) => (
          <div key={job._id} className="bg-white border rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium text-gray-900">{job?.title}</h3>
                <p className="text-sm text-gray-600">{job?.company?.name}</p>
              </div>
              <Popover>
                <PopoverTrigger className="cursor-pointer p-2">
                  <MoreHorizontal className="h-4 w-4" />
                </PopoverTrigger>
                <PopoverContent className="w-32">
                  <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className="flex items-center w-fit gap-2 cursor-pointer mt-2">
                    <Eye className="w-4"/>
                    <span>Applicants</span>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <p className="text-sm text-gray-500">
              Date: {job?.createdAt.split("T")[0]}
            </p>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filterJobs?.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No jobs found</p>
        </div>
      )}
    </div>
  );
}