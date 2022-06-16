import { AllJobsCreated, IJobsParam, IStatsReturn, JobInfo, JobInfoCreated } from "../models/jobModel";
import axiosClient from "./axiosClient";

const jobApi = {
    createJob(jobInfo: JobInfo): Promise<JobInfoCreated> {
        const url = `jobs`;
        return axiosClient.post(url, jobInfo)
    },

    getAllJobs(params: IJobsParam): Promise<AllJobsCreated> {
        const url = `jobs`;
        return axiosClient.get(url, { params })
    },

    deleteJob(id: string) {
        const url = `jobs/${id}`;
        return axiosClient.delete(url)
    },

    updateJob(id: string, jobInfo: JobInfo): Promise<JobInfoCreated> {
        const url = `jobs/${id}`;
        return axiosClient.patch(url, jobInfo)
    },

    showStats(): Promise<IStatsReturn> {
        const url = `jobs/stats`;
        return axiosClient.get(url)
    }
}

export default jobApi;