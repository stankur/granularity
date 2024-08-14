import { OpenAIEmbeddings } from '@langchain/openai';
import { json } from '@sveltejs/kit';

import dotenv from 'dotenv';
dotenv.config();

interface Body {
	snippet: string;
	sources: string[];
}
const embeddings = new OpenAIEmbeddings();

export async function POST({ request }) {
	console.log(request);
	const { snippet } = (await request.json()) as Body;

	const embedding = await embeddings.embedQuery(snippet);

	return json({ embedding });
}
