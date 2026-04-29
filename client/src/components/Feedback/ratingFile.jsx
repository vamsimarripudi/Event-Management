import { useState } from "react";
import styled from "styled-components";

const StarRating = ({ value, onChange }) => {
  const [hover, setHover] = useState(0);

  return (
    <Wrapper>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          onClick={() => onChange && onChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          active={star <= (hover || value)}
        >
          ★
        </Star>
      ))}
    </Wrapper>
  );
};

export default StarRating;

const Wrapper = styled.div`
  display: flex;
  gap: 6px;
  font-size: 26px;
  cursor: pointer;
`;

const Star = styled.span`
  color: ${({ active }) => (active ? "#ffc107" : "#ccc")};
  transition: 0.2s;

  &:hover {
    transform: scale(1.2);
  }
`;