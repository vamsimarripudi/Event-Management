
import { useNavigate } from "react-router-dom";
import { 
    EventManagmentCard, 
    MainCardContainer, 
    RegisterButton, 
    Title, 
    LoginButton, 
    Description, 
    SubHeading,
    UserActionButtons
   } from "./styledComponents";


const Home = () => {
  const navigate = useNavigate();

  return (
    <MainCardContainer>
      <EventManagmentCard>
        <Title>Event Management</Title>
        <SubHeading>Plan, organize, and manage your events effortlessly.</SubHeading>
        <Description>Create an account to start managing your events, or log in if you already have one.</Description>
        <UserActionButtons>
            <RegisterButton onClick={() => navigate("/register")}>Register</RegisterButton>
            <LoginButton onClick={() => navigate("/login")}>Login</LoginButton>
        </UserActionButtons>
      </EventManagmentCard>
    </MainCardContainer>

  );
};

export default Home;

