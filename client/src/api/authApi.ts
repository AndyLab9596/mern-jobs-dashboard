import { UserInfo, UserInfoAuthenticate, UserInputLogin, UserInputRegister } from "../models/authentication";
import axiosClient from "./axiosClient";

const authApi = {
    setupUser(currentUser: UserInputRegister | UserInputLogin, endPoint: 'register' | 'login'): Promise<UserInfoAuthenticate> {
        const url = `auth/${endPoint}`;
        return axiosClient.post(url, currentUser)
    },
    updateUser(currentUser: UserInfo): Promise<UserInfoAuthenticate> {
        const url = `auth/updateUser`;
        return axiosClient.patch(url, currentUser)
    }
}

export default authApi;