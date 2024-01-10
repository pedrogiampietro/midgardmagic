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
		const {
			name,
			type,
			attack,
			defense,
			specialAbility,
			rarity,
			image,
			description,
			manaCost,
			expansionSet,
		} = req.body;

		const card = await prisma.card.update({
			where: { id: Number(id) },
			data: {
				name,
				type,
				attack,
				defense,
				specialAbility,
				rarity,
				image,
				description,
				manaCost,
				expansionSet,
			},
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
