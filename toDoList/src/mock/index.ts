import mock from 'better-mock';
import type { CardItem } from '../types/card';

let db: CardItem[] = [
  { id: "1", name: "阅读", time: "2026-05-13", description: "阅读 Vue 文档" },
  { id: "2", name: "运动", time: "2026-05-14", description: "跑步 30 分钟" },
  { id: "3", name: "购物", description: "买一些日用品" },
];

// 获取所有条目（后续可用来初始化 store）
mock.mock('/api/cards', 'get', () => db)

mock.mock('/api/cards', 'post', (options: { body: string; }) => {
  const body = JSON.parse(options.body) as Omit<CardItem, 'id'>;
  const newCard: CardItem = {
    id: mock.Random.guid(),
    ...body,
  };
  db.push(newCard);
  return newCard;
})

mock.mock("/api/cards", "delete", (options: { body: string }) => {
  const body = JSON.parse(options.body) as { id: string };
  db.splice(db.findIndex((card) => card.id === body.id), 1);
  return { message: "删除成功" };
});