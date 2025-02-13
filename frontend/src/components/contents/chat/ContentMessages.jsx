import { theme } from "antd";
import { Content } from "antd/es/layout/layout";

const ContentMessages = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Content
      style={{
        margin: "30px 16px",
        padding: 24,
        borderRadius: borderRadiusLG,
        background: colorBgContainer,
      }}></Content>
  );
};
export default ContentMessages;
