export interface Product {
  $key: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { count: Number; rate: Number };
}
