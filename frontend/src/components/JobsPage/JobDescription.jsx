import React, { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "sonner";

export default function JobDescription() {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  const params = useParams();
  const jobId = params.id;

  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant == user?._id
    ) || false;

  const [isApplied, setIsApplied] = useState(isInitiallyApplied);
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant == user?._id
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-4xl mx-auto my-8 px-4">
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div className="flex-1">
            <h1 className="font-bold text-2xl text-gray-900 mb-3">
              {singleJob?.title}
            </h1>
            <div className="flex flex-wrap gap-2">
              <Badge
                className="text-blue-700 font-semibold bg-blue-50"
                variant="secondary"
              >
                {singleJob?.position} Positions
              </Badge>
              <Badge
                className="text-orange-700 font-semibold bg-orange-50"
                variant="secondary"
              >
                {singleJob?.jobType}
              </Badge>
              <Badge
                className="text-purple-700 font-semibold bg-purple-50"
                variant="secondary"
              >
                {singleJob?.salary} LPA
              </Badge>
            </div>
          </div>
          <div className="flex-shrink-0">
            <Button
              onClick={isApplied ? null : applyJobHandler}
              disabled={isApplied}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                isApplied
                  ? "bg-gray-500 cursor-not-allowed text-white"
                  : "bg-[#7209b7] hover:bg-[#5f32ad] text-white"
              }`}
            >
              {isApplied ? "Already Applied" : "Apply Now"}
            </Button>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Job Description</h2>
          <p className="text-gray-700 leading-relaxed">
            {singleJob?.description}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Job Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Role</h3>
              <p className="text-gray-600">{singleJob?.title}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Location</h3>
              <p className="text-gray-600">{singleJob?.location}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Experience</h3>
              <p className="text-gray-600">
                {singleJob?.experienceLevel} Years
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Salary</h3>
              <p className="text-gray-600">{singleJob?.salary} LPA</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">
                Total Applicants
              </h3>
              <p className="text-gray-600">
                {singleJob?.applications?.length || 0}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Posted Date</h3>
              <p className="text-gray-600">
                {singleJob?.createdAt?.split("T")[0]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
