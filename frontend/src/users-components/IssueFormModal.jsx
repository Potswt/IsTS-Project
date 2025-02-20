import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { Modal, Form, Input, DatePicker, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import PropTypes from "prop-types";

// Mock employee data
const currentEmployee = {
  id: 1,
  name: "John Doe",
  avatar: "https://i.pravatar.cc/150?img=1",
  department: "IT",
};

const IssueFormModal = ({ visible, onOk, onCancel, editingRecord }) => {
  const [form] = useForm();
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (editingRecord) {
      form.setFieldsValue({
        ...editingRecord,
        date: editingRecord.date ? dayjs(editingRecord.date) : null,
      });
      setFileList(editingRecord.files || []);
    } else {
      form.resetFields();
      setFileList([]);
    }
  }, [editingRecord, form]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      onOk({
        ...values,
        employee: currentEmployee.name,
        department: currentEmployee.department,
        avatar: currentEmployee.avatar,
        files: fileList,
      });
      message.success("เพิ่มข้อมูลปัญหาแล้ว");
    });
  };

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };

  return (
    <Modal
      title={editingRecord ? "แก้ไขปัญหา" : "เพิ่มปัญหา"}
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}>
      <Form form={form} layout="vertical">
        <Form.Item
          name="issue"
          label="ปัญหา"
          rules={[{ required: true, message: "กรุณากรอกปัญหา!" }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="รายละเอียด"
          rules={[{ required: true, message: "กรุณากรอกรายละเอียด!" }]}>
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item
          name="date"
          label="วันที่"
          rules={[{ required: true, message: "กรุณาเลือกวันที่!" }]}>
          <DatePicker />
        </Form.Item>
        <Form.Item label="แนบไฟล์">
          <Upload
            fileList={fileList}
            onChange={handleFileChange}
            beforeUpload={() => false}
            multiple>
            <Button icon={<UploadOutlined />}>เลือกไฟล์</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

IssueFormModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  editingRecord: PropTypes.shape({
    issue: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.string,
    employee: PropTypes.string,
    department: PropTypes.string,
    files: PropTypes.arrayOf(PropTypes.object),
  }),
};

export default IssueFormModal;
