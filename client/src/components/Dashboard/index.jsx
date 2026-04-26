import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";

import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

import {
  DashboardContainer,
  ContentWrapper,
  Section,
  SectionTitle,
  Grid,
  Card,
  CardTitle,
  Meta,
  Badge,
  EmptyState,
  Skeleton,
} from "./styledComponents";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch registered events for the user
  useEffect(() => {
    const fetchRegistered = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          "https://backend.vamsimarripudi.tech/api/registration/my-events",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await res.json();
        setEvents(data || []);
        console.log(data)
      } catch (e) {
        console.error(e);
        setError("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchRegistered();
  }, []);

  // Status classifier
  const getStatus = (start, end) => {
    if (!start || !end) return "UNKNOWN";
    const now = new Date();
    const s = new Date(start);
    const e = new Date(end);

    if (now < s) return "UPCOMING";
    if (now >= s && now <= e) return "ONGOING";
    return "ENDED";
  };

  // Split data
  const { upcoming, past } = useMemo(() => {
    const upcoming = [];
    const past = [];

    events.forEach((ev) => {
      const { dateTime = {} } = ev;
      const status = getStatus(dateTime.start, dateTime.end);

      if (status === "UPCOMING" || status === "ONGOING") {
        upcoming.push({ ...ev, status });
      } else {
        past.push({ ...ev, status });
      }
    });

    return { upcoming, past };
  }, [events]);

  const formatDate = (value) => {
    if (!value) return "";
    const d = new Date(value);
    if (isNaN(d.getTime())) return "";
    return format(d, "dd MMM yyyy, hh:mm a");
  };

  return (
    <>
      <Navbar />
      <DashboardContainer>
        <Sidebar />

        <ContentWrapper>
          {/* UPCOMING */}
          <Section>
            <SectionTitle>Upcoming / Ongoing Events</SectionTitle>

            {loading ? (
              <Grid>
                {[...Array(4)].map((_, i) => (
                  <Card key={i}>
                    <Skeleton height="20px" width="60%" />
                    <Skeleton width="40%" />
                    <Skeleton width="70%" />
                  </Card>
                ))}
              </Grid>
            ) : upcoming.length === 0 ? (
              <EmptyState>No upcoming events</EmptyState>
            ) : (
              <Grid>
                {upcoming.map((ev) => {
                  const { name, dateTime = {}, location = {}, status } = ev;

                  return (
                    <Card key={ev._id}>
                      <CardTitle>{name}</CardTitle>

                      <Badge status={status}>{status}</Badge>

                      <Meta>
                        {location.city}, {location.state}
                      </Meta>

                      <Meta>{formatDate(dateTime.start)}</Meta>
                    </Card>
                  );
                })}
              </Grid>
            )}
          </Section>

          {/* PAST */}
          <Section>
            <SectionTitle>Past Events</SectionTitle>

            {loading ? (
              <Grid>
                {[...Array(3)].map((_, i) => (
                  <Card key={i}>
                    <Skeleton height="20px" width="60%" />
                    <Skeleton width="40%" />
                  </Card>
                ))}
              </Grid>
            ) : past.length === 0 ? (
              <EmptyState>No past events</EmptyState>
            ) : (
              <Grid>
                {past.map((ev) => {
                  const { name, dateTime = {}, location = {} } = ev;

                  return (
                    <Card key={ev._id}>
                      <CardTitle>{name}</CardTitle>

                      <Badge status="ENDED">ENDED</Badge>

                      <Meta>
                        {location.city}, {location.state}
                      </Meta>

                      <Meta>{formatDate(dateTime.end)}</Meta>
                    </Card>
                  );
                })}
              </Grid>
            )}
          </Section>
        </ContentWrapper>
      </DashboardContainer>
    </>
  );
};

export default Dashboard;