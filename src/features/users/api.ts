import type { UserRow } from "./types";

// ---- In-memory mock DB (simulates backend) ----
let USERS: UserRow[] = [
    {
        id: "u1",
        tenantId: "t1",
        name: "Alice Admin",
        email: "alice@acme.com",
        role: "admin",
    },
    {
        id: "u2",
        tenantId: "t1",
        name: "Bob User",
        email: "bob@acme.com",
        role: "user",
    },
    {
        id: "u3",
        tenantId: "t2",
        name: "Clara Admin",
        email: "clara@globex.com",
        role: "admin",
    },
];

// ---- Fake network delay ----
const delay = (ms = 400) => new Promise((res) => setTimeout(res, ms));

// ---- API ----
export const usersApi = {
    async list(tenantId: string): Promise<UserRow[]> {
        await delay();
        return USERS.filter((u) => u.tenantId === tenantId);
    },

    async create(
        tenantId: string,
        payload: Omit<UserRow, "id" | "tenantId">
    ): Promise<UserRow> {
        await delay();
        const newUser: UserRow = {
            id: crypto.randomUUID(),
            tenantId,
            ...payload,
        };
        USERS.push(newUser);
        return newUser;
    },

    async update(
        id: string,
        payload: Partial<Omit<UserRow, "id" | "tenantId">>
    ): Promise<UserRow> {
        await delay();
        USERS = USERS.map((u) =>
            u.id === id ? { ...u, ...payload } : u
        );
        const updated = USERS.find((u) => u.id === id);
        if (!updated) throw new Error("User not found");
        return updated;
    },

    async remove(id: string): Promise<void> {
        await delay();
        USERS = USERS.filter((u) => u.id !== id);
    },
};
