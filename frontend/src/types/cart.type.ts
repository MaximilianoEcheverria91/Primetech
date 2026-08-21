import type { ProductResponse } from './product.type';

export interface CartItem {
  product: ProductResponse;
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (product: ProductResponse, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  discount: number;
  total: number;
}
