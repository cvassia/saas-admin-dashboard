import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { TenantSwitcher } from "./TenantSwitcher";
import { useAuthStore } from "../../features/auth/auth.store";
import { useNavigate } from "react-router-dom";

export function Topbar() {
    const user = useAuthStore((s) => s.user);
    const logout = useAuthStore((s) => s.logout);
    const navigate = useNavigate();

    return (
        <AppBar position="static" color="transparent" elevation={0}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Typography variant="h6" fontWeight={800}>
                        SaaS Admin
                    </Typography>
                    <TenantSwitcher />
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Typography variant="body2" sx={{ opacity: 0.85 }}>
                        {user?.email} ({user?.role})
                    </Typography>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            logout();
                            navigate("/login");
                        }}
                    >
                        Logout
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
