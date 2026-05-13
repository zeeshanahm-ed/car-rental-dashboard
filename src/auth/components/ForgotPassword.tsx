import { useState } from "react";
import { Button, Form, Input } from 'antd';
import { useAuthStore } from "../../store/useAuthStore";
import { showErrorMessage, showSuccessMessage } from "../../utils/messageUtils";
import { forgotPassCode } from "../core/_requests";



const ForgotPassword = () => {
    const { showAuthMode } = useAuthStore((state) => state);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (values: { email: string }) => {
        const email = values.email.trim();
        sessionStorage.setItem("forgotEmail", email);
        const body = { email };
        try {
            setIsLoading(true);
            await forgotPassCode(body);
            showSuccessMessage("OTP has been sent to your email");
            showAuthMode("verifyOtp");
        } catch (error: any) {
            showErrorMessage(error?.response?.data?.message);
            console.error("Failed to send Otp:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        showAuthMode("signin")
    };

    return (
        <div role='card' className="px-12! custom-card flex flex-col  items-start w-[580px] h-[500px] bg-white" >
            <div className="mb-8">
                <h1 className="text-3xl font-medium tracking-wide">Forgot Password?</h1>
                <p className="text-sm text-text-secondary mt-2">Please enter the email associated with your account.</p>
            </div>
            <div className="w-full text-start">
                <Form
                    name="forgote-password"
                    onFinish={handleSubmit}
                    initialValues={{ email: '' }}
                    autoComplete="off"
                    layout="vertical"
                    className='space-y-31.5!'
                >

                    <Form.Item
                        label={<p className='text-lg text-text-secondary'>Email Address<sup className='text-danger'>*</sup></p>}
                        name="email"
                        required
                        rules={[
                            { required: true, message: 'Please input your email' },
                            {
                                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Please input a valid email address"
                            }
                        ]}
                    >
                        <Input
                            type="email"
                            disabled={isLoading}
                            placeholder="Enter your email"
                            className="w-[470px] bg-background! focus:bg-white!"
                        />
                    </Form.Item>

                    <div className="mt-auto">
                        <Button
                            loading={isLoading}
                            type="primary"
                            htmlType="submit"
                            block
                            className="h-12.5! text-xl w-[470px] mb-3"
                        >
                            Send Code
                        </Button>
                        <Button
                            disabled={isLoading}
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

export default ForgotPassword;