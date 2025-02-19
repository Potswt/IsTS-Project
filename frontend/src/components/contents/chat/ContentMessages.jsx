import { theme, Input, Button, Upload } from "antd";
import { Content } from "antd/es/layout/layout";
import { useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatSidebar from "./ChatSidebar";
import NoChatSelected from "./NoChatSelect";
import { Send, Paperclip, X } from "lucide-react";
import { useMediaQuery } from "react-responsive";
import { motion } from "framer-motion"; // Import framer-motion for animations

const ContentMessages = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [file, setFile] = useState(null);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  // Handle user selection from the sidebar
  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setMessages([]); // Clear messages when a new user is selected
  };

  // Clear the selected user
  const handleClearUser = () => {
    setSelectedUser(null);
  };

  // Handle sending a message
  const handleSendMessage = () => {
    if (message.trim() || file) {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        file: file ? URL.createObjectURL(file) : null,
        sender: "me",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages([...messages, newMessage]);
      setMessage("");
      setFile(null);
    }
  };

  // Handle file attachment
  const handleAttachFile = (file) => {
    setFile(file);
    return false; // Prevent default upload behavior
  };

  // Remove the attached file
  const handleRemoveFile = () => {
    setFile(null);
  };

  // Handle pressing the Enter key to send a message
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
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
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Add drop shadow
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
          // Display sidebar only on mobile when no user is selected
          <div style={{ height: "100%", overflow: "hidden" }}>
            <ChatSidebar onSelectUser={handleSelectUser} />
          </div>
        ) : (
          <>
            {!isMobile && (
              // Display sidebar on larger screens
              <div style={{ height: "100%", overflow: "hidden" }}>
                <ChatSidebar onSelectUser={handleSelectUser} />
              </div>
            )}
            <div className="flex-1 flex flex-col">
              {selectedUser && (
                // Display chat header when a user is selected
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
                  flexDirection: "column",
                  padding: "16px",
                }}>
                {!selectedUser && <NoChatSelected />}
                {selectedUser && (
                  // Display messages when a user is selected
                  <div>
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        style={{
                          display: "flex",
                          justifyContent:
                            msg.sender === "me" ? "flex-end" : "flex-start",
                          marginBottom: "8px",
                        }}>
                        <div
                          style={{
                            background:
                              msg.sender === "me" ? "#262362" : "#f1f1f1",
                            color: msg.sender === "me" ? "#fff" : "#000",
                            padding: "8px 16px",
                            borderRadius: "16px",
                            maxWidth: "60%",
                          }}>
                          <p style={{ margin: 0 }}>{msg.text}</p>
                          {msg.file && (
                            <a
                              href={msg.file}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                display: "block",
                                marginTop: "8px",
                                color: msg.sender === "me" ? "#fff" : "#000",
                              }}>
                              View Attachment
                            </a>
                          )}
                          <span
                            style={{
                              fontSize: "12px",
                              color: msg.sender === "me" ? "#ccc" : "#888",
                            }}>
                            {msg.timestamp}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
              {selectedUser && (
                // Display input area when a user is selected
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
                  {file && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginRight: 5,
                      }}>
                      <span>{file.name}</span>
                      <Button
                        type="text"
                        icon={<X />}
                        onClick={handleRemoveFile}
                        style={{ marginLeft: 5 }}
                      />
                    </div>
                  )}
                  <Input
                    size="middle"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onPressEnter={handleKeyPress}
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
