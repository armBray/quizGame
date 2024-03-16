// import "./StartPage.scss"

export default function StartPage(props){
    return (
        <div>
            <h1>Quizzical</h1>
            <p>Welcome to the crazy quiz!</p>
            <button className="primary" onClick={props.handleChangePage}>Start quiz</button>
        </div>
    )
}