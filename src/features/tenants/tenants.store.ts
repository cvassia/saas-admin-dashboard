import { create } from "zustand";

export type Tenant = { id: string; name: string };

const TENANTS: Tenant[] = [
    { id: "t1", name: "Acme Inc." },
    { id: "t2", name: "Globex GmbH" },
];

type TenantState = {
    tenants: Tenant[];
    activeTenantId: string;
    setActiveTenantId: (id: string) => void;
};

export const useTenantStore = create<TenantState>((set) => ({
    tenants: TENANTS,
    activeTenantId: "t1",
    setActiveTenantId: (id) => set({ activeTenantId: id }),
}));
