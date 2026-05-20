<script setup lang="ts">
  import { ref } from "vue";
  import { useCardStore } from "../stores/card";

  const store = useCardStore();

  const form = ref({
    name: "",
    date1: "",
    date2: "",
    desc: "",
  });

  const submitting = ref(false);

  const emit = defineEmits(['close']);

  async function onSubmit() {
    if(!form.value.name.trim()) return;
    submitting.value = true;
    try {
      await store.addCard({
        name: form.value.name.trim(),
        time: `${form.value.date1}` || undefined,
        description: form.value.desc || undefined,
      });
      // 重置表单
      form.value = {
        name: "",
        date1: "",
        date2: "",
        desc: "",
      };
    } catch (error) {
      console.error("添加失败:", error);
    } finally {
      submitting.value = false;
      emit('close');
    }
  };

</script>

<template>
  <el-form :model="form" label-width="auto">
    <el-form-item label="任务名称">
      <el-input v-model="form.name" />
    </el-form-item>
    
    <el-form-item label="任务时间">
      <el-col :span="11">
        <el-date-picker
          v-model="form.date1"
          type="date"
          placeholder="Pick a date"
          style="width: 100%"
        />
      </el-col>
      <el-col :span="2" class="text-center">
        <span class="text-gray-500">-</span>
      </el-col>
      <el-col :span="11">
        <el-time-picker
          v-model="form.date2"
          placeholder="Pick a time"
          style="width: 100%"
        />
      </el-col>
    </el-form-item>
    <el-form-item label="任务描述">
      <el-input v-model="form.desc" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">创建</el-button>
      <el-button type="primary" @click="emit('close')">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped>

</style>
