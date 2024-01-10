import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.post("/", async (request, response) => {
  try {
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
    } = request.body;

    const card = await prisma.card.create({
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

    return response.status(200).json({ success: true, card });
  } catch (error) {
    return response.status(500);
  }
});

router.get("/", async (request, response) => {
  try {
    const cards = await prisma.card.findMany();

    return response.status(200).json({ success: true, cards });
  } catch (error) {
    return response
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

router.get("/:id", async (request, response) => {
  try {
    const { id } = request.query;

    const card = await prisma.card.findUnique({
      where: { id: Number(id) },
    });

    if (!card) {
      return response
        .status(404)
        .json({ success: false, message: "Card not found" });
    }

    return response.status(200).json({ success: true, card });
  } catch (error) {
    return response
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

router.put("/:id", async (request, response) => {
  try {
    const { id } = request.path as any;
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
    } = request.body;

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
      return response
        .status(404)
        .json({ success: false, message: "Card not found" });
    }

    return response.status(200).json({ success: true, card });
  } catch (error) {
    return response
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.path as any;

    const card = await prisma.card.delete({
      where: { id: Number(id) },
    });

    if (!card) {
      return response
        .status(404)
        .json({ success: false, message: "Card not found" });
    }

    return response
      .status(200)
      .json({ success: true, message: "Card deleted successfully" });
  } catch (error) {
    return response
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

export default router;
