import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import type { Role } from "./types";
import { useAuthStore } from "./auth.store";

export function RequireRole({ role, children }: { role: Role; children: ReactNode }) {
    const user = useAuthStore((s) => s.user);
    if (!user) return <Navigate to="/login" replace />;
    if (user.role !== role) return <Navigate to="/" replace />;
    return <>{children}</>;
}
