import React from "react";
import { Link } from "react-router-dom";
import { Button, Result } from "antd";
import { HomeOutlined, RollbackOutlined } from "@ant-design/icons";

function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={[
          <Button
            key="home"
            type="primary"
            icon={<HomeOutlined />}
            component={Link}
            to="/"
            className="mr-4"
          >
            Back to Home
          </Button>,
          <Button
            key="back"
            icon={<RollbackOutlined />}
            onClick={() => window.history.back()}
          >
            Go Back
          </Button>,
        ]}
      />
    </div>
  );
}

export default NotFound;
