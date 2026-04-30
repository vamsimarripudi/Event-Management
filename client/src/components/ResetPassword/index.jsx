import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import {
  Container,
  Form,
  Label,
  Input,
  Button,
  FailureContainer,
  Heading,
  Message,
  RetryButton,
  LoadingContainer,
  SuccessContainer,
  Card
} from "./styledComponents";

const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || password.length < 6) {
      return alert("Password must be at least 6 characters");
    }

    if (password !== confirmPassword) {
      return alert("Passwords do not match");
    }

    setApiStatus(apiStatusConstants.inProgress);

    try {
      const response = await fetch(
        `https://event.backendportfolio.xyz/api/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        }
      );

      if (response.ok) {
        setApiStatus(apiStatusConstants.success);
      } else {
        setApiStatus(apiStatusConstants.failure);
      }
    } catch (err) {
      setApiStatus(apiStatusConstants.failure);
    }
  };

  const renderInputView = () => (
    <Form onSubmit={handleSubmit}>
      <Label>New Password</Label>
      <Input
        type="password"
        placeholder="Enter new password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Label>Confirm Password</Label>
      <Input
        type="password"
        placeholder="Confirm password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <Button type="submit">Reset Password</Button>
    </Form>
  );

  const renderLoadingView = () => (
    <LoadingContainer>
      <ThreeDots height="80" width="80" color="#000" visible />
    </LoadingContainer>
  );

  const renderSuccessView = () => (
    <SuccessContainer>
      <iframe
        src="https://lottie.host/embed/84cb99ff-3fdf-4e5c-a09c-1817a146eca9/FIwyPZix56.lottie"
        title="success"
        style={{ border: "none", width: "150px", height: "150px" }}
      />
      <Heading>Password Updated</Heading>
      <Message>Your password has been reset successfully.</Message>

      <Button onClick={() => navigate("/login")}>
        Go to Login
      </Button>
    </SuccessContainer>
  );

  const renderFailureView = () => (
    <FailureContainer>
        <iframe 
         src="https://lottie.host/embed/86d6b71b-5abd-457f-951f-7d35ae52689d/yf9HfTT6Ql.lottie" style={{border:"0px"}}>
      </iframe>
      <Heading>Invalid or Expired Link</Heading>
      <Message>Please request a new password reset.</Message>

      <RetryButton onClick={() => navigate("/forgot-password")}>
        Try Again
      </RetryButton>
    </FailureContainer>
  );

  const renderFinalView = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return renderLoadingView();
      case apiStatusConstants.success:
        return renderSuccessView();
      case apiStatusConstants.failure:
        return renderFailureView();
      default:
        return renderInputView();
    }
  };

  return (
    <Container>
        <Card>
           {renderFinalView()}
        </Card>
    </Container>
  );
};

export default ResetPassword;