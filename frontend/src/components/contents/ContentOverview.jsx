import {
  Layout,
  Tabs,
  theme,
  List,
  Avatar,
  Rate,
  Col,
  Row,
  Pagination,
} from "antd";
import { Content } from "antd/es/layout/layout";
import AssignmentTable from "./AssignmentTable";
import TopCard from "../TopCard";
import { useState, useEffect } from "react";
import ListSkeleton from "../skeletons/ListSkeleton"; // Import ListSkeleton

const ContentOverview = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const users = [
    {
      id: 1,
      name: "John Doe",
      avatar: "https://dummyimage.com/40x40/000/fff",
      review: "John has been doing an excellent job in managing the team.",
      rating: 4,
    },
    {
      id: 2,
      name: "Jane Smith",
      avatar: "https://dummyimage.com/40x40/000/fff",
      review:
        "Jane consistently meets her deadlines and delivers high-quality work.",
      rating: 5,
    },
    {
      id: 3,
      name: "Alice Johnson",
      avatar: "https://dummyimage.com/40x40/000/fff",
      review: "Alice is a great team player and always willing to help others.",
      rating: 4,
    },
    {
      id: 4,
      name: "Bob Brown",
      avatar: "https://dummyimage.com/40x40/000/fff",
      review: "Bob has shown significant improvement in his work performance.",
      rating: 3,
    },
    {
      id: 5,
      name: "Eve Wilson",
      avatar: "https://dummyimage.com/40x40/000/fff",
      review: "Eve is a quick learner and has adapted well to the new project.",
      rating: 4,
    },
    {
      id: 6,
      name: "Chris Lee",
      avatar: "https://dummyimage.com/40x40/000/fff",
      review:
        "Chris has been very proactive in identifying and resolving issues.",
      rating: 5,
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const pageSize = 5;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedUsers = users.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulate a 1-second loading time
  }, []);

  return (
    <Layout>
      <div className="mx-2">
        <TopCard />
      </div>
      <Content
        className="rounded-lg"
        style={{
          margin: "45px 10px",
          padding: 24,
          borderRadius: borderRadiusLG,
          background: colorBgContainer,
        }}>
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              key: "1",
              label: "Recent issues",
              children: <AssignmentTable />,
            },
            {
              key: "2",
              label: "Work reviews",
              children: (
                <Content>
                  <div className="max-h-90 overflow-auto">
                    {loading ? (
                      <ListSkeleton />
                    ) : (
                      <Row gutter={[16, 16]}>
                        {paginatedUsers.map((user) => (
                          <Col xs={24} sm={12} md={8} lg={24} key={user.id}>
                            <List.Item>
                              <List.Item.Meta
                                avatar={<Avatar src={user.avatar} />}
                                title={user.name}
                                description={user.review}
                              />
                              <Rate disabled defaultValue={user.rating} />
                            </List.Item>
                          </Col>
                        ))}
                      </Row>
                    )}
                  </div>
                  <Pagination
                    align="end"
                    current={currentPage}
                    pageSize={pageSize}
                    total={users.length}
                    onChange={handlePageChange}
                    style={{ textAlign: "center", marginTop: "16px" }}
                  />
                </Content>
              ),
            },
          ]}
        />
      </Content>
    </Layout>
  );
};

export default ContentOverview;
