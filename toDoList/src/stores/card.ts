import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { CardItem } from "../types/card";
import { itemApi } from "../api/card";

/**
 * 使用 Pinia 创建的卡片状态管理存储
 * 用于管理应用中的卡片数据，包括添加和删除卡片功能
 */
export const useCardStore = defineStore("card", () => {
  // 使用 ref 创建响应式的卡片数组，存储 CardItem 类型的卡片数据
  const cards = ref<CardItem[]>([]);
  const selectedId = ref<string>("");
  const loading = ref(false);

  const selectedCard = computed(() => {
    return cards.value.find((card) => card.id === selectedId.value) ?? null;
  });

  async function fetchCards() {
    loading.value = true;
    try {
      const { data } = await itemApi.fetchItems();
      cards.value = data;
    }catch (e) {
      console.error("获取数据失败:", e);
    } finally {
      loading.value = false;
    }
  }

  async function addCard(card: Omit<CardItem, 'id'>) {
    loading.value = true;
    try {
      const { data } = await itemApi.addItem(card);
      cards.value.push(data);
    } catch (e) {
      console.error("添加卡片失败:", e);
    } finally {
      loading.value = false;
    }
  }

  function setSelected(id: string) {
    selectedId.value = id;
  }

  async function removeStoredCard(id: string) {
    loading.value = true;
    try{
      await itemApi.removeItem(id);
      cards.value.splice(cards.value.findIndex((card) => card.id === id), 1);
    }catch (e) {
      console.error("删除卡片失败:", e);
    } finally {
      loading.value = false;
    }
  }
  
  
  return {
    cards,
    selectedId,
    selectedCard,
    setSelected,
    loading,
    fetchCards,
    addCard,
    removeStoredCard
  };
});