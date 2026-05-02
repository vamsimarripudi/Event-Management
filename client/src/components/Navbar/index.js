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
            <MobileLogout onClick={handleLogout}>
                
                <iframe src="https://lottie.host/embed/fb562117-c4a5-47bd-b925-4daedaeb060b/L98nUjzUDo.lottie"
                title="logout"
                style={{border:"none",backgroundColor:"transparent",height:"50px", color:"#red"}}>
                </iframe>
            </MobileLogout>
        </NavbarContainer>
    )
 }

    export default Navbar;
    