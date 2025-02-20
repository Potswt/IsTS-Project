import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

const AssigneesColumn = ({ assignees }) => (
  <Avatar.Group
    max={{
      count: 2,
      style: {
        color: "black",
        backgroundColor: "#add8e6", // light blue
      },
    }}>
    {assignees.map((assignee) => (
      <Avatar
        key={assignee.name}
        src={assignee.avatar}
        icon={<UserOutlined />}
      />
    ))}
  </Avatar.Group>
);

AssigneesColumn.propTypes = {
  assignees: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default AssigneesColumn;
