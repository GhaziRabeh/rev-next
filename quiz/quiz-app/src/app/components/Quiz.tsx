"use client";

import { useState, useEffect } from 'react';

const questions = [
  {
    question: "Que fait useState dans React ?",
    options: [
      { id: 'A', text: "Crée un effet" },
      { id: 'B', text: "Crée une variable d'état", correct: true },
      { id: 'C', text: "Navigue entre les pages" }
    ]
  },
  {
    question: "Dans quel dossier se trouve la page /about en App Router ?",
    options: [
      { id: 'A', text: "/pages/about.js" },
      { id: 'B', text: "/components/about.tsx" },
      { id: 'C', text: "/app/about/page.tsx", correct: true }
    ]
  },
  {
    question: "Quel est le rôle de useEffect ?",
    options: [
      { id: 'A', text: "Appliquer des styles" },
      { id: 'B', text: "Gérer des effets secondaires", correct: true },
      { id: 'C', text: "Créer des routes" }
    ]
  }
];

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (timeLeft === 0) {
      handleNext();
      return;
    }

    if (!quizCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }

  }, [timeLeft, quizCompleted]);

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleNext = () => {
  
    const currentQ = questions[currentQuestion];
    const correctOption = currentQ.options.find(opt => opt.correct);
    
    if (selectedOption === correctOption?.id) {
      setScore(score + 1);
    }

   
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setTimeLeft(30);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setQuizCompleted(false);
    setTimeLeft(30);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      {!quizCompleted ? (
        <>
          <div className="mb-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">
                Question {currentQuestion}/{questions.length}
              </span>
              <span className="text-sm font-medium text-gray-700">
                Temps: {timeLeft}s
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-4">{questions[currentQuestion].question}</h2>
          
          <div className="space-y-3 mb-6">
            {questions[currentQuestion].options.map((option) => (
              <div 
                key={option.id}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedOption === option.id 
                    ? 'bg-blue-100 border-blue-500' 
                    : 'hover:bg-gray-50 border-gray-200'
                }`}
                onClick={() => handleOptionSelect(option.id)}
              >
                <span className="font-medium mr-2">{option.id}.</span>
                {option.text}
              </div>
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={!selectedOption}
            className={`w-full py-2 px-4 rounded-md text-white font-medium ${
              !selectedOption ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {currentQuestion === questions.length - 1 ? 'Terminer' : 'Suivant'}
          </button>
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Quiz terminé !</h2>
          <p className="text-lg mb-6">Vous avez {score}/{questions.length} bonnes réponses</p>
          <button
            onClick={handleRestart}
            className="py-2 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
          >
            Rejouer
          </button>
        </div>
      )}
    </div>
  );
}