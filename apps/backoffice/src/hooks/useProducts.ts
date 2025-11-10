import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiUtils } from '../utils/apiUtils';

// Product type based on the backend schema
export interface Product {
  id: string;
  name: {
    fr: string;
    en: string;
    ar: string;
  };
  description: {
    fr: string;
    en: string;
    ar: string;
  };
  shortDescription?: {
    fr: string;
    en: string;
    ar: string;
  };
  price: number;
  currency: string;
  image: string;
  images?: string[];
  video?: string;
  links: {
    amazon?: string;
    etsy?: string;
    vinted?: string;
  };
  featured: boolean;
  category?: string;
  sku?: string;
  stock: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SearchProductsParams {
  keyword?: string;
  page?: number;
  limit?: number;
  minPrice?: number;
  maxPrice?: number;
  isActive?: boolean;
  featured?: boolean;
  category?: string;
  locale?: string;
}

export interface ProductsResponse {
  products: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

// Query keys
export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (params: SearchProductsParams) => [...productKeys.lists(), params] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
};

// Hook to search/list products
export function useProducts(params: SearchProductsParams = {}) {
  return useQuery({
    queryKey: productKeys.list(params),
    queryFn: () => apiUtils.products.search(params),
    staleTime: 30000, // 30 seconds
  });
}

// Hook to get a single product
export function useProduct(id: string | undefined) {
  return useQuery({
    queryKey: productKeys.detail(id!),
    queryFn: () => apiUtils.products.getById(id!),
    enabled: !!id,
  });
}

// Hook to create a product
export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => apiUtils.products.create(data),
    onSuccess: () => {
      // Invalidate and refetch products list
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
  });
}

// Hook to update a product
export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      apiUtils.products.update(id, data),
    onSuccess: (_, variables) => {
      // Invalidate and refetch products list and detail
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
      queryClient.invalidateQueries({ queryKey: productKeys.detail(variables.id) });
    },
  });
}

// Hook to delete a product
export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiUtils.products.delete(id),
    onSuccess: () => {
      // Invalidate and refetch products list
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
  });
}

