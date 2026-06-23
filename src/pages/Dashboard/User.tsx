import { Table } from "antd";
import { users } from "../../data/user";

export default function Users() {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
  ];

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={users}
    />
  );
}