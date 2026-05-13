import { useEffect, useState } from 'react';
import type { Notification } from '../core/_modules';
import type { PaginationParams } from '../../../utils/Interfaces';
import { Button, Empty } from 'antd';
//icons
import { CloseOutlined } from '@ant-design/icons';
import DocumentIcon from "../../../assets/icons/document-graan-icon.svg?react";
import CompleteIcon from "../../../assets/icons/complete-icon.svg?react";
import MeetingIcon from "../../../assets/icons/date-icon.svg?react";
import ClientIcon from "../../../assets/icons/two-people-group-icon.svg?react";
import AlertIcon from "../../../assets/icons/alert-icon.svg?react";
//Hooks
import { useNotifications } from '../../../store/useNotifications';
import useGetAllNotifications from '../core/hooks/useGetAllNotifications';
import useMarkAllNotificationsAsRead from '../core/hooks/useMarkAllNotificationsAsRead';
import FallbackLoader from '../../core-ui/fallback-loader/FallbackLoader';
import useMarkNotificationAsRead from '../core/hooks/useMarkNotificationAsRead';
//For date formate
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

interface NotificationDrawerProps {
};

const tabs = [
    { label: "All", value: "all" },
    { label: "Unread", value: "unread" }
];
const getIconColor = (type: Notification['type']) => {
    switch (type) {
        case 'sow':
            return 'text-green-600';
        case 'milestone':
            return 'text-yellow-600';
        case 'meeting':
            return 'text-blue-600';
        case 'client':
            return 'text-purple-600';
        case 'alert':
            return 'text-red-600';
        default:
            return 'text-gray-600';
    }
};
const getIcon = (type: Notification['type']) => {
    const iconClass = "w-5 h-5";
    switch (type) {
        case 'sow':
            return <DocumentIcon className={`${iconClass} text-success`} />;
        case 'milestone':
            return <CompleteIcon className={`${iconClass} text-warning`} />;
        case 'meeting':
            return <MeetingIcon className={iconClass} />;
        case 'client':
            return <ClientIcon className={iconClass} />;
        case 'alert':
            return <AlertIcon className={`${iconClass} text-danger`} />;
        default:
            return <DocumentIcon className={iconClass} />;
    }
};
const NotificationDrawer = ({ }: NotificationDrawerProps) => {
    const { openNotificationDrawer, toggleNotificationDrawer, setUnreadCount, decrementUnreadCount, notificationUnreadCount } = useNotifications();
    const [params, setParams] = useState<PaginationParams>({
        page: 1,
        limit: 10,
    });

    const { notificationsData, counts, isPending: dataLoading } = useGetAllNotifications(params, openNotificationDrawer || false);
    const { markAllNotificationsAsReadMutate, isPending } = useMarkAllNotificationsAsRead();
    const { markNotificationAsReadMutate, isPending: markLoading } = useMarkNotificationAsRead();

    const [notificationsDataCopy, setNotificationsDataCopy] = useState<Notification[]>([]);
    const [activeTab, setActiveTab] = useState<string>('all');

    useEffect(() => {
        if (
            notificationsData &&
            (notificationsDataCopy.length !== notificationsData.length ||
                !notificationsDataCopy.every((item, idx) => item._id === notificationsData[idx]._id && item.isRead === notificationsData[idx].isRead))
        ) {
            setNotificationsDataCopy(notificationsData);
            // setUnreadCount(counts?.unread);
        }
    }, [notificationsData])


    const handleMarkedAllNotification = () => {
        if (markLoading || isPending) return;
        setNotificationsDataCopy(prev => (prev.map(v => ({ ...v, isRead: true }))));
        setUnreadCount(0)
        markAllNotificationsAsReadMutate()
    };

    const handleMarkedSingleNotification = (id: string) => {
        if (markLoading || isPending) return;
        const found = notificationsDataCopy.find(v => v._id === id);
        if (!found || found.isRead) return;
        setNotificationsDataCopy(prev => (prev.map(v => {
            if (v._id === id) {
                return {
                    ...v,
                    isRead: true
                }
            } else {
                return v
            }
        })));
        decrementUnreadCount();
        markNotificationAsReadMutate(String(id))
    };

    const timeAgo = (date: string) => {
        return dayjs(date).fromNow();
    };

    const handleChangeTab = (tab: string) => {
        setActiveTab(tab)
        setParams(prev => ({
            ...prev,
            limit: 10,
            page: 1,
            read: tab === "unread" ? false : undefined
        }));
    };

    return (
        <div className={`w-full h-screen top-0 left-0 absolute z-40 ${openNotificationDrawer ? "" : "hidden"}`} onClick={toggleNotificationDrawer}>
            <aside onClick={(e) => e.stopPropagation()} className={`w-[400px] h-[calc(100vh-64px)] absolute top-16 bg-white overflow-hidden z-50 ${openNotificationDrawer ? "right-0 opacity-100 pointer-events-auto" : "-right-full pointer-events-none"}`}>
                <div className={`h-full w-full overflow-hidden border-l border-border-gray bg-white `}>
                    <div className='mb-5 p-5 border-b border-border-gray flex items-center justify-between'>
                        <div>
                            <h1 className='text-lg font-medium'>Notifications</h1>
                            <p className="text-text-secondary text-sm font-normal">
                                {`(${notificationUnreadCount || 0})`} unread
                            </p>
                        </div>
                        <Button variant="text" type="text" className="px-2!" onClick={toggleNotificationDrawer}>
                            <CloseOutlined className="text-text-secondary" />
                        </Button>
                    </div>
                    <div className="flex justify-center px-5 border-b border-border-gray h-[calc(100%-200px)]">
                        <div className="w-full overflow-hidden h-full">
                            {/* Tabs */}
                            <div className="flex items-center gap-1.5 bg-background p-1 rounded-xl mb-5">
                                {tabs.map((v) => (
                                    <button
                                        key={v.label}
                                        onClick={() => handleChangeTab(v.value)}
                                        className={`flex-1 py-1 text-center cursor-pointer rounded-xl text-sm font-medium transition-colors ${activeTab === v.value ? 'text-text-primary bg-white' : 'text-text-secondary'}`}
                                    >
                                        {v.label} {v.value === "unread" && `(${notificationUnreadCount || 0})`}
                                    </button>
                                ))}
                            </div>

                            {/* Notifications List */}
                            <div className="space-y-2 overflow-y-auto pr-1 max-h-[calc(100%-70px)]">
                                {dataLoading ? <FallbackLoader size='large' /> :
                                    <>
                                        {notificationsDataCopy?.length === 0 ?
                                            <Empty description="Empty" />
                                            :
                                            <>
                                                {notificationsDataCopy?.map((notification: Notification) => (
                                                    <div
                                                        role='button'
                                                        key={notification?._id}
                                                        onClick={() => handleMarkedSingleNotification(notification?._id)}
                                                        className={`relative cursor-pointer rounded-lg border border-border-gray p-3 transition-all ${!notification.isRead ? 'bg-primary-light border-primary' : 'bg-white '}`}
                                                    >
                                                        <div className="flex items-start gap-3">
                                                            {/* Icon */}
                                                            <div className={`shrink-0 mt-1 ${getIconColor(notification.type)}`}>
                                                                {getIcon(notification.type)}
                                                            </div>

                                                            {/* Content */}
                                                            <div className="flex-1 min-w-0">
                                                                <h3 className="font-medium text-base mb-1">
                                                                    {notification?.title}
                                                                </h3>
                                                                <p className="text-text-secondary text-sm mb-1">
                                                                    {notification?.body}
                                                                </p>
                                                                <p className="text-gray text-xs">
                                                                    {timeAgo(notification.createdAt)}
                                                                </p>
                                                            </div>

                                                            {/* Unread Indicator */}
                                                            {!notification.isRead && (
                                                                <div className="shrink-0">
                                                                    <div className="w-2.5 h-2.5 bg-primary rounded-full" />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))
                                                }
                                            </>

                                        }
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='flex-centered py-8'>
                        <Button loading={isPending} onClick={handleMarkedAllNotification} disabled={counts.unread <= 0 || isPending} className='w-[350px] bg-background! text-base font-medium! p-5! notification-btn'>
                            Mark All as Read
                        </Button>
                    </div>
                </div>
            </aside>
        </div>
    );
};

export default NotificationDrawer;