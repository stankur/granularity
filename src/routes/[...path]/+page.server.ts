import dotenv from 'dotenv';
dotenv.config();

export async function load({ params }) {
	return {
		content: (await fetch(`${process.env.CONTENT_BASE_URL}${params.path}`)).json()
	};
}
