import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers, User } from "@/services/userService";
import UserCard from "./UserCard";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

const UserList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState("");

  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers(),
  });

  const filteredUsers = users.filter((user: User) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUserClick = (userId: number) => {
    navigate(`/user/${userId}`);
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Oops! Something went wrong</h2>
        <p className="text-gray-600">We couldn't load the user directory. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">User Directory</h1>
      
      <Input
        type="search"
        placeholder="Search users..."
        className="mb-6"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {isLoading ? (
        Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="mb-4">
            <Skeleton className="h-[100px] w-full" />
          </div>
        ))
      ) : filteredUsers.length > 0 ? (
        filteredUsers.map((user: User) => (
          <UserCard
            key={user.id}
            user={user}
            onClick={() => handleUserClick(user.id)}
          />
        ))
      ) : (
        <p className="text-center text-gray-500">No users found</p>
      )}
    </div>
  );
};

export default UserList;