import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const AssigneesColumn = ({ assignees }) => (
  <Avatar.Group>
    {assignees.map((assignee) => (
      <Avatar
        key={assignee.name}
        src={assignee.avatar}
        icon={<UserOutlined />}
      />
    ))}
  </Avatar.Group>
);

export default AssigneesColumn;
