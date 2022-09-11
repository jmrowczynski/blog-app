export type Role = 'admin' | 'writer';

export interface IUser {
    id: number;
    name: string;
    email: string;
    email_verified_at?: any;
    created_at: Date;
    updated_at: Date;
    avatar?: string;
    roles: { id: number; name: Role }[];
}

export interface IUserLoginResponse {
    user: IUser;
    token: string;
}

export interface IUserLoginRequest {
    email: string;
    password: string;
}

export interface IPostsParams {
    per_page?: number;
    page?: number | null;
    search?: string | null;
}

export interface IUsersParams {
    per_page?: number;
    page?: number | null;
    search?: string | null;
}

export interface IEditUserRequest {
    name?: string;
    avatar?: File[];
}

export interface IUserForgotPasswordRequest {
    email: string;
}

export interface IUserResetPasswordRequest {
    email: string;
    password: string;
    password_confirmation: string;
    token: string;
}
