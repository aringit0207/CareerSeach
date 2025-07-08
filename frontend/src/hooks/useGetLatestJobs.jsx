import { setLatestJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function useGetLatestJobs() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const fetchLatestJobs = async () => {
      try {
        const res = await axios.get(
          `${JOB_API_END_POINT}/get`,
          {
            withCredentials: true,
          }
        );

        if (res.data.success) {
          dispatch(setLatestJobs(res.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchLatestJobs();
  }, []);
}