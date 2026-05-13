import { Button, Modal } from 'antd'
import FallbackLoader from '../core-ui/fallback-loader/FallbackLoader';


interface DeleteModalProps {
    isModalOpen: boolean;
    isLoading?: boolean;
    handleCancel: () => void;
    handleOk: () => void;
}

const DeleteModal = ({ isLoading, isModalOpen, handleOk, handleCancel }: DeleteModalProps) => {
    return (
        <Modal
            open={isModalOpen}
            onCancel={handleCancel}
            centered
            closeIcon={true}
            width={500}
            maskClosable={false}
            footer={
                <div className="flex items-center my-5 gap-4.5 px-6">
                    <Button onClick={handleCancel} block className='w-52 h-11! bg-background!'>
                        No
                    </Button>
                    <Button type="primary" onClick={handleOk} block className='w-52 h-11!'>
                        Yes
                    </Button>
                </div>
            }
        >
            {isLoading ? <FallbackLoader isModal={true} size='large' /> : null}
            <div className="text-center pb-5 pt-8 px-6">
                <h2 className="text-xl font-medium mb-5">
                    Delete Record?
                </h2>
                <p className="text-warning font-medium mb-3">
                    This action can't be undone.
                </p>
                <p>
                    Are you sure you want to delete this record?
                </p>
            </div>
        </Modal>
    )
}

export default DeleteModal;