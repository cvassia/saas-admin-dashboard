import type { Role } from "../auth/types";
export type UserRow = { id: string; tenantId: string; name: string; email: string; role: Role };
