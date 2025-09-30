// src/components/DBTQuizApp.tsx

"use client";

import React, { useState } from 'react';
import { CheckCircle, XCircle, Award, ArrowRight, RotateCcw, BookOpen, AlertCircle } from 'lucide-react';

// Define a type for our answered questions to help TypeScript
type AnsweredQuestion = {
  question: number;
  correct: boolean;
};

export default function DBTQuizApp() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<AnsweredQuestion[]>([]);

  const quizQuestions = [
    { id: 1, question: "What does 'Aadhaar-linked account' mean?", options: ["Account is ready to receive scholarship money", "Account is connected to Aadhaar for KYC identification only", "Account is automatically DBT-enabled", "Account can receive government benefits"], correct: 1, explanation: "Aadhaar-linked means your bank account is connected to your Aadhaar for identity verification (KYC). This does NOT automatically mean it can receive scholarships! You need DBT-seeding for that.", tip: "Think of linking as 'showing your ID card' - it proves who you are, but doesn't open the door for money transfers." },
    { id: 2, question: "What is a DBT-enabled (seeded) account?", options: ["Any account linked to Aadhaar", "Account specifically registered with NPCI to receive Direct Benefit Transfers", "Account with minimum ₹500 balance", "Account opened in the last 6 months"], correct: 1, explanation: "DBT-enabled means your account is specifically flagged by NPCI (National Payments Corporation of India) to receive government scholarships and benefits. This is a separate step after Aadhaar linking!", tip: "DBT = Direct Benefit Transfer. Seeding is like 'activating' your account for receiving government money." },
    { id: 3, question: "Can you receive scholarship in an Aadhaar-linked account that is NOT DBT-seeded?", options: ["Yes, linking is enough", "No, you MUST have DBT-seeding", "Only if balance is above ₹1000", "Only in SBI accounts"], correct: 1, explanation: "NO! This is the biggest confusion. Even if your account is Aadhaar-linked, scholarships will FAIL if it's not DBT-seeded. Both steps are necessary!", tip: "Linking ≠ Seeding. You need BOTH to receive your scholarship!" },
    { id: 4, question: "Where is DBT seeding done?", options: ["At school office", "At your bank branch", "Online through NSP portal", "At post office"], correct: 1, explanation: "DBT seeding is done at your bank branch. Visit with your passbook and Aadhaar card and ask bank staff to 'seed my account for DBT' or 'enable DBT on my account'.", tip: "Always carry your Aadhaar card and bank passbook when visiting the bank!" },
    { id: 5, question: "How can you check if your account is DBT-enabled?", options: ["Check bank passbook", "Visit NPCI Aadhaar Mapper website or use UMANG app", "Call school office", "Check NSP portal"], correct: 1, explanation: "Visit the NPCI Aadhaar Mapper (now on the MyAadhaar portal) or use the UMANG mobile app to verify if your account is DBT-enabled. You can also ask your bank!", tip: "Pro tip: Check online at myaadhaar.uidai.gov.in or download UMANG app for instant verification!" },
    { id: 6, question: "What happens if scholarship is sent to a non-DBT account?", options: ["Money is held by bank for 30 days", "Payment FAILS and gets returned", "Money goes to school account", "Automatic retry after 1 week"], correct: 1, explanation: "If your account is not DBT-seeded, the scholarship payment will FAIL and be returned to the government. You'll face delays getting it re-credited!", tip: "Prevention is better than cure - seed your account BEFORE applying for scholarships!" },
    { id: 7, question: "Which document do you need to seed your account at the bank?", options: ["School ID card only", "Aadhaar card + Bank passbook", "Ration card + Voter ID", "Birth certificate"], correct: 1, explanation: "You need your original Aadhaar card and bank passbook. The bank will link your Aadhaar number to your account number in the NPCI system for DBT.", tip: "Carry originals, not photocopies! Bank staff need to verify them." },
    { id: 8, question: "True or False: All bank accounts opened with Aadhaar are automatically DBT-ready.", options: ["True - no extra step needed", "False - DBT seeding is a separate process", "True - only for government banks", "False - only for accounts above ₹10,000"], correct: 1, explanation: "FALSE! This is the most common myth. Opening an account with Aadhaar only links it for KYC. You must separately request DBT seeding at your branch.", tip: "Don't assume! Always ask 'Is my account DBT-seeded?' at the bank." }
  ];

  const learningModules = [
    { title: "What is Aadhaar Linking?", content: "Aadhaar linking means your bank account is connected to your Aadhaar number for identity verification (KYC - Know Your Customer). This helps the bank confirm you are the real account holder.", icon: "🔗", example: "Like showing your ID card at a shop - it proves who you are." },
    { title: "What is DBT Seeding?", content: "DBT (Direct Benefit Transfer) seeding is a separate process where your account is registered with NPCI to RECEIVE government benefits and scholarships. This is the critical step most students miss!", icon: "🌱", example: "Like giving someone your correct address to receive a package - without this, money can't reach you!" },
    { title: "Why Both Are Needed", content: "Linking proves WHO you are. Seeding enables WHERE money should go. Government needs both to send your scholarship safely and correctly.", icon: "✅", example: "ID card (linking) + Address (seeding) = Successful delivery!" },
    { title: "How to Get DBT Seeded", content: "1. Visit your bank branch\n2. Carry Aadhaar + Passbook\n3. Tell staff: 'Please seed my account for DBT'\n4. Verify on MyAadhaar portal after a few days", icon: "🏦", example: "It's FREE and takes only 10-15 minutes at the bank!" }
  ];

  const handleAnswerSelect = (index: number) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
    if (index === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
    setAnsweredQuestions([...answeredQuestions, { question: currentQuestion, correct: index === quizQuestions[currentQuestion].correct }]);
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setCurrentScreen('results');
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setAnsweredQuestions([]);
    setCurrentScreen('home');
  };

  const getScoreMessage = () => {
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage === 100) return { text: "Perfect Score! 🎉", color: "text-green-600", msg: "You're a DBT expert! Share this knowledge with your friends." };
    if (percentage >= 75) return { text: "Great Job! 🌟", color: "text-blue-600", msg: "You understand the basics well. Review wrong answers once more." };
    if (percentage >= 50) return { text: "Good Start! 💪", color: "text-yellow-600", msg: "You're learning! Go through the Learn section again." };
    return { text: "Keep Learning! 📚", color: "text-orange-600", msg: "Don't worry! This is complex. Review the learning modules carefully." };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-t-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">💳 DBT Scholarship Awareness</h1>
              <p className="text-gray-600">Learn the difference between Linked & Seeded accounts</p>
            </div>
            <Award className="w-12 h-12 text-yellow-500" />
          </div>
        </header>

        {currentScreen === 'home' && (
          <div className="space-y-6">
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg"><div className="flex items-start"><AlertCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0 mt-1" /><div><h3 className="font-bold text-red-800 mb-1">⚠ Common Problem</h3><p className="text-red-700 text-sm">Many students think &quot;Aadhaar-linked&quot; means they can receive scholarships. <span className="font-bold"> This is WRONG!</span> You need DBT-SEEDING too. Let&apos;s learn the difference!</p></div></div></div>
            <div className="grid md:grid-cols-2 gap-4"><button onClick={() => setCurrentScreen('learn')} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-blue-400 text-left"><BookOpen className="w-12 h-12 text-blue-500 mb-3" /><h2 className="text-xl font-bold text-gray-800 mb-2">📖 Learn First</h2><p className="text-gray-600 text-sm">Understand the basics before taking the quiz</p></button><button onClick={() => setCurrentScreen('quiz')} className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all text-left text-white"><Award className="w-12 h-12 mb-3" /><h2 className="text-xl font-bold mb-2">🎯 Take Quiz</h2><p className="text-blue-100 text-sm">Test your knowledge with 8 questions</p></button></div>
            <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-xl"><h3 className="font-bold text-gray-800 mb-3 text-lg">📊 Why This Matters:</h3><div className="grid grid-cols-3 gap-4 text-center"><div><div className="text-2xl font-bold text-purple-600">30%+</div><div className="text-sm text-gray-700">Scholarship delays</div></div><div><div className="text-2xl font-bold text-blue-600">2 Steps</div><div className="text-sm text-gray-700">Linking + Seeding</div></div><div><div className="text-2xl font-bold text-green-600">100%</div><div className="text-sm text-gray-700">Preventable issue</div></div></div></div>
          </div>
        )}

        {currentScreen === 'learn' && (
          <div className="space-y-6"><button onClick={() => setCurrentScreen('home')} className="text-blue-600 hover:text-blue-800 font-medium mb-4 flex items-center">← Back to Home</button>{learningModules.map((module, idx) => (<div key={idx} className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500"><div className="flex items-start"><div className="text-4xl mr-4">{module.icon}</div><div className="flex-1"><h3 className="text-xl font-bold text-gray-800 mb-3">{module.title}</h3><p className="text-gray-700 mb-3 leading-relaxed whitespace-pre-line">{module.content}</p><div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400"><p className="text-sm text-blue-800"><span className="font-semibold">Example:</span> {module.example}</p></div></div></div></div>))}<div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border-2 border-green-300"><h3 className="text-xl font-bold text-gray-800 mb-4 text-center">🔍 Quick Comparison</h3><div className="grid md:grid-cols-2 gap-4"><div className="bg-white p-4 rounded-lg shadow"><h4 className="font-bold text-blue-600 mb-2">🔗 Aadhaar Linked</h4><ul className="text-sm text-gray-700 space-y-1"><li>✓ For identity verification</li><li>✓ Bank knows WHO you are</li><li>✗ Cannot receive scholarships alone</li></ul></div><div className="bg-white p-4 rounded-lg shadow"><h4 className="font-bold text-green-600 mb-2">🌱 DBT Seeded</h4><ul className="text-sm text-gray-700 space-y-1"><li>✓ Ready for benefit transfers</li><li>✓ Account registered with NPCI</li><li>✓ CAN receive scholarships</li></ul></div></div></div><button onClick={() => setCurrentScreen('quiz')} className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all">Ready to Test Your Knowledge? →</button></div>
        )}

        {currentScreen === 'quiz' && (
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-xl shadow-lg"><div className="flex justify-between items-center mb-2"><span className="text-sm font-medium text-gray-600">Question {currentQuestion + 1} of {quizQuestions.length}</span><span className="text-sm font-medium text-blue-600">Score: {score}</span></div><div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all" style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }} /></div></div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-bold text-gray-800 mb-6">{quizQuestions[currentQuestion].question}</h2>
              <div className="space-y-3">
                {quizQuestions[currentQuestion].options.map((option, idx) => {
                  const isSelected = selectedAnswer === idx;
                  const isCorrect = idx === quizQuestions[currentQuestion].correct;
                  const showResult = showExplanation;
                  let buttonClass = "w-full p-4 rounded-lg border-2 text-left transition-all ";
                  if (!showResult) {
                    buttonClass += "border-gray-300 hover:border-blue-400 hover:bg-blue-50";
                  } else if (isSelected && isCorrect) {
                    buttonClass += "border-green-500 bg-green-50 text-green-800 font-semibold";
                  } else if (isSelected && !isCorrect) {
                    buttonClass += "border-red-500 bg-red-50 text-red-800 font-semibold";
                  } else if (isCorrect) {
                    buttonClass += "border-green-500 bg-green-50";
                  } else {
                    buttonClass += "border-gray-200 bg-gray-50 opacity-70";
                  }
                  return (
                    <button key={idx} onClick={() => handleAnswerSelect(idx)} disabled={showExplanation} className={buttonClass}>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-800">{option}</span>
                        {showResult && isCorrect && (<CheckCircle className="w-6 h-6 text-green-600" />)}
                        {showResult && isSelected && !isCorrect && (<XCircle className="w-6 h-6 text-red-600" />)}
                      </div>
                    </button>
                  );
                })}
              </div>
              {showExplanation && (
                <div className="mt-6 space-y-4"><div className={`p-4 rounded-lg border-l-4 ${selectedAnswer === quizQuestions[currentQuestion].correct ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}`}><h3 className="font-bold text-gray-800 mb-2">{selectedAnswer === quizQuestions[currentQuestion].correct ? '✅ Correct!' : '❌ Not quite!'}</h3><p className="text-gray-700 text-sm mb-3">{quizQuestions[currentQuestion].explanation}</p></div><div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500"><p className="text-sm text-blue-800"><span className="font-semibold">💡 Pro Tip:</span> {quizQuestions[currentQuestion].tip}</p></div><button onClick={handleNext} className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all flex items-center justify-center">{currentQuestion < quizQuestions.length - 1 ? 'Next Question' : 'See Results'}<ArrowRight className="ml-2 w-5 h-5" /></button></div>
              )}
            </div>
          </div>
        )}

        {currentScreen === 'results' && (
          <>
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-xl shadow-lg text-center"><div className="mb-6"><div className="inline-block p-4 bg-yellow-100 rounded-full mb-4"><Award className="w-16 h-16 text-yellow-600" /></div><h2 className={`text-3xl font-bold mb-2 ${getScoreMessage().color}`}>{getScoreMessage().text}</h2><p className="text-gray-600 mb-4">{getScoreMessage().msg}</p></div><div className="bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-xl mb-6"><div className="text-5xl font-bold text-gray-800 mb-2">{score} / {quizQuestions.length}</div><div className="text-gray-600">Questions Correct</div></div><div className="text-left mb-6"><h3 className="font-bold text-gray-800 mb-3 text-center">📝 Your Answers:</h3><div className="space-y-2">{answeredQuestions.map((ans, idx) => (<div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"><span className="text-sm text-gray-700">Question {ans.question + 1}</span>{ans.correct ? (<CheckCircle className="w-5 h-5 text-green-600" />) : (<XCircle className="w-5 h-5 text-red-600" />)}</div>))}</div></div><div className="space-y-3"><button onClick={restartQuiz} className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all flex items-center justify-center"><RotateCcw className="mr-2 w-5 h-5" />Retake Quiz</button><button onClick={() => setCurrentScreen('learn')} className="w-full bg-white border-2 border-blue-500 text-blue-600 py-3 rounded-lg font-bold hover:bg-blue-50 transition-all">Review Learning Modules</button></div></div>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border-2 border-green-400"><h3 className="font-bold text-gray-800 mb-4 text-center text-lg">&quot;🎯 Next Steps to Secure Your Scholarship:&quot;</h3><div className="space-y-3"><div className="bg-white p-3 rounded-lg shadow-sm"><span className="font-bold text-green-600">Step 1:</span> Visit your bank with Aadhaar + Passbook</div><div className="bg-white p-3 rounded-lg shadow-sm"><span className="font-bold text-green-600">Step 2:</span> Ask: &quot;Please seed my account for DBT&quot;</div><div className="bg-white p-3 rounded-lg shadow-sm"><span className="font-bold text-green-600">Step 3:</span> Verify on myaadhaar.uidai.gov.in</div><div className="bg-white p-3 rounded-lg shadow-sm"><span className="font-bold text-green-600">Step 4:</span> Share this quiz with your friends!</div></div></div>
          </>
        )}

        <footer className="mt-8 text-center text-sm text-gray-600">
          <p>💡 Knowledge is power! Share this with friends to help them avoid scholarship delays.</p>
        </footer>
      </div>
    </div>
  );
}