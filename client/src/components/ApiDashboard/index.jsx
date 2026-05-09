import { Component } from "react";
import CountUp from "react-countup";
import socket from "../../socket";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts";

import {
  Page,
  HeroSection,
  HeroTitle,
  HeroText,
  LiveBadge,
  Pulse,
  StatsGrid,
  StatCard,
  StatLabel,
  StatValue,
  ChartGrid,
  ChartCard,
  SectionTitle,
  TableCard,
  Table,
  THead,
  TBody,
  Tr,
  Th,
  Td,
  MethodBadge,
  StatusBadge,
  SlowGrid,
  SlowCard,
  LoaderCard,
  Skeleton,
  FailureCard,
  RetryButton,
  BottomGrid,
  SearchInput,
} from "./styledComponents";

const apiStatus = {
  initial: "INITIAL",
  loading: "LOADING",
  success: "SUCCESS",
  failure: "FAILURE",
};

const statusData = [
  { name: "2xx", value: 78, color: "#22c55e" },
  { name: "3xx", value: 8, color: "#06b6d4" },
  { name: "4xx", value: 10, color: "#f59e0b" },
  { name: "5xx", value: 4, color: "#ef4444" },
];

class ApiDashboard extends Component {
  state = {
    status: apiStatus.initial,
    overview: {},
    timeline: [],
    endpoints: [],
    slowRequests: [],
    search: "",
  };

  componentDidMount() {
   this.getDashboardData();
    this.connectSocket();
    this.dashboardInterval =
      setInterval(() => {
        this.getDashboardData();
      }, 3000);
  }

  componentWillUnmount() {
    socket.off("dashboard:update");
    socket.off("connect");
    socket.off("disconnect");
    clearInterval(this.dashboardInterval);
  }

  connectSocket = () => {

  socket.on("connect", () => {

    console.log("Socket Connected");

  });

  socket.on("dashboard:update", () => {

    console.log(
      "Realtime Dashboard Update"
    );

    this.getDashboardData();

  });

  socket.on("disconnect", () => {

    console.log("Socket Disconnected");

  });

};

  getDashboardData = async () => {
    this.setState({ status: apiStatus.loading });

    try {
      const token = localStorage.getItem("token");

      const [overviewRes, timelineRes, endpointsRes, slowRes] =
        await Promise.all([
          fetch(
            "https://event.backendportfolio.xyz/api/admin/metrics/overview",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          ),

          fetch(
            "https://event.backendportfolio.xyz/api/admin/metrics/timeline",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          ),

          fetch(
            "https://event.backendportfolio.xyz/api/admin/metrics/endpoints",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          ),

          fetch(
            "https://event.backendportfolio.xyz/api/admin/metrics/slow-requests",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          ),
        ]);

      const overview = await overviewRes.json();
      const timeline = await timelineRes.json();
      const endpoints = await endpointsRes.json();
      const slowRequests = await slowRes.json();

      this.setState({
        overview,
        timeline,
        endpoints,
        slowRequests,
        status: apiStatus.success,
      });
    } catch (err) {
      console.log(err);

      this.setState({
        status: apiStatus.failure,
      });
    }
  };

  getLatencyColor = (value) => {
    if (value < 200) return "#22c55e";

    if (value < 800) return "#f59e0b";

    return "#ef4444";
  };

  renderLoadingView = () => (
    <Page>
      <StatsGrid>
        {Array.from({ length: 6 }).map((_, index) => (
          <LoaderCard key={index}>
            <Skeleton height="18px" width="120px" />

            <Skeleton height="40px" width="80px" />
          </LoaderCard>
        ))}
      </StatsGrid>

      <ChartGrid>
        <LoaderCard>
          <Skeleton height="300px" />
        </LoaderCard>

        <LoaderCard>
          <Skeleton height="300px" />
        </LoaderCard>
      </ChartGrid>
    </Page>
  );

  renderFailureView = () => (
    <Page>
      <FailureCard>
        <h2>
          Unable to load observability metrics
        </h2>

        <RetryButton
          onClick={this.getDashboardData}
        >
          Retry
        </RetryButton>
      </FailureCard>
    </Page>
  );

