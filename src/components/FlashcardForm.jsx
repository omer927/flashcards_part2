


const FlashcardForm = ({onCheckAnswer, isStartCard, guess, setGuess, feedback}) => {


    const handleSubmit = (e) => {
        e.preventDefault();
        onCheckAnswer(guess);
    }

    return(
        <div className="guessing">
            <form onSubmit={handleSubmit}>
                <label htmlFor="userGuess">Guess your answer here: </label>
                <input 
                    
                    id="userGuess"
                    type="text"
                    className={`answer ${feedback}`}
                    placeholder="Place your answer here..."
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                    disabled={isStartCard} 
                />
                <button type="submit" className="submit_button" sidabled={isStartCard}>Submit Guess</button>
            </form>
        </div>
    );

};

export default FlashcardForm;