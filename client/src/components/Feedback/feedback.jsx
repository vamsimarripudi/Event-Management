import { useState } from "react";
import Popup from "reactjs-popup";
import {useLocation} from "react-router-dom";
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
    SubmitBtn
} from "./styledComponents";

import RatingText from "./ratingFile"

const  FeedbackPopup = ()=> {
  const [rating, setRating] = useState(5);
  const [category, setCategory] = useState("general");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation()
  const handleSubmit = async (close) => {
    if (!message.trim()) {
      alert("Please enter feedback");
      return;
    }

    try {
      setLoading(true);
      const userId = localStorage.getItem("userId")
      const res = await fetch(
        "https://event.backendportfolio.xyz/api/user/feedback",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            rating,
            category,
            message,
            page: window.location.pathname,
            userId,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed");
      }

      alert("Feedback submitted successfully");
      setMessage("");
      close();

    } catch (err) {
      console.error(err);
      alert(err.message || "Error submitting feedback");
    } finally {
      setLoading(false);
    }
  };

  const hiddenRoutes = ["/login", "/register"];

  // ❌ Hide on auth pages
  if (hiddenRoutes.includes(location.pathname)) {
    return null;
  }

  return (
    <Popup
      trigger={<FloatingButton>Feedback</FloatingButton>}
      modal
      nested
    >
      {(close) => (
        <ModalContainer>
          <Title>Give Feedback</Title>

          {/* ⭐ Star Rating */}
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
            placeholder="Your feedback..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          {/* Buttons */}
          <ButtonRow>
            <CancelBtn onClick={close}>Cancel</CancelBtn>
            <SubmitBtn onClick={() => handleSubmit(close)} disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </SubmitBtn>
          </ButtonRow>
        </ModalContainer>
      )}
    </Popup>
  );
}

export default FeedbackPopup