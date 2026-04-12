<script setup lang="ts">

defineProps<{
    value: number
    identify?: string
    checked: boolean
}>()


// const emit = defineEmits(['handleMultiplyCheckboxChange'])
const emit = defineEmits<{
  (e: 'handleCheckboxChange', value: number): void
}>()


const handleCheckboxChange = (event: Event): void => {
    const target = event.target as HTMLInputElement;

    emit('handleCheckboxChange', Number(target.value));
}
</script>

<template>
    <input type="checkbox" :value="value" :id="'check-' + (identify ?? '') + '-' + value " @change="handleCheckboxChange" :checked="checked"/><label
        :for="'check-' + (identify ?? '') + '-' + value">&nbsp;{{ value }}</label>
</template>