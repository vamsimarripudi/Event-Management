import {
    SidebarContainer,
    DashboardLink,
    EventsLink

}  from "./styledComponents"


const Sidebar = () => {
    return (
        <SidebarContainer>
            <DashboardLink href="/dashboard">Dashboard</DashboardLink>
            <EventsLink href="/events">Events</EventsLink>
        </SidebarContainer>
    )


}

export default Sidebar;
