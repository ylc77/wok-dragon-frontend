import { foodImages } from './images';

export type MenuCategoryImageSet = {
  image?: string;
  galleryImages: string[];
};

export const menuCategoryImageOverrides: Record<string, MenuCategoryImageSet> = {
  soups: {
    image: foodImages.pdfSoups,
    galleryImages: [foodImages.pdfSoups, foodImages.pdfSoupCorn, foodImages.pdfSoupDumpling, foodImages.pdfSoupRice],
  },
  salads: {
    image: foodImages.springRolls,
    galleryImages: [],
  },
  appetizers: {
    image: foodImages.pdfAppetizers,
    galleryImages: [
      foodImages.pdfAppetizersDumplings,
      foodImages.pdfAppetizers,
      foodImages.pdfAppetizersFried,
      foodImages.pdfAppetizersShrimp,
    ],
  },
  'soup-noodles': {
    image: foodImages.pdfNoodleSoup,
    galleryImages: [
      foodImages.pdfNoodleSoup,
      foodImages.pdfNoodleSoupDumpling,
      foodImages.pdfNoodleSoupDuck,
      foodImages.pdfNoodleSoupWonton,
      foodImages.pdfNoodleSoupVegetable,
    ],
  },
  'fried-noodles': {
    image: foodImages.pdfFriedNoodles,
    galleryImages: [
      foodImages.pdfFriedNoodles,
      foodImages.pdfFriedNoodlesBeef,
      foodImages.pdfFriedNoodlesSingapore,
      foodImages.pdfFriedNoodlesShrimp,
    ],
  },
  'fried-rice': {
    image: foodImages.pdfFriedRice,
    galleryImages: [foodImages.pdfFriedRiceSeafood, foodImages.pdfFriedRice, foodImages.pdfFriedRiceMixed],
  },
  duck: {
    image: foodImages.pdfDuck,
    galleryImages: [foodImages.pdfDuck, foodImages.pdfDuckWhole, foodImages.pdfDuckOrange],
  },
  beef: {
    image: foodImages.pdfBeef,
    galleryImages: [foodImages.pdfBeef, foodImages.pdfBeefBroccoli, foodImages.pdfBeefPepper],
  },
  chicken: {
    image: foodImages.pdfChicken,
    galleryImages: [
      foodImages.pdfChickenSweetSour,
      foodImages.pdfChickenLemon,
      foodImages.pdfChicken,
      foodImages.pdfChickenChilli,
    ],
  },
  pork: {
    image: foodImages.pdfPork,
    galleryImages: [
      foodImages.pdfPorkSauce,
      foodImages.pdfPork,
      foodImages.pdfPorkMeiCai,
      foodImages.pdfPorkRibs,
      foodImages.pdfPorkCrispy,
    ],
  },
  seafood: {
    image: foodImages.pdfSeafood,
    galleryImages: [foodImages.pdfSeafoodShrimp, foodImages.pdfSeafoodFish, foodImages.pdfSeafood, foodImages.pdfSeafoodLobster],
  },
  claypots: {
    image: foodImages.pdfClaypot,
    galleryImages: [foodImages.pdfClaypot, foodImages.pdfClaypotTofu],
  },
  'dishes-with-rice': {
    image: foodImages.pdfRiceDish,
    galleryImages: [foodImages.pdfRiceDishDuck, foodImages.pdfRiceDish],
  },
  vegetables: {
    image: foodImages.pdfVegetables,
    galleryImages: [
      foodImages.pdfVegetablesSpinach,
      foodImages.pdfVegetables,
      foodImages.pdfVegetablesBeans,
      foodImages.pdfVegetablesMapo,
    ],
  },
};
