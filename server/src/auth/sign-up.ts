import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../prisma';
import bcrypt from 'bcrypt';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST') {
		return res
			.status(405)
			.json({ success: false, message: 'Method not allowed' });
	}

	const { email, password, name } = req.body;

	try {
		// Verificar se o usuário já existe
		const existingUser = await prisma.user.findUnique({
			where: {
				email: email,
			},
		});

		if (existingUser) {
			return res
				.status(400)
				.json({ success: false, message: 'User already exists' });
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await prisma.user.create({
			data: {
				email,
				name,
				password: hashedPassword,
			},
		});

		return res.status(201).json({ success: true, user });
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: 'Internal server error' });
	}
}
