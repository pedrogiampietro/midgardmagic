import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  const { userid } = req.headers;

  try {
    // Gera um nome aleatório para o deck
    const deckName = `Deck-${Math.floor(Math.random() * 1000)}`;

    // Cria um novo deck com o nome aleatório
    const deck = await prisma.deck.create({
      data: {
        name: deckName,
        userId: Number(userid),
      },
    });

    // Obtém todas as cartas
    const allCards = await prisma.card.findMany();

    // Seleciona 5 cartas aleatórias
    const selectedCards = [];
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * allCards.length);
      selectedCards.push(allCards[randomIndex]);
      allCards.splice(randomIndex, 1); // Remove a carta selecionada do array
    }

    // Adiciona as cartas selecionadas ao deck
    for (const card of selectedCards) {
      await prisma.deck.update({
        where: { id: deck.id },
        data: { cards: { connect: { id: card.id } } },
      });
    }

    // Retorna o deck criado com as cartas
    const createdDeck = await prisma.deck.findUnique({
      where: { id: deck.id },
      include: { cards: true },
    });

    await prisma.user.update({
      where: { id: Number(userid) },
      data: { firstDeckBox: true },
    });

    return res.status(200).json({ success: true, deck: createdDeck });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}
