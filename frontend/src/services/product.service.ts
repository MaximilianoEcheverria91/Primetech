import { api } from '../api/api' 
import type { ProductResponse, ProductRequest } from '../types/product.type';

export const productService = {

  getAllProducts: async (): Promise<ProductResponse[]> => {
    const response = await api.get<ProductResponse[]>('/product');
    return response.data;
  },

  getProductById: async (id: number): Promise<ProductResponse> => {
    const response = await api.get<ProductResponse>(`/product/${id}`);
    return response.data;
  },
  
  getOffers: async (): Promise<ProductResponse[]> => {
    const response = await api.get<ProductResponse[]>('/product/offers');
    return response.data;
  },

  getProductsByCategory: async (categoryId: number): Promise<ProductResponse[]> => {
    const response = await api.get<ProductResponse[]>(`/product/category/${categoryId}`);
    return response.data;
  },

  getProductsByBrand: async (brandId: number): Promise<ProductResponse[]> => {
    const response = await api.get<ProductResponse[]>(`/product/brand/${brandId}`);
    return response.data;
  },

  createProduct: async (productData: ProductRequest): Promise<ProductResponse> => {
    const response = await api.post<ProductResponse>('/product', productData);
    return response.data;
  },

  uploadProductImages: async (productId: number, files: File[], primaryIndex = 0): Promise<string[]> => {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
    formData.append('primaryIndex', primaryIndex.toString());

    const response = await api.post<string[]>(`/product/${productId}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};