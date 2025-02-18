import PropTypes from "prop-types";
import { MoreHorizontal } from "lucide-react"; // Import the MoreHorizontal icon
import { Avatar, Dropdown } from "antd"; // Import Dropdown and Menu from antd

const ChatHeader = ({ user, onClearUser }) => {
  const menuItems = [
    {
      key: "1",
      label: "Close Case",
      onClick: () => console.log("Close case"),
    },
    {
      key: "2",
      label: "Leave Chat",
      onClick: onClearUser,
    },
  ];

  return (
    <div
      style={{
        margin: "0 16px",
        padding: "0 16px",
        borderBottom: "1px solid #e8e8e8",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
        {user && <Avatar src={user.avatar} style={{ marginRight: 8 }} />}
        <h2>{user ? user.name : "Select a user"}</h2>
      </div>
      {user && (
        <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
          <span>
            <button
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                marginBottom: 16,
              }}>
              <MoreHorizontal />
            </button>
          </span>
        </Dropdown>
      )}
    </div>
  );
};

ChatHeader.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    avatar: PropTypes.string,
  }),
  onClearUser: PropTypes.func.isRequired,
};

export default ChatHeader;
