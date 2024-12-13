import React from "react";
import { User } from "@/services/userService";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserCardProps {
  user: User;
  onClick: () => void;
}

const UserCard = ({ user, onClick }: UserCardProps) => {
  return (
    <Card 
      className="mb-4 cursor-pointer hover:shadow-lg transition-shadow animate-fade-in"
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar>
          <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h3 className="font-semibold text-lg">{user.name}</h3>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </CardHeader>
      <CardContent className="text-sm text-gray-600">
        <p>{user.company.name}</p>
      </CardContent>
    </Card>
  );
};

export default UserCard;