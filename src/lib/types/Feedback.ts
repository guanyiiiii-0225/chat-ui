import type { ObjectId } from "mongodb";
import type { User } from "./User";
import type { Conversation } from "./Conversation";
import type { Message } from "./Message";

export type Feedback = {
	_id: ObjectId;
	createdBy: User["_id"];
	conversationId: Conversation["_id"];
	messageId: Message["id"];
	score: -1 | 0 | 1;
	feedback: string[];
	customComment?: string;
};
