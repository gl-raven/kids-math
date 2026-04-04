<script setup lang="ts">
import { ref } from 'vue'
import SelectDigit from './Select/SelectDigit.vue';

const emit = defineEmits<{
  (e: 'startGame', divideDigits: number[], multiplyDigits: number[]): void
//   (e: 'update', value: string): void
}>()

const digits_array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

const divideDigits = ref<number[]>([]);

// Умножение
const multiplyDigits = ref<number[]>([])

function handleMultiplyCheckboxChange(value: number): void {
    const pos = multiplyDigits.value.indexOf(value);
    if (pos === -1) {
        multiplyDigits.value.push(value);
    } else {
        multiplyDigits.value.splice(pos, 1);
    }
}

function handleDevideCheckboxChangeF(value: number): void {
    const pos = divideDigits.value.indexOf(value);
    if (pos === -1) {
        divideDigits.value.push(value);
    } else {
        divideDigits.value.splice(pos, 1);
    }
}

function start(event: Event): void {
    emit('startGame', divideDigits.value, multiplyDigits.value);
}


</script>

<template>

<h1>Математика</h1>
    <div>
        <h3>Умножение</h3>
        <div v-for="value in digits_array"><select-digit :value="value" identify="multiply" @handle-checkbox-change="handleMultiplyCheckboxChange"/></div>
    </div>
    <div>
        <h3>Деление</h3>
        <div v-for="value in digits_array"><select-digit :value="value" identify="divide" @handle-checkbox-change="handleDevideCheckboxChangeF"/></div>
    </div>
    <div>
        <button @click="start">Запуск</button>
    </div>
</template>