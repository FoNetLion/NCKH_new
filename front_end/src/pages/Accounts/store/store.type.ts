import { Account } from "../../../constants/types/common.type";
export type GetAllAccountsSuccessPayload = {
    total: number;
    accounts: Array<Account>;
    limit: number;
    page: number;
}