import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
	log: ['query', 'info', 'warn', 'error'],
});

const specialAbilities = [
	'Fire',
	'Ice',
	'Energy',
	'Earth',
	'Death',
	'Holy',
	'Physical',
];

// Common
// Rare
// Epic
// Lendary

const cards = [
	{
		name: 'Odin',
		type: 'Criatura',
		attack: 12,
		defense: 9,
		specialAbility: specialAbilities[2], // Energy
		rarity: 'Lendary',
		image: 'assets/Lendary/Odin.png',
		description:
			'Odin é o deus supremo da mitologia nórdica, conhecido por sua sabedoria.',
		manaCost: 5,
		expansionSet: 'Norse Mythology',
	},
	{
		name: 'Thor',
		type: 'Criatura',
		attack: 6,
		defense: 4,
		specialAbility: specialAbilities[0], // Fire
		rarity: 'Epic',
		image: 'assets/Epic/Thor.png',
		description:
			'Thor é o deus do trovão na mitologia nórdica, famoso por seu martelo Mjölnir.',
		manaCost: 6,
		expansionSet: 'Norse Mythology',
	},
	{
		name: 'Loki',
		type: 'Criatura',
		attack: 4,
		defense: 3,
		specialAbility: specialAbilities[1], // Ice
		rarity: 'Epic',
		image: 'assets/Epic/Loki.png',
		description:
			'Loki é o deus da trapaça e da travessura na mitologia nórdica.',
		manaCost: 4,
		expansionSet: 'Norse Mythology',
	},
	{
		name: 'Frigg',
		type: 'Criatura',
		attack: 7,
		defense: 7,
		specialAbility: specialAbilities[3], // Earth
		rarity: 'Common',
		image: 'assets/Common/Frigg.png',
		description:
			'Frigg é a deusa do casamento na mitologia nórdica, conhecida por sua habilidade de ver o futuro.',
		manaCost: 7,
		expansionSet: 'Norse Mythology',
	},
	{
		name: 'Hel',
		type: 'Criatura',
		attack: 6,
		defense: 6,
		specialAbility: specialAbilities[4], // Death
		rarity: 'Common',
		image: 'assets/Common/Hel.png',
		description: 'Hel é a deusa do submundo na mitologia nórdica.',
		manaCost: 6,
		expansionSet: 'Norse Mythology',
	},
	{
		name: 'Bragi',
		type: 'Criatura',
		attack: 5,
		defense: 5,
		specialAbility: specialAbilities[6], // Physical
		rarity: 'Common',
		image: 'assets/Common/Bragi.png',
		description:
			'Bragi é o deus da poesia e da eloquência na mitologia nórdica.',
		manaCost: 5,
		expansionSet: 'Norse Mythology',
	},
	{
		name: 'Tyr',
		type: 'Criatura',
		attack: 7,
		defense: 7,
		specialAbility: specialAbilities[5], // Holy
		rarity: 'Rare',
		image: 'assets/Rare/Tyr.png',
		description: 'Tyr é o deus da justiça e da guerra na mitologia nórdica.',
		manaCost: 7,
		expansionSet: 'Norse Mythology',
	},
	{
		name: 'Njord',
		type: 'Criatura',
		attack: 6,
		defense: 6,
		specialAbility: specialAbilities[2], // Energy
		rarity: 'Rare',
		image: 'assets/Rare/Njord.png',
		description: 'Njord é o deus do mar e do vento na mitologia nórdica.',
		manaCost: 6,
		expansionSet: 'Norse Mythology',
	},
	{
		name: 'Freyr',
		type: 'Criatura',
		attack: 7,
		defense: 7,
		specialAbility: specialAbilities[3], // Earth
		rarity: 'Lendary',
		image: 'assets/Lendary/Freyr.png',
		description: 'Freyr é o deus da fertilidade na mitologia nórdica.',
		manaCost: 7,
		expansionSet: 'Norse Mythology',
	},
	{
		name: 'Skadi',
		type: 'Criatura',
		attack: 6,
		defense: 6,
		specialAbility: specialAbilities[1], // Ice
		rarity: 'Common',
		image: 'assets/Common/Skadi.png',
		description: 'Skadi é a deusa da caça na mitologia nórdica.',
		manaCost: 6,
		expansionSet: 'Norse Mythology',
	},
	{
		name: 'Balder',
		type: 'Criatura',
		attack: 7,
		defense: 7,
		specialAbility: specialAbilities[0], // Fire
		rarity: 'Epic',
		image: 'assets/Epic/Balder.png',
		description:
			'Balder é o deus da luz na mitologia nórdica, conhecido por sua beleza e bondade.',
		manaCost: 7,
		expansionSet: 'Norse Mythology',
	},
	{
		name: 'Freya',
		type: 'Criatura',
		attack: 6,
		defense: 6,
		specialAbility: specialAbilities[5], // Holy
		rarity: 'Lendary',
		image: 'assets/Lendary/Freya.png',
		description: 'Freya é a deusa do amor e da beleza na mitologia nórdica.',
		manaCost: 6,
		expansionSet: 'Norse Mythology',
	},
	{
		name: 'Forseti',
		type: 'Criatura',
		attack: 5,
		defense: 5,
		specialAbility: specialAbilities[4], // Death
		rarity: 'Lendary',
		image: 'assets/Lendary/Forseti.png',
		description:
			'Forseti é o deus da justiça, da paz e da verdade na mitologia nórdica.',
		manaCost: 5,
		expansionSet: 'Norse Mythology',
	},
	{
		name: 'Valravn',
		type: 'Criatura',
		attack: 5,
		defense: 5,
		specialAbility: specialAbilities[4], // Death
		rarity: 'Lendary',
		image: 'assets/Lendary/Valravn.png',
		description:
			'Valravn é o deus da ilusão e guardião da Marca de Valravn. Um híbrido monstruoso entre homem e corvo, ele é um dos dois chefes inimigos que devem ser combatidos para abrir o Portão de Helheim.',
		manaCost: 5,
		expansionSet: 'Norse Mythology',
	},
	{
		name: 'Fenrir',
		type: 'Criatura',
		attack: 5,
		defense: 5,
		specialAbility: specialAbilities[4], // Death
		rarity: 'Lendary',
		image: 'assets/Lendary/Fenrir.png',
		description:
			'Fenrir é uma figura lendária da mitologia nórdica, sendo um dos filhos do deus nórdico Loki. Ele é descrito como um lobo gigante de dentes afiados que tem um papel importante nas lendas e mitos que cercam os deuses nórdicos.',
		manaCost: 5,
		expansionSet: 'Norse Mythology',
	},
	{
		name: 'Valkyrie',
		type: 'Criatura',
		attack: 5,
		defense: 5,
		specialAbility: specialAbilities[4], // Death
		rarity: 'Lendary',
		image: 'assets/Lendary/Valkyrie.png',
		description:
			'As Valquírias são virgens guerreiras que pertenciam ao esquadrão de guerra de Odin. Essas feiticeiras místicas carregam muito significado na cultura nórdica.',
		manaCost: 5,
		expansionSet: 'Norse Mythology',
	},
	{
		name: 'Feitiço de Cura',
		type: 'Feitiço',
		attack: 0,
		defense: 0,
		specialAbility: 'Cura',
		rarity: 'Epic',
		manaCost: 0,
		physicalDamage: 0,
		physicalProtection: 0,
		energyDamage: 0,
		energyProtection: 0,
		earthDamage: 0,
		earthProtection: 0,
		fireDamage: 0,
		fireProtection: 0,
		iceDamage: 0,
		iceProtection: 0,
		holyDamage: 0,
		holyProtection: 0,
		deathDamage: 0,
		deathProtection: 0,
		expansionSet: 'Norse Mythology',
	},
	{
		name: 'Armadura de Aço',
		type: 'Artefato',
		attack: 0,
		defense: 2,
		rarity: 'Common',
		manaCost: 0,
		specialAbility: 'Defesa',
		physicalDamage: 0,
		physicalProtection: 0,
		energyDamage: 0,
		energyProtection: 0,
		earthDamage: 0,
		earthProtection: 0,
		fireDamage: 0,
		fireProtection: 0,
		iceDamage: 0,
		iceProtection: 0,
		holyDamage: 0,
		holyProtection: 0,
		deathDamage: 0,
		deathProtection: 0,
		expansionSet: 'Norse Mythology',
	},
	{
		name: 'Escudo de Luz',
		type: 'Artefato',
		attack: 0,
		defense: 3,
		specialAbility: 'Proteção',
		rarity: 'Common',
		manaCost: 0,
		physicalDamage: 0,
		physicalProtection: 2,
		energyDamage: 0,
		energyProtection: 2,
		earthDamage: 0,
		earthProtection: 2,
		fireDamage: 0,
		fireProtection: 2,
		iceDamage: 0,
		iceProtection: 2,
		holyDamage: 0,
		holyProtection: 3,
		deathDamage: 0,
		deathProtection: 2,
		expansionSet: 'Norse Mythology',
	},
	{
		name: 'Feitiço de Fogo',
		type: 'Feitiço',
		attack: 2,
		defense: 0,
		specialAbility: 'Ataque',
		rarity: 'Common',
		manaCost: 0,
		physicalDamage: 0,
		physicalProtection: 0,
		energyDamage: 0,
		energyProtection: 0,
		earthDamage: 0,
		earthProtection: 0,
		fireDamage: 3,
		fireProtection: 0,
		iceDamage: 0,
		iceProtection: 0,
		holyDamage: 0,
		holyProtection: 0,
		deathDamage: 0,
		deathProtection: 0,
		expansionSet: 'Norse Mythology',
	},
];

async function main() {
	for (let card of cards) {
		await prisma.card.create({
			data: {
				name: card.name,
				type: card.type,
				attack: card.attack,
				defense: card.defense,
				specialAbility: card.specialAbility,
				rarity: card.rarity,
				image: card.image,
				description: card.description,
				manaCost: card.manaCost,
				expansionSet: card.expansionSet,
			},
		});
	}
}

main()
	.catch((e) => {
		throw e;
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
