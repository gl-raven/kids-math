<script setup lang="ts">
import { ref } from 'vue'
import type { AppWindow } from '../types/AppWindow';
import SelectScreen from './SelectScreen.vue';
import Game from './Game.vue';


let screen = ref<AppWindow>("select");

function changeScreen(newScreen: AppWindow) {
    screen.value = newScreen;
}

const divideDigits = ref<number[]>([]);

// Умножение
const multiplyDigits = ref<number[]>([]);

function startGame(divideDigitsP: number[], multiplyDigitsP: number[]) {
    screen.value = 'game';
    divideDigits.value = divideDigitsP;
    multiplyDigits.value = multiplyDigitsP;
}

</script>

<template>
    <div v-if="screen === 'select'">
        <SelectScreen @startGame="startGame" />
    </div>
    <div v-if="screen === 'game'">
        <Game :divideDigits="divideDigits" :multiplyDigits="multiplyDigits" />
    </div>
</template>
