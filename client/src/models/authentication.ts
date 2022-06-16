export interface UserInputLogin {
    email: string;
    password: string
}

export interface UserInputRegister extends UserInputLogin {
    name: string
}

export interface UserInfo {
    email: string;
    lastName: string;
    name: string;
    location: string
}

export interface UserInfoAuthenticate {
    user: UserInfo;
    token: string;
    location: string
}

export interface UserInfoAuthenticateAction extends UserInfoAuthenticate {
    alertText: string
}

export interface IErrorMsg {
    msg: string
}