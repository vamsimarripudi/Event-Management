import { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import EventCard from "../EventCard";
import { TailSpin } from "react-loader-spinner";
import { HiOutlineArrowSmRight, HiOutlineArrowSmLeft } from "react-icons/hi";


import {
  EventsContainer,
  EventUnOrderedList,
  SearchInput,
  PaginationCenter,
  Button,
  PaginationCard
} from "./styledComponents";

const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const Events = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchEvents = async (currentPage = 1, query = "") => {
    try {
      setApiStatus(apiStatusConstants.inProgress);

      const token = localStorage.getItem("token");

      const url = `https://backend.vamsimarripudi.tech/api/event/events?page=${currentPage}&search=${query}`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setApiStatus(apiStatusConstants.failure);
        return;
      }

      const data = await response.json();

      // 🔥 IMPORTANT
      setEvents(data.data || []);
      setTotalPages(data.totalPages || 1);
      setPage(data.page || 1);

      setApiStatus(apiStatusConstants.success);
    } catch (error) {
      setApiStatus(apiStatusConstants.failure);
      console.error(error);
    }
  };

  // initial load
  useEffect(() => {
    fetchEvents(1, "");
  }, []);

  // search with debounce
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchEvents(1, searchQuery); // reset to page 1
    }, 400);

    return () => clearTimeout(delay);
  }, [searchQuery]);

  const handleNext = () => {
    if (page < totalPages) {
      fetchEvents(page + 1, searchQuery);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      fetchEvents(page - 1, searchQuery);
    }
  };

  const renderFinalView = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return (
          <div style={{ display: "flex", justifyContent: "center", height: "80vh" }}>
            <TailSpin height={60} width={60} color="#007bff" />
          </div>
        );

      case apiStatusConstants.success:
        return (
          <>
          
            <EventUnOrderedList>
              {events.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </EventUnOrderedList>

            
            
          </>
        );

      case apiStatusConstants.failure:
        return <p style={{ textAlign: "center" }}>Failed to load events</p>;

      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />
      <EventsContainer>
        <Sidebar />
        <div style={{ width: "100%" }}>
          <SearchInput
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <PaginationCenter>
            <PaginationCard>
              <Button onClick={handlePrev} disabled={page === 1}>
                <HiOutlineArrowSmLeft size={20}/>
              </Button>

              <span style={{ margin: "" ,fontSize:"15px"}}>
                Page {page} / {totalPages}
              </span>

              <Button onClick={handleNext} disabled={page === totalPages}>
                  <HiOutlineArrowSmRight size={20} />
              </Button>
            </PaginationCard>
          </PaginationCenter>

          {renderFinalView()}
        </div>
      </EventsContainer>
    </>
  );
};

export default Events;