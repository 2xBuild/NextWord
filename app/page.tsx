"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center text-6xl mx-auto">
              🔠
            </div>
          </div>
          <h1 className="font-mono text-5xl md:text-6xl font-bold mb-4">
            NextWord
          </h1>
          <p className="font-mono text-xl text-white/60">
            A multiplayer word-chaining challenge
          </p>
        </div>

        {/* Game Overview */}
        <div className="mb-12 p-8 border border-white/10 rounded-lg bg-white/5">
          <h2 className="font-mono text-2xl font-bold mb-4">Game Overview</h2>
          <p className="font-mono text-white/80 leading-relaxed">
            NextWord is a fast-paced multiplayer word game where players take turns
            creating a chain of English words. Each word must start with the last
            letter of the previous word. Test your vocabulary, think quickly, and
            outlast your opponents!
          </p>
        </div>

        {/* How to Play */}
        <div className="mb-12">
          <h2 className="font-mono text-2xl font-bold mb-6">How to Play</h2>
          <div className="space-y-4">
            {[
              {
                step: "1",
                title: "Join a Game",
                description: "Connect with 2 or more players via our game rooms"
              },
              {
                step: "2",
                title: "Wait Your Turn",
                description: "Players take turns in sequence. Watch the current word carefully!"
              },
              {
                step: "3",
                title: "Submit Your Word",
                description: "Type an English word that starts with the last letter of the previous word"
              },
              {
                step: "4",
                title: "Keep the Chain Going",
                description: "Continue until a player can't think of a valid word or runs out of time"
              }
            ].map((item) => (
              <div
                key={item.step}
                className="flex gap-4 p-6 border border-white/10 rounded-lg hover:border-white/20 transition-colors"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-white text-black flex items-center justify-center font-mono font-bold text-xl">
                    {item.step}
                  </div>
                </div>
                <div>
                  <h3 className="font-mono font-bold text-lg mb-2">{item.title}</h3>
                  <p className="font-mono text-white/70">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Game Rules */}
        <div className="mb-12">
          <h2 className="font-mono text-2xl font-bold mb-6">Game Rules</h2>
          <div className="space-y-3">
            {[
              "Words must be valid English words",
              "Each word must start with the last letter of the previous word",
              "No repeating words that have already been used in the current game",
              "Minimum 2 players required to start a game",
              "Players have a limited time to submit their word",
              "If you can't submit a valid word in time, you're out!"
            ].map((rule, index) => (
              <div
                key={index}
                className="flex gap-3 p-4 border border-white/10 rounded-lg"
              >
                <div className="flex-shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                </div>
                <p className="font-mono text-white/80">{rule}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Example */}
        <div className="mb-12 p-8 border border-white/10 rounded-lg bg-white/5">
          <h2 className="font-mono text-2xl font-bold mb-4">Example Game</h2>
          <div className="space-y-3 font-mono">
            <div className="flex items-center gap-3">
              <span className="text-white/60">Player 1:</span>
              <span className="font-bold">APPLE</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-white/60">Player 2:</span>
              <span className="font-bold">ELEPHANT</span>
              <span className="text-white/40 text-sm">(starts with E)</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-white/60">Player 3:</span>
              <span className="font-bold">TIGER</span>
              <span className="text-white/40 text-sm">(starts with T)</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-white/60">Player 1:</span>
              <span className="font-bold">ROCKET</span>
              <span className="text-white/40 text-sm">(starts with R)</span>
            </div>
            <div className="text-white/60 text-sm mt-4">
              ...and the chain continues!
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link
            href="/play"
            className="inline-block px-8 py-4 bg-white text-black font-mono font-bold text-lg rounded-lg hover:bg-white/90 transition-colors"
          >
            Start Playing →
          </Link>
        </div>
      </div>
    </div>
  );
}
