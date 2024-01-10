import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const router = express.Router();
const saltRounds = 10;

router.post("/sign-up", async (request, response) => {
  const { email, password, name } = request.body;

  if (!email || !password || !name)
    response
      .status(400)
      .json("Nome, e-mail, senha e name são obrigatórios para cadastro");

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return response
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    return response.status(201).json({ success: true, user });
  } catch (error) {
    return response.status(500);
  }
});

router.post("/sign-in", async (request: Request, response: Response) => {
  const { email, password } = request.body;

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
      return response
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return response
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

    return response
      .status(200)
      .json({ success: true, token, user: userWithoutPassword });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

router.post("/sign-out", async (request, response) => {
  const { userId } = request.body;

  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        isOnline: false,
      },
    });

    response.status(200).json("Logout realizado com sucesso.");
  } catch (err) {
    response.status(500).json(err);
  }
});

export default router;
