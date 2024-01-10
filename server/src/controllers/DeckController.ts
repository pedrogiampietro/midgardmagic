import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.post("/", async (request, response) => {
  try {
    const { userid } = request.headers;

    const deckName = `Deck-${Math.floor(Math.random() * 1000)}`;

    const deck = await prisma.deck.create({
      data: {
        name: deckName,
        userId: Number(userid),
      },
    });

    const allCards = await prisma.card.findMany();

    const selectedCards = [];
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * allCards.length);
      selectedCards.push(allCards[randomIndex]);
      allCards.splice(randomIndex, 1);
    }

    for (const card of selectedCards) {
      await prisma.deck.update({
        where: { id: deck.id },
        data: { cards: { connect: { id: card.id } } },
      });
    }

    const createdDeck = await prisma.deck.findUnique({
      where: { id: deck.id },
      include: { cards: true },
    });

    await prisma.user.update({
      where: { id: Number(userid) },
      data: { firstDeckBox: true },
    });

    return response.status(200).json({ success: true, deck: createdDeck });
  } catch (error) {
    return response
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

router.get("/", async (request, response) => {
  try {
    const { userId } = request.query;

    const deck = await prisma.deck.findMany({
      where: {
        userId: Number(userId),
      },
      include: { cards: true },
    });

    if (!deck) {
      return response
        .status(404)
        .json({ success: false, message: "Deck not found" });
    }

    return response.status(200).json({ success: true, deck });
  } catch (error) {
    return response
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

router.get("/:id", async (request, response) => {
  try {
    const { id } = request.query;

    const deck = await prisma.deck.findUnique({
      where: { id: Number(id) },
      include: { cards: true },
    });

    if (!deck) {
      return response
        .status(404)
        .json({ success: false, message: "Deck not found" });
    }

    return response.status(200).json({ success: true, deck });
  } catch (error) {
    return response
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

router.put("/:id", async (request, response) => {
  try {
    const { id } = request.path as any;
    const { name, userId } = request.body;

    const deck = await prisma.deck.update({
      where: { id: Number(id) },
      data: { name, userId },
    });

    if (!deck) {
      return response
        .status(404)
        .json({ success: false, message: "Deck not found" });
    }

    return response.status(200).json({ success: true, deck });
  } catch (error) {
    return response
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.path as any;

    const deck = await prisma.deck.delete({
      where: { id: Number(id) },
    });

    if (!deck) {
      return response
        .status(404)
        .json({ success: false, message: "Deck not found" });
    }

    return response
      .status(200)
      .json({ success: true, message: "Deck deleted successfully" });
  } catch (error) {
    return response
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

export default router;
