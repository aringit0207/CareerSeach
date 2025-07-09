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
import { Avatar, AvatarImage } from "../../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CompaniesTable() {
  const { companies, searchCompanyByText } = useSelector((store) => store.company);
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany = companies.length > 0 
      ? companies.filter((company) => {
          if(!searchCompanyByText) return true;
          return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        })
      : [];
    
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableCaption className="text-sm text-gray-500">
          A list of your recent registered companies
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">Logo</TableHead>
            <TableHead className="min-w-[150px]">Name</TableHead>
            <TableHead className="hidden sm:table-cell min-w-[100px]">Date</TableHead>
            <TableHead className="text-right w-20">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany?.map((company) => (
            <TableRow key={company._id}>
              <TableCell className="py-4">
                <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                  <AvatarImage src={company.logo} alt={company.name} />
                </Avatar>
              </TableCell>
              <TableCell className="font-medium">
                <div className="flex flex-col">
                  <span className="truncate max-w-[150px] sm:max-w-none">{company.name}</span>
                  <span className="text-xs text-gray-500 sm:hidden mt-1">
                    {company.createdAt.split("T")[0]}
                  </span>
                </div>
              </TableCell>
              <TableCell className="hidden sm:table-cell text-gray-600">
                {company.createdAt.split("T")[0]}
              </TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger className="cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    <div 
                      onClick={() => navigate(`/admin/companies/${company._id}`)} 
                      className="flex items-center gap-2 w-fit cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                      <span>Edit</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {filterCompany.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No companies found</p>
        </div>
      )}
    </div>
  );
}