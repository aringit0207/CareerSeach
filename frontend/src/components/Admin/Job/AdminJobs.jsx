import React, { useEffect, useState } from "react";
import Navbar from "../../shared/Navbar";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import AdminJobsTable from "./AdminJobsTable";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchJobByText } from '@/redux/jobSlice'
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import Footer from "@/components/shared/Footer";

export default function AdminJobs() {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 my-5">
          <Input
            className="w-full sm:w-64 md:w-80"
            placeholder="Filter by name and role"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button 
            onClick={() => navigate("/admin/jobs/create")}
            className="w-full sm:w-auto"
          >
            New Job
          </Button>
        </div>
        <AdminJobsTable />
      </div>
      <Footer />
    </div>
  );
}