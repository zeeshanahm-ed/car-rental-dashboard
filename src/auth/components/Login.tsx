import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input } from 'antd';

import * as authHelper from '../core/auth-helpers';
import { useUserProfile } from '../../store/userProfile';
import { showErrorMessage, showSuccessMessage } from '../../utils/messageUtils';
import { useAuth } from '../core/auth-context';
import { useAuthStore } from "../../store/useAuthStore";
import { getUserByToken } from "../core/_requests";
import useSignIn from "../core/hooks/use-sign-in";

//icons
import EyeOpenIcon from "../../assets/icons/eye-open-icon.svg?react";
import EyeCloseIcon from "../../assets/icons/eye-close-icon.svg?react";



const Login = () => {
    const navigate = useNavigate();
    const { signInMutate } = useSignIn();
    const { currentUser, setCurrentUser } = useAuth();
    const { showAuthMode } = useAuthStore((state) => state);
    const [isLoading, setIsLoading] = useState(false);
    const { setUserProfile } = useUserProfile();
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);


    useEffect(() => {
        if (currentUser) {
            navigate('/', { replace: true });
        }
    }, [currentUser, navigate]);


    const onFinish = async (values: any) => {
        const payload = {
            email: values.email.trim(),
            password: values.password.trim(),
        };
        setIsLoading(true)
        signInMutate(payload, {
            onSuccess: async (res: any) => {
                if (res) {
                    const token = res.data.token;
                    if (token) {

                        try {
                            const { data } = await getUserByToken(token || "");
                            if (data) {
                                const authData = {
                                    token: token,
                                    data: data?.user || {},
                                };
                                setUserProfile(authData.data);
                                setCurrentUser(authData);
                                authHelper.setUser(authData);
                                showSuccessMessage(res?.data?.message || "Login successfull.");
                                navigate('/', { replace: true });
                            }
                        } catch (error: any) {
                            showErrorMessage(error?.response?.data?.message);
                            console.error('Failed to sign in user:', error);
                        } finally {
                            setIsLoading(false)
                        }
                    }
                }
            },
            onError: (error: any) => {
                showErrorMessage(error?.response?.data?.message);
                console.error('Failed to sign in user:', error);
                setIsLoading(false)
            },
        });
    };

    const handleForgatePass = () => {
        showAuthMode("forgotPassword")
    };

    return (
        <div role='card' className="px-12! custom-card flex flex-col items-start  w-[580px] h-[500px]" >
            <div className="mb-8">
                <h1 className="text-3xl font-medium tracking-wide">Login to Car Rental</h1>
            </div>
            <div className="w-full text-start">
                <Form
                    name="sign-in"
                    onFinish={onFinish}
                    initialValues={{ email: '', password: '' }}
                    autoComplete="off"
                    layout="vertical"
                    className='space-y-5!'
                >

                    <Form.Item
                        label={<p className='text-lg text-text-secondary'>Email Address<sup className='text-danger'>*</sup></p>}
                        name="email"
                        required
                        rules={[
                            { required: true, message: 'Please enter your email' },
                            {
                                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Please enter a valid email address"
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

                    <Form.Item
                        label={<p className='text-lg text-text-secondary'>Password<sup className='text-danger'>*</sup></p>}
                        name="password"
                        required
                        rules={[{
                            required: true,
                            message: 'Please enter your password',
                        }, {
                            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
                            message: 'Password must be 8+ characters with uppercase, lowercase, number, and special character.',
                        },
                        ]}
                    >
                        <Input
                            disabled={isLoading}
                            type={showCurrentPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className=" w-[470px] bg-background! password-input"
                            suffix={
                                <span onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="cursor-pointer text-text-secondary">
                                    {showCurrentPassword ? <EyeCloseIcon /> : <EyeOpenIcon />}
                                </span>
                            }
                            onFocus={(e) => {
                                e.target.style.backgroundColor = 'white';
                            }}
                            onBlur={(e) => {
                                e.target.style.backgroundColor = '';
                            }}
                        />
                    </Form.Item>

                    <div className="flex justify-end">
                        <Button
                            type="link"
                            variant="link"
                            block
                            onClick={handleForgatePass}
                            className="text-sm! text-text-secondary! w-fit! underline p-0!"
                        >
                            Forgote Password?
                        </Button>
                    </div>


                    <Button
                        loading={isLoading}
                        type="primary"
                        htmlType="submit"
                        block
                        className="h-12.5! text-xl w-[470px] mt-11!"
                    >
                        Login
                    </Button>

                </Form>
            </div>
        </div>
    )
}

export default Login;