import { useEffect, useState } from "react"
import "./Questionaire.css"
import he from 'he'
import { nanoid } from 'nanoid'
import Question from "./Question"

export default function Questionaire(props) {
    const [questions,setQuestions] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [form, setForm] = useState([])
    const [count, setCount] = useState(0)
    const [showAnswers, setShowAnwers] = useState(false)
    
// category: "Science &amp; Nature"
// correct_answer: "2"
// difficulty: "easy"
// incorrect_answers: Array(3)
//     0: "1"
//     1: "4"
//     2: "3"
//     length: 3
// question: "Human cells typically have how many copies of each gene?"
// type: "multiple"

    useEffect(() => {
        const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
        const getTotalAnswers = (correct, incorrect) => {
            const answers = []
            incorrect.forEach(element => {
                answers.push(he.decode(element))
            });
            const rnd = Math.floor(Math.random() * (answers.length + 1))
            answers.splice(rnd,0,he.decode(correct))
            return answers
            }
        const fetchData = async () =>{
            await sleep(5000)
            const res = await fetch('https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple')
            const data = await res.json()
            const arrayQuestions = Object.keys(data.results).map(key => {
                return {
					...data.results[key],
                    id: nanoid(),
                    question: he.decode(data.results[key].question),
                    correct_answer: he.decode(data.results[key].correct_answer),
                    incorrect_answers: data.results[key].incorrect_answers.map(element => {
                                            he.decode(element)
                                        }),
					fullAnswers: getTotalAnswers(data.results[key].correct_answer, data.results[key].incorrect_answers)
				}
            });
            setQuestions(arrayQuestions)
            const arrayForm = arrayQuestions.map( item => {
                return {
                    id: item.id,
                    givenAnswer: "",
                    correct: undefined
                }
            })
            setForm(arrayForm)
            setIsLoading(false);
        }
        fetchData()
    },[])

    useEffect(() => {
        if (showAnswers) countCorrectAnswers(form)
    }, [form,showAnswers])

    function handleChange(event){
        const {name, value, type, checked} = event.target
        setForm( prev => {
            return prev.map( question => {
                return question.id === name ? {
                    ...question,
                    givenAnswer: value,
                } :
                {
                    ...question
                }
            })
        })
    }

    function filterByCorrect(item){
        return item.correct ? true : false
    }

    function countCorrectAnswers(form){
        const count = form.filter(filterByCorrect).length
        setCount(count)
    }

    function handleSubmit(event) {
        event.preventDefault()
        setForm( prev => {
            return prev.map( question => {
                const questionsFilter = questions.filter( item => item.id === question.id)
                return {
                    ...question,
                    correct: question.givenAnswer === questionsFilter[0].correct_answer ? true : false
                }
            })
        })
        setShowAnwers(true)

        if (event.nativeEvent.submitter.id === 'btn-play-again'){
            setForm([])
            props.handleChangePage()
        }
    }


    return(
        <div className="page-questionaire">
            {isLoading ? (
                <h1 className="loading">Loading</h1>
            ) : (
                <form onSubmit={handleSubmit}>
                    {questions.map( (question, index) => {
                        return (
                            <Question key={question.id} question={question} dataOut={handleChange} formData={form[index]}/>
                        )
                    })}

                    <div className="bottom">
                        { showAnswers ? 
                            (
                                <>
                                    <h2>You scored {count}/{questions.length} correct answers</h2> 
                                    <button className="primary" id='btn-play-again'>Play again</button>
                                </>
                            )
                            :
                            <button className="primary">Check Answers</button>
                        }
                    </div>
                </form>
            )}
        </div>
    )
}