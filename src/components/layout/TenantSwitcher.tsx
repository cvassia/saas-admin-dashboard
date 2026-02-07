import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";
import { useTenantStore } from "../../features/tenants/tenants.store";

export function TenantSwitcher() {
    const tenants = useTenantStore((s) => s.tenants);
    const activeTenantId = useTenantStore((s) => s.activeTenantId);
    const setActiveTenantId = useTenantStore((s) => s.setActiveTenantId);

    return (
        <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel>Organization</InputLabel>
            <Select
                label="Organization"
                value={activeTenantId}
                onChange={(e) => setActiveTenantId(String(e.target.value))}
            >
                {tenants.map((t) => (
                    <MenuItem key={t.id} value={t.id}>
                        {t.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
