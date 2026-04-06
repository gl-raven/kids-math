export type Operation = "multiply" | "divide"

export type MathTask = {
    num1: number
    num2: number
    operation: Operation
    result: number
}

export type MathTaskHistoryItem = MathTask & {
    operation: Operation
    isCorrect: boolean
}

