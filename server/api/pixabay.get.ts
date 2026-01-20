// server/api/pixabay.get.ts
import { defineEventHandler, getQuery } from 'h3'

export default defineEventHandler(async (event) => {
  const { q, page } = getQuery(event)  // ?q=cat
  const config = useRuntimeConfig()
  const PIXABAY_KEY = config.privatePixabayKey
console.log('Pixabay Key exists:', !!config.privatePixabayKey)
  const url = `https://pixabay.com/api/?key=${PIXABAY_KEY}&q=${q}&&page=${page}`

  const res = await fetch(url)
  if (!res.ok) throw new Error('Pixabay API error')

  return await res.json()
})