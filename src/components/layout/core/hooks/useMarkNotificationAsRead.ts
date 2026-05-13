import { useMutation } from "@tanstack/react-query";
import { markeNotificationAsRead } from "../_requests";

const useMarkNotificationAsRead = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => markeNotificationAsRead(id),
  });

  return {
    markNotificationAsReadMutate: mutate,
    isPending,
  };
};

export default useMarkNotificationAsRead;


