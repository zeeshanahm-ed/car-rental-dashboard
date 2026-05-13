import { useMutation } from "@tanstack/react-query";
import { deleteNotification } from "../_requests";

const useDeleteNotification = () => {
    const { mutate, isPending } = useMutation({
        mutationFn: (id: string) => deleteNotification(id),
    });

    return {
        deleteNotificationMutate: mutate,
        isPending,
    };
};

export default useDeleteNotification;


