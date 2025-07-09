import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

export default function FilterCard() {
  const filterData = [
    {
      filterType: "Title",
      array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
    },
    {
      filterType: "Location",
      array: ["Delhi NCR", "Banglore", "Hyderabad", "Pune", "Mumbai"],
    },
    {
      filterType: "Job Type",
      array: ["Full Time", "Part Time"],
    },
  ];

  // Separate state for each filter type
  const [selectedFilters, setSelectedFilters] = useState({
    Industry: "",
    Location: "",
    "Job Type": ""
  });

  // Search query state for each filter
  const [searchQueries, setSearchQueries] = useState({
    Industry: "",
    Location: "",
    "Job Type": ""
  });

  const dispatch = useDispatch();

  const changeHandler = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    // Clear search when radio button is selected
    setSearchQueries(prev => ({
      ...prev,
      [filterType]: ""
    }));
  };

  const handleSearchChange = (filterType, query) => {
    setSearchQueries(prev => ({
      ...prev,
      [filterType]: query
    }));
    
    // If user is typing, use the search query as the filter value
    if (query.trim()) {
      setSelectedFilters(prev => ({
        ...prev,
        [filterType]: query.trim()
      }));
    } else {
      // If search is cleared, clear the filter
      setSelectedFilters(prev => ({
        ...prev,
        [filterType]: ""
      }));
    }
  };

  // Always show all options - don't filter them
  const getAllOptions = (filterType) => {
    const data = filterData.find(f => f.filterType === filterType);
    return data ? data.array : [];
  };

  // Clear specific filter
  const clearFilter = (filterType) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: ""
    }));
    setSearchQueries(prev => ({
      ...prev,
      [filterType]: ""
    }));
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedFilters({
      Industry: "",
      Location: "",
      "Job Type": ""
    });
    setSearchQueries({
      Industry: "",
      Location: "",
      "Job Type": ""
    });
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedFilters));
  }, [selectedFilters, dispatch]);

  return (
    <div className="w-full bg-white p-3 rounded-lg shadow-sm border border-gray-200 sticky top-5">
      <div className="flex justify-between items-center mb-3">
        <h1 className="font-semibold text-base text-gray-800">Filter Jobs</h1>
        <button 
          onClick={clearAllFilters}
          className="text-xs text-blue-600 hover:text-blue-700 transition-colors"
        >
          Clear All
        </button>
      </div>
      
      <div className="space-y-4">
        {filterData.map((data, index) => (
          <div key={index} className="border-b border-gray-100 pb-3 last:border-b-0 last:pb-0">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-medium text-sm text-gray-700">{data.filterType}</h2>
              {selectedFilters[data.filterType] && (
                <button 
                  onClick={() => clearFilter(data.filterType)}
                  className="text-xs text-red-500 hover:text-red-600 transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
            
            {/* Search Bar */}
            <div className="mb-2">
              <Input
                placeholder={`Find more ${data.filterType.toLowerCase()}...`}
                value={searchQueries[data.filterType]}
                onChange={(e) => handleSearchChange(data.filterType, e.target.value)}
                className="text-xs h-8"
              />
            </div>
            
            {/* Radio Options - always show all options */}
            <RadioGroup 
              value={selectedFilters[data.filterType]} 
              onValueChange={(value) => changeHandler(data.filterType, value)}
              className="space-y-1"
            >
              {getAllOptions(data.filterType).map((item, idx) => {
                const itemId = `${data.filterType}-${idx}`;
                return (
                  <div key={idx} className="flex items-center space-x-2">
                    <RadioGroupItem value={item} id={itemId} className="text-blue-600" />
                    <Label htmlFor={itemId} className="text-xs text-gray-600 cursor-pointer hover:text-gray-800 transition-colors">
                      {item}
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>
          </div>
        ))}
      </div>
    </div>
  );
}