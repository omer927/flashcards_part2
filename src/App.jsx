import FlashcardForm from './components/FlashcardForm'
import { useState} from 'react';
import {CARD_DATA } from './data/cards';
import './App.css';

const App = () => {

  const [isFlipped, setIsFlipped] = useState(false);
  const [isStartCard, setIsStartCard] = useState(true);
  const [deck, setDeck] = useState(CARD_DATA);
  const [currIndex, setCurrIndex] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [guess, setGuess] = useState("");
  const [currStreak, setCurrStreak] = useState(0);
  const [longStreak, setLongStreak] = useState(0);
  const [hasGuessedCorrect, setHasGuessedCorrect] = useState(false);

  const handleNextClick = () => {
    if(isStartCard){
      setIsStartCard(false);
      setCurrIndex(0);
    }
    else if(currIndex < deck.length - 1){
      setCurrIndex(prevIndex => prevIndex + 1);
    }
    setIsFlipped(false);
    setFeedback('');
    setGuess('');
    setHasGuessedCorrect(false);
  };

  const handleLastClick = () => {
    if(currIndex > 0){
      setCurrIndex(prevIndex => prevIndex - 1);
    }
    setIsFlipped(false);
    setFeedback('');
    setGuess('');
    setHasGuessedCorrect(false);
  };

  const handleShuffleClick = () => {
    const shuffledDeck = [...deck];
    for (let i = shuffledDeck.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
    }
    setDeck(shuffledDeck);
    setCurrIndex(0);
    setIsFlipped(false);
    setFeedback('');
    setCurrStreak(0);
    setGuess('');
    setHasGuessedCorrect(false);
  };

  const checkAnswer = (userGuess) => {
    if (isStartCard ) return;

    const correctAnswer = deck[currIndex]?.answer.toLowerCase().trim();
    const formattedGuess = userGuess.toLowerCase().trim();

    if(formattedGuess === ""){
      setFeedback('wrong')
      setCurrStreak(0);
      return;
    }

    else if(correctAnswer.includes(formattedGuess)){
      setFeedback('correct');

      if(!hasGuessedCorrect){
        setHasGuessedCorrect(true);
        setCurrStreak(prev => {
          const nextStreak = prev + 1;
          if(nextStreak > longStreak){
            setLongStreak(nextStreak);
          }
          return nextStreak;
        });
      }
    }
    else{
      setFeedback('wrong');
      setCurrStreak(0);
    }
  }
  


  return(
    <div>
      <h2>Learning Basic French</h2>
      <h4>How much french you do know? Test your knowledge and find out!</h4>
      <h5>Number of cards: {CARD_DATA.length}</h5>
      <h4 className="streak-display">Current Streak: <span className="streak-num">{currStreak}</span>, Longest Streak: <span className="streak-num">{longStreak}</span></h4>
      <br/> 
      {isStartCard ? (
        <div className="blur">
          <div className={`card ${isFlipped ?'flipped': ''}`} onClick={() => setIsFlipped(!isFlipped)}>
            <div className="front">
              <p>Start!</p>
              <br/>
            </div>
            <div className="back">
              <p>Press the button to go to the next card</p>
            </div>
          </div>
        </div>
      ) : (
        
        <div id={deck[currIndex]?.difficulty || "medium"} className={`card ${isFlipped ? 'flipped': ''}`} onClick={() => setIsFlipped(!isFlipped)} >
          <div className="front"> 
            <p>{deck[currIndex]?.question}</p>
          </div>
          <div className="back">
            <p>{deck[currIndex]?.answer}</p>
          </div>
        </div>
      )}
      <div className="feedback-container"> 
        <FlashcardForm 
          onCheckAnswer={checkAnswer} 
          isStartCard={isStartCard} 
          guess={guess} 
          setGuess={setGuess} 
          feedback={feedback}
        />
      </div>
      <br />
      <button onClick={handleLastClick} className="lastCard" disabled={isStartCard || currIndex == 0}> ⭠</button>
      <button onClick={handleNextClick} className="nextCard" disabled={!isStartCard && currIndex === deck.length - 1}> ⭢</button>
      <button onClick={handleShuffleClick} className="shuffleCard" disabled={isStartCard}>Shuffle Button</button>
    </div>
 

  )
}

export default App;