import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTenantStore } from "../tenants/tenants.store";
import { usersApi } from "./api";
import type { UserRow } from "./types";

export function useUsers() {
    const tenantId = useTenantStore((s) => s.activeTenantId);
    return useQuery({
        queryKey: ["users", tenantId],
        queryFn: () => usersApi.list(tenantId),
    });
}

export function useCreateUser() {
    const tenantId = useTenantStore((s) => s.activeTenantId);
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (payload: Omit<UserRow, "id" | "tenantId">) => usersApi.create(tenantId, payload),
        onSuccess: () => qc.invalidateQueries({ queryKey: ["users", tenantId] }),
    });
}
