import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import IssuesReport from "../users-components/IssuesReport";

const UserHome = () => {
  return (
    <Layout>
      <div className="pl-8 pt-5 pb-2">
        <h1 className="uppercase font-semibold tracking-[4px] text-2xl">
          คำร้องของฉัน
        </h1>
      </div>
      <Content
        style={{
          padding: 24,
        }}>
        <IssuesReport  />
      </Content>
    </Layout>
  );
};

export default UserHome;