  renderSuccessView = () => {
    const {
      overview,
      timeline,
      endpoints,
      slowRequests,
      search,
    } = this.state;

    const filteredEndpoints =
      endpoints.filter((item) =>
        item._id.endpoint
          .toLowerCase()
          .includes(search.toLowerCase())
      );

    return (
      <Page>
        <HeroSection>
          <div>
            <HeroTitle>
              API Observability
            </HeroTitle>

            <HeroText>
              Monitoring backend performance in
              realtime
            </HeroText>
          </div>

          <LiveBadge>
            <Pulse />
            LIVE
          </LiveBadge>
        </HeroSection>

        <StatsGrid>
          <StatCard>
            <StatLabel>
              Total Requests
            </StatLabel>

            <StatValue>
              <CountUp
                end={overview.totalRequests || 0}
                duration={2}
              />
            </StatValue>
          </StatCard>

          <StatCard>
            <StatLabel>
              Avg Response
            </StatLabel>

            <StatValue>
              <CountUp
                end={overview.avgResponse || 0}
                duration={2}
              />
              ms
            </StatValue>
          </StatCard>

          <StatCard>
            <StatLabel>
              Failed Requests
            </StatLabel>

            <StatValue>
              <CountUp
                end={overview.failedRequests || 0}
                duration={2}
              />
            </StatValue>
          </StatCard>

          <StatCard>
            <StatLabel>
              Success Rate
            </StatLabel>

            <StatValue>
              <CountUp
                end={overview.successRate || 0}
                duration={2}
              />
              %
            </StatValue>
          </StatCard>
        </StatsGrid>

        <ChartGrid>
          <ChartCard>
            <SectionTitle>
              Response Timeline
            </SectionTitle>

            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <AreaChart data={timeline}>
                <defs>
                  <linearGradient
                    id="colorResponse"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="#6366f1"
                      stopOpacity={0.8}
                    />

                    <stop
                      offset="95%"
                      stopColor="#6366f1"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="_id.hour" />

                <YAxis />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="avgResponse"
                  stroke="#6366f1"
                  fillOpacity={1}
                  fill="url(#colorResponse)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard>
            <SectionTitle>
              Status Distribution
            </SectionTitle>

            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                >
                  {statusData.map(
                    (entry, index) => (
                      <Cell
                        key={index}
                        fill={entry.color}
                      />
                    )
                  )}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </ChartGrid>

        <BottomGrid>
          <TableCard>
            <SectionTitle>
              Endpoint Analytics
            </SectionTitle>

            <SearchInput
              placeholder="Search endpoint"
              value={search}
              onChange={(e) =>
                this.setState({
                  search: e.target.value,
                })
              }
            />

            <Table>
              <THead>
                <Tr>
                  <Th>Endpoint</Th>
                  <Th>Method</Th>
                  <Th>Hits</Th>
                  <Th>Avg</Th>
                  <Th>Fastest</Th>
                  <Th>Slowest</Th>
                </Tr>
              </THead>

              <TBody>
                {filteredEndpoints.map((item) => (
                  <Tr key={item._id.endpoint}>
                    <Td>
                      {item._id.endpoint}
                    </Td>

                    <Td>
                      <MethodBadge
                        method={item._id.method}
                      >
                        {item._id.method}
                      </MethodBadge>
                    </Td>

                    <Td>{item.hits}</Td>

                    <Td>
                      <StatusBadge
                        color={this.getLatencyColor(
                          item.avgTime
                        )}
                      >
                        {Math.round(
                          item.avgTime
                        )}
                        ms
                      </StatusBadge>
                    </Td>

                    <Td>
                      {Math.round(
                        item.minTime
                      )}
                      ms
                    </Td>

                    <Td>
                      {Math.round(
                        item.maxTime
                      )}
                      ms
                    </Td>
                  </Tr>
                ))}
              </TBody>
            </Table>
          </TableCard>

          <SlowGrid>
            {slowRequests.map((item) => (
              <SlowCard key={item._id}>
                <h4>{item.endpoint}</h4>

                <p>
                  {item.method} •{" "}
                  {item.duration}ms
                </p>
              </SlowCard>
            ))}
          </SlowGrid>
        </BottomGrid>
      </Page>
    );
  };

  render() {
    const { status } = this.state;

    switch (status) {
      case apiStatus.loading:
        return this.renderLoadingView();

      case apiStatus.success:
        return this.renderSuccessView();

      case apiStatus.failure:
        return this.renderFailureView();

      default:
        return null;
    }
  }
}

export default ApiDashboard;