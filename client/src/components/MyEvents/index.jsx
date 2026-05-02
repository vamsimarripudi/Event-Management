import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

import {
  DashboardContainer,
  ContentWrapper,
  Header,
  UserName,
  Grid,
  Card,
  Title,
  Badge,
  Meta,
  Button,
  CenterBox,
  Message,
  NoEventsContainer,
  NoEventsTitle,
  NoEventsText,
} from "./styledComponents";

const apiStatusConst = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);
  const [apiStatus, setApiStatus] = useState(apiStatusConst.initial);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      setApiStatus(apiStatusConst.inProgress);

      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        // 🔹 EVENTS API
        const eventsUrl =
          "https://event.backendportfolio.xyz/api/registration/my-events";

        const eventsOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const eventRes = await fetch(eventsUrl, eventsOptions);
        const eventData = await eventRes.json();

        let eventsArray = [];

        if (Array.isArray(eventData)) eventsArray = eventData;
        else if (Array.isArray(eventData?.events)) eventsArray = eventData.events;
        else if (Array.isArray(eventData?.data)) eventsArray = eventData.data;

        setEvents(eventsArray || []);

        // 🔹 USER API
        const userUrl = `https://event.backendportfolio.xyz/api/auth/users/${userId}`;

        const userOptions = { method: "GET" };

        const userRes = await fetch(userUrl, userOptions);
        const userData = await userRes.json();

        setUser(userData);

        setApiStatus(apiStatusConst.success);
      } catch (err) {
        console.log(err);
        setApiStatus(apiStatusConst.failure);
      }
    };

    fetchDashboard();
  }, []);

  // 🔹 Cancel Event
  const handleCancelClick = async (registrationId) => {
    const token = localStorage.getItem("token");

    const url =
      "https://event.backendportfolio.xyz/api/registration/cancel";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ registrationId }),
    };

    try {
      const res = await fetch(url, options);

      if (res.ok) {
        setEvents((prev) =>
          prev.filter((e) => e._id !== registrationId)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  // 🔹 Views

  const renderLoadingView = () => (
    <CenterBox>
    
        <ThreeDots  height="80" width="80" color="blue" visible />
      
    </CenterBox>
  );

  const renderFailureView = () => (
    <CenterBox>
      <Message>Failed to load events</Message>
      <Button onClick={() => window.location.reload()}>
        Retry
      </Button>
    </CenterBox>
  );

  const renderSuccessView = () => (
    <>
      <Header>
        Welcome, <UserName>{user?.name || "User"}</UserName>
      </Header>

      <Grid>
        {events.length === 0 ? (
          <NoEventsContainer>
            <NoEventsTitle>No Events Found</NoEventsTitle>
            <NoEventsText>
              You haven’t registered for any events yet.
            </NoEventsText>

            <Button onClick={() => navigate("/events")}>
              Explore Events
            </Button>
          </NoEventsContainer>
        ) : (
          events.map((ev) => {
            const { eventId, _id: registrationId } = ev;

            if (!eventId) return null;

            const { _id, name, category, description } = eventId;

            return (
              <Card key={registrationId}>
                <Title onClick={() => navigate(`/events/${_id}`)}>
                  {name}
                </Title>

                <Badge>{category}</Badge>

                <Meta>{description}</Meta>

                <Button
                  onClick={() => handleCancelClick(registrationId)}
                >
                  Cancel Registration
                </Button>
              </Card>
            );
          })
        )}
      </Grid>
    </>
  );

  const renderInitialView = () => (
    <CenterBox>
      <iframe src="https://lottie.host/embed/b5316c5e-10fd-48a5-9877-cfe51dc13acb/14BwXW0OcP.lottie"
      title="initial"
      style={{border:"none"}}
      ></iframe>
    </CenterBox>
  );

  const renderView = () => {
    switch (apiStatus) {
      case apiStatusConst.inProgress:
        return renderLoadingView();
      case apiStatusConst.success:
        return renderSuccessView();
      case apiStatusConst.failure:
        return renderFailureView();
      default:
        return renderInitialView();
    }
  };

  return (
    <>
      <DashboardContainer>
        <ContentWrapper>{renderView()}</ContentWrapper>
      </DashboardContainer>
    </>
  );
};

export default MyEvents;