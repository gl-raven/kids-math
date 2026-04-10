<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { AppWindow } from '../types/AppWindow';
import SelectScreen from './SelectScreen.vue';
import Game from './Game.vue';


let screen = ref<AppWindow>("select");

const maxFontSize = 32;
const minFontSize = 12;

const divideDigits = ref<number[]>([]);

// Умножение
const multiplyDigits = ref<number[]>([]);

function startGame(divideDigitsP: number[], multiplyDigitsP: number[]) {
    screen.value = 'game';
    divideDigits.value = divideDigitsP;
    multiplyDigits.value = multiplyDigitsP;
}

// Начальное значение (совпадает с CSS)
const fontSize = ref(26)

// Следим за изменением fontSize и обновляем CSS-переменную
watchEffect(() => {
    document.documentElement.style.setProperty('--base-font-size', `${fontSize.value}px`)
})

const increase = () => { if (fontSize.value <= maxFontSize) fontSize.value += 2 }
const decrease = () => { if (fontSize.value > minFontSize) fontSize.value -= 2 }
</script>

<template>
    <div class="top-buttons-container">
        <button class="sup" @click="increase">+ Шрифт</button>&nbsp;
        <button class="sub" @click="decrease">- Шрифт</button> &nbsp;(Текущий размер {{ fontSize }})
    </div>
    <div v-if="screen === 'select'">
        <SelectScreen @startGame="startGame" />
    </div>
    <div v-if="screen === 'game'">
        <Game :divideDigits="divideDigits" :multiplyDigits="multiplyDigits" @selectScreen="screen = 'select'"/>
    </div>
</template>
