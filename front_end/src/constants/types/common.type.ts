import { type } from "os";

export type StatusValue = number;
export type CommonGetAllParams = {
  page?: number;
  limit?: number;
};
export type Flowfilter = {
  filter_field?:string;
  filter_value?:string;
};
export type Alertfilter = {
  SourceIp?: string;
  SourcePort?:string;
  DestinationIP?:string;
  DestinationPort?:string;
};
export type Filenamefilter = {
  filename?: string;
};

export type Ipfilter = {
  Ip?: string;
};
export type CommonSearchAllParams = {
  page?: number;
  limit?: number;
  keyword?: string;
  status?: number;
};
export type GetDetailCustomerParams = {
  id?: string;
};
export type UpdateCustomerStatus = {
  id: string;
  status?: number;
};
export type DeleteKeyParams = {
  filename?: string;
};
export type Account = {
  accountId: number,
  ownerName: string,
  workingUnit: string,
  username: string,
  password: string,
  role: string,
  dateCreate: string | null,
  status: 0 | 1,
  customerId: string | "",
  customerName: string | ""
};
export type GetAccountDetailParams = {
  username?: string;
}

export type ChangePasswordParams = {
  username?: string;
}
export type ChangePassworData = {
  oldPassword?: string;
  newPassword?: string;
}

export type AddAccountData = {
  ownerName?: string,
  workingUnit?: string,
  username?: string,
  password?: string,
  role?: string,
  status?: 0 | 1,
  customerId?: string,
}
export type UpdateAccountData = {
  accountId?: number,
  ownerName?: string,
  workingUnit?: string,
  username?: string,
  role?: string,
  customerId?: string,
}

export type ChangeStatusParams = {
  username?: string,
  status?: 1 | 0
}

