import { Layout, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import TopCard from "../TopCard";

const ContentReports = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <div className="mx-2">
        <TopCard />
      </div>
      <Content
        className="rounded-lg"
        style={{
          margin: "45px 10px",
          padding: 24,
          borderRadius: borderRadiusLG,
          background: colorBgContainer,
        }}></Content>
    </Layout>
  );
};
export default ContentReports;
