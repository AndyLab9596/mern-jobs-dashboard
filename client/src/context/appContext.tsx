import React, {
    createContext, ReactNode,
    useContext, useReducer
} from "react";
import authApi from "../api/authApi";
import axiosClient from "../api/axiosClient";
import jobApi from "../api/jobApi";
import { UserInfo, UserInputLogin, UserInputRegister } from "../models/authentication";
import { IJobsParam, IMonthlyApp, IStats, JobInfoCreated, JobStatus, jobStatusArray, JobStatusTuple, JobType, jobTypeArray, JobTypeTuple, sortOptions, SortType, SortTypeTuple } from "../models/jobModel";
import ActionTypes from "./actions";
import reducer from "./reducer";


interface IUpdateUser {
    currentUser: UserInfo;
    alertText: string
}

interface ISetupUser {
    currentUser: UserInputRegister | UserInputLogin;
    endPoint: 'register' | 'login';
    alertText: string
}

interface IAddUserToLocalStorage {
    user: UserInfo;
    token: string;
    location: string;
}

interface IAppProvider {
    children: ReactNode;
}
export type InitialStateType = {
    isLoading: boolean;
    showAlert: boolean;
    alertText: string;
    alertType: string;
    displayAlert: () => void;

    // Authenticate
    user: UserInfo | null;
    token: string | null;
    userLocation: string | null;
    jobLocation: string | null;
    setupUser: ({ currentUser, endPoint, alertText }: ISetupUser) => void;
    updateUser: ({ currentUser, alertText }: IUpdateUser) => void;
    logoutUser: () => void;

    //Dashboard
    showSidebar: boolean;
    toggleSidebar: () => void;

    isEditing: boolean;
    editJobId: string;
    position: string;
    company: string;
    jobTypeOptions: JobTypeTuple;
    jobType: JobType;
    statusOptions: JobStatusTuple;
    status: JobStatus;

    handleChange: ({ name, value }: IHandleChangeProps) => void;
    clearValues: () => void;
    createJob: () => void;

    jobs: JobInfoCreated[];
    totalJobs: number;
    numOfPages: number;
    page: number;
    getJobs: () => void;
    setEditJob: (id: string) => void;
    editJob: () => void;
    deleteJob: (id: string) => void;

    stats: IStats;
    monthlyApplications: IMonthlyApp[];
    showStats: () => void;

    search: string;
    searchStatus: JobStatus;
    searchType: JobType;
    sort: SortType;
    sortOptions: SortTypeTuple;

    clearFilters: () => void;
    changePage: (page: number) => void;
};

interface IHandleChangeProps {
    name: string,
    value: InitialStateType[keyof InitialStateType]
}


const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
const userLocation = localStorage.getItem('location');


const initialState: InitialStateType = {
    isLoading: false,
    showAlert: false,
    alertText: "",
    alertType: "",
    displayAlert: () => null,

    // Authenticate
    user: user ? JSON.parse(user) : null,
    token: token ? token : null,
    userLocation: userLocation ? userLocation : null,
    jobLocation: userLocation ? userLocation : null,
    setupUser: ({ currentUser, endPoint, alertText }) => null,
    updateUser: ({ currentUser, alertText }) => null,
    logoutUser: () => null,

    // Dashboard
    showSidebar: false,
    toggleSidebar: () => null,

    isEditing: false,
    editJobId: '',
    position: '',
    company: '',
    jobTypeOptions: jobTypeArray,
    jobType: 'full-time',
    statusOptions: jobStatusArray,
    status: 'pending',

    handleChange: ({ name, value }) => null,
    clearValues: () => null,
    createJob: () => null,

    jobs: [],
    totalJobs: 0,
    numOfPages: 1,
    page: 1,
    getJobs: () => null,
    setEditJob: (id) => null,
    editJob: () => null,
    deleteJob: (id) => null,

    stats: {
        interview: 0,
        declined: 0,
        pending: 0
    },
    monthlyApplications: [],
    showStats: () => null,

    search: '',
    searchStatus: 'all',
    searchType: 'all',
    sort: 'latest',
    sortOptions: sortOptions,

    clearFilters: () => null,
    changePage: (page) => null,
};

const AppContext = createContext<InitialStateType>(initialState);



