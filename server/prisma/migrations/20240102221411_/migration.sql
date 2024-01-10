-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "experience" INTEGER NOT NULL DEFAULT 0,
    "level" INTEGER NOT NULL DEFAULT 1,
    "mana" INTEGER NOT NULL DEFAULT 0,
    "ranking" INTEGER NOT NULL DEFAULT 0,
    "stamina" INTEGER DEFAULT 20,
    "avatarUrl" TEXT,
    "avatarBorderUrl" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "attack" INTEGER NOT NULL,
    "defense" INTEGER NOT NULL,
    "specialAbility" TEXT NOT NULL,
    "rarity" TEXT NOT NULL,
    "image" TEXT,
    "description" TEXT,
    "manaCost" INTEGER NOT NULL,
    "expansionSet" TEXT NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Deck" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Deck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DeckToCard" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_DeckToCard_AB_unique" ON "_DeckToCard"("A", "B");

-- CreateIndex
CREATE INDEX "_DeckToCard_B_index" ON "_DeckToCard"("B");

-- AddForeignKey
ALTER TABLE "Deck" ADD CONSTRAINT "Deck_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DeckToCard" ADD CONSTRAINT "_DeckToCard_A_fkey" FOREIGN KEY ("A") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DeckToCard" ADD CONSTRAINT "_DeckToCard_B_fkey" FOREIGN KEY ("B") REFERENCES "Deck"("id") ON DELETE CASCADE ON UPDATE CASCADE;
