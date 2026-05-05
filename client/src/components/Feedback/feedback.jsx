import { useState } from "react";
import Popup from "reactjs-popup";
import { useLocation } from "react-router-dom";
import "reactjs-popup/dist/index.css";
import StarRating from "./ratingFile";

import {
  FloatingButton,
  ModalContainer,
  Title,
  Label,
  Select,
  Textarea,
  ButtonRow,
  CancelBtn,
  SubmitBtn,
  RatingText, // ✅ make sure this exists in styledComponents
  ErrorText,  // optional (recommended)
} from "./styledComponents";

const FeedbackPopup = () => {
  const [rating, setRating] = useState(5);
  const [category, setCategory] = useState("general");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const location = useLocation();

  const handleSubmit = async (close) => {
    if (!message.trim()) {
      setError("Please enter feedback");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const userId = localStorage.getItem("userId");

      const res = await fetch(
        "https://event.backendportfolio.xyz/api/feedback/feed",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            rating,
            category,
            message,
            page: location.pathname,
            userId,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to submit feedback");
      }

      // ✅ Reset state
      setMessage("");
      setRating(5);
      setCategory("general");

      close(); // close modal cleanly

    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const hiddenRoutes = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/not-found",
  ];

  const shouldHide = hiddenRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  if (shouldHide) return null;

  return (
    <Popup
      trigger={<FloatingButton>Feedback</FloatingButton>}
      modal
      nested
    >
      {(close) => (
        <ModalContainer>
          <Title>Give Feedback</Title>

          {/* ⭐ Rating */}
          <Label>Rating</Label>
          <StarRating value={rating} onChange={setRating} />
          <RatingText>{rating} / 5</RatingText>

          {/* Category */}
          <Label>Category</Label>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="general">General</option>
            <option value="bug">Bug</option>
            <option value="suggestion">Suggestion</option>
          </Select>

          {/* Message */}
          <Label>Message</Label>
          <Textarea
            placeholder="Describe your experience..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          {/* Error */}
          {error && <ErrorText>{error}</ErrorText>}

          {/* Actions */}
          <ButtonRow>
            <CancelBtn onClick={close} disabled={loading}>
              Cancel
            </CancelBtn>

            <SubmitBtn
              onClick={() => handleSubmit(close)}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </SubmitBtn>
          </ButtonRow>
        </ModalContainer>
      )}
    </Popup>
  );
};

export default FeedbackPopup;