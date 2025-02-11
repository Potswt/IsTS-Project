import { useState } from "react";
import { Form, Input, Button, message, Layout } from "antd";

const { Content } = Layout;

const ForgotPassword = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleFinish = () => {
    setLoading(true);
    // Simulate an API call
    setTimeout(() => {
      setLoading(false);
      message.success("ลิงก์รีเซ็ตรหัสผ่านถูกส่งไปยังอีเมลของคุณแล้ว!");
    }, 2000);
  };

  return (
    <Layout
      style={{ height: "100vh", width: "100vw", justifyContent: "center" }}>
      <Content
        style={{
          maxWidth: "600px",
          margin: "30px auto",
          padding: "24px",
          borderRadius: "8px",
          background: "#fff",
        }}>
        <h2>ลืมรหัสผ่าน</h2>
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "กรุณากรอกอีเมล!" }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Send Reset Link
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};

export default ForgotPassword;
