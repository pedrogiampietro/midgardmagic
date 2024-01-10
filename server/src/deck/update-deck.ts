import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../prisma';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'PUT') {
		return res
			.status(405)
			.json({ success: false, message: 'Method not allowed' });
	}

	try {
		const { id } = req.query;
		const { name, userId } = req.body;

		const deck = await prisma.deck.update({
			where: { id: Number(id) },
			data: { name, userId },
		});

		if (!deck) {
			return res
				.status(404)
				.json({ success: false, message: 'Deck not found' });
		}

		return res.status(200).json({ success: true, deck });
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: 'Internal server error' });
	}
}
