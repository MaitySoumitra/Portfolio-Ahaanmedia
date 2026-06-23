// src/api/uiItems.ts
import client from './client';
import type{ UiItem } from '../types';

export const addUiItem = async (item: UiItem) => {
  const response = await client.post('/ui', item);
  return response.data;
};

export const fetchUiItems = async (
  category: string = "all"
): Promise<UiItem[]> => {

  const url =
    category === "all"
      ? "/designs"
      : `/designs?category=${category}`;

  const response = await client.get(url, {
    withCredentials: true,
  });

  return response.data;
};
