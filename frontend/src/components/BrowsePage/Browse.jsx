import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import Job from "../JobsPage/Job";
import { useDispatch, useSelector } from "react-redux";
import useGetSearchedJobs from "@/hooks/useGetSearchedJobs";

export default function Browse() {
  useGetSearchedJobs();
  const { searchedJobs, searchedQuery } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  // Safe fallback to empty array if searchedJobs is undefined
  const jobsToDisplay = searchedJobs || [];

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl my-10">
          {searchedQuery 
            ? `Search Results (${jobsToDisplay.length})` 
            : `All Jobs (${jobsToDisplay.length})`
          }
        </h1>
        <div className="grid grid-cols-3 gap-4">
          {jobsToDisplay.map((job) => {
            return <Job key={job._id} job={job} />;
          })}
        </div>
      </div>
    </div>
  );
}