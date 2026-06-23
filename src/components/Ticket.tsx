import { Table, Tag } from "antd";
import { tickets } from "../data/tickets";

export default function TicketTable() {
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },

    {
      title: "Customer",
      dataIndex: "customer",
    },

    {
      title: "Assigned Agent",
      dataIndex: "agent",
    },

    {
      title: "Status",
      dataIndex: "status",
      render: (status: string) => <Tag>{status}</Tag>,
    },

    {
      title: "Priority",
      dataIndex: "priority",
    },
  ];

  return <Table rowKey="id" columns={columns} dataSource={tickets} />;
}
