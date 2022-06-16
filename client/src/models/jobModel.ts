export const jobStatusArray = ['interview', 'declined', 'pending', 'all'] as const;
export type JobStatusTuple = typeof jobStatusArray;
export type JobStatus = JobStatusTuple[number];

export const jobTypeArray = ['full-time', 'part-time', 'remote', 'internship', 'all'] as const;
export type JobTypeTuple = typeof jobTypeArray;
export type JobType = JobTypeTuple[number];

export const sortOptions = ['latest', 'oldest', 'a-z', 'z-a'] as const;
export type SortTypeTuple = typeof sortOptions;
export type SortType = SortTypeTuple[number];

export interface JobInfo {
    company: string;
    position: string;
    status: JobStatus;
    jobType: JobType;
    jobLocation: string
}

export interface JobInfoCreated extends JobInfo {
    _id: string;
    createdBy: string;
    createdAt: string;
}

export interface AllJobsCreated {
    jobs: JobInfoCreated[];
    totalJobs: number,
    numOfPages: number
}

export type IStats = Omit<{ [K in typeof jobStatusArray[number]]: number }, 'all'>

export interface IMonthlyApp {
    date: string,
    count: number,
}

export interface IStatsReturn {
    stats: IStats;
    monthlyApplications: IMonthlyApp[]
}

export interface IJobsParam {
    status: JobStatus;
    jobType: JobType;
    sort: SortType;
    search: string;
    page: number;
}

