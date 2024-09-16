import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({ content: String });

const Message = mongoose.model("messages", MessageSchema);

export async function getAll() {
	const rows = await Message.find();
	return rows;
}
