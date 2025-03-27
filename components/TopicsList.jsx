"use client";

import { useState, useEffect } from "react";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
import Link from "next/link";

const getTopics = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/topics", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
    return { topics: [] }; // Return empty array in case of error
  }
};

export default function TopicsList() {
  const [topics, setTopics] = useState([]); // Stores full list
  const [filteredTopics, setFilteredTopics] = useState([]); // Stores displayed list
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchData() {
      const { topics } = await getTopics();
      setTopics(topics);
      setFilteredTopics(topics); // Initialize displayed list
    }
    fetchData();
  }, []);

  // 🔍 Search function (filters topics based on input)
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredTopics(topics); // Reset if search is empty
    } else {
      const lowerQuery = query.toLowerCase();
      const filtered = topics.filter((t) =>
        t.title.toLowerCase().includes(lowerQuery)
      );
      setFilteredTopics(filtered);
    }
  };

  // 🗑 Remove topic from both lists after deletion
  const handleDelete = (id) => {
    const updatedTopics = topics.filter((t) => t._id !== id);
    setTopics(updatedTopics);
    setFilteredTopics(updatedTopics.filter((t) => 
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) 
    ));
  };

  return (
    <div className="container mx-auto p-4">
      {/* 🔍 Search Input */}
      <input
        type="text"
        placeholder="Search topics..."
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
      />

      <table className="min-w-full border border-gray-300 shadow-md bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-3 text-left">Title</th>
            <th className="border p-3 text-left">Subtitle</th>
            <th className="border p-3 text-left">Author</th>
            <th className="border p-3 text-left">Price</th>
            <th className="border p-3 text-left">Description</th>
            <th className="border p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTopics.length > 0 ? (
            filteredTopics.map((t) => (
              <tr key={t._id} className="border hover:bg-gray-50">
                <td className="border p-3">{t.title}</td>
                <td className="border p-3">{t.subtitle}</td>
                <td className="border p-3">{t.author}</td>
                <td className="border p-3">${t.price}</td>
                <td className="border p-3" title={t.description}>
                  {t.description.length > 50
                    ? `${t.description.substring(0, 50)}...`
                    : t.description}
                </td>
                <td className="border p-3 text-center flex justify-center gap-4">
                  <RemoveBtn id={t._id} onDelete={handleDelete} />
                  <Link href={`/editTopic/${t._id}`} className="text-blue-500">
                    <HiPencilAlt size={24} />
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="border p-3 text-center">
                No matching topics found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
