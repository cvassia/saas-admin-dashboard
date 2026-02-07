import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from "@mui/material";

type Props = {
    open: boolean;
    title: string;
    description: string;
    onCancel: () => void;
    onConfirm: () => void;
};

export function ConfirmDialog({
    open,
    title,
    description,
    onCancel,
    onConfirm,
}: Props) {
    return (
        <Dialog open={open} onClose={onCancel}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Typography sx={{ opacity: 0.85 }}>{description}</Typography>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
                <Button onClick={onCancel} variant="outlined">
                    Cancel
                </Button>
                <Button color="error" variant="contained" onClick={onConfirm}>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}
