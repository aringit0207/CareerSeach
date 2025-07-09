import { setSearchedJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useGetSearchedJobs() {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.job);
  
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // If there's a search query, use it. Otherwise, fetch all jobs
        const endpoint = searchedQuery 
          ? `${JOB_API_END_POINT}/get?keyword=${searchedQuery}`
          : `${JOB_API_END_POINT}/get`;
          
        const res = await axios.get(endpoint, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setSearchedJobs(res.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    
    fetchJobs();
  }, [searchedQuery, dispatch]);
}