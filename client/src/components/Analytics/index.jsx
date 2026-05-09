import React, { Component } from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import {
  Container,
  TopBar,
  FilterButton,
  Grid,
  Card,
  Title,
  StatValue,
  Section,
  SectionTitle,
  ChartWrapper,
  ChartLine,
  ChartPoint,
  BarRow,
  BarLabel,
  BarTrack,
  BarFill,
} from "./styledComponents";

const filters = ["7d", "30d", "all"];

class Analytics extends Component {
  state = {
    activeFilter: "7d",
    data: null,
  };

  componentDidMount() {
    this.fetchAnalytics(this.state.activeFilter);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.activeFilter !== this.state.activeFilter) {
      this.fetchAnalytics(this.state.activeFilter);
    }
  }

  fetchAnalytics = async (range) => {
    try {
      const token = localStorage.getItem("token");

      const url = `https://event.backendportfolio.xyz/api/feedback/analytics?range=${range}`;

      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const json = await res.json();

      this.setState({ data: json });
    } catch (err) {
      console.error(err);
    }
  };

  setFilter = (filter) => {
    this.setState({ activeFilter: filter });
  };

  render() {
    const { activeFilter, data } = this.state;

    if (!data) return <Container>Loading...</Container>;

    return (
      
      <>
      <Navbar/>
      <Container>
        {/* ---------- Filter ---------- */}
        <TopBar>
          {filters.map((f) => (
            <FilterButton
              key={f}
              active={f === activeFilter}
              onClick={() => this.setFilter(f)}
            >
              {f.toUpperCase()}
            </FilterButton>
          ))}
        </TopBar>

        {/* ---------- Stats ---------- */}
        <Grid>
          <Card>
            <Title>Total</Title>
            <StatValue>{data?.totalFeedback}</StatValue>
          </Card>

          <Card>
            <Title>Rating</Title>
            <StatValue>{data?.avgRating}</StatValue>
          </Card>

          <Card>
            <Title>Positive</Title>
            <StatValue>{data?.sentiment?.positive}%</StatValue>
          </Card>
        </Grid>

        {/* ---------- Mini Trend Chart ---------- */}
        <Section>
          <SectionTitle>Trend</SectionTitle>

          <ChartWrapper>
            {data?.trend?.map((point, index) => (
              <ChartPoint
                key={index}
                style={{ height: `${point.value}%` }}
              />
            ))}
            <ChartLine />
          </ChartWrapper>
        </Section>

        {/* ---------- Sentiment Bars ---------- */}
        <Section>
          <SectionTitle>Sentiment</SectionTitle>

          {["positive", "neutral", "negative"].map((key) => (
            <BarRow key={key}>
              <BarLabel>
                {key} ({data?.sentiment[key]}%)
              </BarLabel>

              <BarTrack>
                <BarFill value={data?.sentiment[key]} />
              </BarTrack>
            </BarRow>
          ))}
        </Section>
      </Container>
      </>
    );
  }
}

export default Analytics;