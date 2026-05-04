// src/components/AdvancedUploader.jsx
import { useState, useRef } from "react";
import styled from "styled-components";
import { uploadFile } from "../utils/uploadFile";

const DropZone = styled.div`
  border: 2px dashed #aaa;
  padding: 20px;
  text-align: center;
  border-radius: 12px;
  cursor: pointer;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 80px);
  gap: 10px;
  margin-top: 12px;
`;

const Item = styled.div`
  position: relative;
`;

const Img = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
`;

const Remove = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background: red;
  color: white;
  border: none;
  cursor: pointer;
`;

const Progress = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  background: green;
  width: ${(p) => p.value}%;
`;

export default function AdvancedUploader({
  scope = "avatar",
  token,
  onComplete,
}) {
  const [files, setFiles] = useState([]);
  const inputRef = useRef();

  const handleFiles = (selectedFiles) => {
    const mapped = Array.from(selectedFiles).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      result: null,
    }));

    setFiles((prev) => [...prev, ...mapped]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleUpload = async () => {
    const updated = [...files];

    for (let i = 0; i < updated.length; i++) {
      const item = updated[i];
      if (item.uploaded) continue;

      try {
        const { url, key } = await uploadFile({
          file: item.file,
          scope,
          token,
        });

        updated[i] = {
          ...item,
          progress: 100,
          uploaded: true,
          result: { url, key },
        };
      } catch (err) {
        updated[i].error = true;
      }

      setFiles([...updated]);
    }

    // return uploaded files
    const results = updated
      .filter((f) => f.uploaded)
      .map((f) => f.result);

    onComplete && onComplete(results);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <DropZone
        onClick={() => inputRef.current.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        Drag & drop or click to upload
      </DropZone>

      <input
        type="file"
        multiple
        hidden
        ref={inputRef}
        onChange={(e) => handleFiles(e.target.files)}
      />

      <Grid>
        {files.map((item, i) => (
          <Item key={i}>
            <Img src={item.preview} />
            <Remove onClick={() => removeFile(i)}>×</Remove>
            <Progress value={item.progress} />
          </Item>
        ))}
      </Grid>

      {files.length > 0 && (
        <button onClick={handleUpload}>Upload</button>
      )}
    </>
  );
}