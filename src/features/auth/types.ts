export type Role = "admin" | "user";

export type AuthUser = {
    id: string;
    name: string;
    email: string;
    role: Role;
    tenantIds: string[];
};
