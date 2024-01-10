import { useState } from "react";
import { apiClient } from "../../services/api";
import { auth } from "../../constants/auth";
import { setStorageModel } from "../../utils/storage";
import { useAuth } from "../../hooks/useAuth";
import styled from "styled-components";

const shouldForwardProp = (prop: any) =>
  !["isOpen", "transitionTime", "side"].includes(prop);

const CubeDiv = styled.div.withConfig({
  shouldForwardProp,
})<{ isOpen: boolean; transitionTime?: string }>`
  height: 10rem;
  width: 10rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all ${({ transitionTime }) => transitionTime};
  opacity: ${({ isOpen }) => (isOpen ? 0.1 : 1)};
`;

const CubeSide = styled.div.withConfig({
  shouldForwardProp,
})<{
  isOpen: boolean;
  side?: string;
  transitionTime?: string;
}>`
  height: 10rem;
  width: 10rem;
  position: absolute;
  top: 0;
  left: 0;
  transition: all ${({ transitionTime }) => transitionTime};
  opacity: ${({ isOpen }) => (isOpen ? 0.1 : 1)};
  transform: ${({ side, isOpen }) => {
    if (side === "top") return isOpen ? "translateY(-3rem)" : "translateY(0)";
    if (side === "left") return isOpen ? "translateX(-3rem)" : "translateX(0)";
    if (side === "right") return isOpen ? "translateX(3rem)" : "translateX(0)";
  }};
`;

export function Chest({ data }: any) {
  const [isBoxOpen, setIsBoxOpen] = useState(false);
  const [cards, setCards] = useState<any>([]);
  const [c, setC] = useState(0);
  const { user } = useAuth();
  const transitionTimeEffect = "750ms";

  const userOpenedBox = user?.firstDeckBox;
  let userObj = data;

  const openCube = () => {
    if (!isBoxOpen) {
      award();
    } else {
      setIsBoxOpen(false);
    }
  };

  const handleClose = () => {
    setIsBoxOpen(false);
  };

  const award = async () => {
    try {
      const { data } = await apiClient().post("/deck/create-deck");
      console.log("data ->", data);
      setCards(data.deck);
      setC(c + 1);
      setIsBoxOpen(true);

      userObj.Decks = userObj.Decks || [];
      userObj.Decks.push(data.deck);
      userObj.firstDeckBox = true;
      setStorageModel(auth.USER, JSON.stringify(userObj));
    } catch (error) {
      console.error("Erro ao buscar cartas:", error);
    }
  };

  return (
    <div className="p-10">
      {!userOpenedBox && (
        <CubeDiv
          id="cube"
          onClick={openCube}
          isOpen={isBoxOpen}
          transitionTime={transitionTimeEffect}
        >
          <div className="hexagon absolute"></div>
          <CubeSide
            className="cube back"
            side="back"
            isOpen={isBoxOpen}
            transitionTime={transitionTimeEffect}
          />
          <CubeSide
            className="cube top"
            side="top"
            isOpen={isBoxOpen}
            transitionTime={transitionTimeEffect}
          />
          <CubeSide
            className="cube left"
            side="left"
            isOpen={isBoxOpen}
            transitionTime={transitionTimeEffect}
          />
          <CubeSide
            className="cube right"
            side="right"
            isOpen={isBoxOpen}
            transitionTime={transitionTimeEffect}
          />
          <div className="powerup absolute"></div>
        </CubeDiv>
      )}

      {isBoxOpen && (
        <div
          className="fixed z-10 inset-0 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            ></div>
            <div className="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      Seus itens
                    </h3>
                    <div className="mt-2 space-y-4 flex flex-wrap justify-center items-center h-full">
                      {cards?.cards?.map((card: any, index: number) => (
                        <div
                          key={card.id}
                          className={`flex flex-col items-center p-0 ${
                            index < 3 ? "w-1/3" : "w-1/2"
                          }`}
                        >
                          <img
                            src={card.image}
                            alt={card.name}
                            className="w-64 h-64 object-contain rounded-lg shadow-lg"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleClose}
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
