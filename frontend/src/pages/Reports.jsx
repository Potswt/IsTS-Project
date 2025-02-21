import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import ContentReports from "../components/contents/ContentReports";

const Reports = () => {
  return (
    <Layout>
      <Content
        style={{
          padding: 24,
        }}>
        <ContentReports />
      </Content>
    </Layout>
  );
};

export default Reports;
