import { Typography } from "@mui/material";

export function UsersPage() {
    return (
        <>
            <Typography variant="h4" fontWeight={800} gutterBottom>
                Users
            </Typography>
            <Typography sx={{ opacity: 0.8 }}>
                Next step: add Users table + Create/Edit modal with React Hook Form + Zod + React Query.
            </Typography>
        </>
    );
}
