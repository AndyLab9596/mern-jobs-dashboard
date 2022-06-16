import { IErrorMsg, UserInfoAuthenticateAction } from "../models/authentication"
import { AllJobsCreated, IStatsReturn, JobInfoCreated, jobStatusArray, jobTypeArray, sortOptions } from "../models/jobModel"
import ActionTypes from "./actions"
import { InitialStateType } from "./appContext"

type ActionMap<M extends { [index: string]: any }> = {
    [Key in keyof M]: M[Key] extends undefined ? { type: Key } : { type: Key, payload: M[Key] }
}

type AlertPayload = {
    [ActionTypes.DISPLAY_ALERT]: undefined,
    [ActionTypes.CLEAR_ALERT]: undefined
}

type AuthPayload = {
    [ActionTypes.AUTH_BEGIN]: undefined,
    [ActionTypes.AUTH_SUCCESS]: UserInfoAuthenticateAction,
    [ActionTypes.AUTH_ERROR]: IErrorMsg,

    [ActionTypes.LOGOUT_USER]: undefined,

    [ActionTypes.UPDATE_USER_BEGIN]: undefined,
    [ActionTypes.UPDATE_USER_SUCCESS]: UserInfoAuthenticateAction
    [ActionTypes.UPDATE_USER_ERROR]: IErrorMsg
}

type DashboardPayload = {
    [ActionTypes.TOGGLE_SIDEBAR]: undefined,
    [ActionTypes.HANDLE_CHANGE]: {
        name: string,
        value: InitialStateType[keyof InitialStateType]
    },
    [ActionTypes.CLEAR_VALUES]: undefined,
    [ActionTypes.CREATE_JOB_BEGIN]: undefined,
    [ActionTypes.CREATE_JOB_SUCCESS]: undefined,
    [ActionTypes.CREATE_JOB_ERROR]: IErrorMsg,
    [ActionTypes.GET_JOBS_BEGIN]: undefined,
    [ActionTypes.GET_JOBS_SUCCESS]: AllJobsCreated,
    [ActionTypes.SET_EDIT_JOB]: {
        id: string
    },
    [ActionTypes.DELETE_JOB_BEGIN]: undefined,
    [ActionTypes.EDIT_JOB_BEGIN]: undefined,
    [ActionTypes.EDIT_JOB_SUCCESS]: undefined,
    [ActionTypes.EDIT_JOB_ERROR]: IErrorMsg,
    [ActionTypes.SHOW_STATS_BEGIN]: undefined,
    [ActionTypes.SHOW_STATS_SUCCESS]: IStatsReturn,
    [ActionTypes.CLEAR_FILTERS]: undefined,
    [ActionTypes.CHANGE_PAGE]: {
        page: number
    }
}

type AlertActions = ActionMap<AlertPayload>[keyof AlertPayload];
type AuthActions = ActionMap<AuthPayload>[keyof AuthPayload];
type DashboardActions = ActionMap<DashboardPayload>[keyof DashboardPayload];

type ActionsReducer = AlertActions | AuthActions | DashboardActions;

