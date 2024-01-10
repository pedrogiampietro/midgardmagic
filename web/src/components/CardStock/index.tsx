"use client";

import { useState } from "react";
import styled from "styled-components";

const StyledCardGame = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledDeck = styled.div`
  width: 200px;
`;

const StyledCardList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const StyledCard = styled.li`
  cursor: pointer;
  margin-bottom: 1rem;
  padding: 8px;
  border-radius: 8px;
  position: relative;
  transition: transform 0.3s;
  overflow: hidden;

  &.lendary {
    box-shadow: 0px 8px 8px rgba(255, 215, 0, 0.3);
  }

  &.epic {
    box-shadow: 0px 8px 8px rgba(138, 43, 226, 0.3);
  }

  &.rare {
    box-shadow: 0px 8px 8px rgba(255, 69, 0, 0.3);
  }

  &.common {
    box-shadow: 0px 8px 8px rgba(52, 152, 219, 0.3);
  }

  &:hover {
    transform: scale(1.05);
  }
`;

const StyledCardInfo = styled.div`
  flex: 1;
  padding: 0 16px;
`;

const StyledCardDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledCircles = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 10px;
  position: relative;
`;

const StyledCircle = styled.div<{ side: string }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  position: absolute;
  top: 262px;
  left: ${(props) => (props.side === "left" ? "-82px" : "auto")};
  right: ${(props) => (props.side === "right" ? "-75px" : "auto")};
`;

const StyledValue = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 12px;
`;

const StyledCardImage = styled.img`
  max-width: 200px;
`;

const StyledSpecialAbility = styled.p`
  font-style: italic;
  font-weight: bold;
  color: #2ecc71;
  margin-top: -114px;
`;

const StyledDescription = styled.p`
  width: 115px;
  color: #000;

  font-size: 8px;
  margin-top: 10px;
`;

// Componente principal
export function CardStock({ data }: any) {
  const [selectedCard, setSelectedCard] = useState<any>(null);

  // Use os dados reais do deck
  const deck = data?.Decks?.[0]?.cards || [];

  // Contadores de criaturas e não criaturas
  const creatureCount = deck.filter(
    (card: any) => card.type === "Criatura"
  ).length;
  const nonCreatureCount = deck.length - creatureCount;

  // Manipulador de clique em uma carta
  const handleCardClick = (card: any) => {
    setSelectedCard(card);
  };

  return (
    <StyledCardGame>
      <StyledDeck>
        <h2>Deck</h2>
        <StyledCardList>
          {deck.map((card: any) => (
            <StyledCard
              key={card.id}
              onClick={() => handleCardClick(card)}
              className={card.rarity.toLowerCase()}
            >
              {card.name}
            </StyledCard>
          ))}
        </StyledCardList>
      </StyledDeck>
      <StyledCardInfo>
        <h2>Card Counts</h2>
        <p>Creatures: {creatureCount}</p>
        <p>Non-Creatures: {nonCreatureCount}</p>
      </StyledCardInfo>
      {selectedCard && (
        <StyledCardDetails>
          <h2>{selectedCard.name}</h2>
          {/* Adicionando círculos de ataque e defesa sobre a imagem */}
          <StyledCircles>
            <StyledCircle color="red" side="left">
              <StyledValue>{selectedCard.attack}</StyledValue>
            </StyledCircle>
            <StyledCircle color="blue" side="right">
              <StyledValue>{selectedCard.defense}</StyledValue>
            </StyledCircle>
          </StyledCircles>
          <StyledCardImage src={selectedCard.image} alt={selectedCard.name} />
          <StyledSpecialAbility>
            {selectedCard.specialAbility}
          </StyledSpecialAbility>
          <StyledDescription>{selectedCard.description}</StyledDescription>
          {selectedCard.link && (
            <p>
              Link:{" "}
              <a
                href={selectedCard.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {selectedCard.link}
              </a>
            </p>
          )}
        </StyledCardDetails>
      )}
    </StyledCardGame>
  );
}
