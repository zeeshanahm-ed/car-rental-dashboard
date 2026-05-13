import { useAuthStore } from "../store/useAuthStore";
import ForgotPassword from "./components/ForgotPassword";
import Login from "./components/Login";
import ResetPassword from "./components/ResetPassword";
import VerifyOTP from "./components/VerifyOTP";

function SignIn() {
  const { mode } = useAuthStore((state) => state);

  const getContent = () => {
    switch (mode) {
      case 'signin':
        return <Login />;
      case 'forgotPassword':
        return <ForgotPassword />;
      case 'verifyOtp':
        return <VerifyOTP />;
      case 'resetPassword':
        return <ResetPassword />;
      default:
        return null;
    }
  };

  return (
    <div className={`overflow-hidden h-screen flex justify-center relative items-center bg-primary-light`}>
      {getContent()}
    </div>
  );
}

export default SignIn;
