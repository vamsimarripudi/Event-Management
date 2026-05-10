import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";

import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

import {
  EventDetailsContainer,
  ContentWrapper,
  EventCard,
  Title,
  Organizer,
  Category,
  Description,
  LocationContainer,
  Location,
  DateContainer,
  StartDate,
  EndDate,
  Capacity,
  TagsContainer,
  Tag,
  RegisterButton,
  StatusBadge,
  Skeleton,
} from "./styledComponents";

import toast from "react-hot-toast";

const apiStatus = {
  initial: "INITIAL",
  loading: "LOADING",
  success: "SUCCESS",
  failure: "FAILURE",
};

const EventDetails = () => {
  const { id } = useParams();

  const [event, setEvent] = useState({});

  const [status, setStatus] = useState(
    apiStatus.initial
  );

  const [isRegistered, setIsRegistered] =
    useState(false);

  // FETCH EVENT

  useEffect(() => {

    const fetchEvent = async () => {

      setStatus(apiStatus.loading);

      try {

        const token =
          localStorage.getItem("token");

        const response =
          await fetch(
            `https://event.backendportfolio.xyz/api/event/events/${id}`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        const data =
          await response.json();

        setEvent(data);

        setStatus(apiStatus.success);

      } catch (err) {

        console.error(err);

        toast.error(err.message);

        setStatus(apiStatus.failure);

      }

    };

    fetchEvent();

  }, [id]);

  // FETCH REGISTRATION STATUS

  useEffect(() => {

    const fetchStatus = async () => {

      try {

        const token =
          localStorage.getItem("token");

        const res =
          await fetch(
            `https://event.backendportfolio.xyz/api/registration/status?eventId=${id}`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        const data =
          await res.json();

        setIsRegistered(
          data.isRegistered
        );

      } catch (err) {

        console.log(err);

      }

    };

    fetchStatus();

  }, [id]);

  // REGISTER EVENT

  const handleRegister = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response =
        await fetch(
          "https://event.backendportfolio.xyz/api/registration/register",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`,
            },

            body: JSON.stringify({
              eventId: event._id,
            }),
          }
        );

      const data =
        await response.json();

      if (response.ok) {

        toast.success(
          "Event Registered Successfully"
        );

        setIsRegistered(true);

      } else {

        toast.error(data.message);

      }

    } catch (err) {

      toast.error(err.message);

    }

  };

  // DATE FORMAT

  const formatDateTime = (value) => {

    if (!value) return "N/A";

    const d = new Date(value);

    if (isNaN(d.getTime()))
      return "Invalid Date";

    return format(
      d,
      "dd MMM yyyy, hh:mm a"
    );

  };

  // EVENT STATUS

  const getStatus = (
    start,
    end
  ) => {

    if (!start || !end)
      return "UNKNOWN";

    const now = new Date();

    const s = new Date(start);

    const e = new Date(end);

    if (now < s)
      return "UPCOMING";

    if (
      now >= s &&
      now <= e
    )
      return "ONGOING";

    return "ENDED";

  };

  // LOADING VIEW

  const renderLoadingView = () => (

    <>
      <Navbar />

      <EventDetailsContainer>
        <Sidebar />

        <ContentWrapper>

          <EventCard>

            <Skeleton
              height="28px"
              width="60%"
            />

            <Skeleton width="40%" />

            <Skeleton width="30%" />

            <Skeleton height="80px" />

            <Skeleton width="50%" />

            <Skeleton width="50%" />

            <Skeleton width="30%" />

            <Skeleton width="20%" />

            <Skeleton
              width="80px"
              height="36px"
            />

          </EventCard>

        </ContentWrapper>

      </EventDetailsContainer>
    </>

  );

  // FAILURE VIEW

  const renderFailureView = () => (

    <>
      <Navbar />

      <EventDetailsContainer>
        <Sidebar />

        <ContentWrapper>

          <EventCard>

            <h2>
              Failed to load event
            </h2>

            <RegisterButton
              type="button"
              onClick={() =>
                window.location.reload()
              }
            >
              Retry
            </RegisterButton>

          </EventCard>

        </ContentWrapper>

      </EventDetailsContainer>
    </>

  );

  // SUCCESS VIEW

  const renderSuccessView = () => {

    const {
      name,
      organizer,
      description,
      location = {},
      dateTime = {},
      tags = [],
      category,
      capacity,
    } = event;

    const {
      venue,
      city,
      state,
      country,
    } = location;

    const {
      start,
      end,
    } = dateTime;

    const status =
      getStatus(start, end);

    const isFull =
      capacity === 0;

    const isEnded =
      status === "ENDED";

    return (

      <>
        <Navbar />

        <EventDetailsContainer>

          <Sidebar />

          <ContentWrapper>

            <EventCard>

              <Title>
                {name}

                <StatusBadge
                  status={status}
                >
                  {status}
                </StatusBadge>

              </Title>

              <Organizer>
                Organizer:
                <strong>
                  {organizer}
                </strong>
              </Organizer>

              <Category>
                {category}
              </Category>

              <Description>
                {description}
              </Description>

              <LocationContainer>

                <Location>
                  {venue}
                </Location>

                <Location>
                  {city}
                </Location>

                <Location>
                  {state}
                </Location>

                <Location>
                  {country}
                </Location>

              </LocationContainer>

              <DateContainer>

                <StartDate>
                  From:
                  {formatDateTime(start)}
                </StartDate>

                <EndDate>
                  Ends:
                  {formatDateTime(end)}
                </EndDate>

              </DateContainer>

              <Capacity>
                Total seats:
                {capacity}
              </Capacity>

              <TagsContainer>

                {tags.map(
                  (tag, index) => (
                    <Tag key={index}>
                      {tag}
                    </Tag>
                  )
                )}

              </TagsContainer>

              <RegisterButton
                type="button"
                onClick={
                  !isRegistered
                    ? handleRegister
                    : undefined
                }
                disabled={
                  isFull ||
                  isEnded ||
                  isRegistered
                }
                style={{
                  background:
                    isRegistered
                      ? "#22c55e"
                      : undefined,

                  cursor:
                    isRegistered
                      ? "not-allowed"
                      : "pointer",
                }}
              >

                {isFull
                  ? "Event Full"
                  : isEnded
                  ? "Closed"
                  : isRegistered
                  ? "Registered"
                  : "Register"}

              </RegisterButton>

              <Link to="/events">

                <RegisterButton
                  type="button"
                >
                  Back
                </RegisterButton>

              </Link>

            </EventCard>

          </ContentWrapper>

        </EventDetailsContainer>
      </>

    );

  };
  switch (status) {
    case apiStatus.loading:
      return renderLoadingView();
    case apiStatus.failure:
      return renderFailureView();
    case apiStatus.success:
      return renderSuccessView();
    default:
      return null;
  }

};

export default EventDetails;