// ProfileAvatar.jsx
import AdvancedUploader from "./AdvancedUploader";

export default function ProfileAvatar({ user, token, setUser }) {
  const handleComplete = (results) => {
    if (!results.length) return;

    const { url, key } = results[0];

    // cache bust
    const finalUrl = `${url}?v=${Date.now()}`;

    setUser({
      ...user,
      avatar: finalUrl,
      avatarKey: key,
    });

    // call your backend update API
    fetch("https://event.backendportfolio.xyz/api/user/avatar", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ avatar: url, avatarKey: key }),
    });
  };

  return (
    <>
      <img src={user.avatar} width={80} height={80} />
      <AdvancedUploader
        scope="avatar"
        token={token}
        onComplete={handleComplete}
      />
    </>
  );
}