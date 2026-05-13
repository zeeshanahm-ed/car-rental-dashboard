import type { PaginationParams } from "../../../utils/Interfaces";

export interface GetUsersParams extends PaginationParams {
    search: string | undefined;
    role: string | undefined;
    status: string | undefined;
}
export interface CreateUserInter {
    email: string;
    fullName: string;
    phoneNumber: string;
    password: string;
    role: any;
}

export interface UserDetailInter {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    status: string;
    lastLogin: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
