import React, { useEffect, useState } from "react";
import Navbar from "../../shared/Navbar";
import { Button } from "../../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Input } from "../../ui/input";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import useGetCompanyById from "@/hooks/useGetCompanyById";

export default function CompanySetup() {
  const params = useParams();
  useGetCompanyById(params.id);
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const { singleCompany } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      // Check if error has a response (HTTP error)
      if (error.response) {
        // Server responded with error status
        toast.error(error.response.data?.message || "An error occurred");
      } else if (error.request) {
        // Request was made but no response received
        toast.error("Network error. Please check your connection.");
      } else {
        // Something else happened
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: singleCompany.file || null,
    });
  }, [singleCompany]);

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 my-6 sm:my-10">
        <form onSubmit={submitHandler}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5 p-4 sm:p-6 lg:p-8">
            <h1 className="font-bold text-lg sm:text-xl">Company Setup</h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 px-4 sm:px-6 lg:px-8">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Company Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Website</Label>
              <Input
                type="text"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
                className="w-full"
                placeholder="https://example.com"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="w-full"
                placeholder="City, Country"
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label className="text-sm font-medium">Logo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
                className="w-full"
              />
            </div>
          </div>

          <div className="px-4 sm:px-6 lg:px-8">
            {loading ? (
              <Button
                disabled
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700"
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2"
              >
                Update
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
