import { authCondition } from "$lib/server/auth";
import { collections } from "$lib/server/database";
import { error } from "@sveltejs/kit";
import { ObjectId } from "mongodb";
import { z } from "zod";

export async function POST({ params, request, locals }) {
	const json = await request.json();

	const { feedback, customComment, score } = z
		.object({
			feedback: z.array(z.string()),
			customComment: z.string().optional(),
			score: z.number().int().min(-1).max(1),
		})
		.parse(json);

	const scoreTyped: -1 | 0 | 1 = score as -1 | 0 | 1;
	const conversationId = new ObjectId(params.id);
	const messageId = params.messageId;

	// Check if the conversation exists and the user is authorized to access it
	const conversation = await collections.conversations.findOne({
		_id: conversationId,
		...authCondition(locals),
	});

	if (!conversation) {
		throw error(403, "Unauthorized to this conversation");
	}

	const res = await collections.feedback.insertOne({
		_id: new ObjectId(),
		createdBy: locals.user?._id ?? locals.sessionId,
		conversationId,
		messageId,
		score: scoreTyped,
		feedback,
		customComment,
	});

	return new Response(
		JSON.stringify({
			feedbackId: res.insertedId.toString(),
		}),
		{ headers: { "Content-Type": "application/json" } }
	);
}
