export interface IUserLoginResponse {
    user: {
        id: number;
        name: string;
        email: string;
        email_verified_at?: any;
        created_at: Date;
        updated_at: Date;
        avatar?: string;
    };
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

export interface IEditUserRequest {
    name?: string;
    avatar?: File;
}
