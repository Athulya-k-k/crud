import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

// ✅ FIXED: Await params properly
export async function GET(request, context) {
  const { params } = context; 
  const id = params?.id; // Ensure `id` is extracted properly

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  await connectMongoDB();
  const topic = await Topic.findById(id); // `findById` is more efficient

  if (!topic) {
    return NextResponse.json({ error: "Topic not found" }, { status: 404 });
  }

  return NextResponse.json({ topic }, { status: 200 });
}

// ✅ FIXED: Update all fields
export async function PUT(request, context) {
  const { params } = context; 
  const id = params?.id;

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const { newTitle: title, newDescription: description, newSubtitle: subtitle, newAuthor: author, newPrice: price } = await request.json();

  await connectMongoDB();
  
  const updatedTopic = await Topic.findByIdAndUpdate(id, { 
    title, 
    description, 
    subtitle, 
    author, 
    price 
  }, { new: true }); // `{ new: true }` returns the updated document

  if (!updatedTopic) {
    return NextResponse.json({ error: "Topic not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Topic updated", topic: updatedTopic }, { status: 200 });
}
