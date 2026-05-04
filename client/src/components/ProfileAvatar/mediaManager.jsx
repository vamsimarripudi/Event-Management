// src/pages/MediaManager.jsx
import { useState } from "react";
import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 16px;
`;

const Card = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
`;

const Img = styled.img`
  width: 100%;
  height: 140px;
  object-fit: cover;
`;

const DeleteBtn = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(0,0,0,0.6);
  color: white;
  border: none;
  padding: 6px 10px;
  cursor: pointer;
`;

export default function MediaManager({ initialMedia, token }) {
  const [media, setMedia] = useState(initialMedia);
  const [loadingKey, setLoadingKey] = useState(null);

  const handleDelete = async (key) => {
    const confirmDelete = window.confirm("Delete this image?");
    if (!confirmDelete) return;

    setLoadingKey(key);

    try {
      const res = await fetch("https://event.backendportfolio.xyz/api/media/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ key }),
      });

      if (!res.ok) throw new Error("Delete failed");

      // remove from UI
      setMedia((prev) => prev.filter((item) => item.key !== key));
    } catch (err) {
      alert(err.message);
    } finally {
      setLoadingKey(null);
    }
  };

  return (
    <Grid>
      {media.map((item) => (
        <Card key={item.key}>
          <Img src={item.url} />
          <DeleteBtn onClick={() => handleDelete(item.key)}>
            {loadingKey === item.key ? "..." : "Delete"}
          </DeleteBtn>
        </Card>
      ))}
    </Grid>
  );
}