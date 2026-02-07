import { databases } from "../../lib/appwrite/client";
import type { UserRow } from "./types";

const DB_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID!;
const USERS_COL = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID!;

export const usersApi = {
    async list(tenantId: string): Promise<UserRow[]> {
        const res = await databases.listDocuments(DB_ID, USERS_COL, [
            `equal("tenantId","${tenantId}")`,
        ]);

        return res.documents.map((d) => ({
            id: d.$id,
            name: d.name,
            email: d.email,
            role: d.role,
            tenantId: d.tenantId,
        }));
    },

    async create(
        tenantId: string,
        payload: Omit<UserRow, "id" | "tenantId">
    ): Promise<UserRow> {
        const doc = await databases.createDocument(
            DB_ID,
            USERS_COL,
            "unique()",
            { ...payload, tenantId }
        );

        return {
            id: doc.$id,
            name: doc.name,
            email: doc.email,
            role: doc.role,
            tenantId: doc.tenantId,
        };
    },

    async update(
        id: string,
        payload: Partial<Omit<UserRow, "id" | "tenantId">>
    ): Promise<UserRow> {
        const doc = await databases.updateDocument(DB_ID, USERS_COL, id, payload);

        return {
            id: doc.$id,
            name: doc.name,
            email: doc.email,
            role: doc.role,
            tenantId: doc.tenantId,
        };
    },

    async remove(id: string): Promise<void> {
        await databases.deleteDocument(DB_ID, USERS_COL, id);
    },
};
