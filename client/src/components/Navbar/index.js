import { 
    NavbarContainer,
    Header,
    LogoutButton


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
        </NavbarContainer>
    )
 }

    export default Navbar;
    