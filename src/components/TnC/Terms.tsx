import { UserStore } from "@/pages/HomeLayout/UserStore";
import ListTnc from "./ListTnc";

const Terms = () => {
    const userRole= UserStore((state) => state.user?.userRole);
  return (
    <div>
      
      <ListTnc/>
    </div>
  )
}

export default Terms
