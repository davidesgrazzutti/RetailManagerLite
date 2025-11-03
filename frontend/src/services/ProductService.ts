import axios from "axios";
import { Product } from "../models/Product";

const API_URL = "http://localhost:5182/api/products";

export const getProducts = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>(API_URL);
  return response.data;
};

export const createProduct = async (product: Omit<Product, "id">): Promise<Product> => {
  const response = await axios.post<Product>(API_URL, product);
  return response.data;
};

export const updateProduct = async (product: Product): Promise<void> => {
  await axios.put(`${API_URL}/${product.id}`, product);
};

export const deleteProduct = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
