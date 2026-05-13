/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gamepad2, Search, X, Maximize2, ExternalLink, Play, Clock, Star, Trophy, ArrowLeft } from 'lucide-react';
import { GAMES } from './data/games';

export default function App() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(GAMES.map(g => g.category)))];

  const filteredGames = useMemo(() => {
    return GAMES.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || game.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="min-h-screen bg-black font-sans selection:bg-[#00FF00] selection:text-black">
      {/* Marquee Header */}
      <div className="bg-[#00FF00] text-black py-1 overflow-hidden border-b-2 border-white">
        <div className="marquee-container">
          <div className="marquee-content inline-block whitespace-nowrap">
            <span className="mx-4 font-mono font-bold uppercase tracking-tighter">
              PLAY THE BEST UNBLOCKED GAMES ONLINE // NEBULA ARCADE // FREE FOREVER // NO DOWNLOADS REQUIRED // LATEST UPDATE: {new Date().toLocaleDateString()} //
            </span>
            <span className="mx-4 font-mono font-bold uppercase tracking-tighter">
              PLAY THE BEST UNBLOCKED GAMES ONLINE // NEBULA ARCADE // FREE FOREVER // NO DOWNLOADS REQUIRED // LATEST UPDATE: {new Date().toLocaleDateString()} //
            </span>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!selectedGame ? (
          <motion.main
            key="catalog"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="container mx-auto px-4 py-12 pb-24"
          >
            <header className="mb-16">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                  <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-2 leading-none">
                    Nebula<br />Arcade
                  </h1>
                  <p className="text-[#00FF00] font-mono text-sm uppercase tracking-widest flex items-center gap-2">
                    <Gamepad2 className="w-4 h-4" /> Ready to play
                  </p>
                </div>
                
                <div className="flex flex-col gap-4 w-full md:w-auto">
                  <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[#00FF00] transition-colors" />
                    <input
                      type="text"
                      placeholder="SEARCH GAMES..."
                      className="bg-[#111] border-2 border-white p-4 pl-12 w-full md:w-80 font-mono text-sm uppercase focus:border-[#00FF00] focus:outline-none focus:shadow-[4px_4px_0px_#00FF00] transition-all"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </header>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-4 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 border-2 text-sm font-mono font-bold uppercase transition-all ${
                    activeCategory === cat
                      ? 'bg-white text-black border-white shadow-[4px_4px_0px_#00FF00]'
                      : 'border-white hover:border-[#00FF00] text-gray-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Game Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredGames.length > 0 ? (
                filteredGames.map((game, index) => (
                  <motion.div
                    key={game.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setSelectedGame(game)}
                    className="group cursor-pointer bg-[#111] border-2 border-white p-6 brutal-border"
                  >
                    <div className={`aspect-video w-full mb-6 relative overflow-hidden bg-zinc-900 group-hover:scale-[1.02] transition-transform duration-300`}>
                      <div className={`absolute inset-0 opacity-20 transition-opacity group-hover:opacity-40 ${game.thumbnailColor}`} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Play className="w-16 h-16 text-white opacity-0 group-hover:opacity-100 transition-all transform scale-50 group-hover:scale-100" />
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-black/80 border border-white/20 text-[10px] font-mono uppercase tracking-widest backdrop-blur-sm">
                          {game.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <h3 className="text-3xl font-black uppercase leading-none tracking-tight">
                          {game.title}
                        </h3>
                        <Trophy className="w-5 h-5 text-gray-500 group-hover:text-yellow-400 transition-colors" />
                      </div>
                      <p className="text-gray-400 font-mono text-sm leading-relaxed line-clamp-2">
                        {game.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs font-mono text-gray-500">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 2M Plays</span>
                        <span className="flex items-center gap-1 text-white"><Star className="w-3 h-3 text-yellow-400 fill-yellow-400" /> 4.9</span>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-20 text-center border-2 border-dashed border-white/20">
                  <p className="font-mono text-gray-500 uppercase tracking-widest">No games found matching your search.</p>
                </div>
              )}
            </div>
          </motion.main>
        ) : (
          <motion.div
            key="player"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex flex-col"
          >
            {/* Player Navigation */}
            <div className="bg-[#111] border-b-2 border-white p-4 flex items-center justify-between">
              <button
                onClick={() => setSelectedGame(null)}
                className="flex items-center gap-2 px-4 py-2 bg-white text-black font-bold uppercase text-sm hover:bg-[#00FF00] transition-colors brutal-shadow-green"
              >
                <ArrowLeft className="w-4 h-4" /> Exit Game
              </button>
              
              <div className="hidden md:flex flex-col items-center">
                <h2 className="text-xl font-black uppercase tracking-tight leading-none text-[#00FF00]">
                  {selectedGame.title}
                </h2>
                <span className="text-[10px] font-mono text-gray-500 uppercase">{selectedGame.category} // Nebula Arcade Player</span>
              </div>
              
              <div className="flex items-center gap-4">
                <button className="p-2 text-gray-400 hover:text-white transition-colors" title="Full Screen">
                  <Maximize2 className="w-5 h-5" />
                </button>
                <a 
                  href={selectedGame.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  title="Open in New Tab"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Game Canvas / Iframe */}
            <div className="flex-1 bg-zinc-900 relative">
              <iframe
                src={selectedGame.url}
                className="w-full h-full border-none"
                title={selectedGame.title}
                allow="autoplay; fullscreen; keyboard"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Small Footer in Player */}
            <div className="bg-black py-2 px-4 flex justify-between items-center border-t border-white/10">
               <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">
                  Secure Game Sandbox // Non-persistent data
               </span>
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-[#00FF00] animate-pulse" />
                 <span className="text-[10px] font-mono text-gray-600 uppercase">Live Server Status: OK</span>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="border-t-2 border-white/10 py-12 mt-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h4 className="text-2xl font-black uppercase mb-2">NEBULA ARCADE</h4>
            <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">
              © {new Date().getFullYear()} Nebula Interactive. All games are property of their respective owners.
            </p>
          </div>
          <div className="flex gap-8 font-mono text-xs uppercase tracking-widest">
            <a href="#" className="text-gray-500 hover:text-[#00FF00] transition-colors">Privacy</a>
            <a href="#" className="text-gray-500 hover:text-[#00FF00] transition-colors">Terms</a>
            <a href="#" className="text-gray-500 hover:text-[#00FF00] transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
