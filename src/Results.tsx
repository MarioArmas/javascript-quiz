import { Button } from '@mui/material'
import { useQuestionsStore } from './store/questions'
import { useQuestionsData } from './hooks/useQuestionsData'

export const Results = () => {
  const reset = useQuestionsStore(state => state.reset)
  const { correct, incorrect } = useQuestionsData()

  return (
    <>
      <div>
        <h1>¡Tus resultados!</h1>

        <strong>
          <p>✅ {correct} correctas</p>
          <p>❌ {incorrect} incorrectas</p>
        </strong>

        <Button onClick={() => reset()}>
          ¡Empezar de nuevo!
        </Button>
      </div>
    </>
  )
}