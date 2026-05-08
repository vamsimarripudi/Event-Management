import { Component } from "react";


import {
  HighlightRing,
  Ripple,
  NewBadge,
  Hint,
} from "./onboardingStyles";

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
  AnalysisGrid,
  AnalysisCard,
  Value,
  StrengthCard,
  ProgressBar,
  Progress,
  SummaryCard,
  SummaryText,

} from "./styledComponents";
import toast from "react-hot-toast";

const apiStatus = {
  initial: "INITIAL",
  loading: "LOADING",
  success: "SUCCESS",
  failure: "FAILURE",
};

class Profile extends Component {
  state = {
    status: apiStatus.initial,
    profile: {},
    email: "",
    role: "user",
    file: null,
    showOnboarding:false,
    showRipple:false,
    highlightActive:false,
    showActions: false,
    showPreview: false,
    showUpload: false,
    showDelete: false,
    analysisData:{},
  };
  
  token = localStorage.getItem("token");

  componentDidMount() {
    const data = JSON.parse(localStorage.getItem("profile_onboarding")) || {};
    
    const now = Date.now()
    const isExpired = data.expiry && now > data.expiry;
    const isSeen = data.seen;

    if(!isSeen && !isExpired){
      this.setState({
        showOnboarding:true,
        highlightActive:true,
      })

      setTimeout(()=> {
        this.setState({
          highlightActive:false
        });
      },2000)
    }

    this.getProfile();
    this.getProfileAnalysis();
  }

  markOnboardingSeen = () => {
    const now = Date.now();

      localStorage.setItem(
      "profile_onboarding",
      JSON.stringify({
      seen: true,
      expiry: now + 24 * 60 * 60 * 1000, // 24h fallback
      })
      );

    this.setState({ showOnboarding: false });
    };

    
  handleAvatarClick = () => {
    const { showOnboarding } = this.state;

    if (showOnboarding) {
    this.setState({ showRipple: true });

    this.markOnboardingSeen();

    setTimeout(() => {
    this.setState({ showRipple: false });
    }, 600);
    }
  }

//
  // ---------- API ----------

  getProfile = async () => {
    this.setState({ status: apiStatus.loading });

    try {
      const res = await fetch(
        "https://event.backendportfolio.xyz/api/profile",
        {
          headers: { Authorization: `Bearer ${this.token}` },
        }
      );

      if (!res.ok) throw new Error();

      const data = await res.json();

      this.setState({
        profile: data,
        email: data.email || "",
        role: data.role || "user",
        status: apiStatus.success,
      });
    } catch {
      this.setState({ status: apiStatus.failure });
    }
  };

