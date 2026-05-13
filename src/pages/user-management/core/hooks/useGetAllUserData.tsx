import { useQuery } from "@tanstack/react-query";
import { getAllUserData } from "../_requests";
import type { GetUsersParams } from "../_modules";
import { QUERIES_KEYS } from "../../../../helpers/crud-helper/consts";

const useGetAllUserData = (params: GetUsersParams) => {
    const { data, isPending, isError, refetch } = useQuery({
        queryKey: [
            QUERIES_KEYS.GET_ALL_USERS_DATA,
            params.page,
            params.limit,
            params.search,
            params.role,
            params.status,
        ],
        queryFn: () => getAllUserData(params),
    });

    return { usersData: data?.data || {}, isError, refetch, isPending, pagination: data?.pagination || {}, statistics: data?.stats || {} };
};

export default useGetAllUserData;