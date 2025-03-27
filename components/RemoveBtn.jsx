"use client";

import { HiOutlineTrash } from "react-icons/hi";

export default function RemoveBtn({ id, onDelete }) {
  const removeTopic = async () => {
    if (!confirm("Are you sure you want to delete this topic?")) return;

    try {
      const res = await fetch(`http://localhost:3000/api/topics?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        onDelete(id); // Update the state in TopicsList
      } else {
        throw new Error("Failed to delete topic");
      }
    } catch (error) {
      console.error("Error deleting topic:", error);
    }
  };

  return (
    <button onClick={removeTopic} className="text-red-400">
      <HiOutlineTrash size={24} />
    </button>
  );
}
