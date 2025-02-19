import { Select, Tag } from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";

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
    style={{ width: "100%" }}
    onChange={(value) => handleStatusChange(record.key, value)}
    variant="false"
    dropdownStyle={{ border: "none" }}>
    <Option value="เสร็จสิ้น">
      <Tag
        variant="false"
        icon={<CheckCircleOutlined />}
        color={statusColors["เสร็จสิ้น"]}
        style={{ cursor: "pointer" }}>
        เสร็จสิ้น
      </Tag>
    </Option>
    <Option value="รอดำเนินการ">
      <Tag
        variant="false"
        icon={<ClockCircleOutlined />}
        color={statusColors["รอดำเนินการ"]}
        style={{ cursor: "pointer" }}>
        รอดำเนินการ
      </Tag>
    </Option>
    <Option value="กำลังดำเนินการ">
      <Tag
        variant="false"
        icon={<SyncOutlined spin />}
        color={statusColors["กำลังดำเนินการ"]}
        style={{ cursor: "pointer" }}>
        กำลังดำเนินการ
      </Tag>
    </Option>
    <Option value="ถูกปฏิเสธ">
      <Tag
        variant="false"
        icon={<CloseCircleOutlined />}
        color={statusColors["ถูกปฏิเสธ"]}
        style={{ cursor: "pointer" }}>
        ถูกปฏิเสธ
      </Tag>
    </Option>
  </Select>
);

StatusColumn.propTypes = {
  text: PropTypes.string.isRequired,
  record: PropTypes.shape({
    key: PropTypes.string.isRequired,
  }).isRequired,
  handleStatusChange: PropTypes.func.isRequired,
};

export default StatusColumn;