const reducer = (state: InitialStateType, action: ActionsReducer) => {
    switch (action.type) {
        case ActionTypes.DISPLAY_ALERT: {
            return {
                ...state,
                showAlert: true,
                alertText: 'Please provides all values',
                alertType: 'danger'
            }
        }

        case ActionTypes.CLEAR_ALERT: {
            return {
                ...state,
                showAlert: false,
                alertText: '',
                alertType: '',
            }
        }

        case ActionTypes.AUTH_BEGIN: {
            return {
                ...state,
                isLoading: true
            }
        }

        case ActionTypes.AUTH_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                token: action.payload.token,
                user: action.payload.user,
                userLocation: action.payload.location,
                jobLocation: action.payload.location,
                showAlert: true,
                alertType: 'success',
                alertText: action.payload.alertText
            }
        }

        case ActionTypes.AUTH_ERROR: {
            return {
                ...state,
                showAlert: true,
                isLoading: false,
                alertType: 'danger',
                alertText: action.payload.msg
            }
        }

        case ActionTypes.LOGOUT_USER: {
            return {
                ...state,
                user: null,
                token: null,
                jobLocation: '',
                userLocation: ''
            }
        }

        case ActionTypes.TOGGLE_SIDEBAR: {
            return {
                ...state,
                showSidebar: !state.showSidebar
            }
        }

        case ActionTypes.UPDATE_USER_BEGIN: {
            return {
                ...state,
                isLoading: true
            }
        }

        case ActionTypes.UPDATE_USER_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                token: action.payload.token,
                user: action.payload.user,
                userLocation: action.payload.location,
                jobLocation: action.payload.location,
                showAlert: true,
                alertType: 'success',
                alertText: action.payload.alertText
            }
        }

        case ActionTypes.UPDATE_USER_ERROR: {
            return {
                ...state,
                showAlert: true,
                isLoading: false,
                alertType: 'danger',
                alertText: action.payload.msg
            }
        }

        case ActionTypes.HANDLE_CHANGE: {
            return {
                ...state,
                page: 1,
                [action.payload.name]: action.payload.value
            }
        }

        case ActionTypes.CLEAR_VALUES: {
            return {
                ...state,
                isEditing: false,
                editJobId: '',
                position: '',
                company: '',
                jobLocation: state.userLocation,
                jobType: jobTypeArray[0],
                status: jobStatusArray[2],
            }
        }

        case ActionTypes.CREATE_JOB_BEGIN: {
            return {
                ...state,
                isLoading: true
            }
        }

        case ActionTypes.CREATE_JOB_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertText: 'New Job Created !!!',
                alertType: 'success'
            }
        }

        case ActionTypes.CREATE_JOB_ERROR: {
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertText: action.payload.msg,
                alertType: 'danger'
            }
        }

        case ActionTypes.GET_JOBS_BEGIN: {
            return {
                ...state,
                isLoading: true,
                showAlert: false,
            }
        }

        case ActionTypes.GET_JOBS_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                jobs: action.payload.jobs,
                totalJobs: action.payload.totalJobs,
                numOfPages: action.payload.numOfPages
            }
        }

        case ActionTypes.SET_EDIT_JOB: {
            const job = state.jobs.find((job) => job._id === action.payload.id) as JobInfoCreated;
            const { _id, position, company, jobLocation, jobType, status } = job;
            return {
                ...state,
                isEditing: true,
                editJobId: _id,
                position,
                company,
                jobLocation,
                jobType,
                status
            }
        }

        case ActionTypes.DELETE_JOB_BEGIN: {
            return {
                ...state,
                isLoading: true
            }
        }

        case ActionTypes.EDIT_JOB_BEGIN: {
            return {
                ...state,
                isLoading: true,
            }
        }

        case ActionTypes.EDIT_JOB_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'success',
                alertText: 'Job Updated !!!'
            }
        }

        case ActionTypes.EDIT_JOB_ERROR: {
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'danger',
                alertText: action.payload.msg
            }
        }

        case ActionTypes.SHOW_STATS_BEGIN: {
            return {
                ...state,
                isLoading: true,
                showAlert: false,
            }
        }

        case ActionTypes.SHOW_STATS_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                stats: action.payload.stats,
                monthlyApplications: action.payload.monthlyApplications
            }
        }

        case ActionTypes.CLEAR_FILTERS: {
            return {
                ...state,
                search: '',
                searchStatus: jobStatusArray[3],
                searchType: jobTypeArray[3],
                sort: sortOptions[0],
            }
        }

        case ActionTypes.CHANGE_PAGE: {
            return {
                ...state,
                page: action.payload.page
            }
        }

        default:
            return state;

    }

}

export default reducer;