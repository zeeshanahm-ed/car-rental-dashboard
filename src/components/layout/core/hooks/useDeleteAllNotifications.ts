import { useMutation } from "@tanstack/react-query";
import { deleteAllNotification } from "../_requests";

const useDeleteAllNotifications = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteAllNotification(),
  });

  return {
    deleteAllNotificationsMutate: mutate,
    isPending,
  };
};

export default useDeleteAllNotifications;


