import {
  Button,
  Form,
  Input,
  Select,
} from "antd";

export default function CreateTicket() {
  return (
    <Form layout="vertical">
      <Form.Item label="Title">
        <Input />
      </Form.Item>

      <Form.Item label="Description">
        <Input.TextArea rows={5} />
      </Form.Item>

      <Form.Item label="Priority">
        <Select
          options={[
            {
              label: "Low",
              value: "Low",
            },
            {
              label: "Medium",
              value: "Medium",
            },
            {
              label: "High",
              value: "High",
            },
          ]}
        />
      </Form.Item>

      <Button type="primary">
        Submit Ticket
      </Button>
    </Form>
  );
}