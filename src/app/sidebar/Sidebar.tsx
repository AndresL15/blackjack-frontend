import { useSessionUser } from "../../store/userStore";
import SidebarLogin from "./SidebarLogin";
import SidebarMain from "./SidebarMain";

export default function Sidebar() {
    const user = useSessionUser();
    const menu = user ? <SidebarMain /> : <SidebarLogin />
    return (
        <div className="">
            {menu}
        </div>
    );
}

