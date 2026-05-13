import { useEffect, useState } from "react";
import { Button, Form, Input } from 'antd';
import { useAuthStore } from "../../store/useAuthStore";
import { showErrorMessage, showSuccessMessage } from "../../utils/messageUtils";
import { forgotPassCode, verifyOtp } from "../core/_requests";


const VerifyOTP = () => {
    const { showAuthMode } = useAuthStore((state) => state);
    const forgotEmail = sessionStorage.getItem('forgotEmail');
    const [countdown, setCountdown] = useState(59);
    const [resendDisabled, setResendDisabled] = useState(false);
    const [otp, setOtp] = useState<any>();
    const [isLoading, setIsLoading] = useState(false);

    const handleVerifyOTP = async (event: any) => {
        event.preventDefault();

        if (!otp || otp.length < 4) {
            showErrorMessage('Please enter the complete OTP');
            return;
        }

        const body = {
            email: forgotEmail,
            otp: otp
        }
        setIsLoading(true)
        try {

            await verifyOtp(body);
            showSuccessMessage('Otp has been varified');
            sessionStorage.setItem('verifiedOtp', otp);
            showAuthMode("resetPassword");
        } catch (error: any) {
            showErrorMessage(error?.response?.data?.message);
        } finally {
            setIsLoading(false)
        }
    };

    useEffect(() => {
        const storedTimestamp = sessionStorage.getItem('resendTimestamp');
        if (storedTimestamp) {
            const diff = Math.floor((Date.now() - parseInt(storedTimestamp, 10)) / 1000);
            if (diff < 59) {
                setResendDisabled(true);
                setCountdown(59 - diff);
            }
        }
    }, []);

    // Countdown logic
    useEffect(() => {
        let timer: number | undefined;
        if (resendDisabled && countdown > 0) {
            timer = window.setTimeout(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
        } else if (countdown === 0) {
            setResendDisabled(false);
            sessionStorage.removeItem('resendTimestamp');
        }
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [resendDisabled, countdown]);

    const handleResendOtp = async () => {
        if (resendDisabled) return;

        try {
            await forgotPassCode({ email: forgotEmail });
            showSuccessMessage('OTP Resend successfull');
            setResendDisabled(true);
            setCountdown(59);
            sessionStorage.setItem('resendTimestamp', Date.now().toString());
        } catch (error: any) {
            showErrorMessage(error?.response?.data.message);
            console.error('Resend OTP Error:', error);
        }
    };

    const handleCancel = () => {
        showAuthMode("signin")
    };

    return (
        <div role='card' className="custom-card px-12! flex flex-col items-start justify-start w-[580px] h-[500px]" >
            <div className="mb-8">
                <h1 className="text-3xl font-medium tracking-wide">Enter Code</h1>
                <p className="text-sm text-text-secondary mt-2">We’ve sent you a verification code on your email.</p>
            </div>
            <div className="w-full text-start">
                <Form
                    name="verification"
                    onSubmitCapture={handleVerifyOTP}
                    autoComplete="off"
                    layout="vertical"
                    className=''
                >

                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: 'Please enter the OTP',
                            },
                        ]}
                        name='otp'
                        required
                        className="flex justify-center"
                    >
                        <Input.OTP
                            disabled={isLoading}
                            value={otp}
                            length={4}
                            formatter={(str) => str.replace(/\D/g, '')}
                            onChange={(value: string) => setOtp(value)}
                            className="focus:bg-white!"
                        />
                    </Form.Item>

                    <div className="w-full text-center mt-6">
                        <Button
                            onClick={handleResendOtp}
                            type="link"
                            variant="link"
                            disabled={resendDisabled}
                            className={`text-sm! text-text-secondary! font-normal! w-fit! p-0! ${resendDisabled ? "cursor-not-allowed!" : "cursor-pointer"}`}
                        >
                            <span className="underline">Send code again</span> {resendDisabled && ` ${countdown}s`}
                        </Button>
                    </div>

                    <div className="mt-25">
                        <div className="flex gap-5 items-center">
                            <Button
                                loading={isLoading}
                                type="primary"
                                onClick={handleVerifyOTP}
                                className="h-12.5! text-xl w-full mb-3"
                            >
                                Submit
                            </Button>
                        </div>
                        <Button
                            disabled={isLoading}
                            type="default"
                            block
                            onClick={handleCancel}
                            className="h-12.5! text-xl w-full"
                        >
                            Cancel
                        </Button>
                    </div>

                </Form>
            </div>
        </div>
    )
}

export default VerifyOTP;