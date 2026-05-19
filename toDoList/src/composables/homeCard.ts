import { ref } from "vue";
import { useCardStore } from "../stores/card";
import { storeToRefs } from "pinia";
import type { CardItem } from "../types/card";

export function useHomeConfirm() {
  const cardStore = useCardStore();
  const { cards } = storeToRefs(cardStore);

  const tempSelectedId = ref<string>("");
  const selectedCardList = ref<CardItem[]>([]);

  const confirm = () => {
    //检查 store 里是否有该id的卡片
    cardStore.setSelected(tempSelectedId.value);
    if (cardStore.selectedCard === null) {
      alert("请选择一个有效的卡片");
      return;
    }

    //检查是否已经存在于selectedCardList中
    const exist = selectedCardList.value.some((item) => item.id === tempSelectedId.value);
    if (exist) {
      alert("该卡片已存在");
      return;
    }

    if (selectedCardList.value.length >= 10) {
      alert("最多只能选十张卡片");
      return;
    }

    selectedCardList.value.push(cardStore.selectedCard);
    tempSelectedId.value = "";
  }

  const removeCard = (id: string) => {
      // 在这里执行删除卡片的逻辑，例如调用 API 或更新状态
      try {
        selectedCardList.value.splice(
          selectedCardList.value.findIndex((item) => item.id === id),
          1
        );
      } catch (error) {
        console.error("未找到该卡片:", error);
      }
      alert(`删除成功,ID${id}，${selectedCardList.value.length}张卡片剩余`);
    };

  return {
    cards,
		tempSelectedId,
		selectedCardList,
		confirm,
		removeCard
  }
}