export type ProductStatus = 'AVAILABLE' | 'OUT_OF_STOCK' | 'DISCONTINUED' | 'PAUSED';

export interface ProductResponse {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  status: ProductStatus;
  onSale: boolean;
  offerPrice: number | null;
  brandId: number;
  brandName: string;
  categoryId: number;
  categoryName: string;
  images?: ProductImage[];
}

export interface ProductImage {
  id: number;
  url: string;
  isPrimary: boolean;
}


export interface ProductRequest {
  name: string;
  description: string;
  price: number;
  stock: number;
  onSale: boolean;
  offerPrice?: number | null;
  brandId: number;
  categoryId: number;
}