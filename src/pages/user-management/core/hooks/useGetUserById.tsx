import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../_requests";
import { QUERIES_KEYS } from "../../../../helpers/crud-helper/consts";

const useGetUserById = (id: string) => {
    const { data, isPending, isError, refetch } = useQuery({
        queryKey: [QUERIES_KEYS.GET_SINGLE_USER_DATA, id],
        queryFn: () => getUserById(id),
    });

    return { userData: data?.data || {}, isError, refetch, isPending, pagination: data?.pagination || {} };
};

export default useGetUserById;