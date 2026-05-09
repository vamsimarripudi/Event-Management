import { useContext } from "react";
import {MdDarkMode, MdLightMode, MdComputer} from "react-icons/md";
import { ThemeContext } from "../../context/ThemeContext";
import {
    SidebarContainer,
    SidebarLink,
    SidebarItem,
    SidebarBottom,
    Divider,
    SidebarText

} from "./styledComponents"


const Sidebar = () => {
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

    

    
    return (
        <SidebarContainer>
            <SidebarLink href="/dashboard">Dashboard</SidebarLink>
            <SidebarLink href="/events">Events</SidebarLink>
            {user === "admin" && (
                <SidebarText>
                    Analytics
                </SidebarText>
            )}
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
