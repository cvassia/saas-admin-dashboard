import { Button, Card, CardContent, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "./auth.store";

export function LoginPage() {
    const [email, setEmail] = useState("");
    const login = useAuthStore((s) => s.login);
    const navigate = useNavigate();

    return (
        <Stack alignItems="center" justifyContent="center" sx={{ minHeight: "100vh", p: 2 }}>
            <Card sx={{ width: "100%", maxWidth: 420 }}>
                <CardContent>
                    <Typography variant="h5" fontWeight={700} gutterBottom>
                        SaaS Admin Dashboard
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8, mb: 2 }}>
                        Tip: use <b>admin@demo.com</b> to log in as Admin
                    </Typography>

                    <Stack spacing={2}>
                        <TextField
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                        />
                        <Button
                            variant="contained"
                            disabled={!email}
                            onClick={async () => {
                                await login(email);
                                navigate("/");
                            }}
                        >
                            Sign in
                        </Button>
                    </Stack>
                </CardContent>
            </Card>
        </Stack>
    );
}
