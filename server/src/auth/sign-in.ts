import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        decks: {
          include: {
            cards: true,
          },
        },
      },
    });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return res
        .status(403)
        .json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      "your-secret-key"
    );

    const userWithoutPassword = {
      id: user.id,
      email: user.email,
      name: user.name,
      experience: user.experience,
      level: user.level,
      mana: user.mana,
      ranking: user.ranking,
      stamina: user.stamina,
      avatarUrl: user.avatarUrl,
      avatarBorderUrl: user.avatarBorderUrl,
      firstDeckBox: user.firstDeckBox,
      Decks: user.decks,
    };

    return res
      .status(200)
      .json({ success: true, token, user: userWithoutPassword });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}
