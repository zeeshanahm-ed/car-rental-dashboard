import type { PaginationParams } from "../../../utils/Interfaces";

export interface Notification {
    _id: string;
    title: string;
    body: string;
    type: "test_notification" | string;
    data: {
        source: string;
        timestamp: string;
        [key: string]: any;
    };
    source: string;
    timestamp: string;
    userId: string;
    isDeleted: boolean;
    isRead: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface NotificationQueryParams extends PaginationParams {
    read?: boolean;
}