import { Form, Input, Button, message } from "antd";

const ChangePassword = () => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    console.log("Form values: ", values);
    message.success("เปลี่ยนรหัสผ่านสำเร็จ!");
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Form.Item
        name="currentPassword"
        label="รหัสผ่านปัจจุบัน"
        rules={[{ required: true, message: "กรุณาใส่รหัสผ่านปัจจุบัน!" }]}>
        <Input.Password size={"large"} />
      </Form.Item>
      <Form.Item
        name="newPassword"
        label="รหัสผ่านใหม่"
        rules={[{ required: true, message: "กรุณาใส่รหัสผ่านใหม่!" }]}>
        <Input.Password size={"large"} />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        label="ยืนยันรหัสผ่าน"
        dependencies={["newPassword"]}
        rules={[
          { required: true, message: "กรุณายืนยันรหัสผ่านใหม่!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("newPassword") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("รหัสผ่านไม่ตรงกัน!"));
            },
          }),
        ]}>
        <Input.Password size={"large"} />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{
            backgroundColor: "#262362",
            transition: "background-color 0.3s",
            border: "none",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#193CB8")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#262362")}>
          Reset Password
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ChangePassword;
