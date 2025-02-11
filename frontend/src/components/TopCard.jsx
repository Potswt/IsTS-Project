import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";

const TopCard = () => (
  <Row gutter={[16, 16]}>
    <Col xs={24} sm={12} md={12} lg={6}>
      <Card bordered={true} style={{ background: "linear-gradient(to right, #ff7e5f, #feb47b)" }}>
        <Statistic
          title={<span style={{ color: "#ffffff" }}>Active</span>}
          value={11.28}
          precision={2}
          valueStyle={{
            color: "#ffffff",
          }}
          prefix={<ArrowUpOutlined />}
          suffix="%"
        />
      </Card>
    </Col>
    <Col xs={24} sm={12} md={12} lg={6}>
      <Card bordered={true} style={{ background: "linear-gradient(to right, #6a11cb, #2575fc)" }}>
        <Statistic
          title={<span style={{ color: "#ffffff" }}>Idle</span>}
          value={9.3}
          precision={2}
          valueStyle={{
            color: "#ffffff",
          }}
          prefix={<ArrowDownOutlined />}
          suffix="%"
        />
      </Card>
    </Col>
    <Col xs={24} sm={12} md={12} lg={6}>
      <Card bordered={true} style={{ background: "linear-gradient(to right, #ff7e5f, #feb47b)" }}>
        <Statistic
          title={<span style={{ color: "#ffffff" }}>Active</span>}
          value={11.28}
          precision={2}
          valueStyle={{
            color: "#ffffff",
          }}
          prefix={<ArrowUpOutlined />}
          suffix="%"
        />
      </Card>
    </Col>
    <Col xs={24} sm={12} md={12} lg={6}>
      <Card bordered={true} style={{ background: "linear-gradient(to right, #6a11cb, #2575fc)" }}>
        <Statistic
          title={<span style={{ color: "#ffffff" }}>Idle</span>}
          value={9.3}
          precision={2}
          valueStyle={{
            color: "#ffffff",
          }}
          prefix={<ArrowDownOutlined />}
          suffix="%"
        />
      </Card>
    </Col>
  </Row>
);

export default TopCard;
