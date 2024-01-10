export function DeckCreation() {
  return (
    <div className="h-full">
      <div className="w-full container mx-auto">
        <div className="container pt-24 md:pt-36 mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <div className="flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden">
            <h1 className="my-4 text-3xl md:text-5xl text-white opacity-75 font-bold leading-tight text-center md:text-left">
              Comece sua
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">
                Jornada! Descubra
              </span>
              Seu Deck!!
            </h1>
            <p className="leading-normal text-base md:text-2xl mb-8 text-center md:text-left">
              Comece agora abrindo sua caixa e descobrindo quais carta s você
              ganhou!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
