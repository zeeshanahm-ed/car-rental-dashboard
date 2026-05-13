import api from "../../../services/api/api";
import type { GetUsersParams } from "./_modules";

const URL = "/users";

export const getAllUserData = (params: GetUsersParams) => {
    return api.get(`${URL}/all`, { params }).then(response => response.data);
};
export const deleteUser = (id: string) => {
    return api.delete(`${URL}/delete/${id}`).then(response => response.data);
};
export const updateUserStatus = (id: string, status: string) => {
    return api.patch(`${URL}/status/${id}`, { status }).then(response => response.data);
};