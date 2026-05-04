import { useEffect, useState } from "react";
import {
Page,
Card,
Header,
AvatarWrap,
Avatar,
AvatarRing,
Name,
SubText,
StatsGrid,
StatCard,
StatValue,
StatLabel,
ActionsRow,
GhostBtn,
PrimaryBtn,
Overlay,
ActionSheet,
SheetBtn,
FullImage,
Modal,
ModalTitle,
ModalRow,
DangerBtn,
SkeletonCard,
SkeletonAvatar,
SkeletonLine,
} from "./styledComponents";

const apiStatusConstants = {
initial: "INITIAL",
inProgress: "IN_PROGRESS",
success: "SUCCESS",
failure: "FAILURE",
};

const Profile = () => {
    const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
    const [profile, setProfile] = useState(null);

    const [showActions, setShowActions] = useState(false);
    const [showFullImage, setShowFullImage] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const token = localStorage.getItem("token");

   

    useEffect(() => {
        const token = localStorage.getItem("token");
       const getProfile = async () => {
        setApiStatus(apiStatusConstants.inProgress);
        try {
        const url = "https://event.backendportfolio.xyz/api/user/profile";
        const options = {
        method: "GET",
        headers: {
        Authorization: `Bearer ${token}`,
        },
    };
    const res = await fetch(url, options);
    if (!res.ok) throw new Error("failed");
        const data = await res.json();
        setProfile(data);
        setApiStatus(apiStatusConstants.success);
        } catch (e) {
        setApiStatus(apiStatusConstants.failure);
        }
    };
    getProfile();
    }, []);

    const onDelete = async () => {
    try {
      const url = "/api/user/profile/avatar";
      const options = {
      method: "DELETE",
      headers: {
      Authorization: `Bearer ${token}`,
      },
    };
    await fetch(url, options);
    setShowDelete(false);
    setProfile();
    } catch {}
    };

    // ---------- Views ----------

    const renderLoading = () => (
    <Card>
        <Header>
            <AvatarWrap>
            <SkeletonAvatar />
            </AvatarWrap>
            <div>
            <SkeletonLine width="160px" height="18px" />
            <SkeletonLine width="120px" height="12px" />
            </div>
        </Header>

        <StatsGrid>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
        </StatsGrid>

        <ActionsRow>
            <SkeletonLine width="120px" height="36px" />
            <SkeletonLine width="120px" height="36px" />
        </ActionsRow>
    </Card>
    );

    const renderFailure = () => (
      <Card>
          <ModalTitle>Failed to load profile</ModalTitle>
          <PrimaryBtn onClick={window.location.reload()}>Retry</PrimaryBtn>
      </Card>
    );

    const renderSuccess = () => (
    <Card>
        <Header>
          <AvatarWrap onClick={() => setShowActions(true)}>
          <AvatarRing />
        <Avatar src={profile?.avatarUrl} alt="avatar" />
    </AvatarWrap>

    <div>
    <Name>{profile?.name || "User"}</Name>
    <SubText>{profile?.email || ""}</SubText>
    </div>
    </Header>

    <StatsGrid>
    <StatCard>
    <StatValue>{profile?.eventsCount ?? 0}</StatValue>
    <StatLabel>Events</StatLabel>
    </StatCard>

    <StatCard>
    <StatValue>{profile?.feedbackCount ?? 0}</StatValue>
    <StatLabel>Feedback</StatLabel>
    </StatCard>

    <StatCard>
    <StatValue>
    {profile?.avgRating ? profile.avgRating.toFixed(1) : "0.0"}
    </StatValue>
    <StatLabel>Avg Rating</StatLabel>
    </StatCard>
    </StatsGrid>

    <ActionsRow>
    <PrimaryBtn onClick={() => setShowActions(true)}>
    Manage Avatar
    </PrimaryBtn>
    <GhostBtn onClick={window.loaction.reload()}>Refresh</GhostBtn>
    </ActionsRow>

    {/* ACTION SHEET */}
    {showActions && (
    <Overlay onClick={() => setShowActions(false)}>
    <ActionSheet onClick={(e) => e.stopPropagation()}>
    <SheetBtn onClick={() => setShowFullImage(true)}>
    View
    </SheetBtn>

    <SheetBtn
    onClick={() => (window.location.href = "/profile/avatar")}
    >
    Replace
    </SheetBtn>

    <SheetBtn danger onClick={() => setShowDelete(true)}>
    Delete
    </SheetBtn>
    </ActionSheet>
    </Overlay>
    )}

    {/* FULL IMAGE */}
    {showFullImage && (
    <Overlay onClick={() => setShowFullImage(false)}>
    <FullImage src={profile?.avatarUrl} alt="full" />
    </Overlay>
    )}

    {/* DELETE MODAL */}
    {showDelete && (
    <Overlay>
    <Modal>
    <ModalTitle>Delete profile image?</ModalTitle>
    <ModalRow>
    <DangerBtn onClick={onDelete}>Delete</DangerBtn>
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
    switch (apiStatus) {
    case apiStatusConstants.inProgress:
    return renderLoading();
    case apiStatusConstants.success:
    return renderSuccess();
    case apiStatusConstants.failure:
    return renderFailure();
    default:
    return null;
    }
    };

    return <Page>{renderView()}</Page>;
};

export default Profile;
