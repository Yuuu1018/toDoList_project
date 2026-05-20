<script setup lang="ts">
import CardDetail from "../components/CardDetail.vue";
import { useHomeConfirm } from "../composables/homeCard";
import { ref, onMounted } from "vue";
import { useCardStore } from "../stores/card";
import AddPanel from "../components/AddPanel.vue";

const { confirm, cards, tempSelectedId, selectedCardList, removeCard } =
  useHomeConfirm();
const store = useCardStore();
const { removeStoredCard } = store;
const showPanel = ref(false);

// 初始获取卡片数据
onMounted(() => {
  store.fetchCards();
});

// 阻止默认行为以允许放置
const onDragOver = (event: DragEvent) => {
  event.preventDefault();
};

</script>

<template>
  <div class="common-layout">
    <el-container>
      <!-- header -->
      <el-header> </el-header>

      <!-- main-->
      <el-main>
        <el-row :gutter="20">
          <!-- 任务选择栏 -->
          <el-col
            v-for="card in cards"
            :key="card.id"
            :span="3"
            @dragstart="tempSelectedId = card.id"
          >
            <el-card draggable="true">
              <span>{{ card.name }}</span>
              <span @click="removeStoredCard(card.id)">-</span>
            </el-card>
          </el-col>
          <el-col :span="3">
            <el-card @click="showPanel = true">+</el-card>
          </el-col>

          <!-- 任务卡片展示 -->
          <el-col 
          :span="24" 
          @dragover.prevent="onDragOver" 
          @drop="confirm()"
          >
            <div class="dropzone">
              <div class="dropzoneTitle">已选任务：</div>
              <CardDetail
                v-for="item in selectedCardList"
                :key="item.id"
                :card="item"
                @click="removeCard(item.id)"
              />
            </div>
          </el-col>
        </el-row>

        <!-- 新增面板 -->
        <AddPanel v-if="showPanel" @close="showPanel = false" />
      </el-main>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.el-main {
  background-color: #f5f5f5;
  .el-row {
    .el-col {
      margin-bottom: 20px;
      .el-card {
        font-weight: bold;
        cursor: pointer;
        &:hover {
          transform: translateY(-5px);
          box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2);
        }
      }
    }
  }

  .dropzone {
    height: 30vh;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 8px;
    .dropzoneTitle {
      margin-bottom: 10px;
      color: #333;
    }
  }
}

</style>
