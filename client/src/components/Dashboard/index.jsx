import { useEffect, useState } from "react";
import { format, formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";


import Navbar from "../Navbar";
import Sidebar from "../Sidebar";


import {
  DashboardContainer,
  ContentWrapper,
  Header,
  UserName,
  Grid,
  Card,
  Title,
  Meta,
  Badge,
  Skeleton,
  NoEventsContainer,
  NoEventsFoundImage,
  NoEventsText,
  NoEventsTitle,
  EventsButton,
} from "./styledComponents";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();


  const onRenderCancel = (registrationId) => {
    const removeTheLocalStorae = events.map((e) => e._id === registrationId 
    ? 
    localStorage.removeItem(`registered_${e._id}`):"");
    return removeTheLocalStorae
  }

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        // fetch events
        const eventRes = await fetch(
          "https://backend.vamsimarripudi.tech/api/registration/my-events",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const eventData = await eventRes.json();

        let eventsArray = [];

        if (Array.isArray(eventData)) eventsArray = eventData;
        else if (Array.isArray(eventData?.events)) eventsArray = eventData.events;
        else if (Array.isArray(eventData?.data)) eventsArray = eventData.data;

        setEvents(eventsArray || []);

        // fetch user
        const userRes = await fetch(
          `https://backend.vamsimarripudi.tech/api/auth/users/${userId}`
        );
        const userData = await userRes.json();
        setUser(userData);

      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  // format date
  const formatDate = (value) => {
    if (!value) return "N/A";
    const d = new Date(value);
    if (isNaN(d.getTime())) return "Invalid Date";
    return format(d, "dd MMM yyyy, hh:mm a");
  };

  // countdown
  const getCountdown = (start) => {
    if (!start) return "";
    const now = new Date();
    const eventDate = new Date(start);

    if (isNaN(eventDate.getTime())) return "";
    if (eventDate < now) return "Event Completed";

    return `Starts in ${formatDistanceToNow(eventDate)}`;
  };

  // cancel logic using confirm hook
  const handleCancelClick = async (registrationId) => {
  
        const token = localStorage.getItem("token");

        const res = await fetch(
          "https://backend.vamsimarripudi.tech/api/registration/cancel",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ registrationId }),
          }
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message);
        }

        // update UI instantly
        setEvents((prev) =>
          prev.filter((e) => e._id !== registrationId)
        );
        onRenderCancel(registrationId)

  }

  if (loading) {
    return (
      <>
        <Navbar />
        <DashboardContainer>
          <Sidebar />
          <ContentWrapper>
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <Skeleton height="20px" width="60%" />
                <Skeleton width="40%" />
                <Skeleton width="80%" />
              </Card>
            ))}
          </ContentWrapper>
        </DashboardContainer>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <DashboardContainer>
        <Sidebar />

        <ContentWrapper>
          <Header>
            Welcome, <UserName>{user?.name || "User"}</UserName>
          </Header>

          <Grid>
            {events.length === 0 ? (
              <NoEventsContainer>
                <NoEventsFoundImage src="https://images.openai.com/static-rsc-4/SDr7T59kVUR9E4SncFLWrsh9qJ-N5gSThHs9sbvV2a9TJt_BkD1MrGX-FjMnXp0D7VOoN0JdOCY0K8GdPi4VuYiDkDsOTaRVmZQT_92uIA0yLhZyMhCBo-ruwTrusROc8iQpneVMHrVB47OSdBB4cCxTEPisvTVRyYd2NJppoKqOyqg29gHV-esUREy761b9?purpose=fullsize" />
                <NoEventsTitle>No Events Found</NoEventsTitle>
                <NoEventsText>
                  You haven’t registered for any events yet.
                </NoEventsText>

                <EventsButton onClick={() => navigate("/events")}>
                  Explore Events
                </EventsButton>
              </NoEventsContainer>
            ) : (
              events.map((ev) => {
                const { eventId, registrationDate, _id: registrationId } = ev;

                if (!eventId) return null;

                const { _id, name, category, description, dateTime } = eventId;

                const isPast =
                  new Date(dateTime?.start) < new Date();

                return (
                  <Card key={registrationId}>
                    <Title
                      onClick={() => navigate(`/events/${_id}`)}
                      style={{ cursor: "pointer" }}
                    >
                      {name}
                    </Title>

                    <Badge>{category}</Badge>

                    <Meta>{description}</Meta>

                    <Meta>📅 Event: {formatDate(dateTime?.start)}</Meta>

                    <Meta>
                      📝 Registered: {formatDate(registrationDate)}
                    </Meta>

                    <Meta style={{ fontWeight: "bold" }}>
                      ⏳ {getCountdown(dateTime?.start)}
                    </Meta>

                    <button
                      type="button"
                      disabled={isPast}
                      onClick={() => handleCancelClick(registrationId)}
                      style={{
                        marginTop: "10px",
                        padding: "10px",
                        width: "100%",
                        background: "#ef4444",
                        color: "#fff",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                      }}
                    >
                      {isPast ? "Event Ended" : "Cancel Registration"}
                    </button>
                  </Card>
                );
              })
            )}
          </Grid>
        </ContentWrapper>
      </DashboardContainer>
    </>
  );
};

export default Dashboard;