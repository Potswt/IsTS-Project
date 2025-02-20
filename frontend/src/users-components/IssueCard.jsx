import { Card, Dropdown, Menu, Button, Tag, Avatar } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import dayjs from "dayjs"; // Import dayjs

const statusColors = {
  รอดำเนินการ: "orange",
  กำลังดำเนินการ: "blue",
  เสร็จสิ้น: "green",
  ถูกปฏิเสธ: "red",
};

const IssueCard = ({ issue, onEdit, onDelete }) => {
  const menu = (
    <Menu>
      <Menu.Item key="edit" onClick={() => onEdit(issue)}>
        แก้ไข
      </Menu.Item>
      <Menu.Item key="delete" onClick={() => onDelete(issue)}>
        ลบ
      </Menu.Item>
    </Menu>
  );

  return (
    <Card
      title={
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>{issue.issue}</span>
        </div>
      }
      extra={
        <Dropdown overlay={menu} trigger={["click"]}>
          <Button icon={<MoreOutlined />} />
        </Dropdown>
      }
      style={{
        width: "100%",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        overflow: "hidden",
      }}>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
        <Avatar
          src={issue.avatar}
          size="large"
          style={{ marginRight: "16px" }}
        />
        <div>
          <p style={{ margin: 0, fontWeight: "bold" }}>{issue.employee}</p>
          <p style={{ margin: 0, color: "#888" }}>แผนก: {issue.department}</p>
        </div>{" "}
        <span style={{ fontSize: "12px", color: "#888", marginLeft: "auto", marginRight: 0 }}>
          {dayjs(issue.date).format("YYYY-MM-DD HH:mm")}
        </span>
      </div>
      <p style={{ wordWrap: "break-word", marginBottom: "16px" }}>
        {issue.description}
      </p>
      <p>
        สถานะ: <Tag color={statusColors[issue.status]}>{issue.status}</Tag>
      </p>
      {issue.files && issue.files.length > 0 && (
        <div style={{ marginTop: "16px" }}>
          <p style={{ marginBottom: "8px" }}>ไฟล์ที่แนบ:</p>
          <ul style={{ paddingLeft: "20px" }}>
            {issue.files.map((file, index) => (
              <li key={index} style={{ marginBottom: "8px" }}>
                <a
                  href={URL.createObjectURL(file.originFileObj)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#1890ff" }}>
                  {file.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
};

IssueCard.propTypes = {
  issue: PropTypes.shape({
    issue: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    employee: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    files: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default IssueCard;
