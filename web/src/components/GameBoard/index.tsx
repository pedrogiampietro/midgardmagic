/** @jsxImportSource @emotion/react */

import { useState, useEffect } from "react";
import { Card } from "../Card";
import { Player } from "../Player";
import { css } from "@emotion/react";
import styled from "styled-components";
import { useAuth } from "../../hooks/useAuth";
import { apiClient } from "../../services/api";

const shouldForwardProp = (prop: any) =>
  !["index", "deckLength"].includes(prop);

const cards = [
  {
    name: "Odin",
    type: "Criatura",
    attack: 5,
    defense: 5,
    specialAbility: "Energy",
  },
  {
    name: "Thor",
    type: "Criatura",
    attack: 6,
    defense: 4,
    specialAbility: "Thunder",
  },
  {
    name: "Loki",
    type: "Criatura",
    attack: 4,
    defense: 3,
    specialAbility: "Trickery",
  },
  {
    name: "Freya",
    type: "Criatura",
    attack: 5,
    defense: 5,
    specialAbility: "Love",
  },
  {
    name: "Tyr",
    type: "Criatura",
    attack: 6,
    defense: 6,
    specialAbility: "War",
  },
  {
    name: "Merlin",
    type: "Feitiço",
    attack: 0,
    defense: 0,
    specialAbility: "Magia",
  },
  {
    name: "Arthur",
    type: "Criatura",
    attack: 7,
    defense: 7,
    specialAbility: "Liderança",
  },
  {
    name: "Lancelot",
    type: "Criatura",
    attack: 6,
    defense: 5,
    specialAbility: "Coragem",
  },
  {
    name: "Gawain",
    type: "Criatura",
    attack: 6,
    defense: 6,
    specialAbility: "Força",
  },
  {
    name: "Morgana",
    type: "Feitiço",
    attack: 0,
    defense: 0,
    specialAbility: "Feitiçaria",
  },
  {
    name: "Excalibur",
    type: "Artefato",
    attack: 0,
    defense: 0,
    specialAbility: "Poder",
  },
  {
    name: "Dragão",
    type: "Criatura",
    attack: 8,
    defense: 8,
    specialAbility: "Fogo",
  },
  {
    name: "Unicórnio",
    type: "Criatura",
    attack: 4,
    defense: 4,
    specialAbility: "Cura",
  },
  {
    name: "Elfo",
    type: "Criatura",
    attack: 5,
    defense: 5,
    specialAbility: "Agilidade",
  },
  {
    name: "Anão",
    type: "Criatura",
    attack: 6,
    defense: 7,
    specialAbility: "Resistência",
  },
  {
    name: "Feitiço de Cura",
    type: "Feitiço",
    attack: 0,
    defense: 0,
    specialAbility: "Cura",
  },
  {
    name: "Armadura de Aço",
    type: "Artefato",
    attack: 0,
    defense: 2,
    specialAbility: "Defesa",
  },
];

const playedCardStyle = css`
  margin: 5px;
  border-radius: 10px;
  box-shadow: 0 4px 6px 0 hsla(0, 0%, 0%, 0.2);
  transform: scale(1);
`;

const selectedCardStyle = css`
  margin: 5px;
  border-radius: 10px;
  box-shadow: 0 0 10px 2px yellow;
  transform: scale(1.05);
`;

const FanCard = styled.div`
  margin: 5px;
  border-radius: 10px;
  box-shadow: 0 4px 6px 0 hsla(0, 0%, 0%, 0.2);
  transform: scale(0.8);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const HandCardContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  align-self: center;
  padding-bottom: 10px;
  max-width: 100vw;
`;

const HandCard = styled(FanCard).withConfig({
  shouldForwardProp,
})<{ index: number; deckLength: number }>`
  transform-origin: bottom center;
  transform: rotate(${(props) => (props.index - props.deckLength / 2) * 8}deg);
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    transform: rotate(0);
    margin: 0 2px;
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;

const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
`;

const GameBoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh; /* Ocupa toda a altura da tela */
`;

// Criação dos decks dos jogadores
let initialPlayer1Deck = cards.slice(0, 5); // As primeiras 5 cartas vão para o jogador 1
let initialPlayer2Deck = cards.slice(5, 10); // As próximas 5 cartas vão para o jogador 2

export function GameBoard() {
  const [player1Deck, setPlayer1Deck] = useState(initialPlayer1Deck);
  const [player2Deck, setPlayer2Deck] = useState(initialPlayer2Deck);
  const [middleCards, setMiddleCards] = useState<any>([]);
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [attackMode, setAttackMode] = useState(false);
  const [hasPlayedCard, setHasPlayedCard] = useState(false);
  const [player1Points, setPlayer1Points] = useState(700);
  const [player2Points, setPlayer2Points] = useState(700);
  const [deck, setDeck] = useState<any>([]);

  const { user } = useAuth();

  const player1Cards = middleCards.filter((card: any) => card.player === 1);
  const player2Cards = middleCards.filter((card: any) => card.player === 2);

  useEffect(() => {
    const getDeck = async () => {
      const { data } = await apiClient().get("/deck/findById-deck", {
        params: {
          id: user?.Decks[0].id,
        },
      });

      setDeck(data.deck);
    };

    if (user) {
      getDeck();
    }
  }, [user]);

  function selectCard(card: any) {
    if (card.player === currentPlayer && !attackMode) {
      setSelectedCard(card);
      setAttackMode(true); // Ative o modo de ataque depois de selecionar uma carta
    } else if (card.player !== currentPlayer && attackMode) {
      attack(card);
    }
  }

  function battle(attacker: any, defender: any) {
    // A lógica de batalha pode ser personalizada para se adequar ao seu jogo
    if (attacker.attack > defender.defense) {
      return attacker;
    } else if (attacker.attack < defender.defense) {
      return defender;
    } else {
      // Em caso de empate, nenhuma carta vence
      return null;
    }
  }

  function attack(card: any) {
    if (selectedCard && card.player !== currentPlayer) {
      const winner = battle(selectedCard, card);

      if (winner === selectedCard) {
        setMiddleCards(middleCards.filter((c: any) => c !== card));
        if (currentPlayer === 1) {
          setPlayer2Points(player2Points - 100); // Subtrai pontos do jogador 2
        } else {
          setPlayer1Points(player1Points - 100); // Subtrai pontos do jogador 1
        }
      } else if (winner === card) {
        setMiddleCards(middleCards.filter((c: any) => c !== selectedCard));
        if (currentPlayer === 1) {
          setPlayer1Points(player1Points - 100); // Subtrai pontos do jogador 1
        } else {
          setPlayer2Points(player2Points - 100); // Subtrai pontos do jogador 2
        }
      }

      console.log(`${selectedCard.name} ataca ${card.name}`);
      setSelectedCard(null);
      endTurn();
    } else if (card.player === currentPlayer) {
      setSelectedCard(card);
    }
  }

  function playCard(card: any, player: any) {
    if (player === currentPlayer && !attackMode && !hasPlayedCard) {
      if (card.type === "Criatura") {
        if (player === 1 && player1Cards.length < 5) {
          setPlayer1Deck(player1Deck.filter((c) => c !== card));
          setMiddleCards([...middleCards, { ...card, player }]);
          setHasPlayedCard(true);
        } else if (player === 2 && player2Cards.length < 5) {
          setPlayer2Deck(player2Deck.filter((c) => c !== card));
          setMiddleCards([...middleCards, { ...card, player }]);
          setHasPlayedCard(true);
        }
      } else if (card.type === "Feitiço" || card.type === "Artefato") {
        // Implemente a lógica para usar a carta como buff aqui
      }
    }
  }

  function endTurn() {
    // Alterne o jogador atual
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    // Desative o modo de ataque
    setAttackMode(false);
    // Desmarque a carta selecionada
    setSelectedCard(null);
    setHasPlayedCard(false);
  }

  return (
    <GameBoardContainer>
      <button onClick={endTurn}>Terminar jogada</button>

      <div style={{ flex: 1, display: "flex", flexDirection: "row" }}>
        <CardContainer>
          <HandCardContainer>
            {player1Deck.map((card, index) => (
              <HandCard
                key={index}
                index={index}
                deckLength={player1Deck.length}
                onClick={() => playCard(card, 1)}
              >
                <Card color="bg-blue-500" size="small" />
              </HandCard>
            ))}
          </HandCardContainer>
          <PlayerContainer>
            <Player name="Jogador 1" level={1} points={player1Points} />
          </PlayerContainer>
        </CardContainer>

        <div className="flex-1 flex flex-col justify-center space-y-2">
          {/* Aqui vão as cartas no meio do tabuleiro */}
          <div className="flex flex-row justify-center space-x-2">
            {middleCards
              .filter((card: any) => card.player === 1)
              .map((card: any, index: any) => (
                <div
                  key={index}
                  css={
                    card === selectedCard ? selectedCardStyle : playedCardStyle
                  }
                  onClick={() => {
                    if (!attackMode) {
                      selectCard(card);
                    } else if (card.player !== currentPlayer) {
                      attack(card);
                      endTurn();
                    }
                  }}
                >
                  <Card color="bg-blue-500" size="small" />
                </div>
              ))}
          </div>
          <div className="flex flex-row justify-center space-x-2">
            {middleCards
              .filter((card: any) => card.player === 2)
              .map((card: any, index: any) => (
                <div
                  key={index}
                  css={
                    card === selectedCard ? selectedCardStyle : playedCardStyle
                  }
                  onClick={() => {
                    if (!attackMode) {
                      selectCard(card);
                    } else if (card.player !== currentPlayer) {
                      attack(card);
                      endTurn();
                    }
                  }}
                >
                  <Card color="bg-red-500" size="small" />
                </div>
              ))}
          </div>
        </div>

        <CardContainer>
          <PlayerContainer>
            <Player name="Jogador 2" level={1} points={player2Points} />
          </PlayerContainer>
          <HandCardContainer>
            {player2Deck.map((card, index) => (
              <HandCard
                key={index}
                index={index}
                deckLength={player2Deck.length}
                onClick={() => playCard(card, 2)}
              >
                <Card color="bg-red-500" size="small" />
              </HandCard>
            ))}
          </HandCardContainer>
        </CardContainer>
      </div>
    </GameBoardContainer>
  );
}
