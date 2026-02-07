import { create } from "zustand";
import type { AuthUser } from "./types";

type AuthState = {
    user: AuthUser | null;
    login: (email: string) => Promise<void>;
    logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    login: async (email) => {
        // mock: treat "admin@" as admin
        const isAdmin = email.toLowerCase().includes("admin");
        set({
            user: {
                id: "u1",
                name: isAdmin ? "Admin User" : "Standard User",
                email,
                role: isAdmin ? "admin" : "user",
                tenantIds: ["t1", "t2"],
            },
        });
    },
    logout: () => set({ user: null }),
}));