  updateProfile = async () => {
    const { email, role } = this.state;

    try {
      await fetch(
        "https://event.backendportfolio.xyz/api/update-profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
          body: JSON.stringify({ email, role }),
        }
      );

      this.getProfile();
    } catch {}
  };

  getProfileAnalysis = async() => {
    this.setState({ status: apiStatus.loading })
    try{
      const token = localStorage.getItem("token");
      const response = await fetch("https://event.backendportfolio.xyz/api/analysis",{
        headers:{
          Authorization:`Bearer ${token}`,
        },
      });

      const data = await response.json();
      this.setState({analysisData:data})
    }catch(err){
      toast.error(err.message);
    }

  }

  handleFileChange = (e) => {
    this.setState({ file: e.target.files[0] });
  };

  handleUpload = async () => {
    const { file } = this.state;
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("avatar", file); // ✅ must match backend

      await fetch(
        "https://event.backendportfolio.xyz/api/profile/avatar",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
          body: formData,
        }
      );

      this.setState({
        file: null,
        showUpload: false,
      });

      this.getProfile();
    } catch (err) {
      console.error(err);
    }
  };

  deleteAvatar = async () => {
    try {
      await fetch(
        "https://event.backendportfolio.xyz/api/profile/avatar",
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${this.token}` },
        }
      );

      this.setState({ showDelete: false });
      this.getProfile();
    } catch {}
  };

  // ---------- Views ----------

  renderLoading = () => (
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

  renderFailure = () => (
    <Card>
      <iframe
        src="https://lottie.host/embed/86d6b71b-5abd-457f-951f-7d35ae52689d/yf9HfTT6Ql.lottie"
        title="Failure"
        style={{ border: "0px" }}
      />
      <PrimaryBtn onClick={this.getProfile}>Retry</PrimaryBtn>
    </Card>
  );

  renderSuccess = () => {
    const {
      profile,
      email,
      role,
      file,
      showActions,
      showPreview,
      showUpload,
      showDelete,
      analysisData,
    } = this.state;

    return (
      <Card>
        <Header>
          <AvatarWrap onClick={this.handleAvatarClick}>
              <Avatar src={profile.avatarUrl} alt="avatar" onClick={() => this.setState({showActions : true})}  />

              {this.state.showOnboarding && this.state.highlightActive && (
              <HighlightRing />
              )}

              {this.state.showOnboarding && <NewBadge>NEW</NewBadge>}

              {this.state.showRipple && <Ripple />}
          </AvatarWrap>

          <div>
            <Name>{profile?.name}</Name>
            <SubText>Profile Settings</SubText>
            {this.state.showOnboarding && (
              <Hint>Click to manage your profile</Hint>
            )}
          </div>
        </Header>

        <Field>
          <Label>Name</Label>
          <Input value={profile?.name} disabled />
        </Field>

        <Field>
          <Label>Email</Label>
          <Input
            value={email}
            onChange={(e) => this.setState({ email: e.target.value })}
          />
        </Field>

        <Field>
          <Label>Role</Label>
          <Select
            value={role}
            onChange={(e) => this.setState({ role: e.target.value })}
          >
            <option value="user">User</option>
            <option value="developer">Developer</option>
            <option value="organizer">Organizer</option>
          </Select>
        </Field>
        <StrengthCard>
          <Label>Profile Strength</Label>
          <ProgressBar>
            <Progress value={analysisData.profileStrength}/>
          </ProgressBar>
          <Value>
            {analysisData.profileStrength} % Complete
          </Value>
        </StrengthCard>
        <AnalysisGrid>
          <AnalysisCard>
            <Value>
              {analysisData.joinedEvents}
            </Value>
            <Label>
              Events Joined
            </Label>
          </AnalysisCard>
          <AnalysisCard>
            <Value>
              {analysisData.feedbackCount}
            </Value>
            <Label>
              Feedback Submitted
            </Label>
          </AnalysisCard>
          <AnalysisCard>
            <Value>
              {analysisData.engagementLevel}
            </Value>
            <Label>
              Engagement
            </Label>
          </AnalysisCard>
          
        </AnalysisGrid>
        <SummaryCard>
          <Label>
            AI Profile Insight 
          </Label>
          <SummaryText>
            {analysisData.summary}
          </SummaryText>
        </SummaryCard>

        <Row>
          <PrimaryBtn onClick={this.updateProfile}>Save</PrimaryBtn>
          <GhostBtn onClick={this.getProfile}>Reset</GhostBtn>
        </Row>

        {/* Actions */}
        {showActions && (
          <Overlay onClick={() => this.setState({ showActions: false })}>
            <ActionSheet onClick={(e) => e.stopPropagation()}>
              <SheetBtn onClick={() => this.setState({ showPreview: true })}>
                View
              </SheetBtn>
              <SheetBtn onClick={() => this.setState({ showUpload: true })}>
                Replace
              </SheetBtn>
              <SheetBtn onClick={() => this.setState({ showDelete: true })}>
                Delete
              </SheetBtn>
            </ActionSheet>
          </Overlay>
        )}

        {/* Preview */}
        {showPreview && (
          <Overlay onClick={() => this.setState({ showPreview: false })}>
            <FullImage src={profile?.avatarUrl} />
          </Overlay>
        )}

        {/* Upload */}
        {showUpload && (
          <Overlay>
            <Modal style={{ background: "#ffffff" }}>
              <ModalTitle>Upload New Avatar</ModalTitle>

              <input type="file" onChange={this.handleFileChange} style={{margin:"10px"}} />

              {file && (
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    marginTop: "10px",
                    objectFit: "cover",
                  }}
                />
              )}

              <ModalRow>
                <PrimaryBtn onClick={this.handleUpload}>
                  Upload
                </PrimaryBtn>
                <GhostBtn
                  onClick={() => this.setState({ showUpload: false })}
                >
                  Cancel
                </GhostBtn>
              </ModalRow>
            </Modal>
          </Overlay>
        )}

        {/* Delete */}
        {showDelete && (
          <Overlay>
            <Modal>
              <ModalTitle>Delete avatar?</ModalTitle>
              <ModalRow>
                <DangerBtn onClick={this.deleteAvatar}>Delete</DangerBtn>
                <GhostBtn
                  onClick={() => this.setState({ showDelete: false })}
                >
                  Cancel
                </GhostBtn>
              </ModalRow>
            </Modal>
          </Overlay>
        )}
      </Card>
    );
  };

  render() {
    const { status } = this.state;

    switch (status) {
      case apiStatus.loading:
        return <Page>{this.renderLoading()}</Page>;
      case apiStatus.success:
        return <Page>{this.renderSuccess()}</Page>;
      case apiStatus.failure:
        return <Page>{this.renderFailure()}</Page>;
      default:
        return null;
    }
  }
}

export default Profile;