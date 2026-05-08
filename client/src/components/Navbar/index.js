import { useContext } from "react";
import { GrLogout } from "react-icons/gr";
import { ThemeContext } from "../../context/ThemeContext";
import {MdDarkMode, MdLightMode, MdComputer} from "react-icons/md";
import { 
    NavbarContainer,
    Header,
    LogoutButton,
    MobileLogout,
    Theme,
    MobileContainer
 } from "./styledComponents";
 

 const Navbar = () => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
        localStorage.removeItem("userId");
        localStorage.removeItem("user")
    }
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
        <NavbarContainer>
            <Header>Event Management</Header>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
            <MobileContainer>
                <Theme onClick={cycleTheme}>
                    {themeMode ==="dark" && (<MdDarkMode size={20}/>)}
                    {themeMode ==="light" && (<MdLightMode size={20}/>)}
                    {themeMode ==="system" && (<MdComputer size={20}/>)}
                </Theme>
                <MobileLogout type="button"  onClick={handleLogout}>
                    <GrLogout size={20}/>
                </MobileLogout>
            </MobileContainer>
        </NavbarContainer>
    )
 }

    export default Navbar;
    