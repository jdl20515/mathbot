import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()
import OpenAI from 'openai'

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY,
})

const app = express()
app.use(cors())
app.use(express.json())

// Define a custom error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send({ error: 'Something went wrong!' })
}

app.use(errorHandler)

app.get('/', async (req, res) => {
    res.status(200).send({
        message: 'Hello from Cyber',
    })
})

app.post('/', async (req, res) => {
    try {
        const prompt = req.body.prompt

        if (!prompt) {
            // If prompt is missing in the request, return a bad request response
            return res
                .status(400)
                .send({ error: "Missing 'prompt' in the request body" })
        }

        const response = await openai.chat.completions.create({
            messages: [
                { role: 'system', content: 'Make sure to explain every answer. You are a world class educator, dedicated to helping college students understanding of multivariable calculus with little mathematical background. Your main objective is to equip these students with the necessary tools and resources to embark on a journey of self-directed learning in these complex subjects. Your mission is to transform abstract and elusive concepts into straightforward, easily comprehensible ideas, ensuring that students can grasp these fundamental principles with confidence.' },
                { role: 'user', content: prompt },
            ],
            model: 'gpt-3.5-turbo',
        })

        if (!response.choices || !response.choices[0].message.content) {
            // If the response from OpenAI is unexpected, return a server error response
            return res
                .status(500)
                .send({ error: 'Unexpected response from OpenAI' })
        }

        console.log(response.choices)
        res.status(200).send({
            bot: response.choices[0].message.content,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({ error })
    }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () =>
    console.log(`Server is running on port http://localhost:${PORT}`)
)
