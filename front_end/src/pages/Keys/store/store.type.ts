import { Key } from "../../../constants/types/key.type";

export type GetAllKeysSuccessPayload = {
    total: number;
    keys: Array<Key>;
    limit: number;
    page: number;
}