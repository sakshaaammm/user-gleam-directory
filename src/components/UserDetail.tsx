import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUserById } from "@/services/userService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Building, Mail, MapPin, Phone, Globe } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: user, isLoading } = useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUserById(Number(id)),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 max-w-2xl">
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto p-4 max-w-2xl text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-4">User Not Found</h2>
        <Button onClick={() => navigate("/")}>Back to Directory</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl animate-fade-in">
      <Button 
        variant="ghost" 
        onClick={() => navigate("/")}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Directory
      </Button>

      <Card>
        <CardHeader className="text-center">
          <Avatar className="w-24 h-24 mx-auto mb-4">
            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-bold mb-2">{user.name}</h1>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="flex items-center">
              <Mail className="mr-2 h-4 w-4 text-primary" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center">
              <Phone className="mr-2 h-4 w-4 text-primary" />
              <span>{user.phone}</span>
            </div>
            <div className="flex items-center">
              <Globe className="mr-2 h-4 w-4 text-primary" />
              <span>{user.website}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2 h-4 w-4 text-primary" />
              <span>
                {user.address.street}, {user.address.suite}<br />
                {user.address.city}, {user.address.zipcode}
              </span>
            </div>
            <div className="flex items-center">
              <Building className="mr-2 h-4 w-4 text-primary" />
              <div>
                <p className="font-semibold">{user.company.name}</p>
                <p className="text-sm text-gray-500">{user.company.catchPhrase}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDetail;