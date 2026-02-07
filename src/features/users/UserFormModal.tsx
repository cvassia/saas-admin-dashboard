import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    Stack,
    TextField,
} from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "./schema";
import type { UserFormValues } from "./schema";
import { useCreateUser, useUpdateUser } from "./hooks";
import type { UserRow } from "./types";

type Props = {
    open: boolean;
    onClose: () => void;
    user?: UserRow | null;
};

export function UserFormModal({ open, onClose, user }: Props) {
    const isEdit = Boolean(user);
    const createUser = useCreateUser();
    const updateUser = useUpdateUser();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<UserFormValues>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            role: "user",
        },
    });

    useEffect(() => {
        if (user) {
            reset({
                name: user.name,
                email: user.email,
                role: user.role,
            });
        } else {
            reset({ role: "user" });
        }
    }, [user, reset]);

    const onSubmit = async (values: UserFormValues) => {
        if (isEdit && user) {
            await updateUser.mutateAsync({
                id: user.id,
                data: values,
            });
        } else {
            await createUser.mutateAsync(values);
        }

        reset();
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{isEdit ? "Edit user" : "Create user"}</DialogTitle>

            <DialogContent>
                <Stack spacing={2} sx={{ mt: 1 }}>
                    <TextField
                        label="Name"
                        {...register("name")}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />

                    <TextField
                        label="Email"
                        {...register("email")}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />

                    <TextField
                        label="Role"
                        select
                        {...register("role")}
                        error={!!errors.role}
                        helperText={errors.role?.message}
                    >
                        <MenuItem value="user">User</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                    </TextField>
                </Stack>
            </DialogContent>

            <DialogActions sx={{ p: 2 }}>
                <Button onClick={onClose} variant="outlined">
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={handleSubmit(onSubmit)}
                    disabled={isSubmitting}
                >
                    {isEdit ? "Save" : "Create"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
