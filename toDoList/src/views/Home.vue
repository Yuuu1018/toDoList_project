<script setup lang="ts">
import CardDetail from "../components/CardDetail.vue";
import { useHomeConfirm } from "../composables/homeCard";
import { ref, onMounted } from "vue";
import { useCardStore } from "../stores/card";
import AddPanel from "../components/AddPanel.vue";

const { confirm, cards, tempSelectedItem, selectedCardList, removeCard } = useHomeConfirm();
const store = useCardStore()
const showPanel = ref(false)

onMounted(() => {
  store.fetchCards();
});

</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <select v-model="tempSelectedItem">
          <option disabled selected>请选择...</option>
          <option v-for="item in cards" :key="item.id" :value="item.id">
            {{ item.name }}
          </option>
        </select>
        <button @click="confirm">确定</button>
        <button @click="showPanel = true">新增</button>
      </el-header>
      <!-- 上面是header 下面是main -->
      <el-main>
        <div class="cardList">
          <CardDetail
            v-for="item in selectedCardList"
            :key="item.id"
            :card="item"
            @click="removeCard(item.id)"
          />
        </div>
        <AddPanel v-if="showPanel" @close="showPanel = false" />
        
      </el-main>
    </el-container>
  </div>
</template>

<style lang="scss" scoped></style>
