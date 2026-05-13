import api from "../../services/api/api";
import type { IChangePasswordForm, IChangeProfile, IForgotPasswordForm, ISignInForm, IUpdatePasswordForm, IVerifyOtpRequestBody } from "./_models";

const SIGNIN_URL = '/users/login';
const FORGOT_PASSWORD_URL = '/users/forgot-password';
const VERIFY_OTP = '/users/verify-otp';
const RESET_PASS_CODE = '/users/reset-password';
const VERIFY_TOKEN_URL = "/users/validate"
const CHANGE_PASS_CODE = "/users/update-password";

export async function login(body: ISignInForm) {
  return api.post(SIGNIN_URL, body);
}

export function getUserByToken(token: string) {
  return api.get(VERIFY_TOKEN_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "true"
    },
  }
  );
}

export function forgotPassCode(body: IForgotPasswordForm) {
  return api.post(FORGOT_PASSWORD_URL, body).then(response => response.data);
}

export function verifyOtp(body: IVerifyOtpRequestBody) {
  return api.post(VERIFY_OTP, body).then(response => response.data);
}

export function resetPassword(body: IChangePasswordForm) {
  return api.post(RESET_PASS_CODE, body).then(response => response.data);
}

export function changePassword(body: IUpdatePasswordForm) {
  return api.patch(CHANGE_PASS_CODE, body).then(response => response.data);
}
export function getAllRoles(isAdmin: boolean) {
  return api.get("/rbac/roles", { params: isAdmin }).then(response => response.data);
}
export function updateUserProfile(body: IChangeProfile) {
  return api.patch("/users/profile", body).then(response => response.data);
}
