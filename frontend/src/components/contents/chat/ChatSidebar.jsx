import PropTypes from "prop-types";
import { List, Avatar, Input } from "antd";
import { useEffect, useState } from "react";

const { Search } = Input;

const ChatSidebar = ({ onSelectUser }) => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch users from an API or define them statically
    setUsers([
      { id: 1, name: "User 1", avatar: "https://i.pravatar.cc/150?img=1" },
      { id: 2, name: "User 2", avatar: "https://i.pravatar.cc/150?img=2" },
      { id: 3, name: "User 3", avatar: "https://i.pravatar.cc/150?img=3" },
      { id: 4, name: "User 4", avatar: "https://i.pravatar.cc/150?img=4" },
      { id: 5, name: "User 5", avatar: "https://i.pravatar.cc/150?img=5" },
      { id: 6, name: "User 6", avatar: "https://i.pravatar.cc/150?img=6" },
      { id: 7, name: "User 7", avatar: "https://i.pravatar.cc/150?img=7" },
      { id: 8, name: "User 8", avatar: "https://i.pravatar.cc/150?img=8" },
      { id: 9, name: "User 9", avatar: "https://i.pravatar.cc/150?img=9" },
      { id: 10, name: "User 10", avatar: "https://i.pravatar.cc/150?img=10" },
      { id: 11, name: "User 11", avatar: "https://i.pravatar.cc/150?img=11" },
      { id: 12, name: "User 12", avatar: "https://i.pravatar.cc/150?img=12" },
      { id: 13, name: "User 13", avatar: "https://i.pravatar.cc/150?img=13" },
      { id: 14, name: "User 14", avatar: "https://i.pravatar.cc/150?img=14" },
      { id: 15, name: "User 15", avatar: "https://i.pravatar.cc/150?img=15" },
    ]);
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ height: "100%", overflow: "hidden" }}>
      <Search
        placeholder="Search users"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: 16 }}
      />
      <div style={{ overflowY: "auto", height: "calc(100% - 56px)" }}>
        <List
          dataSource={filteredUsers}
          renderItem={(user) => (
            <List.Item
              onClick={() => onSelectUser(user)}
              className="cursor-pointer hover:bg-gray-100 transition-colors duration-200">
              <List.Item.Meta
                avatar={<Avatar src={user.avatar} />}
                title={<span>{user.name}</span>}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

ChatSidebar.propTypes = {
  onSelectUser: PropTypes.func.isRequired,
};

export default ChatSidebar;
