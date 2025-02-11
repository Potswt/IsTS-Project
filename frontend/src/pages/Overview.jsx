import { useEffect } from "react";
import { Layout, message } from "antd";

import ContentOverview from "../components/contents/ContentOverview";

const { Content } = Layout;

const Overview = () => {
  useEffect(() => {
    if (!message.isOpen) {
      message.success("Welcome to the Issue Support and Tracking System!");
      message.isOpen = true;
    }
  }, []);

  return (
    <Layout>
      <div className="pl-8 pt-5 pb-2">
        <h1 className="uppercase font-semibold tracking-[4px] text-2xl">
          Overview
        </h1>
      </div>
      <Content
        style={{
          padding: 24,
        }}>
        <ContentOverview timeRange="daily" />
      </Content>
    </Layout>
  );
};

export default Overview;
