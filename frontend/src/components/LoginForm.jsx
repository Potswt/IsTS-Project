import { Button, Checkbox, Input, Form } from "antd";
import { Link } from "react-router";
import { useState } from "react";

const onChange = (e) => {
  console.log(`checked = ${e.target.checked}`);
};

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 24,
    },
  },
};

const LoginForm = () => {
  const [form] = Form.useForm();
  const [error, setError] = useState("");
  const variant = Form.useWatch("variant", form);

  const handleLogin = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Success:", values);
        setError("");
        // Call the API to login
        fetch("https://api.example.com/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              console.log("Login successful:", data);
              // Redirect or perform other actions on successful login
            } else {
              setError(data.message || "Login failed");
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            setError("An error occurred. Please try again.");
          });
      })
      .catch((errorInfo) => {
        console.log("Failed:", errorInfo);
        setError("กรุณากรอกข้อมูลให้ครบถ้วน");
      });
  };

  return (
    <Form
      className="w-80 max-w-md p-4"
      {...formItemLayout}
      form={form}
      variant={variant || "filled"}
      initialValues={{
        variant: "filled",
      }}>
      <div className="text-2xl font-semibold mb-6 ">
        <span className="text-[#757575] text-sm font-normal">
          ยินดีต้อนรับ Issue Support and Tracking System!
        </span>

        <h1 className="text-[#333333] text-[22px] font-normal">
          ล็อกอินเข้าสู่ระบบ
        </h1>
      </div>

      {/* รหัสพนักงาน */}
      <div className="mb-4">
        <p className="mb-2">รหัสพนักงาน</p>
        <Form.Item
          name="employeeId"
          rules={[{ required: true, message: "กรุณากรอกรหัสพนักงาน" }]}>
          <Input type="text" placeholder="กรอกรหัสพนักงาน" size={"large"} />
        </Form.Item>
      </div>
      {/* รหัสผ่าน */}
      <div className="mb-4">
        <p className="mb-2">รหัสผ่าน</p>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "กรุณากรอกรหัสผ่าน" }]}>
          <Input type="password" placeholder="กรอกรหัสผ่าน" size={"large"} />
        </Form.Item>
      </div>
      {/* Remember Me */}
      <div className="mb-4">
        <Checkbox onChange={onChange}>Remember me</Checkbox>
      </div>
      {/* Error Message */}
      {error && <div className="mb-4 text-red-500">{error}</div>}
      {/* ปุ่ม Login */}
      <div className="mb-4">
        <Button
          type="primary"
          style={{
            backgroundColor: "#262362",
            transition: "background-color 0.3s",
            border: "none",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#193CB8")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#262362")}
          size={"large"}
          block
          onClick={handleLogin}>
          Login
        </Button>
      </div>
      {/* ลิงก์ Create Account และ Forgot Password */}
      <div className="flex justify-between text-sm text-blue-500 mt-5">
        <Link to="/register">ลงทะเบียน</Link>
        <Link to="/forgot-password">ลืมรหัสผ่าน?</Link>
      </div>
    </Form>
  );
};

export default LoginForm;
