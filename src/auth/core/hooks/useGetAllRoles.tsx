import { useQuery } from "@tanstack/react-query";
import { getAllRoles } from "../_requests";
import { QUERIES_KEYS } from "../../../helpers/crud-helper/consts";

const useGetAllRoles = (isAdmin: boolean) => {
    const { data, refetch } = useQuery({
        queryKey: [QUERIES_KEYS.GET_ALL_ROLES_DATA, isAdmin],
        queryFn: () => getAllRoles(isAdmin),
    });


    return { rolesData: data?.data || [], refetch };
};

export default useGetAllRoles;