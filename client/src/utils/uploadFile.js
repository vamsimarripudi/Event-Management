// src/utils/uploadFile.js
export async function uploadFile({ file, scope, token }) {
  // 1) get signed URL
  const params = new URLSearchParams({
    fileName: file.name,
    fileType: file.type,
    scope, // "avatar" | "event"
  });

  const res = await fetch(`https://event.backendportfolio.xyz/api/media/upload-url?${params}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to get upload URL");

  const { uploadUrl, fileUrl, key } = await res.json();

  // 2) upload directly to S3
  const uploadRes = await fetch(uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": file.type },
    body: file,
  });

  if (!uploadRes.ok) throw new Error("Upload failed");

  return { url: fileUrl, key };
}