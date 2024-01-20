export interface ProfileData {
    _id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    contactNumber?: string;
    gender?: string;
}

export interface RegisterData {
    email: string;
    password: string;
    contactNumber: string;
    gender: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface LoginResponse {
    success: boolean;
    message?: string;
    data: {
        user: ProfileData;
        token: string;
    };
}
