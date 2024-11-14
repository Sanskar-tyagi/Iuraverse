import { useGetTickets } from "@/hooks/useTickets";
import { UserStore } from "../HomeLayout/UserStore";
import ViewTickets from "@/components/Support/ViewTickets";

export const Support = () => {
  const user = UserStore((state) => state.user);
  const { data = [], isLoading, refetch } = useGetTickets();
  return <ViewTickets data={data} isLoading={isLoading} refetch={refetch} />;
};
