import { Routes, Route } from "react-router-dom";
import { RequireAuth } from "../features/auth/RequireAuth";
import { LoginPage } from "../features/auth/LoginPage";
import { AppLayout } from "../components/layout/AppLayout";
import { UsersPage } from "../features/users/UsersPage";
import { RequireRole } from "../features/auth/RequireRole";

function DashboardHome() {
    return <div>Dashboard (cards + metrics go here)</div>;
}

export default function App() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />

            <Route element={<RequireAuth />}>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<DashboardHome />} />
                    <Route
                        path="/users"
                        element={
                            <RequireRole role="admin">
                                <UsersPage />
                            </RequireRole>
                        }
                    />
                </Route>
            </Route>
        </Routes>
    );
}
