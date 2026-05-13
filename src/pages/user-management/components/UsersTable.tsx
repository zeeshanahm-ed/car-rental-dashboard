import { useState } from "react";
import dayjs from "dayjs";
import UserDetailModal from "../../../components/modals/user-detail-modal";
import type { UserDetailInter } from "../core/_modules";
import { Button, Empty } from "antd";
import { USERS_TABLE_HEADERS } from "../../../constants/global";
import useDeleteUser from "../core/hooks/useDeleteUser";
//icons
import UserIcon from "../../../assets/icons/single-person-icon.svg?react";
import EyeIcon from "../../../assets/icons/eye-open-icon.svg?react";
import DeleteIcon from "../../../assets/icons/delete-icon.svg?react";
import DeleteModal from "../../../components/modals/delete-modal";

const ROLE_COLOR_MAP: Record<string, string> = {
    "admin": 'bg-danger',
    "user": 'bg-primary',
};

interface UsersTableProps {
    usersData: UserDetailInter[];
    totalUsers: number;
}

export default function UsersTable({ usersData, totalUsers }: UsersTableProps) {
    const [isModalOpen, setIsModalOpen] = useState<{ isOpen: boolean; data: UserDetailInter | null }>({
        isOpen: false,
        data: null,
    });
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<{ isOpen: boolean; data: UserDetailInter | null }>({
        isOpen: false,
        data: null,
    });

    const { deleteUser, isDeleting } = useDeleteUser();

    const handleModalOpen = (data: UserDetailInter) => {
        setIsModalOpen({
            isOpen: true,
            data,
        });
    };

    const handleModalClose = () => {
        setIsModalOpen({
            isOpen: false,
            data: null,
        });
    };


    const handleOkDelete = () => {
        deleteUser(isDeleteModalOpen.data?._id!);
        handleDeleteModalClose();
    };

    const handleDeleteModalOpen = (data: UserDetailInter) => {
        setIsDeleteModalOpen({
            isOpen: true,
            data,
        });
    };

    const handleDeleteModalClose = () => {
        setIsDeleteModalOpen({
            isOpen: false,
            data: null,
        });
    };

    return (
        <div role="card" className="custom-card">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <h1 className="text-xl font-medium">All Users ({totalUsers || 0})</h1>
            </div>

            {/* Table */}
            <div className="border border-border-gray rounded-lg overflow-auto">
                {usersData?.length > 0 ? <table className="w-full min-w-[1140px]">
                    <thead>
                        <tr className="bg-background border-b border-border-gray">
                            {USERS_TABLE_HEADERS.map((header) => (
                                <th
                                    key={header.key}
                                    className={`px-4 py-4 text-left text-base font-medium ${header.className}`}
                                >
                                    {header.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {usersData.map((user: any) => {
                            return (
                                <tr
                                    role="button"
                                    key={user._id}
                                    onClick={() => handleModalOpen(user)}
                                    className="cursor-pointer border-b border-[#E6E6E6] hover:bg-background-hover transition-all duration-300">
                                    <td className="px-4 py-3">
                                        <span className="flex items-center gap-2 text-sm font-medium">
                                            <span className="w-8 h-8 bg-primary-light rounded-full flex-centered">
                                                <UserIcon className="text-primary" />
                                            </span>
                                            {user?.firstName + " " + user?.lastName || "-"}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-text-secondary">
                                        {user?.email || "-"}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-text-secondary">
                                        <span
                                            className={`text-sm text-white capitalize w-fit rounded-sm font-medium px-2 py-1 ${ROLE_COLOR_MAP[user.role] ?? ""}`}
                                        >
                                            {user.role || "-"}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`text-sm capitalize px-2 py-1 font-medium rounded-sm text-white ${user.status === "active" ? "bg-success" : "bg-gray"}`}>
                                            {user.status || "-"}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-text-secondary">
                                        {user.lastLogin ? dayjs(user.lastLogin).format('YYYY-MM-DD hh:mm A') : "-"}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center justify-center gap-2">
                                            <Button
                                                type="text"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleModalOpen(user)
                                                }}
                                            >
                                                <EyeIcon className="w-5 h-5" />
                                            </Button>
                                            <Button
                                                type="text"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteModalOpen(user)
                                                }}
                                            >
                                                <DeleteIcon className="w-5 h-5" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                    :
                    <Empty />
                }
            </div>
            <UserDetailModal
                isModalOpen={isModalOpen.isOpen}
                data={isModalOpen.data}
                handleCancel={handleModalClose}
            />
            <DeleteModal
                isModalOpen={isDeleteModalOpen.isOpen}
                handleCancel={handleDeleteModalClose}
                handleOk={handleOkDelete}
                isLoading={isDeleting}
            />
        </div >
    );
}