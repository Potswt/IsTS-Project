import { theme, Input, Button, Upload } from "antd";
import { Content } from "antd/es/layout/layout";
import { useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatSidebar from "./ChatSidebar";
import NoChatSelected from "./NoChatSelect";
import { Send, Paperclip } from "lucide-react";
import { useMediaQuery } from "react-responsive";
import { motion } from "framer-motion"; // Import framer-motion for animations

const ContentMessages = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  const handleClearUser = () => {
    setSelectedUser(null);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle sending message
      console.log("Message sent:", message);
      setMessage("");
    }
  };

  const handleAttachFile = (file) => {
    console.log("File attached:", file);
  };

  return (
    <Content
      style={{
        height: "75vh",
        margin: "45px 16px",
        padding: 24,
        borderRadius: borderRadiusLG,
        background: colorBgContainer,
        overflow: "hidden", // Prevent overflow
      }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          marginBottom: 16,
          height: "100%",
        }}>
        {isMobile && !selectedUser ? (
          <div style={{ height: "100%", overflow: "hidden" }}>
            <ChatSidebar onSelectUser={handleSelectUser} />
          </div>
        ) : (
          <>
            {!isMobile && (
              <div style={{ height: "100%", overflow: "hidden" }}>
                <ChatSidebar onSelectUser={handleSelectUser} />
              </div>
            )}
            <div className="flex-1 flex flex-col">
              {selectedUser && (
                <ChatHeader user={selectedUser} onClearUser={handleClearUser} />
              )}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                style={{
                  overflowY: "auto",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                {!selectedUser && <NoChatSelected />}
                {/* Add your chat content here */}
              </motion.div>
              {selectedUser && (
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  style={{ display: "flex", padding: "10px 16px" }}>
                  <Upload
                    beforeUpload={handleAttachFile}
                    showUploadList={false}>
                    <Button
                      style={{ border: "transparent", marginRight: 5 }}
                      size="middle"
                      icon={<Paperclip width="20" />}
                    />
                  </Upload>
                  <Input
                    size="middle"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message"
                    style={{ flex: 1, marginRight: 5 }}
                  />
                  <Button
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#193CB8")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#262362")
                    }
                    style={{
                      backgroundColor: "#262362",
                      transition: "background-color 0.3s",
                    }}
                    size="middle"
                    type="primary"
                    onClick={handleSendMessage}>
                    <Send width="20" />
                  </Button>
                </motion.div>
              )}
            </div>
          </>
        )}
      </motion.div>
    </Content>
  );
};

export default ContentMessages;
