import { GrLogout } from "react-icons/gr";

import { 
    NavbarContainer,
    Header,
    LogoutButton,
    MobileLogout
 } from "./styledComponents";
 

 const Navbar = () => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
        localStorage.removeItem("userId");
    }

    
    return (
        <NavbarContainer>
            <Header>Event Management</Header>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
            <MobileLogout type="button"  onClick={handleLogout}>
                <GrLogout size={20}/>
            </MobileLogout>
        </NavbarContainer>
    )
 }

    export default Navbar;
    