import { useEffect } from "react";
import { Modal, Form, Input, DatePicker, Select, Tag } from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const { Option } = Select;

const statusColors = {
  เสร็จสิ้น: "green", // Resolved
  รอดำเนินการ: "orange", // Pending
  กำลังดำเนินการ: "blue", // In Progress
  ถูกปฏิเสธ: "red", // Rejected
};

const IssueModal = ({ visible, onOk, onCancel, editingRecord }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editingRecord) {
      form.setFieldsValue({
        ...editingRecord,
        date: editingRecord.date ? dayjs(editingRecord.date) : null,
      });
    } else {
      form.resetFields();
    }
  }, [editingRecord, form]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      onOk(values);
    });
  };

  return (
    <Modal
      title={editingRecord ? "Edit Issue" : "Add Issue"}
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}>
      <Form form={form} layout="vertical">
        <Form.Item name="id" label="Issue ID">
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="issue"
          label="Issue"
          rules={[{ required: true, message: "Please input the issue!" }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="date"
          label="Date"
          rules={[{ required: true, message: "Please select the date!" }]}>
          <DatePicker />
        </Form.Item>
        <Form.Item
          name="employee"
          label="Employee"
          rules={[{ required: true, message: "Please input the employee!" }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: "Please select the status!" }]}>
          <Select>
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
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default IssueModal;
