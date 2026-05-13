import { Divider, Modal, Radio, type RadioChangeEvent } from 'antd'
import FallbackLoader from '../core-ui/fallback-loader/FallbackLoader';
import type { UserDetailInter } from '../../pages/user-management/core/_modules';
import dayjs from 'dayjs';
import useUpdateUserStatus from '../../pages/user-management/core/hooks/useUpdateUserStatus';
import { useEffect, useState } from 'react';


interface UserDetailModalProps {
    isModalOpen: boolean;
    isLoading?: boolean;
    handleCancel: () => void;
    data?: UserDetailInter | null;
}

const UserDetailModal = ({ isLoading, isModalOpen, handleCancel, data }: UserDetailModalProps) => {

    const { updateUserStatus, isUpdating } = useUpdateUserStatus();
    const [status, setStatus] = useState<string>('');

    useEffect(() => {
        if (data?.status) {
            setStatus(data.status);
        }
    }, [data]);

    const handleStatusChange = (e: RadioChangeEvent) => {
        const newStatus = e.target.value;
        setStatus(newStatus);
        if (data?._id) {
            updateUserStatus({ id: data._id, status: newStatus });
        }
    };

    return (
        <Modal
            open={isModalOpen}
            title={
                <div className='flex items-center justify-between mr-8'>
                    <span className='text-xl font-medium'>User Details</span>
                    <span className='text-sm text-text-secondary font-normal'>Registered : {data?.createdAt ? dayjs(data.createdAt).format('DD/MM/YYYY') : '-'}</span>
                </div>
            }
            onCancel={handleCancel}
            centered
            closeIcon={true}
            width={800}
            maskClosable={false}
            footer={null}
        >
            {isLoading || isUpdating ? <FallbackLoader isModal={true} size='large' /> : null}
            <Divider className='my-4' />
            <div className="pb-5 px-4 flex flex-col gap-6">
                {/* Row 1 */}
                <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                    <div className='flex flex-col gap-1'>
                        <span className='text-text-secondary text-sm'>User ID:</span>
                        <span className='font-medium text-sm truncate' title={data?._id}>{data?._id || '-'}</span>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <span className='text-text-secondary text-sm'>First Name:</span>
                        <span className='font-medium text-sm'>{data?.firstName}</span>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <span className='text-text-secondary text-sm'>Last Name:</span>
                        <span className='font-medium text-sm'>{data?.lastName}</span>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <span className='text-text-secondary text-sm'>Email Address:</span>
                        <span className='font-medium text-sm'>{data?.email || '-'}</span>
                    </div>
                </div>

                {/* Row 3 - Status */}
                <div className='flex items-center gap-4 mt-2'>
                    <span className='text-text-secondary text-sm'>Status:</span>
                    <Radio.Group onChange={handleStatusChange} value={status}>
                        <Radio value="active">Active</Radio>
                        <Radio value="inactive">Inactive</Radio>
                    </Radio.Group>
                </div>
            </div>
        </Modal>
    )
}

export default UserDetailModal;