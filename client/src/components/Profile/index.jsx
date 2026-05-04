import { Component } from "react";

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

class Profile extends Component {
  state = {
    status: apiStatus.initial,
    profile: {},
    email: "",
    role: "user",
    file: null,

    showActions: false,
    showPreview: false,
    showUpload: false,
    showDelete: false,
  };

  token = localStorage.getItem("token");

  componentDidMount() {
    this.getProfile();
  }

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

  handleFileChange = (e) => {
    this.setState({ file: e.target.files[0] });
  };

  handleUpload = async () => {
    const { file } = this.state;
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file); // ✅ must match backend

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
    } = this.state;

    return (
      <Card>
        <Header>
          <AvatarWrap onClick={() => this.setState({ showActions: true })}>
            <Avatar
              src={profile?.avatarUrl || "/default-avatar.png"}
              alt="avatar"
            />
          </AvatarWrap>

          <div>
            <Name>{profile?.name}</Name>
            <SubText>Profile Settings</SubText>
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

              <input type="file" onChange={this.handleFileChange} />

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