import { create } from 'zustand';

type AuthMode = 'signin' | "forgotPassword" | "verifyOtp" | "resetPassword";
interface AuthModalStore {
    history: AuthMode[];
    mode: AuthMode;
    showAuthMode: (mode: AuthMode) => void;
    closeModal: () => void;
    goBack: () => void;
}

export const useAuthStore = create<AuthModalStore>((set) => ({
    mode: 'signin',
    history: [],
    showAuthMode: (mode) => {
        set((state) => ({
            mode,
            history: [...state.history, state.mode],
        }));
    },
    closeModal: () => {
        localStorage.removeItem("forgotEmail");
        localStorage.removeItem("verifiedOtp");
    },
    goBack: () => set((state) => {
        const newHistory = [...state.history];
        const previousMode = newHistory.pop();
        return { mode: previousMode || 'signin', history: newHistory };
    }),
}));