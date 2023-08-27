import { create } from 'zustand'
import { type Question } from '../types'
import confetti from 'canvas-confetti'
import { persist } from 'zustand/middleware'
import { getAllQuestions } from '../services/questions'

interface State {
  questions: Question[]
  currentQuestion: number
  fetchQuestions: (limit: number) => Promise<void>
  selectAnswer: (questionId: number, answerIndex: number) => void
  goNextQuestion: () => void
  goPreviousQuestion: () => void
  reset: () => void
}

export const useQuestionsStore = create<State>()(persist((set, get) => {
  return {
    questions: [],
    currentQuestion: 0,
    fetchQuestions: async (limit: number) => {
      const json = await getAllQuestions()
      const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)
      set({ questions })
    },
    selectAnswer: (questionId: number, answerIndex: number) => {
      const { questions } = get()
      // structuredClone para cloner el objeto
      const newQuestions = structuredClone(questions)
      // encontrar el indice de la pregunta
      const questionIndex = newQuestions.findIndex(q => q.id === questionId)
      // obtener la info de la pregunta
      const questionInfo = newQuestions[questionIndex]
      // averiguar si ha seleccionado la pregunta correcta
      const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex

      if (isCorrectUserAnswer) confetti()

      // cambiar esta información en la copia de la pregunta
      newQuestions[questionIndex] = {
        ...questionInfo,
        isCorrectUserAnswer,
        userSelectedAnswer: answerIndex
      }
      // actualizar el estado
      set({ questions: newQuestions })
    },
    goNextQuestion: () => {
      const { currentQuestion, questions } = get()
      const nextQuestion = currentQuestion + 1

      if (nextQuestion < questions.length) {
        set({ currentQuestion: nextQuestion })
      }
    },
    goPreviousQuestion: () => {
      const { currentQuestion } = get()
      const previousQuestion = currentQuestion - 1

      if (previousQuestion >= 0) {
        set({ currentQuestion: previousQuestion })
      }
    },
    reset: () => {
      set({ currentQuestion: 0, questions: []})
    }
  }
}, {
    name: 'questions'
}))