import "./Questionaire.css"

export default function Question(props) {
    const id = props.question.id
    const question = props.question.question
    const correct_answer = props.question.correct_answer
    const answers = props.question.fullAnswers
    const handleChange = props.dataOut
    const formData = props.formData
    const correct = props.formData.correct

    return(
        <section className="question" id={id}>
            <h2 className="question--title">{question}</h2>
            <div className="question--answers">
                {answers.map( (answer,index) => {
                    let className = ''
                    if(correct !== undefined){
                        if( answer === correct_answer ){
                            className += 'correct'
                        } else {
                            if( answer === formData.givenAnswer ){
                                if( formData.givenAnswer !== correct_answer ){
                                    className += 'wrong'
                                }
                            } else {
                                className += 'oscura'
                            }
                        }
                    }

                    return (
                        <div key={`input-${index}-${id}`} className="question--answer">
                            <input
                                key={`input-${index}-${id}`}
                                type="radio"
                                name={id}
                                id={answer}
                                value={answer}
                                onChange={handleChange}
                                checked={formData.givenAnswer === answer}
                            />
                            <label key={`label-${index}-${id}`} htmlFor={answer} className={className}>{answer}</label>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}