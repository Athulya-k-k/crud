import EditTopicForm from "@/components/EditTopicForm";

const getTopicById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topic");
    }

    return res.json();
  } catch (error) {
    console.log(error);
    return { topic: null }; // Return null in case of an error
  }
};

export default async function EditTopic({ params }) {
  const { id } = params;
  const { topic } = await getTopicById(id);

  if (!topic) {
    return <div className="text-red-500">Error loading topic</div>;
  }

  // Destructure all necessary fields
  const { title, subtitle, author, price, description } = topic;

  return (
    <EditTopicForm
      id={id}
      title={title}
      subtitle={subtitle}
      author={author}
      price={price}
      description={description}
    />
  );
}
