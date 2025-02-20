import { useState } from "react";
import { Layout, Button, Input, theme } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import IssueFormModal from "./IssueFormModal";
import IssueCard from "./IssueCard";
import { Content } from "antd/es/layout/layout";
import dayjs from "dayjs"; // Import dayjs

const IssuesReport = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [issues, setIssues] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingIssue, setEditingIssue] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddIssue = () => {
    setEditingIssue(null);
    setIsModalVisible(true);
  };

  const handleEditIssue = (issue) => {
    setEditingIssue(issue);
    setIsModalVisible(true);
  };

  const handleDeleteIssue = (issue) => {
    setIssues(issues.filter((i) => i !== issue));
  };

  const handleModalOk = (issue) => {
    const formattedIssue = {
      ...issue,
      date: dayjs(issue.date).format("YYYY-MM-DD HH:mm:ss"), // Format the date
      status: editingIssue ? editingIssue.status : "รอดำเนินการ", // Default status for new issues
      avatar: editingIssue
        ? editingIssue.avatar
        : "https://i.pravatar.cc/150?img=1", // Default avatar for new issues
      department: "IT", // Use the department from the current employee data
    };

    if (editingIssue) {
      setIssues(
        issues.map((i) =>
          i === editingIssue ? { ...i, ...formattedIssue } : i
        )
      );
    } else {
      setIssues([...issues, { ...formattedIssue, id: issues.length + 1 }]);
    }
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const filteredIssues = issues.filter((issue) =>
    issue.issue.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <Content
        className="rounded-lg"
        style={{
          height: "75vh",
          margin: "3px 10px",
          padding: 24,
          borderRadius: borderRadiusLG,
          background: colorBgContainer,
          overflowY: "auto", // Enable vertical scrolling
        }}>
        <div className="sticky top-0 bg-white z-30">
          <div className="flex justify-center items-center mb-4">
            <Input
              placeholder="ค้นหาปัญหา"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: "300px", marginRight: "10px" }}
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddIssue}
              style={{ marginLeft: "auto" }}>
              เพิ่มปัญหา
            </Button>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {filteredIssues.map((issue) => (
              <IssueCard
                key={issue.id}
                issue={issue}
                onEdit={handleEditIssue}
                onDelete={handleDeleteIssue}
              />
            ))}
          </div>
        </div>
        <IssueFormModal
          visible={isModalVisible}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
          editingRecord={editingIssue}
          key={editingIssue ? editingIssue.id : "new"}
        />
      </Content>
    </Layout>
  );
};

export default IssuesReport;
