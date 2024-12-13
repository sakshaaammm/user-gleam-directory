import { Routes, Route } from "react-router-dom";
import UserList from "@/components/UserList";
import UserDetail from "@/components/UserDetail";

const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<UserList />} />
      <Route path="/user/:id" element={<UserDetail />} />
    </Routes>
  );
};

export default Index;