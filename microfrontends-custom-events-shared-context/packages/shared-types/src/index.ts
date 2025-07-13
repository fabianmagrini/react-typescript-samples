export interface Product {
  productId: string;
  productName: string;
  price: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  isLoggedIn: boolean;
  name: string;
}

export interface AppContext {
  user: User | null;
}