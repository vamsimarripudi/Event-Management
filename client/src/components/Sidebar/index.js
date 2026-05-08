import { useContext } from "react";
import { MdAnalytics, MdLock, MdDarkMode, MdLightMode, MdComputer} from "react-icons/md";

import {
    SidebarContainer,
    SidebarLink,
    SidebarItem,
    SidebarBottom,
    Divider,
    SidebarText

} from "./styledComponents"

import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";


const Sidebar = () => {
    const navigate = useNavigate();

    const user = localStorage.getItem("user")
    const {themeMode,changeTheme} = useContext(ThemeContext);
    const cycleTheme = () => {
        if(themeMode === "system"){
            changeTheme("dark")
        }
        else if (themeMode === "dark"){
            changeTheme("light")
        }
        else{
            changeTheme("system")
        }
    }

    const isAdmin = user === "admin";

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
            <SidebarBottom>
                <Divider/>
                <SidebarItem onClick={cycleTheme}>
                    {themeMode ==="dark" && (<MdDarkMode size={20}/>)}
                    {themeMode ==="light" && (<MdLightMode size={20}/>)}
                    {themeMode ==="system" && (<MdComputer size={20}/>)}
                    <SidebarText>{themeMode}</SidebarText>
                </SidebarItem>
            </SidebarBottom>
            
        </SidebarContainer>
    )
}

export default Sidebar;
