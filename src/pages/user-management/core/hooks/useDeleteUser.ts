import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../_requests";
import { showErrorMessage, showSuccessMessage } from "../../../../utils/messageUtils";
import { QUERIES_KEYS } from "../../../../helpers/crud-helper/consts";

const useDeleteUser = () => {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (id: string) => deleteUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERIES_KEYS.GET_ALL_USERS_DATA],
            });
            showSuccessMessage("User deleted successfully");
        },
        onError: (error: any) => {
            showErrorMessage(error?.response?.data?.message || "Failed to delete user");
        },
    });

    return { deleteUser: mutate, isDeleting: isPending };
};

export default useDeleteUser;
