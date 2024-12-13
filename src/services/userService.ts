import { toast } from "sonner";

export interface User {
  id: number;
  name: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

const BASE_URL = "https://jsonplaceholder.typicode.com";

export const fetchUsers = async (page: number = 1): Promise<User[]> => {
  try {
    console.log(`Fetching users for page ${page}`);
    const response = await fetch(`${BASE_URL}/users`);
    if (!response.ok) throw new Error("Failed to fetch users");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    toast.error("Failed to load users. Please try again.");
    return [];
  }
};

export const fetchUserById = async (id: number): Promise<User | null> => {
  try {
    console.log(`Fetching user details for ID: ${id}`);
    const response = await fetch(`${BASE_URL}/users/${id}`);
    if (!response.ok) throw new Error("Failed to fetch user details");
    return await response.json();
  } catch (error) {
    console.error("Error fetching user details:", error);
    toast.error("Failed to load user details. Please try again.");
    return null;
  }
};