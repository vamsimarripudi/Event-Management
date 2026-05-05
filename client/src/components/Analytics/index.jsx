import { useEffect, useState } from "react";
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

const Analytics = () => {
  const [activeFilter, setActiveFilter] = useState("7d");
  const [data, setData] = useState(null);

  const token = localStorage.getItem("token");

  const fetchAnalytics = async (range) => {
    try {
      const url = `/api/feedback/analytics?range=${range}`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAnalytics(activeFilter);
  }, [activeFilter]);

  if (!data) return <Container>Loading...</Container>;

  return (
    <Container>
      {/* ---------- Filter ---------- */}
      <TopBar>
        {filters.map((f) => (
          <FilterButton
            key={f}
            active={f === activeFilter}
            onClick={() => setActiveFilter(f)}
          >
            {f.toUpperCase()}
          </FilterButton>
        ))}
      </TopBar>

      {/* ---------- Stats ---------- */}
      <Grid>
        <Card>
          <Title>Total</Title>
          <StatValue>{data.totalFeedback}</StatValue>
        </Card>

        <Card>
          <Title>Rating</Title>
          <StatValue>{data.avgRating}</StatValue>
        </Card>

        <Card>
          <Title>Positive</Title>
          <StatValue>{data.sentiment.positive}%</StatValue>
        </Card>
      </Grid>

      {/* ---------- Mini Trend Chart ---------- */}
      <Section>
        <SectionTitle>Trend</SectionTitle>

        <ChartWrapper>
          {data.trend?.map((point, index) => (
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
              {key} ({data.sentiment[key]}%)
            </BarLabel>

            <BarTrack>
              <BarFill value={data.sentiment[key]} />
            </BarTrack>
          </BarRow>
        ))}
      </Section>
    </Container>
  );
};

export default Analytics;
