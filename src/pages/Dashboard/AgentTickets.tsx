import { tickets } from "../../data/tickets";
import { Table, Select } from "antd";

export default function AgentTickets() {
  const columns = [
    {
      title: "Ticket",
      dataIndex: "title",
    },

    {
      title: "Status",
      render: () => (
        <Select
          defaultValue="Open"
          style={{ width: 150 }}
          options={[
            {
              label: "Open",
              value: "Open",
            },
            {
              label: "In Progress",
              value: "In Progress",
            },
            {
              label: "Resolved",
              value: "Resolved",
            },
            {
              label: "Closed",
              value: "Closed",
            },
          ]}
        />
      ),
    },
  ];

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={tickets}
    />
  );
}