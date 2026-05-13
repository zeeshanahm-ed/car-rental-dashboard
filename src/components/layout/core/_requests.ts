import api from "../../../services/api/api";
import type { NotificationQueryParams } from "./_modules";

const URL = "/notification";

export const getAllNotification = (params: NotificationQueryParams) => {
    return api.get(URL, { params }).then(response => response.data);
};

export const markeNotificationAsRead = (id: string) => {
    return api.post(`${URL}/read/${id}`).then(response => response.data);
};

export const markeAllNotificationAsRead = () => {
    return api.post(`${URL}/read-all`).then(response => response.data);
};

export const deleteAllNotification = () => {
    return api.delete(`${URL}/clear-all`,).then(response => response.data);
};

export const deleteNotification = (id: string) => {
    return api.delete(`${URL}/${id}`).then(response => response.data);
};

