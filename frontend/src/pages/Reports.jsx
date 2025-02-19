import { Content } from "antd/es/layout/layout";
import ContentReports from "../components/contents/ContentReports";
import { Layout } from "antd";

const Reports = () => {
  return (
    <Layout>
      <div className="pl-8 pt-5 pb-2">
        <h1 className="uppercase font-semibold tracking-[4px] text-2xl">
          Reports
        </h1>
      </div>
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
