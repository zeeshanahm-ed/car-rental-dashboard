export interface IUserModel {
  token?: string;
  data?: any;
}

export interface ISignInForm {
  email: string;
  password: string;
}

export interface IForgotPasswordForm {
  email: string | null;
}

export interface IForgotPasswordForm {
  email: string | null;
}

export interface IVerifyOtpRequestBody {
  email: string | null;
  otp: string;
}

export interface IChangePasswordForm {
  newPassword: string;
  confirmPassword: string;
  otp: string | undefined;
  email: string | null;
}
export interface IUpdatePasswordForm {
  newPassword: string;
  currentPassword: string;
  confirmPassword: string;
}
export interface IChangeProfile {
  fullName: string;
  phoneNumber: string;
}
