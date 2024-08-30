export type FilterUserManagementType = {
    ip?: string
}

export type LogsType = {
    id: number,
    time: Date,
    ipSrc: string,
    ipDest: string,
    msg: string,
    details: string,
}

export type FilterLogsType = {
    ipSrc?: string,
    ipDest?: string,
    msg?: string
}