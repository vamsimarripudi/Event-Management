
import {
    SidebarContainer,
    SidebarLink
} from "./styledComponents"



const Sidebar = () => {
    return (
        <SidebarContainer>
            <SidebarLink href="/dashboard">Dashboard</SidebarLink>
            <SidebarLink href="/events">Events</SidebarLink>
        </SidebarContainer>
    )
}

export default Sidebar;