const AppProvider = ({ children }: IAppProvider) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    axiosClient.interceptors.request.use(
        (config: any) => {
            config.headers.common['Authorization'] = `Bearer ${state.token}`
            return config
        },
        (error) => {
            return Promise.reject(error)
        }
    )
    // // response interceptor
    // axiosClient.interceptors.response.use(
    //     (response) => {
    //         console.log('response', response)
    //         return response.data
    //     },
    //     (error) => {
    //         console.log(error.response)
    //         if (error.response.status === 401) {
    //             console.log('AUTH ERROR')
    //         }
    //         return Promise.reject(error)
    //     }
    // )


    const addUserToLocalStorage = ({ user, token, location }: IAddUserToLocalStorage) => {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        localStorage.setItem('location', location)
    }
    const removeUserFromLocalStorage = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('location')
    }

    // Alert Functions
    const clearAlert = () => {
        setTimeout(() => {
            dispatch({ type: ActionTypes.CLEAR_ALERT })
        }, 3000)
    }

    const displayAlert = () => {
        dispatch({ type: ActionTypes.DISPLAY_ALERT })
        clearAlert()
    }

    // Authenticate Functions
    const setupUser = async ({ currentUser, endPoint, alertText }: ISetupUser) => {
        dispatch({ type: ActionTypes.AUTH_BEGIN });
        try {
            const { user, token, location } = await authApi.setupUser(currentUser, endPoint);
            dispatch({
                type: ActionTypes.AUTH_SUCCESS, payload: {
                    user,
                    token,
                    location,
                    alertText
                }
            })
            // Add to localStorage
            addUserToLocalStorage({ user, token, location })
        } catch (error: any) {
            dispatch({
                type: ActionTypes.AUTH_ERROR, payload: {
                    msg: error.response.data.msg
                }
            })
        }
        clearAlert()
    }

    const updateUser = async ({ currentUser, alertText }: IUpdateUser) => {
        dispatch({ type: ActionTypes.UPDATE_USER_BEGIN });

        try {
            const { user, token, location } = await authApi.updateUser(currentUser);
            dispatch({
                type: ActionTypes.UPDATE_USER_SUCCESS, payload: {
                    user,
                    token,
                    location,
                    alertText
                }
            })
            addUserToLocalStorage({ user, token, location });
        } catch (error: any) {
            dispatch({
                type: ActionTypes.UPDATE_USER_ERROR,
                payload: {
                    msg: error.response.data.msg
                }
            })
        }
        clearAlert()
    }

    const logoutUser = () => {
        dispatch({ type: ActionTypes.LOGOUT_USER });
        removeUserFromLocalStorage();
    }

    // Dashboard Functions
    const toggleSidebar = () => {
        dispatch({ type: ActionTypes.TOGGLE_SIDEBAR })
    }

    // Form function
    const handleChange = ({ name, value }: IHandleChangeProps) => {
        dispatch({
            type: ActionTypes.HANDLE_CHANGE,
            payload: {
                name,
                value
            }
        })
    }

    const clearValues = () => {
        dispatch({ type: ActionTypes.CLEAR_VALUES })
    }

    const createJob = async () => {
        dispatch({ type: ActionTypes.CREATE_JOB_BEGIN });
        try {
            const { position, company, jobLocation, jobType, status } = state;
            await jobApi.createJob({
                position,
                company,
                jobLocation: jobLocation as string,
                jobType,
                status
            })
            dispatch({ type: ActionTypes.CREATE_JOB_SUCCESS });
            dispatch({ type: ActionTypes.CLEAR_VALUES });
        } catch (error: any) {
            dispatch({
                type: ActionTypes.CREATE_JOB_ERROR,
                payload: {
                    msg: error.response.data.msg
                }
            })
        }
        clearAlert()
    }

    const getJobs = async () => {
        dispatch({ type: ActionTypes.GET_JOBS_BEGIN })
        const params: IJobsParam = {
            status: state.searchStatus,
            jobType: state.searchType,
            sort: state.sort,
            search: state.search,
            page: state.page
        }

        try {
            const { jobs, totalJobs, numOfPages } = await jobApi.getAllJobs(params);
            dispatch({
                type: ActionTypes.GET_JOBS_SUCCESS,
                payload: {
                    jobs,
                    totalJobs,
                    numOfPages
                }
            })
        } catch (error) {
            // logoutUser()
        }
        clearAlert()
    }

    const setEditJob = (id: string) => {
        dispatch({ type: ActionTypes.SET_EDIT_JOB, payload: { id } })
    }

    const editJob = async () => {
        dispatch({ type: ActionTypes.EDIT_JOB_BEGIN });

        try {
            const { position, company, jobType, status, jobLocation, editJobId } = state;
            const updatedJob = { position, company, jobType, status, jobLocation: jobLocation as string };
            await jobApi.updateJob(editJobId, updatedJob);
            dispatch({ type: ActionTypes.EDIT_JOB_SUCCESS });
            dispatch({ type: ActionTypes.CLEAR_VALUES })
        } catch (error: any) {
            dispatch({
                type: ActionTypes.CREATE_JOB_ERROR,
                payload: {
                    msg: error.response.data.msg
                }
            })
        }
        clearValues()
    }

    const deleteJob = async (id: string) => {
        dispatch({ type: ActionTypes.DELETE_JOB_BEGIN });
        try {
            await jobApi.deleteJob(id);
        } catch (error) {
            logoutUser()
        }
    }

    const showStats = async () => {
        dispatch({ type: ActionTypes.SHOW_STATS_BEGIN });
        try {
            const { stats, monthlyApplications } = await jobApi.showStats();
            dispatch({ type: ActionTypes.SHOW_STATS_SUCCESS, payload: { stats, monthlyApplications } })

        } catch (error: any) {
            // logoutUser()
        }

        clearAlert()
    }

    const clearFilters = () => {
        dispatch({ type: ActionTypes.CLEAR_FILTERS })
    }

    const changePage = (page: number) => {
        dispatch({ type: ActionTypes.CHANGE_PAGE, payload: { page } })
    }

    return (
        <AppContext.Provider value={{
            ...state,
            displayAlert,
            setupUser,
            toggleSidebar,
            logoutUser,
            updateUser,
            handleChange,
            clearValues,
            createJob,
            getJobs,
            setEditJob,
            editJob,
            deleteJob,
            showStats,
            clearFilters,
            changePage
        }}>
            {children}
        </AppContext.Provider>
    );
};
export const useAppContext = () => {
    return useContext(AppContext);
};
export { AppProvider, initialState };

