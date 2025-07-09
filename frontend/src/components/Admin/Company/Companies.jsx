import React, { useEffect, useState } from "react";
import Navbar from "../../shared/Navbar";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";
import Footer from "@/components/shared/Footer";

export default function Companies() {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(setSearchCompanyByText(input));
    }, [input]);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-6 sm:my-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 my-5">
          <Input 
            className="w-full sm:w-auto sm:max-w-xs" 
            placeholder="Filter by name" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button 
            onClick={() => navigate("/admin/companies/create")}
            className="w-full sm:w-auto whitespace-nowrap"
          >
            New Company
          </Button>
        </div>
        <CompaniesTable />
      </div>
      <Footer />
    </div>
  );
}