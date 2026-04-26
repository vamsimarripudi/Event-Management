import { useEffect, useState } from "react";
import { format, formatDistanceToNow } from "date-fns";


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
  NoEventsContainer
} from "./styledComponents";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const[user,setUser] = useState(null)
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");
        // FETCH USER
        const userId = localStorage.getItem("userId")
        // FETCH EVENTS
        const eventRes = await fetch(
          "https://backend.vamsimarripudi.tech/api/registration/my-events",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const eventData = await eventRes.json();

        // 3. normalize shape
        let eventsArray = [];

        if (Array.isArray(eventData)) {
        eventsArray = eventData;
        } else if (Array.isArray(eventData?.events)) {
        eventsArray = eventData.events;
        } else if (Array.isArray(eventData?.data)) {
        eventsArray = eventData.data;
        }

        
        setEvents(eventsArray || []);
    

        const userRes = await fetch(
          `https://backend.vamsimarripudi.tech/api/auth/users/${userId}`,
          {
            method:"GET"
          }
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

  // FORMAT DATE
  const formatDate = (value) => {
    if (!value) return "N/A";
    const d = new Date(value);
    if (isNaN(d.getTime())) return "Invalid Date";
    return format(d, "dd MMM yyyy, hh:mm a");
  };

  // COUNTDOWN
  const getCountdown = (start) => {
    if (!start) return "";

    const now = new Date();
    const eventDate = new Date(start);

    if (isNaN(eventDate.getTime())) return "";

    if (eventDate < now) return "Event Completed";

    return `Starts in ${formatDistanceToNow(eventDate)}`;
  };

  if (loading) {
    return (
        <>
        <Navbar/>
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
           {events.length === 0 ? 
           (
            <NoEventsContainer>
                <p>No Events Registered</p>
            </NoEventsContainer>
           )
           : 
            (<>
                 {events.map((ev) => {
              const {
               eventId,
                registrationDate
              } = ev;
              const{ _id,
                name,
                category,
                description,dateTime} = eventId
            

              return (
                <Card key={_id}>
                  <Title>{name}</Title>

                  <Badge>{category}</Badge>

                  <Meta>{description}</Meta>

                  <Meta>📅 Event: {formatDate(dateTime.start)}</Meta>

                  <Meta>
                    📝 Registered: {formatDate(registrationDate
)}
                  </Meta>

                  <Meta style={{ fontWeight: "bold" }}>
                    ⏳ {getCountdown(dateTime.start)}
                  </Meta>
                </Card>
              );
            })}
            </>)
           }
          </Grid>
        </ContentWrapper>
      </DashboardContainer>
    </>
  );
};

export default Dashboard;