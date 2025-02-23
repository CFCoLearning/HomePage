"use client";

import { api } from "@/convex/_generated/api";
import { useAppKitAccount } from "@reown/appkit/react";
import { useQuery, useMutation } from "convex/react";
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

export default function Profile() {
  const { address, isConnected } = useAppKitAccount();
  const user = useQuery(api.user.getUser, address ? { address } : "skip");

  const [isEditing, setIsEditing] = useState(false);
  const [newUserName, setNewUserName] = useState(user?.userName || "");

  const updateUserNameMutation = useMutation(api.user.updateUserName);

  // Handle the change in username input
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUserName(e.target.value);
  };

  // Show error toast
  const showErrorToast = (title: string, description: string) =>
    toast({
      title,
      description: (
        <div className="mt-2 rounded-md bg-red-950 p-4">
          <p className="text-red-200">{description}</p>
        </div>
      ),
      variant: "destructive",
    });

  // Show success toast
  const showSuccessToast = () =>
    toast({
      title: "Username Updated!",
      description: (
        <div className="mt-2 rounded-md bg-green-950 p-4">
          <p className="text-green-200">
            Your username has been updated successfully.
          </p>
        </div>
      ),
      variant: "default",
    });

  const handleSave = async () => {
    try {
      await updateUserNameMutation({
        address: address || "",
        newUserName,
      });
      showSuccessToast();
      setIsEditing(false);
    } catch (error) {
      showErrorToast("Failed to update username", "Please try again later.");
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      handleSave();
    }
  };

  // Store wallet connection state in localStorage and check it on page load
  useEffect(() => {
    // Check if connection state exists in localStorage
    const storedConnectionState = localStorage.getItem("isConnected");

    if (storedConnectionState === "true" || isConnected) {
      // If already connected or stored state is true, no need to redirect
      return;
    }

    if (!isConnected && storedConnectionState !== "true") {
      // If not connected, redirect to homepage
      window.location.href = "/";
    } else {
      // Store the connection state when it changes
      localStorage.setItem("isConnected", String(isConnected));
    }
  }, [isConnected]);

  return (
    <main className="min-h-screen p-8 pt-32">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl font-bold mb-8">CFC Profile</h1>
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={toggleEdit}
              className="bg-green-500 text-white px-4 py-2 rounded-md"
            >
              {isEditing ? "Save" : "Edit UserName"}
            </button>
          </div>
          <div className="flex items-center space-x-4 mb-4">
            {isEditing ? (
              <input
                type="text"
                value={newUserName}
                onChange={handleUsernameChange}
                className="bg-gray-700 text-white px-3 py-2 rounded-md"
              />
            ) : (
              <h2 className="text-2xl font-semibold">{user?.userName}</h2>
            )}
            <span className="text-gray-400">{address}</span>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-6">Registered Activities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Your Activity Cards */}
        </div>
      </div>
    </main>
  );
}
