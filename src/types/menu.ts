export type MenuCategory = {
  id: string;
  nameEn: string;
  nameEl?: string;
  image?: string;
  galleryImages?: string[];
  sortOrder: number;
};

export type MenuItem = {
  id: string;
  categoryId: string;
  nameEn: string;
  nameEl?: string;
  descriptionEn?: string;
  descriptionEl?: string;
  price: string;
  tags?: string[];
  sortOrder: number;
  needsReview?: boolean;
};
