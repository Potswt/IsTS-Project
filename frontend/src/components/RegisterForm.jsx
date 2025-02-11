import { Button, Form, Input, Select, message } from "antd";
import { useNavigate } from "react-router";
import { useState } from "react";

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
      span: 14,
    },
  },
};

const RegisterForm = () => {
  const [form] = Form.useForm();
  const variant = Form.useWatch("variant", form);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    employeeId: "",
    department: "",
    position: "",
    email: "",
    password: "",
    confirmPassword: "",
    phonenumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (value, name) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const departmentOptions = [
    { label: "HR", value: "hr" },
    { label: "Engineering", value: "engineering" },
    { label: "Marketing", value: "marketing" },
    { label: "Sales", value: "sales" },
    { label: "Finance", value: "finance" },
    { label: "IT", value: "it" },
    { label: "Operation", value: "operation" },
    { label: "Admin", value: "admin" },
    { label: "Others", value: "others" },
  ];

  const positionOptions = [
    { label: "Manager", value: "manager" },
    { label: "Team Lead", value: "team_lead" },
    { label: "Senior Developer", value: "senior_developer" },
    { label: "Junior Developer", value: "junior_developer" },
    { label: "Intern", value: "intern" },
    // Add more positions as needed
  ];

  const employeeIdOptions = [
    { label: "101", value: "101" },
    { label: "102", value: "102" },
    { label: "103", value: "103" },
    // Add more employee IDs as needed
  ];

  const checkRequiredFields = () => {
    const {
      firstName,
      lastName,
      employeeId,
      department,
      position,
      email,
      password,
      confirmPassword,
      phonenumber,
    } = formData;
    if (
      !firstName ||
      !lastName ||
      !employeeId ||
      !department ||
      !position ||
      !email ||
      !password ||
      !confirmPassword ||
      !phonenumber
    ) {
      message.error("กรุณากรอกข้อมูลให้ครบทุกช่อง");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (checkRequiredFields()) {
      try {
        const response = await fetch("https://api.example.com/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          const data = await response.json();
          console.log("Form submitted successfully:", data);
          navigate("/success"); // Navigate to success page
        } else {
          console.error("Form submission failed:", response.statusText);
          message.error("การส่งแบบฟอร์มล้มเหลว กรุณาลองใหม่อีกครั้ง");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        message.error("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
      }
    }
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
      <div className="mt-2 mb-10 flex justify-center items-center">
        <span className="text-black text-[22px] font-normal">
          Register
          <img
            src="/src/assets/jib-logo-2.png"
            className="w-10 inline-block ml-2 "
          />
        </span>
      </div>
      <div className="overflow-auto" style={{ height: "400px" }}>
        <div className="gap-4 grid lg:grid-cols-2 mb-4">
          <label>
            <p className="mb-2">ชื่อ</p>
            <Input
              placeholder="ชื่อ"
              size="large"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </label>
          <label>
            <p className="mb-2">นามสกุล</p>
            <Input
              placeholder="นามสกุล"
              size="large"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="gap-4 grid lg:grid-cols-1 mb-4">
          <label className="grid lg:grid-cols-1">
            <p className="mb-2">รหัสพนักงาน</p>
            <Select
              showSearch
              placeholder="กรุณาเลือกรหัสพนักงาน"
              optionFilterProp="label"
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              size="large"
              value={formData.employeeId}
              onChange={(value) => handleSelectChange(value, "employeeId")}
              options={employeeIdOptions}
            />
          </label>
          <label className="grid lg:grid-cols-1">
            <p className="mb-2">เลือกแผนก</p>
            <Select
              showSearch
              placeholder="กรุณาเลือกแผนก"
              optionFilterProp="label"
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              size="large"
              value={formData.department}
              onChange={(value) => handleSelectChange(value, "department")}
              options={departmentOptions}
            />
          </label>
          <label className="grid lg:grid-cols-1">
            <p className="mb-2">เลือกตำแหน่ง</p>
            <Select
              showSearch
              placeholder="กรุณาเลือกตำแหน่ง"
              optionFilterProp="label"
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              size="large"
              value={formData.position}
              onChange={(value) => handleSelectChange(value, "position")}
              options={positionOptions}
            />
          </label>
          <label className="grid lg:grid-cols-1">
            <p className="mb-2">เบอร์โทรศัพท์</p>
            <Input
              type="phonenumber"
              placeholder="กรอกเบอร์โทรศัพท์"
              size="large"
              name="phonenumber"
              value={formData.phonenumber}
              onChange={handleChange}
            />
          </label>
          <label>
            <p className="mb-2">Email</p>
            <Input
              type="email"
              placeholder="email@gmail.com"
              className="mt-4"
              size="large"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          <label className="grid lg:grid-cols-1">
            <p className="mb-2">รหัสผ่าน</p>
            <Input
              type="password"
              placeholder="กรอกรหัสผ่าน"
              size="large"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>
          <label className="grid lg:grid-cols-1">
            <p className="mb-2">ยืนยันรหัสผ่าน</p>
            <Input
              type="password"
              placeholder="ยืนยันรหัสผ่าน"
              size="large"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </label>
        </div>
      </div>

      <div className="gap-2 grid lg:grid-cols-2 mt-15 mb-6">
        <Button onClick={() => navigate("/login")} size={"large"}>
          Cancel
        </Button>
        <Button
          type="primary"
          style={{
            backgroundColor: "#262362",
            transition: "background-color 0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#193CB8")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#262362")}
          size={"large"}
          onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </Form>
  );
};
export default RegisterForm;
