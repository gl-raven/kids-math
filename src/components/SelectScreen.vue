<script setup lang="ts">
import { ref } from 'vue'
import SelectDigit from './Select/SelectDigit.vue';

const emit = defineEmits<{
    (e: 'startGame', divideDigits: number[], multiplyDigits: number[]): void
    //   (e: 'update', value: string): void
}>();

const multiply_digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

const divide_digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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

function handleDivideCheckboxChangeF(value: number): void {
    const pos = divideDigits.value.indexOf(value);
    if (pos === -1) {
        divideDigits.value.push(value);
    } else {
        divideDigits.value.splice(pos, 1);
    }
}

function start(): void {
    emit('startGame', divideDigits.value, multiplyDigits.value);
}

function updateMultiplyDigits(): void {
    if (multiplyDigits.value.length === 0) {
        // Ставим все числа
        multiplyDigits.value = [...multiply_digits];
    } else {
        // Снимаем все
        multiplyDigits.value = [];
    }
}

function updateDivideDigits(): void {
    if (divideDigits.value.length === 0) {
        // Ставим все числа
        divideDigits.value = [...divide_digits];
    } else {
        // Снимаем все
        divideDigits.value = [];
    }
}

</script>

<template>

    <h1 class="text-center">Математика</h1>
    <div>
        <h3>Умножение</h3>
        <div>
            <input type="checkbox" id="multiply_all" @change="updateMultiplyDigits"
                :checked="multiplyDigits.length !== 0" />
            <label for="multiply_all">
                &nbsp;Все цифры
            </label>
        </div>
        <div v-for="value in multiply_digits">
            <select-digit :value="value" identify="multiply" @handle-checkbox-change="handleMultiplyCheckboxChange"
                :checked="multiplyDigits.includes(value)" :key="'multiply-' + value" />
        </div>
    </div>
    <div>
        <h3>Деление</h3>
        <div>
            <input type="checkbox" id="multiply_all" @change="updateDivideDigits"
                :checked="divideDigits.length !== 0" />
            <label for="multiply_all">
                &nbsp;Все цифры
            </label>
        </div>
        <div v-for="value in divide_digits">
            <select-digit :value="value" identify="divide" @handle-checkbox-change="handleDivideCheckboxChangeF"
                :key="'divide-' + value" :checked="divideDigits.includes(value)" />
        </div>
    </div>
    <div>
        <button @click="start">Запуск</button>
    </div>
</template>