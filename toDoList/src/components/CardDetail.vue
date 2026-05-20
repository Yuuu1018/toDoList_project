<script setup lang="ts">
  import type{ CardItem } from '../types/card';

  const { card } = defineProps<{ card: CardItem }>();

  const $emit = defineEmits(['click']);
  const remove = () =>{
    $emit('click', card.id);
  }
</script>

<template>
  <div class="card">
    <el-row :gutter="20">
    <el-col :span="22"><div class="grid-content ep-bg-purple" ><h2>{{ card.name }}</h2></div>
    <p>截至时间：{{ card.time }}</p>
    <p>内容：{{ card.description }}</p>
    </el-col>
    <el-col :span="2">
      <div class="grid-content ep-bg-purple" >
        <el-button type="primary" @click="remove">
          删除
        </el-button>
      </div>
    </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  background-color: #fff;

  h2 {
    margin-top: 0;
    font-size: 1.5em;
    color: #333;
  }

  p {
    margin: 8px 0;
    color: #666;
  }
}
</style>
