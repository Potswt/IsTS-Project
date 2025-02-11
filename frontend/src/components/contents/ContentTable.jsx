import { useState, useEffect } from "react";
import {
  Layout,
  Table,
  Input,
  Button,
  Space,
  Dropdown,
  message,
  Select,
  Tag,
  Skeleton,
  DatePicker,
  theme,
  Avatar,
  Modal,
} from "antd";
import {
  SearchOutlined,
  EllipsisOutlined,
  CheckCircleOutlined,
  SyncOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  MessageOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import IssueModal from "./IssueModal"; // Import the new component
import { Link } from "react-router"; // Import Link from react-router-dom

const { Content } = Layout;
const { Option } = Select;
const { confirm } = Modal;

const ContentTable = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  const fetchData = () => {
    setLoading(true);
    // Simulate data fetching
    setTimeout(() => {
      setDataSource(
        Array.from({ length: 46 }).map((_, i) => ({
          key: i,
          id: `101 ${i}`,
          issue: "Login failure",
          date: "2025-02-05",
          employee: "John Doe",
          profilePic: `https://i.pravatar.cc/150?img=${i}`, // Add profile picture URL
          status: "เสร็จสิ้น", // Resolved in Thai
        }))
      );
      setLoading(false);
    }, 1000); // Simulate a 1-second loading time
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}>
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const getColumnDateSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <DatePicker
          onChange={(date, dateString) =>
            setSelectedKeys(dateString ? [dateString] : [])
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}>
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex] ? record[dataIndex].toString().includes(value) : "",
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const handleStatusChange = (key, newStatus) => {
    const newData = dataSource.map((item) => {
      if (item.key === key) {
        return { ...item, status: newStatus };
      }
      return item;
    });
    setDataSource(newData);
    message.success(`Status changed to ${newStatus}`);
  };

  const handleDelete = (key) => {
    confirm({
      title: "Are you sure you want to delete this item?",
      onOk() {
        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
        message.success("Request deleted successfully");
      },
    });
  };

  const handleReject = (key) => {
    const newData = dataSource.map((item) => {
      if (item.key === key) {
        return { ...item, status: "ถูกปฏิเสธ" }; // Rejected in Thai
      }
      return item;
    });
    setDataSource(newData);
    message.success("Issue rejected successfully");
  };

  const showModal = (record) => {
    setEditingRecord(record);
    setIsModalVisible(true);
  };

  const handleOk = (values) => {
    const newData = [...dataSource];
    const formattedValues = {
      ...values,
      date: values.date ? values.date.format("YYYY-MM-DD") : null,
    };
    if (editingRecord) {
      const index = newData.findIndex((item) => item.key === editingRecord.key);
      newData[index] = { ...editingRecord, ...formattedValues };
    } else {
      const newId = `101 ${dataSource.length + 1}`; // Auto-generate Issue ID
      newData.push({ ...formattedValues, id: newId, key: dataSource.length });
    }
    setDataSource(newData);
    setIsModalVisible(false);
    setEditingRecord(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingRecord(null);
  };

  const handleAdd = () => {
    setEditingRecord(null);
    setIsModalVisible(true);
  };

  const statusColors = {
    เสร็จสิ้น: "green", // Resolved
    รอดำเนินการ: "orange", // Pending
    กำลังดำเนินการ: "blue", // In Progress
    ถูกปฏิเสธ: "red", // Rejected
  };

  const columns = [
    {
      title: "Issue ID",
      dataIndex: "id",
      key: "id",
      ...getColumnSearchProps("id"),
    },
    {
      title: "Issue",
      dataIndex: "issue",
      key: "issue",
      ...getColumnSearchProps("issue"),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      ...getColumnDateSearchProps("date"),
    },
    {
      title: "Employee",
      dataIndex: "employee",
      key: "employee",
      ...getColumnSearchProps("employee"),
      render: (text, record) => (
        <Space>
          <Avatar src={record.profilePic} />
          {text}
          <Link to={"/messages"}>
            <Button icon={<MessageOutlined />} />
          </Link>
        </Space>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <Select
          value={text}
          style={{ width: 120 }}
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
      ),
    },
    {
      title: "Actions",
      key: "6",
      render: (_, record) => (
        <Space>
          <Button onClick={() => showModal(record)} icon={<EditOutlined />} />
          <Button onClick={() => handleDelete(record.key)} danger>
            <DeleteOutlined />
          </Button>
          <Dropdown
            menu={{
              items: [
                {
                  key: "1",
                  label: "Reject Issue",
                  danger: true,
                  onClick: () => handleReject(record.key),
                },
              ],
            }}>
            <Button icon={<EllipsisOutlined />} />
          </Dropdown>
        </Space>
      ),
    },
  ];

  return (
    <Layout>
      <Content
        style={{
          margin: "30px 16px",
          padding: 24,
          borderRadius: borderRadiusLG,
          background: colorBgContainer,
        }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            type="primary"
            onClick={handleAdd}
            style={{ marginBottom: 16 }}>
            <PlusCircleOutlined /> Add Issue
          </Button>
          <Button
            type="primary"
            onClick={fetchData}
            style={{ marginBottom: 16 }}>
            <ReloadOutlined />
          </Button>
        </div>
        {loading ? (
          <Skeleton active />
        ) : (
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={{ pageSize: 10 }}
            scroll={{ x: "max-content", y: 450 }} // Add horizontal and vertical scroll
          />
        )}
        <IssueModal
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          editingRecord={editingRecord}
        />
      </Content>
    </Layout>
  );
};

export default ContentTable;
