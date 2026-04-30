import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import {
  ForgotPasswordContainer,
  Form,
  Label,
  Input,
  Button,
  FailureContainer,
  Heading,
  Message,
  RetryButton,
  LoadingContainer,
  SuccessContainer
} from "./styledComponents";

const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) return alert("Enter email");

    setApiStatus(apiStatusConstants.inProgress);

    try {
      const response = await fetch(
        "https://event.backendportfolio.xyz/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }), // ✅ FIXED
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
      <Label>Email</Label>
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button type="submit">Continue</Button>
    </Form>
  );

  const renderFailureView = () => (
    <FailureContainer>
      <iframe 
         src="https://lottie.host/embed/86d6b71b-5abd-457f-951f-7d35ae52689d/yf9HfTT6Ql.lottie" title="failure" style={{border:"0px",fontStyle:"Roboto"}}>
      </iframe>
      <Heading>Something went wrong</Heading>
      <Message>Please try again.</Message>
      <RetryButton onClick={() => window.location.reload()}>
        Retry
      </RetryButton>
    </FailureContainer>
  );

  const renderLoadingView = () => (
    <LoadingContainer>
      <ThreeDots  height="80" width="80" color="blue" visible />
    </LoadingContainer>
  );

  const renderSuccessView = () => (
    <SuccessContainer>
      <iframe
        src="https://lottie.host/embed/84cb99ff-3fdf-4e5c-a09c-1817a146eca9/FIwyPZix56.lottie"
        title="success"
        style={{ border: "none", width: "150px", height: "150px" }}
      />
      <Heading>Reset link sent</Heading>
      <Message>Check your email to reset your password.</Message>
    </SuccessContainer>
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
    <ForgotPasswordContainer>
      {renderFinalView()}
    </ForgotPasswordContainer>
  );
};

export default ForgotPassword;