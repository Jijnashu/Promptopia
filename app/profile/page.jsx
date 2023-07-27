"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";
export default function MyProfile() {
  const { data: session } = useSession();
  //   const router = useRouter();
  const [posts, setPosts] = useState([]);
  //   console.log(session?.user.id);
  const router = useRouter();
  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };
    if (session?.user.id) fetchPost();
  }, []);
  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete");
    if (!hasConfirmed) {
      return;
    }
    try {
      await fetch(`/api/prompt/${post._id}`, { method: "DELETE" });
      const filteredPost = posts.filter((p) => p._id !== post._id);
      setPosts(filteredPost);
    } catch (err) {
      console.log(err);
    }
  };
  //   console.log(post);
  //   if (!session) {
  //     return router.push("/");
  //   }
  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}
