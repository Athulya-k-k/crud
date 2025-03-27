"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditTopicForm({ id, title, description, subtitle, author, price }) {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newSubtitle, setNewSubtitle] = useState(subtitle || ""); // Handle empty values
  const [newAuthor, setNewAuthor] = useState(author || "");
  const [newPrice, setNewPrice] = useState(price || "");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newTitle, newDescription, newSubtitle, newAuthor, newPrice }),
      });

      if (!res.ok) {
        throw new Error("Failed to update topic");
      }

      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        onChange={(e) => setNewTitle(e.target.value)}
        value={newTitle}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic Title"
      />
      <input
        onChange={(e) => setNewSubtitle(e.target.value)}
        value={newSubtitle}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic Subtitle"
      />
      <input
        onChange={(e) => setNewAuthor(e.target.value)}
        value={newAuthor}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Author Name"
      />
      <input
        onChange={(e) => setNewPrice(e.target.value)}
        value={newPrice}
        className="border border-slate-500 px-8 py-2"
        type="number"
        placeholder="Price"
      />
      <input
        onChange={(e) => setNewDescription(e.target.value)}
        value={newDescription}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic Description"
      />

      <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
        Update Topic
      </button>
    </form>
  );
}
