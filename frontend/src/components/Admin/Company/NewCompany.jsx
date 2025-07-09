import React, { useState } from "react";
import Navbar from "../../shared/Navbar";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";

export default function NewCompany() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState();

  const registerCompany = async () => {
    try {
      const res = await axios.post(`${COMPANY_API_END_POINT}/register`, {companyName}, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      });

      if(res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="my-6 sm:my-10">
          <h1 className="font-bold text-xl sm:text-2xl">Your Company Name</h1>
          <p className="text-gray-500 text-sm sm:text-base mt-2">
            Choose your company name (can change it later)
          </p>
        </div>

        <div className="space-y-4">
          <Label className="text-sm font-medium">Company Name</Label>
          <Input
            type="text"
            className="w-full"
            placeholder="Enter your company name"
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-2 my-6 sm:my-10">
          <Button 
            variant="outline" 
            onClick={() => navigate("/admin/companies")}
            className="w-full sm:w-auto order-2 sm:order-1"
          >
            Cancel
          </Button>
          <Button 
            onClick={registerCompany}
            className="w-full sm:w-auto order-1 sm:order-2"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}