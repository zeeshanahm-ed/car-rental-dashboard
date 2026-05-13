import { useMutation } from "@tanstack/react-query";
import { markeAllNotificationAsRead } from "../_requests";

const useMarkAllNotificationsAsRead = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: () => markeAllNotificationAsRead(),
  });

  return {
    markAllNotificationsAsReadMutate: mutate,
    isPending,
  };
};

export default useMarkAllNotificationsAsRead;


