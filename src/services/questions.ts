export const getAllQuestions = async () => {
  const API_URL = 'https://javascript-quiz-two.vercel.app/data.json' || 'http://localhost:5173/data.json'
  const res = await fetch(API_URL)
  const json = await res.json()
  return json
}