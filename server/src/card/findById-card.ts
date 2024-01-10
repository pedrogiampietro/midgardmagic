import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../prisma';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'GET') {
		return res
			.status(405)
			.json({ success: false, message: 'Method not allowed' });
	}

	try {
		const { id } = req.query;

		const card = await prisma.card.findUnique({
			where: { id: Number(id) },
		});

		if (!card) {
			return res
				.status(404)
				.json({ success: false, message: 'Card not found' });
		}

		return res.status(200).json({ success: true, card });
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: 'Internal server error' });
	}
}
