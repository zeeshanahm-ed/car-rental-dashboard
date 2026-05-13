import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserStatus } from "../_requests";
import { showErrorMessage, showSuccessMessage } from "../../../../utils/messageUtils";
import { QUERIES_KEYS } from "../../../../helpers/crud-helper/consts";

const useUpdateUserStatus = () => {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: ({ id, status }: { id: string; status: string }) => updateUserStatus(id, status),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERIES_KEYS.GET_ALL_USERS_DATA],
            });
            showSuccessMessage("User status updated successfully");
        },
        onError: (error: any) => {
            showErrorMessage(error?.response?.data?.message || "Failed to update user status");
        },
    });

    return { updateUserStatus: mutate, isUpdating: isPending };
};

export default useUpdateUserStatus;
