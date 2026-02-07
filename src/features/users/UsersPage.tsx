import {
    Box,
    Button,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { useUsers, useDeleteUser } from "./hooks";
import type { UserRow } from "./types";
import { UserFormModal } from "./UserFormModal";
import { ConfirmDialog } from "../../components/ui/ConfirmDialog";

export function UsersPage() {
    const { data, isLoading } = useUsers();
    const deleteUser = useDeleteUser();

    const [formOpen, setFormOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserRow | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<UserRow | null>(null);

    const columns: GridColDef<UserRow>[] = [
        { field: "name", headerName: "Name", flex: 1, minWidth: 160 },
        { field: "email", headerName: "Email", flex: 1, minWidth: 200 },
        { field: "role", headerName: "Role", width: 120 },
        {
            field: "actions",
            headerName: "",
            width: 120,
            sortable: false,
            renderCell: (params) => (
                <>
                    <IconButton
                        size="small"
                        onClick={() => {
                            setSelectedUser(params.row);
                            setFormOpen(true);
                        }}
                    >
                        <EditIcon fontSize="small" />
                    </IconButton>

                    <IconButton
                        size="small"
                        color="error"
                        onClick={() => setDeleteTarget(params.row)}
                    >
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </>
            ),
        },
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

                <Button
                    variant="contained"
                    onClick={() => {
                        setSelectedUser(null);
                        setFormOpen(true);
                    }}
                >
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
                />
            </Box>

            {/* Create / Edit */}
            <UserFormModal
                open={formOpen}
                onClose={() => setFormOpen(false)}
                user={selectedUser}
            />

            {/* Delete */}
            <ConfirmDialog
                open={!!deleteTarget}
                title="Delete user"
                description={`Are you sure you want to delete ${deleteTarget?.name}?`}
                onCancel={() => setDeleteTarget(null)}
                onConfirm={async () => {
                    if (!deleteTarget) return;
                    await deleteUser.mutateAsync(deleteTarget.id);
                    setDeleteTarget(null);
                }}
            />
        </Stack>
    );
}
