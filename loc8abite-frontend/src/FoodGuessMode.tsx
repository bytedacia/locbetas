import React, { useState, useEffect, useRef } from "react";
import "./PhotoGuessMode.css";
import PhotoDisplay from "./PhotoDisplayFood";
import WorldMap from "./WorldMap";
import ResultModal from "./ResultModalFood";
import confetti from "canvas-confetti";

interface PhotoData {
  image: string;
  country: string;
  name: string;
  type: string;
}

interface FoodGuessModeProps {
  onBack?: () => void;
}

const FoodGuessMode: React.FC<FoodGuessModeProps> = ({ onBack }) => {
  const [photoData, setPhotoData] = useState<PhotoData[]>([]);
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [started, setStarted] = useState(false);
  const [flashCelebration, setFlashCelebration] = useState(false);
  const [revealCorrect, setRevealCorrect] = useState(false);
  const [isCorrectGuess, setIsCorrectGuess] = useState<boolean>(false);
  
  // Nuove variabili per timer e tentativi
  const [timeLeft, setTimeLeft] = useState(60); // 60 secondi per round
  const [attempts, setAttempts] = useState(5); // 5 tentativi per round
  const [gameOver, setGameOver] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [roundNumber, setRoundNumber] = useState(1);
  const [timerActive, setTimerActive] = useState(false);
  const [wrongGuesses, setWrongGuesses] = useState<string[]>([]);
  const [correctGuess, setCorrectGuess] = useState<string | null>(null);
  const [showAllResults, setShowAllResults] = useState(false);
  const [maxRounds] = useState(10); // 10 round totali
  const [roundsCompleted, setRoundsCompleted] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetch("http://localhost:4000/api/wikidata/food")
      .then((res) => res.json())
      .then((data) => setPhotoData(data))
      .catch((err) => console.error("Failed to fetch photo data:", err));
  }, []);

  useEffect(() => {
    audioRef.current = new Audio("/audio/celebrate.mp3");
  }, []);

  // Timer effect
  useEffect(() => {
    if (timerActive && timeLeft > 0 && !gameOver) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !gameOver) {
      handleTimeUp();
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timeLeft, timerActive, gameOver]);

  const handleTimeUp = () => {
    setGameOver(true);
    setShowResult(true);
    setResult("⏰ Tempo scaduto! Hai esaurito il tempo per questo round.");
    setScore(0);
    setRevealCorrect(true);
    setShowAllResults(true);
  };

  const startRound = () => {
    if (photoData.length > 0) {
      setCurrentPhotoIdx(Math.floor(Math.random() * photoData.length));
      setStarted(true);
      setTimeLeft(60);
      setAttempts(5);
      setGameOver(false);
      setTimerActive(true);
      setRoundNumber(1);
      setTotalScore(0);
      setRoundsCompleted(0);
      setWrongGuesses([]);
      setCorrectGuess(null);
      setShowAllResults(false);
    }
  };

  const resetGame = () => {
    setStarted(false);
    setSelectedCountry(null);
    setResult(null);
    setShowResult(false);
    setScore(null);
    setRevealCorrect(false);
    setFlashCelebration(false);
    setIsCorrectGuess(false);
    setTimeLeft(60);
    setAttempts(5);
    setGameOver(false);
    setTimerActive(false);
    setTotalScore(0);
    setRoundNumber(1);
    setRoundsCompleted(0);
    setWrongGuesses([]);
    setCorrectGuess(null);
    setShowAllResults(false);
  };

  const currentPhoto = photoData[currentPhotoIdx];

  const handleCountrySelect = (countryName: string) => {
    if (!gameOver && attempts > 0 && !wrongGuesses.includes(countryName) && countryName !== correctGuess) {
      setSelectedCountry(countryName);
    }
  };

  const handleSubmit = () => {
    if (!selectedCountry || !currentPhoto || gameOver || attempts <= 0) return;

    const isCorrect =
      selectedCountry.trim().toLowerCase() ===
      currentPhoto.country.trim().toLowerCase();

    const scoreValue = isCorrect ? 100 : 0;
    setScore(scoreValue);
    setIsCorrectGuess(isCorrect);
    setShowResult(true);
    setSelectedCountry(null);
    setAttempts(prev => prev - 1);

    if (isCorrect) {
      setResult("🎉 Corretto! Hai indovinato il paese giusto!");
      setTotalScore(prev => prev + scoreValue);
      setCorrectGuess(selectedCountry);
      confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
      setFlashCelebration(true);
      setTimerActive(false);
      setRoundsCompleted(prev => prev + 1);
    } else {
      setWrongGuesses(prev => [...prev, selectedCountry]);
      
      if (attempts - 1 === 0) {
        setResult(`❌ Game Over! Hai esaurito tutti i tentativi. Il paese corretto era: ${currentPhoto.country}`);
        setGameOver(true);
        setRevealCorrect(true);
        setTimerActive(false);
        setShowAllResults(true);
        setCorrectGuess(currentPhoto.country);
      } else {
        setResult(`❌ Sbagliato! Hai ancora ${attempts - 1} tentativi. Hai scelto: ${selectedCountry}`);
      }
    }
  };

  const handleNext = () => {
    if (gameOver) {
      if (roundsCompleted >= maxRounds) {
        // Gioco completamente finito
        resetGame();
        return;
      }
      // Passa al round successivo
      setSelectedCountry(null);
      setResult(null);
      setShowResult(false);
      setScore(null);
      setRevealCorrect(false);
      setFlashCelebration(false);
      setIsCorrectGuess(false);
      setTimeLeft(60);
      setAttempts(5);
      setGameOver(false);
      setTimerActive(true);
      setRoundNumber(prev => prev + 1);
      setWrongGuesses([]);
      setCorrectGuess(null);
      setShowAllResults(false);

      if (photoData.length > 0) {
        setCurrentPhotoIdx(Math.floor(Math.random() * photoData.length));
      }
    } else {
      // Skip del round corrente
      setSelectedCountry(null);
      setResult(null);
      setShowResult(false);
      setScore(null);
      setRevealCorrect(false);
      setFlashCelebration(false);
      setIsCorrectGuess(false);
      setTimeLeft(60);
      setAttempts(5);
      setRoundNumber(prev => prev + 1);
      setTimerActive(true);
      setWrongGuesses([]);
      setCorrectGuess(null);
      setShowAllResults(false);

      if (photoData.length > 0) {
        setCurrentPhotoIdx(Math.floor(Math.random() * photoData.length));
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!currentPhoto) return <div>Loading...</div>;

  return (
    <div className={`photo-guess-mode ${flashCelebration ? "flash-bg" : ""}`}>
      {!started ? (
        <div className="card-options">
          <div className="card-option start-card" onClick={startRound}>
            <h3>▶️ Inizia Food Guess</h3>
            <p>Prova a indovinare da quale paese proviene questo cibo!</p>
            <p>Hai 60 secondi e 5 tentativi per round</p>
            <p>10 round totali per completare il gioco</p>
          </div>
          {onBack && (
            <div className="card-option back-card" onClick={onBack}>
              <h3>🔙 Torna al Menu</h3>
              <p>Ritorna alla schermata di selezione modalità</p>
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Header con timer e tentativi */}
          <div className="game-header">
            <div className="game-stats">
              <div className="stat-item">
                <span className="stat-label">⏱️ Tempo:</span>
                <span className={`stat-value ${timeLeft <= 10 ? 'time-warning' : ''}`}>
                  {formatTime(timeLeft)}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">🎯 Tentativi:</span>
                <span className="stat-value">{attempts}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">📊 Round:</span>
                <span className="stat-value">{roundNumber}/{maxRounds}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">🏆 Punteggio Totale:</span>
                <span className="stat-value">{totalScore}</span>
              </div>
            </div>
          </div>

          {/* Mini Compass 3D */}
          <div className="compass-container">
            <div className="compass">
              <div className="compass-needle"></div>
              <div className="compass-directions">
                <span className="direction n">N</span>
                <span className="direction e">E</span>
                <span className="direction s">S</span>
                <span className="direction w">W</span>
              </div>
            </div>
            <div className="compass-hint">
              <p>🧭 Usa la bussola per orientarti nel mondo!</p>
            </div>
          </div>

          <PhotoDisplay url={currentPhoto.image} name={currentPhoto.name} />
          <WorldMap
            onCountrySelect={handleCountrySelect}
            selectedCountry={selectedCountry}
            correctCountry={showAllResults ? currentPhoto.country : null}
            wrongCountries={showAllResults ? wrongGuesses : []}
            correctGuess={correctGuess}
          />
          
          <button
            onClick={handleSubmit}
            disabled={!selectedCountry || gameOver || attempts <= 0}
            className="submit-btn"
          >
            {gameOver ? 'Game Over' : `Invia Risposta (${attempts} tentativi rimasti)`}
          </button>

          <button
            onClick={handleNext}
            className="correct-btn skip-btn"
            style={{ marginTop: "0.5rem" }}
          >
            {gameOver ? 
              (roundsCompleted >= maxRounds ? '🔄 Gioca Ancora' : '⏭️ Prossimo Round') : 
              '⏭️ Salta Round'
            }
          </button>

          <ResultModal result={result} show={showResult} score={score} />
        </>
      )}
    </div>
  );
};

export default FoodGuessMode;
