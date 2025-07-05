export interface Recipe {
  id: number;
  name: string;
  description: string;
  image?: string;
  time_min: number;
  ingredients: string;
  preparation: string;
  createdAt: Date;
}
