import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../features/auth/auth.store";

const linkStyle = ({ isActive }: { isActive: boolean }) => ({
    textTransform: "none",
    justifyContent: "flex-start",
    ...(isActive ? { fontWeight: 800 } : {}),
});

export function Sidebar() {
    const user = useAuthStore((s) => s.user);

    return (
        <Box sx={{ p: 2, borderRight: "1px solid rgba(255,255,255,0.08)" }}>
            <Typography variant="h6" fontWeight={900} sx={{ mb: 2 }}>
                Navigation
            </Typography>

            <Stack spacing={1}>
                <Button component={NavLink} to="/" sx={linkStyle}>
                    Dashboard
                </Button>

                {user?.role === "admin" && (
                    <Button component={NavLink} to="/users" sx={linkStyle}>
                        Users
                    </Button>
                )}
            </Stack>

            <Divider sx={{ my: 2 }} />
            <Typography variant="caption" sx={{ opacity: 0.7 }}>
                Admin-only pages hidden for non-admin users.
            </Typography>
        </Box>
    );
}
