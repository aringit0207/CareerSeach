import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";

export default function AppliedJobs() {
  const { allAppliedJobs } = useSelector((store) => store.job);
  
  return (
    <div className="w-full">
      {/* Mobile Card Layout */}
      <div className="block sm:hidden">
        {allAppliedJobs.length <= 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">You haven't applied for any job yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {allAppliedJobs.map((appliedJob) => (
              <div key={appliedJob._id} className="bg-gray-50 rounded-lg p-4 border">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{appliedJob?.job?.title}</h3>
                    <p className="text-gray-600 text-xs">{appliedJob?.job?.company?.name}</p>
                  </div>
                  <Badge
                    className={`text-xs ${
                      appliedJob?.status === "rejected"
                        ? "bg-red-400"
                        : appliedJob.status === "pending"
                        ? "bg-gray-400"
                        : "bg-green-400"
                    }`}
                  >
                    {appliedJob.status.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-xs text-gray-500">
                  Applied on: {appliedJob?.createdAt?.split("T")[0]}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Desktop Table Layout */}
      <div className="hidden sm:block">
        <div className="overflow-x-auto">
          <Table>
            <TableCaption>List of your applied jobs</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Date</TableHead>
                <TableHead>Job Role</TableHead>
                <TableHead>Company</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allAppliedJobs.length <= 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8">
                    <span className="text-gray-500">You haven't applied for any job yet.</span>
                  </TableCell>
                </TableRow>
              ) : (
                allAppliedJobs.map((appliedJob) => (
                  <TableRow key={appliedJob._id}>
                    <TableCell className="font-medium">
                      {appliedJob?.createdAt?.split("T")[0]}
                    </TableCell>
                    <TableCell>{appliedJob?.job?.title}</TableCell>
                    <TableCell>{appliedJob?.job?.company?.name}</TableCell>
                    <TableCell className="text-right">
                      <Badge
                        className={`${
                          appliedJob?.status === "rejected"
                            ? "bg-red-400"
                            : appliedJob.status === "pending"
                            ? "bg-gray-400"
                            : "bg-green-400"
                        }`}
                      >
                        {appliedJob.status.toUpperCase()}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}