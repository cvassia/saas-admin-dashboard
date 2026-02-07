import { Box, Button, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { useUsers } from "./hooks";
import type { UserRow } from "./types";
import { useState } from "react";
import { UserFormModal } from "./UserFormModal";

export function UsersPage() {
    const { data, isLoading } = useUsers();
    const [open, setOpen] = useState(false);

    const columns: GridColDef<UserRow>[] = [
        { field: "name", headerName: "Name", flex: 1, minWidth: 160 },
        { field: "email", headerName: "Email", flex: 1, minWidth: 200 },
        { field: "role", headerName: "Role", width: 120 },
    ];

    return (
        <Stack spacing={3}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography variant="h4" fontWeight={800}>
                    Users
                </Typography>

                <Button variant="contained" onClick={() => setOpen(true)}>
                    Add user
                </Button>
            </Box>

            <Box sx={{ height: 420 }}>
                <DataGrid
                    rows={data ?? []}
                    columns={columns}
                    loading={isLoading}
                    getRowId={(row) => row.id}
                    disableRowSelectionOnClick
                    pageSizeOptions={[5, 10, 25]}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 5, page: 0 } },
                    }}
                />
            </Box>

            <UserFormModal open={open} onClose={() => setOpen(false)} />
        </Stack>
    );
}
