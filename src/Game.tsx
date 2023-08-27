import { Card, Stack, IconButton, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material'
import { useQuestionsStore } from './store/questions'
import { type Question as QuestionType } from './types'
import SyntexHighlighter from 'react-syntax-highlighter'
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { Footer } from './Footer'

const Question = ({ info }: { info: QuestionType }) => {
  const selectAnswer = useQuestionsStore(state => state.selectAnswer)

  const createHandleClick = (answerIndex: number) => {
    selectAnswer(info.id, answerIndex)
  }

  const getBackgroundColor = (index: number) => {
    const { userSelectedAnswer, correctAnswer } = info
    // usuario no ha seleccionado nada
    if (userSelectedAnswer == null) return 'transparent'
    // selección incorrecta
    if (index !== correctAnswer && index !== userSelectedAnswer) return 'transparent'
    // selección correcta
    if (index === correctAnswer) return 'green'
    // selección del usuario incorrecta
    if (index === userSelectedAnswer) return 'red'

    return 'transparent'
  }

  return (
    <Card variant='outlined' sx={{bgcolor: '#222', p: 2, textAlign: 'left', marginTop: 4}}>

      <Typography variant='h5'>
        {info.question}
      </Typography>

      <SyntexHighlighter language='javascript' style={gradientDark}>
        {info.code}
      </SyntexHighlighter>

      <List sx={{ bgcolor: '#333' }} disablePadding>
        {info.answers?.map((answer, index) => (
            <ListItem key={index} disablePadding divider>
              <ListItemButton onClick={() => {createHandleClick(index)}} sx={{ backgroundColor: getBackgroundColor(index) }}>
                <ListItemText primary={answer} sx={{ textAlign: 'center' }} />
              </ListItemButton>
            </ListItem>
        ))}
      </List>

    </Card>
  )
}

export const Game = () => {
  const questions = useQuestionsStore(state => state.questions)
  const currentQuestion = useQuestionsStore(state => state.currentQuestion)
  const goNextQuestion = useQuestionsStore(state => state.goNextQuestion)
  const goPreviousQuestion = useQuestionsStore(state => state.goPreviousQuestion)

  const questionInfo = questions[currentQuestion]

  return (
    <>
      <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>
        <IconButton onClick={goPreviousQuestion} disabled={currentQuestion === 0}>
          <ArrowBackIosNew />
        </IconButton>

        {currentQuestion + 1} / {questions.length}

        <IconButton onClick={goNextQuestion} disabled={currentQuestion >= questions.length - 1}>
          <ArrowForwardIos />
        </IconButton>
      </Stack>
      <Question info={questionInfo} />

      <Footer />
    </>
  )
}