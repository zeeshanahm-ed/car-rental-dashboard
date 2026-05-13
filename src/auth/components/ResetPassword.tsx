import { useState } from "react";
import { Button, Form, Input } from 'antd';
import { useAuthStore } from "../../store/useAuthStore";
import { showErrorMessage, showSuccessMessage } from "../../utils/messageUtils";
import { resetPassword } from "../core/_requests";

import EyeOpenIcon from "../../assets/icons/eye-open-icon.svg?react";
import EyeCloseIcon from "../../assets/icons/eye-close-icon.svg?react";



const ResetPassword = () => {
    const { showAuthMode } = useAuthStore((state) => state);
    const [isLoading, setIsLoading] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const forgotEmail = sessionStorage.getItem('forgotEmail');
    const verifiedOtp = sessionStorage.getItem('verifiedOtp');


    const handleResetPassword = async (values: any) => {
        const body = {
            email: forgotEmail,
            newPassword: values?.newPassword,
            confirmPassword: values?.confirmPassword,
            otp: verifiedOtp?.replace(/,/g, "")
        }
        try {
            setIsLoading(true);
            await resetPassword(body);
            showSuccessMessage('Password reset successfull');
            showAuthMode('signin');
            sessionStorage.removeItem('forgotEmail');
            sessionStorage.removeItem('verifiedOtp');
        } catch (error: any) {
            showErrorMessage(error?.response?.data?.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        showAuthMode("signin")
    };

    return (
        <div role="card" className="custom-card px-12! flex flex-col items-start w-[580px] h-[500px]" >
            <div className="mb-5">
                <h1 className="text-3xl font-medium tracking-wide">New Password</h1>
                <p className="text-sm text-text-secondary mt-2">Please choose a secure password for your account.</p>
            </div>
            <div className="w-full text-start">
                <Form
                    name="reset-password"
                    onFinish={handleResetPassword}
                    initialValues={{ newPassword: '', confirmPassword: "" }}
                    autoComplete="off"
                    layout="vertical"
                    className='space-y-5!'
                >

                    <Form.Item
                        label={<p className='text-lg text-text-secondary'>Set Password<sup className='text-danger'>*</sup></p>}
                        name="newPassword"
                        required
                        rules={[
                            { required: true, message: 'Please input new password' },
                        ]}
                    >
                        <Input
                            type={showNewPassword ? "password" : "test"}
                            disabled={isLoading}
                            placeholder="Enter new password"
                            className="w-[470px] bg-background! password-input"
                            onFocus={(e) => {
                                e.target.style.backgroundColor = 'white';
                            }}
                            onBlur={(e) => {
                                e.target.style.backgroundColor = '';
                            }}
                            suffix={
                                <span onClick={() => setShowNewPassword(!showNewPassword)} className="cursor-pointer text-text-secondary">
                                    {showNewPassword ? <EyeCloseIcon /> : <EyeOpenIcon />}
                                </span>
                            }
                        />
                    </Form.Item>
                    <Form.Item
                        label={<p className='text-lg text-text-secondary'>Confirm Password<sup className='text-danger'>*</sup></p>}
                        name="confirmPassword"
                        required
                        dependencies={['newPassword']}
                        rules={[
                            {
                                required: true,
                                message: 'Please input confirm password',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('newPassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Confirm password does not match'));
                                },
                            }),
                        ]}
                    >
                        <Input
                            type={showConfirmPassword ? "password" : "test"}
                            disabled={isLoading}
                            placeholder="Enter confirm password"
                            className="w-[470px] bg-background! password-input"
                            onFocus={(e) => {
                                e.target.style.backgroundColor = 'white';
                            }}
                            onBlur={(e) => {
                                e.target.style.backgroundColor = '';
                            }}
                            suffix={
                                <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="cursor-pointer text-text-secondary">
                                    {showConfirmPassword ? <EyeCloseIcon /> : <EyeOpenIcon />}
                                </span>
                            }
                        />
                    </Form.Item>

                    <div className="mt-9">
                        <Button
                            loading={isLoading}
                            type="primary"
                            htmlType="submit"
                            block
                            className="h-12.5! text-xl w-[470px] mb-3"
                        >
                            Submit
                        </Button>
                        <Button
                            loading={isLoading}
                            type="default"
                            block
                            onClick={handleCancel}
                            className="h-12.5! text-xl w-[470px]"
                        >
                            Cancel
                        </Button>
                    </div>

                </Form>
            </div>
        </div>
    )
}

export default ResetPassword;