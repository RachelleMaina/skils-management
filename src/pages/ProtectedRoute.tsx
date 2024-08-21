import { useStateProvider } from "../utils/StateProvider";
import Employee from "./Employee";
import Manager from "./Manager";

const ProtectedRoute = () => {
    const [{ user }] = useStateProvider();
  
    return user?.role==="employee" ?<Employee /> : <Manager />;
}

  export default ProtectedRoute