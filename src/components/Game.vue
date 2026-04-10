<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import type { MathTaskHistoryItem, Operation } from '../types/math';

const emit = defineEmits<{
  (e: 'selectScreen'): void
//   (e: 'update', value: string): void
}>()
const optionsSize = 4;

const props = defineProps<{
    divideDigits: number[]
    multiplyDigits: number[]
}>();

const num1 = ref<number>(0);
const num2 = ref<number>(0);
const operator = ref<Operation>("multiply");
const message = ref<string>("");
const options = ref<number[]>([]);
const history = ref<MathTaskHistoryItem[]>([]);
const questionsCount = ref<number>(0);
const correctAnswersCount = ref<number>(0);
let isFirst = true;
let timer: ReturnType <typeof setInterval> | null = null;
const seconds = ref<number>(0);

const generateQuestion = () => {
    isFirst = true;
    message.value = '';
    questionsCount.value++;
    const availableModes: ("multiply" | "divide")[] = [];

    if (props.multiplyDigits.length > 0) availableModes.push("multiply");
    if (props.divideDigits.length > 0) availableModes.push("divide");

    if (availableModes.length === 0) {
        message.value = "Сначала выбери числа в меню!"
        return
    }

    operator.value = availableModes[Math.floor(Math.random() * availableModes.length)];

    let correctAnswer = 0;

    if (operator.value == 'multiply') {
        num2.value = props.multiplyDigits[Math.floor(Math.random() * props.multiplyDigits.length)];
        num1.value = Math.floor(Math.random() * 10);

        correctAnswer = num2.value * num1.value;
    } else {
        const divisor = props.divideDigits[Math.floor(Math.random() * props.divideDigits.length)]
        const quotient = Math.floor(Math.random() * 10) + 1 // Частное (ответ)

        num1.value = divisor * quotient // Это будет наше делимое
        num2.value = divisor           // Это делитель
        correctAnswer = quotient
    }

    const set = new Set<number>();
    set.add(correctAnswer);
    while (set.size < optionsSize) {
        const offset = Math.floor(Math.random() * 5) + 1
        const wrong = Math.random() > 0.5 ? correctAnswer + offset : correctAnswer - offset
        if (wrong >= 0) set.add(wrong)
    }

    options.value = Array.from(set).sort(() => Math.random() - 0.5)
}

const checkValue = (val: number): void => {

    const isCorrect = operator.value === "multiply" ?
        num1.value * num2.value === val
        : val === num1.value / num2.value;

    if (isCorrect) {
        if (isFirst) {
            correctAnswersCount.value++;
        }
        message.value = '🌟 Правильно!'
        setTimeout(generateQuestion, 1200)
    } else {
        isFirst = false;
        message.value = '❌ Попробуй еще раз';
    }

    history.value.unshift({
        num1: num1.value,
        num2: num2.value,
        operation: operator.value,
        result: val,
        isCorrect: isCorrect
    })
}
const stopTimer = () => {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
};

const startTimer = () => {
  if (timer) return;
  timer = setInterval(() => {
    seconds.value++;
  }, 1000);
};

const formattedTime = computed(() => {
  const mins = Math.floor(seconds.value / 60);
  const secs = seconds.value % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
});

function selectScreen() {
    emit('selectScreen');
}


onMounted(() => {
    generateQuestion();
    startTimer();
});
onUnmounted(() => {
    stopTimer();
})
</script>
<template>
    <div class="game">
        <div v-if="multiplyDigits.length || divideDigits.length">
            <div class="example">
                <span>{{ num1 }}</span>
                <span>{{ operator === 'multiply' ? '×' : '÷' }}</span>
                <span>{{ num2 }}</span>
                <span> = ?</span>
            </div>
            <div class="answers">
                <button v-for="value in options" @click="checkValue(value)" :key="value">{{ value }}</button>
            </div>
            <div class="answer">{{ message }}</div>
        </div>
        <div v-else>
            <p>Пожалуйста, выберите хотя бы одно число для игры.</p>
        </div>
    </div>
    <div><button @click="selectScreen">К выбору действий и цифр</button></div>
    <div>Время: <span>{{ formattedTime }}</span></div>
    <div>
        <div><b>Статистика</b></div>
        <div>
            <b>Пример:</b> {{ questionsCount }},
            <b> без ошибок:</b> {{ correctAnswersCount }}
        </div>
    </div>
    <div>
        <b>История</b>
        <div v-for="item in history" :key="item.result">
            {{ item.isCorrect ? '✅' : '❌' }} {{ item.num1 }} {{ item.operation === 'multiply' ? '×' : '÷' }} {{ item.num2 }} = {{ item.result }} 
        </div>
    </div>
    <!-- Добавить историю правильных и не правильных кликов, количество игр и игр правильных с первого раза, логи кликов, время игры, -->
</template>

<style scoped>
.game {
    text-align: center;
    padding: 20px;
}

.example {
    font-size: 4rem;
    font-weight: bold;
    margin-bottom: 30px;
    color: #2c3e50;
}

.example span {
    margin: 0 10px;
}

.answers {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
    max-width: 300px; 
    margin: 0 auto;
    padding-top: 20px;
}

.answer-btn {
    padding: 20px;
    font-size: 1.5rem;
    border: 2px solid #42b883;
    background: white;
    border-radius: 12px;
    cursor: pointer;
    transition: 0.2s;
}

.answer-btn:hover {
    background: #42b883;
    color: white;
}

.status {
    font-size: 1.2rem;
    margin-top: 20px;
    min-height: 1.5em;
}
</style>