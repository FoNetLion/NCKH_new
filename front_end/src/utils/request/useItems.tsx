import useSWR from "swr"
import { Alertfilter, CommonGetAllParams,Flowfilter,Filenamefilter } from "../../constants/types/common.type";
import { serialize } from "../validate";

export const useAllitem = () => {
    const {data, error, isLoading, mutate}= useSWR('/items', {refreshInterval: 0});
    return {data,error,isLoading,mutate}
}

export const useStaticService = () => {
    const {data, error, isLoading, mutate}= useSWR('/statc/service', {refreshInterval: 0});
    return {data,error,isLoading,mutate}
}

export const useStaticProtocol = () => {
    const {data, error, isLoading, mutate}= useSWR('/statc/protocol', {refreshInterval: 0});
    return {data,error,isLoading,mutate}
}
export const useStaticattack = () => {
    const {data, error, isLoading, mutate}= useSWR('/statc/attack', {refreshInterval: 0});
    return {data,error,isLoading,mutate}
}

export const usePhantrang = (
    params?: CommonGetAllParams,
    filter?: Flowfilter
) => {
    const { data, error, isLoading, mutate } = useSWR(
        `items/?${serialize({
            ...params,
            ...filter
        })}`,
        { refreshInterval: 0}
    );
    return {
        data, error, isLoading, mutate
    };
}

export const useAlert = (
    params?: CommonGetAllParams,
    filter?: Alertfilter
) => {
    const { data, error, isLoading, mutate } = useSWR(
        `alert/?page=${params?.page}&limit=${params?.limit}`,
        { refreshInterval: 0}
    );
    return {
        data, error, isLoading, mutate
    };
}

export const useListFileRule  = (
    params?: CommonGetAllParams,
    filter?: Filenamefilter
) => {
    const { data, error, isLoading, mutate } = useSWR(
        `rule_files/?page=${params?.page}&limit=${params?.limit}`,
        { refreshInterval: 0}
    );
    return {
        data, error, isLoading, mutate
    };
}

