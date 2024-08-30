export type Account = {
    accountId: number,
    ownerName: string,
    workingUnit: string,
    username: string,
    password: string,
    role: string,
    dateCreate: Date,
    status: 0 | 1,
    customerId: number | null,
    customerName: string | ""
  };