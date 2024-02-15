import { Tabs } from "flowbite-react";
import Login from "./LoginForm";
import Register from "./RegisterForm";

export default function FormTab() {
  return (
    <div className="mt-6">
      <Tabs aria-label="Full width tabs" style="fullWidth">
        <Tabs.Item active title="Login">
          <Login />
        </Tabs.Item>
        <Tabs.Item title="Register">
          <Register />
        </Tabs.Item>
      </Tabs>
    </div>
  );
}
