import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

import MyEvents from "../MyEvents";
import Profile from "../Profile";

import {
  Container,
  Tabs,
  TabButton,
  ContentWrapper,
  Layout,
} from "./styledComponents";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("events");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <Profile />;
      case "events":
      default:
        return <MyEvents />;
    }
  };

  return (
    <>
      <Navbar />

      <Layout>
        <Sidebar />

        <Container>
          {/* Tabs */}
          <Tabs>
            <TabButton
              $active={activeTab === "events"}
              onClick={() => setActiveTab("events")}
            >
              My Events
            </TabButton>

            <TabButton
              $active={activeTab === "profile"}
              onClick={() => setActiveTab("profile")}
            >
              Profile
            </TabButton>
          </Tabs>

          {/* Animated Content */}
          <ContentWrapper>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </ContentWrapper>
        </Container>
      </Layout>
    </>
  );
};

export default Dashboard;