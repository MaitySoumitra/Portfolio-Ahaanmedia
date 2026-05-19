// src/api/uiItems.ts
import client from './client';
import type{ UiItem } from '../types';

export const addUiItem = async (item: UiItem) => {
  const response = await client.post('/ui', item);
  return response.data;
};

export const fetchUiItems = async (): Promise<UiItem[]> => {
  const response = await client.get('/designs', {withCredentials: true});
  return response.data;
};
