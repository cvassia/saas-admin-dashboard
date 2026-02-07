import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function AppLayout() {
    return (
        <Box sx={{ display: "grid", gridTemplateColumns: "260px 1fr", minHeight: "100vh" }}>
            <Sidebar />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Topbar />
                <Box component="main" sx={{ p: 3 }}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
}
