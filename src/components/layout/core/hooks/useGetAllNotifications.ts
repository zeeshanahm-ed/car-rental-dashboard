import { useQuery } from "@tanstack/react-query";
import { getAllNotification } from "../_requests";
import { QUERIES_KEYS } from "../../../../helpers/crud-helper/consts";
import type { NotificationQueryParams } from "../_modules";

const useGetAllNotifications = (params: NotificationQueryParams, isEnable: boolean) => {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: [QUERIES_KEYS.GET_ALL_NOTIFICATIONS_DATA, params.page, params.limit, params.read],
    queryFn: () => getAllNotification(params),
    enabled: isEnable
  });

  return {
    notificationsData: data?.data || [],
    isError,
    refetch,
    isPending,
    pagination: data?.pagination || {},
    counts: data?.counts || {},
  };
};

export default useGetAllNotifications;


