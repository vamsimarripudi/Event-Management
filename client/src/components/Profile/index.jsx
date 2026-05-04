import { useEffect, useState } from "react";


import {
  Page,
  Card,
  Header,
  AvatarWrap,
  Avatar,
  Name,
  SubText,
  Field,
  Label,
  Input,
  Select,
  Row,
  PrimaryBtn,
  GhostBtn,
  DangerBtn,
  Overlay,
  ActionSheet,
  SheetBtn,
  FullImage,
  Modal,
  ModalTitle,
  ModalRow,
  SkeletonCard,
  SkeletonAvatar,
  SkeletonLine,
  
} from "./styledComponents";

const apiStatus = {
  initial: "INITIAL",
  loading: "LOADING",
  success: "SUCCESS",
  failure: "FAILURE",
};

const Profile = () => {
  const [status, setStatus] = useState(apiStatus.initial);
  const [profile, setProfile] = useState({});
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [file, setFile] = useState(null);

  const [showActions, setShowActions] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  // ---------- API ----------

  const getProfile = async () => {
    setStatus(apiStatus.loading);

    try {
      const url = "https://event.backendportfolio.xyz/api/profile";
      const options = {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({userId})
      };

      const res = await fetch(url, options);
      if (!res.ok) throw new Error();

      const data = await res.json();

      setProfile(data);
      setEmail(data.email || "");
      setRole(data.role || "user");

      setStatus(apiStatus.success);
    } catch {
      setStatus(apiStatus.failure);
    }
  };


useEffect(() => {
  const fetchProfile = async () => {
    setStatus(apiStatus.loading);

    try {
      const res = await fetch(
        "https://event.backendportfolio.xyz/api/profile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error();

      const data = await res.json();

      setProfile(data);
      setEmail(data.email || "");
      setRole(data.role || "user");

      setStatus(apiStatus.success);
    } catch {
      setStatus(apiStatus.failure);
    }
  };

  fetchProfile();
}, [token]); // ✅ only real dependency

  const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

  const updateProfile = async () => {
    try {
      const url = "https://event.backendportfolio.xyz/api/update-profile";
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email, role, userId }),
      };

      await fetch(url, options);
      getProfile();
    } catch {}
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch(
            "https://event.backendportfolio.xyz/api/profile/avatar",
            {
            method: "POST",
            headers: {
            Authorization: `Bearer ${token}`,
            },
            body: {formData,userId},
            }
         );

        const data = await res.json();
        setFile(data)
        setShowUpload(false);
        getProfile();
    } catch (err) {
    console.error(err);
    }
};

  const deleteAvatar = async () => {
    try {
      const url = "https://event.backendportfolio.xyz/api/profile/avatar";
      const options = {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
        body:JSON.stringify({userId})
      };

      await fetch(url, options);

      setShowDelete(false);
      getProfile();
    } catch {}
  };

  // ---------- Views ----------

  const renderLoading = () => (
    <Card>
      <Header>
        <SkeletonAvatar />
        <div>
          <SkeletonLine width="140px" />
          <SkeletonLine width="100px" />
        </div>
      </Header>

      <SkeletonCard />
      <SkeletonCard />
    </Card>
  );

  const renderFailure = () => (
    <Card>
       <iframe 
         src="https://lottie.host/embed/86d6b71b-5abd-457f-951f-7d35ae52689d/yf9HfTT6Ql.lottie" title="Failure" style={{border:"0px"}}>
      </iframe>
      <PrimaryBtn onClick={getProfile}>Retry</PrimaryBtn>
    </Card>
  );

  const renderSuccess = () => (
    <Card>
      <Header>
        <AvatarWrap onClick={() => setShowActions(true)}>
          <Avatar src={profile?.avatarUrl} alt="avatar" />
        </AvatarWrap>

        <div>
          <Name>{profile?.name}</Name>
          <SubText>Profile Settings</SubText>
        </div>
      </Header>

      {/* ---------- FORM ---------- */}
      <Field>
        <Label>Name (readonly)</Label>
        <Input value={profile?.name} disabled />
      </Field>

      <Field>
        <Label>Email</Label>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Field>

      <Field>
        <Label>Role</Label>
        <Select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="developer">Developer</option>
          <option value="organizer">Organizer</option>
        </Select>
      </Field>

      <Row>
        <PrimaryBtn onClick={updateProfile}>Save</PrimaryBtn>
        <GhostBtn onClick={getProfile}>Reset</GhostBtn>
      </Row>

      {/* ---------- ACTION SHEET ---------- */}
      {showActions && (
        <Overlay onClick={() => setShowActions(false)}>
          <ActionSheet onClick={(e) => e.stopPropagation()}>
            <SheetBtn onClick={() => setShowPreview(true)}>View</SheetBtn>
            <SheetBtn onClick={() => setShowUpload(true)}>Replace</SheetBtn>
            <SheetBtn danger onClick={() => setShowDelete(true)}>
              Delete
            </SheetBtn>
          </ActionSheet>
        </Overlay>
      )}

      {/* ---------- FULL IMAGE ---------- */}
      {showPreview && (
        <Overlay onClick={() => setShowPreview(false)}>
          <FullImage src={profile?.avatarUrl} />
        </Overlay>
      )}

      {/* ---------- UPLOAD ---------- */}
      {showUpload && (
            <Overlay>
            <Modal style={{ background: "#ffffff" }}>
            <ModalTitle>Upload New Avatar</ModalTitle>

            <div style={{ marginBottom: "12px" }}>
            <input type="file" onChange={handleFileChange} />
            </div>

            {file && (
                <img
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    marginBottom: "12px",
                    objectFit: "cover",
                }}
                />
            )}

            <ModalRow>
            <PrimaryBtn onClick={handleUpload}>Upload</PrimaryBtn>
            <GhostBtn onClick={() => setShowUpload(false)}>
            Cancel
            </GhostBtn>
            </ModalRow>
            </Modal>
            </Overlay>
       )}

      {/* ---------- DELETE ---------- */}
      {showDelete && (
        <Overlay>
          <Modal>
            <ModalTitle>Delete avatar?</ModalTitle>
            <ModalRow>
              <DangerBtn onClick={deleteAvatar}>Delete</DangerBtn>
              <GhostBtn onClick={() => setShowDelete(false)}>
                Cancel
              </GhostBtn>
            </ModalRow>
          </Modal>
        </Overlay>
      )}
    </Card>
  );

  const renderView = () => {
    switch (status) {
      case apiStatus.loading:
        return renderLoading();
      case apiStatus.success:
        return renderSuccess();
      case apiStatus.failure:
        return renderFailure();
      default:
        return null;
    }
  };

  return <Page>{renderView()}</Page>;
};

export default Profile;