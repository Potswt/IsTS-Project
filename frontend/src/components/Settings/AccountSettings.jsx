import { useState } from "react";
import { Form, Input, Button, Upload, Avatar, message, Row, Col } from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";

const AccountSettings = () => {
  const [form] = Form.useForm();
  const [profilePic, setProfilePic] = useState("https://i.pravatar.cc/150");

  const handleUpload = (info) => {
    if (info.file.status === "done") {
      // Get this url from response in real world.
      const url = URL.createObjectURL(info.file.originFileObj);
      setProfilePic(url);
      message.success(`${info.file.name} อัปโหลดสำเร็จ`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} อัปโหลดล้มเหลว`);
    }
  };

  const handleFinish = (values) => {
    console.log("Form values: ", values);
    message.success("อัปเดตโปรไฟล์สำเร็จ!");
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Form.Item label="รูปโปรไฟล์" style={{ textAlign: "center" }}>
        <Avatar size={64} src={profilePic} icon={<UserOutlined />} />
        <Upload
          name="profilePic"
          showUploadList={false}
          beforeUpload={() => false}
          onChange={handleUpload}>
          <Button
            icon={<UploadOutlined />}
            style={{ marginTop: 16, marginLeft: 8 }}>
            เปลี่ยนรูปโปรไฟล์
          </Button>
        </Upload>
      </Form.Item>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="firstName"
            label="ชื่อจริง"
            rules={[{ required: true, message: "กรุณาใส่ชื่อจริง!" }]}>
            <Input size={"large"} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="lastName"
            label="นามสกุล"
            rules={[{ required: true, message: "กรุณาใส่นามสกุล!" }]}>
            <Input size={"large"} />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        name="email"
        label="อีเมล"
        rules={[{ required: true, message: "กรุณาใส่อีเมล!" }]}>
        <Input size={"large"} />
      </Form.Item>

      <Form.Item
        name="phoneNumber"
        label="เบอร์โทรศัพท์"
        rules={[{ required: true, message: "กรุณาใส่เบอร์โทรศัพท์!" }]}>
        <Input size={"large"} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save Changes
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AccountSettings;
