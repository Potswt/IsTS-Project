import { Select, Tag } from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

const { Option } = Select;

const statusColors = {
  เสร็จสิ้น: "green", // Resolved
  รอดำเนินการ: "orange", // Pending
  กำลังดำเนินการ: "blue", // In Progress
  ถูกปฏิเสธ: "red", // Rejected
};

const StatusColumn = ({ text, record, handleStatusChange }) => (
  <Select
    value={text}
    style={{ width: 130 }}
    onChange={(value) => handleStatusChange(record.key, value)}>
    <Option value="เสร็จสิ้น">
      <Tag
        bordered={false}
        icon={<CheckCircleOutlined />}
        color={statusColors["เสร็จสิ้น"]}>
        เสร็จสิ้น
      </Tag>
    </Option>
    <Option value="รอดำเนินการ">
      <Tag
        bordered={false}
        icon={<ClockCircleOutlined />}
        color={statusColors["รอดำเนินการ"]}>
        รอดำเนินการ
      </Tag>
    </Option>
    <Option value="กำลังดำเนินการ">
      <Tag
        bordered={false}
        icon={<SyncOutlined spin />}
        color={statusColors["กำลังดำเนินการ"]}>
        กำลังดำเนินการ
      </Tag>
    </Option>
    <Option value="ถูกปฏิเสธ">
      <Tag
        bordered={false}
        icon={<CloseCircleOutlined />}
        color={statusColors["ถูกปฏิเสธ"]}>
        ถูกปฏิเสธ
      </Tag>
    </Option>
  </Select>
);

export default StatusColumn;
