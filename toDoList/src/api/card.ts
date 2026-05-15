import axios from 'axios';
import type { CardItem } from '../types/card';

const http = axios.create({baseURL: ''});

export const itemApi = {
  fetchItems: () => http.get<CardItem[]>('/api/cards'),
  addItem:(data:Omit<CardItem, 'id'>) => http.post<CardItem>('/api/cards', data),
}