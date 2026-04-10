<script setup lang="ts">
const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()

const props = defineProps<{
  value: number
//   value?: number
}>()
</script>

<template>

</template>