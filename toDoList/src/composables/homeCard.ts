import { ref } from "vue";
import { useCardStore } from "../stores/card";
import { storeToRefs } from "pinia";
import type { CardItem } from "../types/card";

export function useHomeConfirm() {
  const cardStore = useCardStore();
  const { cards } = storeToRefs(cardStore);

  const tempSelectedItem = ref<string>("");
  const selectedCardList = ref<CardItem[]>([]);

  const confirm = () => {
    //检查pinia里是否有该id的卡片
    cardStore.setSelected(tempSelectedItem.value);
    if (cardStore.selectedItem === null) {
      alert("请选择一个有效的卡片");
      return;
    }

    //检查是否已经存在于selectedCardList中
    const exist = selectedCardList.value.some((item) => item.id === tempSelectedItem.value);
    if (exist) {
      alert("该卡片已存在");
      return;
    }

    if (selectedCardList.value.length >= 10) {
      alert("最多只能选十张卡片");
      return;
    }

    selectedCardList.value.push(cardStore.selectedItem);
    tempSelectedItem.value = "";
  }

  const removeCard = (id: string) => {
      // 在这里执行删除卡片的逻辑，例如调用 API 或更新状态
      try {
        selectedCardList.value.splice(
          selectedCardList.value.findIndex((card) => card.id === id),
          1,
        );
      } catch (error) {
        console.error("未找到该卡片:", error);
      }
      alert(`删除成功,ID${id}，${selectedCardList.value.length}张卡片剩余`);
    };

  return {
    cards,
    tempSelectedItem,
    removeCard,
    selectedCardList,
    confirm,
  }
}