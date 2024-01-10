import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../prisma';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'DELETE') {
		return res
			.status(405)
			.json({ success: false, message: 'Method not allowed' });
	}

	try {
		const { id } = req.query;

		const deck = await prisma.deck.delete({
			where: { id: Number(id) },
		});

		if (!deck) {
			return res
				.status(404)
				.json({ success: false, message: 'Deck not found' });
		}

		return res
			.status(200)
			.json({ success: true, message: 'Deck deleted successfully' });
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: 'Internal server error' });
	}
}
