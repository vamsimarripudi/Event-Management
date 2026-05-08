import { MdAnalytics, MdLock} from "react-icons/md";
import {
    SidebarItem,
    SidebarText,
} from "./styledComponents";
import {
    SidebarContainer,
    SidebarLink
} from "./styledComponents"

import { useNavigate } from "react-router-dom";


const Sidebar = () => {
    const navigate = useNavigate();

    const user = localStorage.getItem("user")

    const isAdmin = user?.role === "admin";

    const onClickAnalytics = () => {
        if(!isAdmin) return ;

        navigate("/analytics")
    }
    return (
        <SidebarContainer>
            <SidebarLink href="/dashboard">Dashboard</SidebarLink>
            <SidebarLink href="/events">Events</SidebarLink>
            <SidebarItem disable={!isAdmin} onClick={onClickAnalytics}title={!isAdmin ? "Admin access only":""}>
                {isAdmin ? (<MdAnalytics size={20}/>): (<MdLock size={20}/>)}
                <SidebarText>
                    Analytics
                </SidebarText>
            </SidebarItem>
        </SidebarContainer>
    )
}

export default Sidebar;
