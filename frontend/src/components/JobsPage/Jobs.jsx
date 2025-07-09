import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";

export default function Jobs() {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchedQuery && typeof searchedQuery === 'object') {
      const filteredJobs = allJobs.filter((job) => {
        // Check if job matches all selected filters
        let matchesIndustry = true;
        let matchesLocation = true;
        let matchesJobType = true;

        // Filter by Industry
        if (searchedQuery.Industry && searchedQuery.Industry !== "") {
          matchesIndustry = job.title.toLowerCase().includes(searchedQuery.Industry.toLowerCase());
        }

        // Filter by Location
        if (searchedQuery.Location && searchedQuery.Location !== "") {
          matchesLocation = job.location.toLowerCase().includes(searchedQuery.Location.toLowerCase());
        }

        // Filter by Job Type
        if (searchedQuery["Job Type"] && searchedQuery["Job Type"] !== "") {
          matchesJobType = job.jobType.toLowerCase().includes(searchedQuery["Job Type"].toLowerCase());
        }

        return matchesIndustry && matchesLocation && matchesJobType;
      });
      setFilterJobs(filteredJobs);
    } else if (typeof searchedQuery === 'string' && searchedQuery) {
      // Handle legacy string-based search (for backward compatibility)
      const filteredJobs = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.jobType.toLowerCase().includes(searchedQuery.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-20%">
            <FilterCard />
          </div>
          {filterJobs.length <= 0 ? (
            <span>No jobs found!</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {filterJobs.map((job) => (
                  <div key={job?._id}>
                    <Job job={job} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}