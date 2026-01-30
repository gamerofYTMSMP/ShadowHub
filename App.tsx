
import React, { useState, useMemo, useRef, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import AudioPlayer from './components/AudioPlayer';
import CreatorDashboard from './components/CreatorDashboard';
import PremiumPage from './components/PremiumPage';
import ProfilePage from './components/ProfilePage';
import { ViewState, UserRole, Series, Episode, Category } from './types';
import { MOCK_SERIES, MOCK_EPISODES } from './constants';

const App: React.FC = () => {
  const [currentView, setView] = useState<ViewState>('HOME');
  const [userRole, setUserRole] = useState<UserRole>(UserRole.CREATOR);
  const [seriesList, setSeriesList] = useState<Series[]>(MOCK_SERIES);
  const [activeSeries, setActiveSeries] = useState<Series | null>(MOCK_SERIES[0]);
  const [activeEpisode, setActiveEpisode] = useState<Episode | null>(MOCK_SERIES[0].episodes[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [likedSeriesIds, setLikedSeriesIds] = useState<Set<string>>(new Set());
  const [showMenuId, setShowMenuId] = useState<string | null>(null);
  const [queue, setQueue] = useState<Episode[]>([]);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredSeries = useMemo(() => {
    return seriesList.filter(s => {
      const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.creatorName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || s.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [seriesList, searchQuery, selectedCategory]);

  const likedSeries = useMemo(() => {
    return seriesList.filter(s => likedSeriesIds.has(s.id));
  }, [seriesList, likedSeriesIds]);

  const handlePlayEpisode = (series: Series, episode: Episode) => {
    setActiveSeries(series);
    setActiveEpisode(episode);
  };

  const handleToggleLike = (seriesId: string) => {
    setLikedSeriesIds(prev => {
      const next = new Set(prev);
      if (next.has(seriesId)) {
        next.delete(seriesId);
      } else {
        next.add(seriesId);
      }
      return next;
    });
  };

  const handleAddToQueue = (episode: Episode) => {
    setQueue(prev => [...prev, episode]);
    setShowMenuId(null);
  };

  const handleNext = () => {
    if (queue.length > 0) {
      const nextEp = queue[0];
      setQueue(prev => prev.slice(1));
      setActiveEpisode(nextEp);
      return;
    }

    if (!activeSeries || !activeEpisode) return;
    const currentIndex = activeSeries.episodes.findIndex(e => e.id === activeEpisode.id);
    if (currentIndex < activeSeries.episodes.length - 1) {
      setActiveEpisode(activeSeries.episodes[currentIndex + 1]);
    }
  };

  const handlePrev = () => {
    if (!activeSeries || !activeEpisode) return;
    const currentIndex = activeSeries.episodes.findIndex(e => e.id === activeEpisode.id);
    if (currentIndex > 0) {
      setActiveEpisode(activeSeries.episodes[currentIndex - 1]);
    }
  };

  const handleCreateSeries = (seriesData: Partial<Series>) => {
    const newSeries: Series = {
      id: `s${Date.now()}`,
      title: seriesData.title || 'Untitled',
      description: seriesData.description || '',
      creatorId: 'me',
      creatorName: 'Aman Sharma',
      category: seriesData.category || Category.DRAMA,
      thumbnail: seriesData.thumbnail || 'https://picsum.photos/400/400',
      episodes: MOCK_EPISODES,
      isApproved: false,
      plays: 0,
      likes: 0
    };
    setSeriesList([newSeries, ...seriesList]);
  };

  const renderView = () => {
    switch (currentView) {
      case 'HOME':
        return (
          <div className="p-8 space-y-12 animate-in fade-in duration-700 max-w-7xl mx-auto">
            {/* Hero Section */}
            <section className="@container">
              <div className="relative overflow-hidden rounded-3xl aspect-[21/9] min-h-[380px] flex items-end group shadow-2xl border border-white/5">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" 
                  style={{ 
                    backgroundImage: `linear-gradient(to top, #0a0a0a 15%, rgba(10,10,10,0.4) 60%, transparent 100%), url('${MOCK_SERIES[0].thumbnail}')` 
                  }}
                ></div>
                <div className="relative p-12 max-w-2xl space-y-6 z-10">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-primary/20 text-primary text-[10px] font-black uppercase tracking-widest rounded-lg border border-primary/30 backdrop-blur-md">Feature Series</span>
                    <span className="text-xs font-bold text-slate-300 tracking-wide">{MOCK_SERIES[0].category} • Immersive Audio</span>
                  </div>
                  <h2 className="text-6xl font-black tracking-tight leading-[1.1] text-white">{MOCK_SERIES[0].title}</h2>
                  <p className="text-slate-300 text-xl font-medium leading-relaxed line-clamp-2">
                    {MOCK_SERIES[0].description} Dive deep into the most immersive storytelling experience.
                  </p>
                  <div className="flex gap-5 pt-2">
                    <button 
                      onClick={() => handlePlayEpisode(MOCK_SERIES[0], MOCK_SERIES[0].episodes[0])}
                      className="px-10 py-4 bg-primary hover:bg-primary/90 text-white rounded-2xl font-black flex items-center gap-3 transition-all scale-100 hover:scale-105 active:scale-95 shadow-2xl shadow-primary/40"
                    >
                      <span className="material-symbols-outlined fill-1 text-2xl">play_arrow</span>
                      Play Now
                    </button>
                    <button 
                      onClick={() => { setActiveSeries(MOCK_SERIES[0]); setView('SERIES_DETAIL'); }}
                      className="px-10 py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-black flex items-center gap-3 transition-all backdrop-blur-md border border-white/10"
                    >
                      <span className="material-symbols-outlined text-2xl font-variation-fill-0">info</span>
                      Details
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Trending Now */}
            <section>
              <div className="flex items-center justify-between mb-8 px-2">
                <h3 className="text-2xl font-black tracking-tight text-white">Trending Now</h3>
                <button onClick={() => setView('DISCOVER')} className="text-xs font-black text-primary hover:underline uppercase tracking-widest transition-all">View All</button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8 pb-4">
                {seriesList.map(s => (
                  <div key={s.id} onClick={() => { setActiveSeries(s); setView('SERIES_DETAIL'); }} className="group cursor-pointer">
                    <div className="relative aspect-square rounded-2xl overflow-hidden mb-5 shadow-2xl border border-white/5 bg-white/5 transition-all">
                      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: `url('${s.thumbnail}')` }}></div>
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center backdrop-blur-[2px]">
                        <div className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl shadow-primary/50 transform translate-y-6 group-hover:translate-y-0 transition-all duration-300">
                          <span className="material-symbols-outlined text-white fill-1 text-3xl">play_arrow</span>
                        </div>
                      </div>
                    </div>
                    <h4 className="font-bold text-sm truncate text-white px-1 group-hover:text-primary transition-colors">{s.title}</h4>
                    <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider mt-1.5 px-1">{s.category.split(' ')[0]} • {s.plays.toLocaleString()} plays</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        );

      case 'LIKED_STORIES':
        return (
          <div className="p-8 space-y-12 animate-in fade-in duration-500 max-w-7xl mx-auto">
             <div className="flex items-end gap-10">
                <div className="w-60 h-60 bg-gradient-to-br from-primary to-indigo-900 rounded-3xl flex items-center justify-center shadow-2xl border border-white/10">
                   <span className="material-symbols-outlined text-8xl text-white fill-1">favorite</span>
                </div>
                <div className="flex flex-col gap-2 mb-2">
                   <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Playlist</span>
                   <h1 className="text-7xl font-black tracking-tight leading-none text-white">Liked Stories</h1>
                   <div className="flex items-center gap-3 mt-4 text-sm font-black">
                      <span className="text-primary">Aman Sharma</span>
                      <span className="w-1.5 h-1.5 bg-slate-600 rounded-full"></span>
                      <span className="text-slate-200">{likedSeries.length} Stories</span>
                   </div>
                </div>
             </div>

             <div className="mt-10">
               {likedSeries.length > 0 ? (
                 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8 pb-4">
                  {likedSeries.map(s => (
                    <div key={s.id} onClick={() => { setActiveSeries(s); setView('SERIES_DETAIL'); }} className="group cursor-pointer">
                      <div className="relative aspect-square rounded-2xl overflow-hidden mb-5 shadow-2xl border border-white/5 bg-white/5 transition-all">
                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: `url('${s.thumbnail}')` }}></div>
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center backdrop-blur-[2px]">
                          <div className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl shadow-primary/50 transform translate-y-6 group-hover:translate-y-0 transition-all duration-300">
                            <span className="material-symbols-outlined text-white fill-1 text-3xl">play_arrow</span>
                          </div>
                        </div>
                      </div>
                      <h4 className="font-bold text-sm truncate text-white px-1 group-hover:text-primary transition-colors">{s.title}</h4>
                      <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider mt-1.5 px-1">{s.category.split(' ')[0]}</p>
                    </div>
                  ))}
                 </div>
               ) : (
                 <div className="py-20 flex flex-col items-center justify-center text-slate-500">
                    <span className="material-symbols-outlined text-6xl mb-4 font-variation-fill-0">heart_broken</span>
                    <p className="text-xl font-bold">No stories liked yet.</p>
                    <button 
                      onClick={() => setView('HOME')}
                      className="mt-6 px-8 py-3 bg-white/5 hover:bg-white/10 text-white rounded-full font-bold transition-all border border-white/10"
                    >
                      Browse Stories
                    </button>
                 </div>
               )}
             </div>
          </div>
        );

      case 'DISCOVER':
        return (
          <div className="p-8 animate-in fade-in duration-500">
            <div className="relative mb-8 max-w-xl">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
              <input 
                type="text" 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search for stories, creators, or genres..." 
                className="w-full bg-white/5 border-none rounded-full py-3 pl-12 pr-6 focus:ring-1 focus:ring-primary text-sm placeholder:text-slate-500"
              />
            </div>

            <div className="flex gap-3 mb-10 flex-wrap">
               <button 
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-1.5 rounded-full text-sm font-bold border transition-colors ${!selectedCategory ? 'bg-white text-black border-white' : 'border-white/10 hover:border-white/20'}`}
               >
                 All
               </button>
               {Object.values(Category).map(cat => (
                 <button 
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-bold border transition-colors ${selectedCategory === cat ? 'bg-white text-black border-white' : 'border-white/10 hover:border-white/20'}`}
                 >
                   {cat}
                 </button>
               ))}
            </div>

            <h2 className="text-2xl font-bold mb-6">Browse all</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
               {filteredSeries.length > 0 ? (
                 filteredSeries.map(s => (
                  <div key={s.id} onClick={() => { setActiveSeries(s); setView('SERIES_DETAIL'); }} className="group bg-white/5 p-4 rounded-xl hover:bg-white/10 transition-all cursor-pointer">
                    <img src={s.thumbnail} className="w-full aspect-square object-cover rounded-lg mb-4" />
                    <h4 className="font-bold truncate">{s.title}</h4>
                    <p className="text-xs text-slate-400 mt-1">{s.creatorName}</p>
                  </div>
                 ))
               ) : (
                 <p className="text-slate-500 italic col-span-full py-12 text-center">No series found matching your search.</p>
               )}
            </div>
          </div>
        );

      case 'SERIES_DETAIL':
        if (!activeSeries) { setView('HOME'); return null; }
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Immersive Header */}
            <div className="relative h-[480px] flex items-end p-12 bg-gradient-to-t from-background-dark via-background-dark/80 to-transparent">
               <div className="absolute inset-0 -z-10 opacity-30 blur-2xl transition-all duration-1000" style={{ backgroundImage: `url('${activeSeries.thumbnail}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
               <div className="flex items-end gap-10 z-10 w-full max-w-7xl mx-auto">
                  <img src={activeSeries.thumbnail} className="w-72 h-72 object-cover shadow-[0_25px_80px_rgba(0,0,0,0.8)] rounded-3xl border border-white/10" />
                  <div className="flex flex-col gap-4 mb-2">
                     <span className="px-3 py-1 bg-primary/20 text-primary text-[10px] font-black uppercase tracking-widest rounded-lg border border-primary/30 w-fit">Audio Series</span>
                     <h1 className="text-7xl font-black tracking-tight leading-none text-white">{activeSeries.title}</h1>
                     <div className="flex items-center gap-3 mt-4 text-sm font-black">
                        <span className="text-primary hover:underline cursor-pointer">{activeSeries.creatorName}</span>
                        <span className="w-1.5 h-1.5 bg-slate-600 rounded-full"></span>
                        <span className="text-slate-200">{activeSeries.episodes.length} Episodes</span>
                        <span className="w-1.5 h-1.5 bg-slate-600 rounded-full"></span>
                        <span className="text-slate-400">{activeSeries.plays.toLocaleString()} plays</span>
                     </div>
                  </div>
               </div>
            </div>

            {/* Controls & Track List */}
            <div className="p-12 pt-8 max-w-7xl mx-auto">
               <div className="flex items-center gap-10 mb-12 relative">
                  <button 
                    onClick={() => handlePlayEpisode(activeSeries, activeSeries.episodes[0])}
                    className="w-16 h-16 bg-primary rounded-full flex items-center justify-center hover:scale-110 active:scale-90 transition-all shadow-2xl shadow-primary/30"
                  >
                    <span className="material-symbols-outlined fill-1 text-white text-4xl">play_arrow</span>
                  </button>
                  <button 
                    onClick={() => handleToggleLike(activeSeries.id)}
                    className={`transition-all duration-300 hover:scale-110 active:scale-90 ${likedSeriesIds.has(activeSeries.id) ? 'text-red-500' : 'text-slate-400 hover:text-white'}`}
                  >
                    <span className={`material-symbols-outlined text-5xl ${likedSeriesIds.has(activeSeries.id) ? 'fill-1' : ''}`}>favorite</span>
                  </button>
                  <div className="relative">
                    <button 
                      onClick={() => setShowMenuId(showMenuId === 'series' ? null : 'series')}
                      className="text-slate-400 hover:text-white transition-all hover:scale-110 active:scale-90 border border-white/20 rounded-lg p-2"
                    >
                      <span className="material-symbols-outlined text-4xl">more_horiz</span>
                    </button>
                    {showMenuId === 'series' && (
                      <div ref={menuRef} className="absolute left-0 top-full mt-2 w-56 bg-surface-dark border border-white/10 rounded-xl shadow-2xl z-[200] overflow-hidden p-1 animate-in slide-in-from-top-2 duration-200">
                        <button onClick={() => setView('PLAYLISTS')} className="w-full text-left px-4 py-3 hover:bg-white/5 rounded-lg text-sm font-bold flex items-center gap-3 transition-colors">
                          <span className="material-symbols-outlined text-xl">playlist_add</span>
                          Add to Playlist
                        </button>
                        <button className="w-full text-left px-4 py-3 hover:bg-white/5 rounded-lg text-sm font-bold flex items-center gap-3 transition-colors">
                          <span className="material-symbols-outlined text-xl">share</span>
                          Share Series
                        </button>
                        <button className="w-full text-left px-4 py-3 hover:bg-white/5 rounded-lg text-sm font-bold flex items-center gap-3 transition-colors">
                          <span className="material-symbols-outlined text-xl">person</span>
                          View Creator
                        </button>
                      </div>
                    )}
                  </div>
               </div>

               <div className="bg-white/[0.02] rounded-3xl border border-white/5 p-4 shadow-2xl">
                 <table className="w-full text-left">
                    <thead className="border-b border-white/5 text-slate-500 text-[11px] font-black uppercase tracking-[0.2em]">
                      <tr>
                        <th className="px-6 py-4 w-16 text-center">#</th>
                        <th className="px-6 py-4">Title</th>
                        <th className="px-6 py-4 text-right w-32"><span className="material-symbols-outlined text-sm">schedule</span></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-transparent">
                      {activeSeries.episodes.map((ep, idx) => {
                        const isActive = activeEpisode?.id === ep.id;
                        return (
                          <tr 
                            key={ep.id} 
                            onClick={() => handlePlayEpisode(activeSeries, ep)}
                            onContextMenu={(e) => {
                              e.preventDefault();
                              setShowMenuId(ep.id);
                            }}
                            className={`group transition-all duration-200 cursor-pointer rounded-2xl relative ${isActive ? 'bg-white/10' : 'hover:bg-white/5'}`}
                          >
                            <td className="px-6 py-5 text-sm font-black text-center w-16">
                              <span className={`transition-all ${isActive ? 'text-primary' : 'group-hover:hidden text-slate-500'}`}>{idx + 1}</span>
                              <span className={`material-symbols-outlined text-lg ${isActive ? 'hidden' : 'hidden group-hover:inline-block'} text-primary fill-1`}>play_arrow</span>
                            </td>
                            <td className="px-6 py-5">
                              <p className={`font-bold transition-colors ${isActive ? 'text-primary text-base' : 'text-slate-200'}`}>{ep.title}</p>
                              <p className="text-xs text-slate-500 font-bold tracking-wide mt-1">Episode {ep.order}</p>
                              
                              {showMenuId === ep.id && (
                                <div ref={menuRef} className="absolute left-64 top-1/2 -translate-y-1/2 w-56 bg-surface-dark border border-white/10 rounded-xl shadow-2xl z-[200] overflow-hidden p-1">
                                  <button onClick={() => handleAddToQueue(ep)} className="w-full text-left px-4 py-3 hover:bg-white/5 rounded-lg text-sm font-bold flex items-center gap-3 transition-colors">
                                    <span className="material-symbols-outlined text-xl">queue_music</span>
                                    Add to Queue
                                  </button>
                                  <button className="w-full text-left px-4 py-3 hover:bg-white/5 rounded-lg text-sm font-bold flex items-center gap-3 transition-colors">
                                    <span className="material-symbols-outlined text-xl">playlist_add</span>
                                    Add to Playlist
                                  </button>
                                </div>
                              )}
                            </td>
                            <td className={`px-6 py-5 text-right text-sm font-black font-mono tracking-tighter ${isActive ? 'text-primary' : 'text-slate-500'}`}>{ep.duration}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                 </table>
               </div>
            </div>
          </div>
        );

      case 'CREATOR_DASHBOARD':
        return <CreatorDashboard mySeries={seriesList.filter(s => s.creatorId === 'me' || s.creatorId === 'c1')} onUpload={handleCreateSeries} />;

      case 'PREMIUM':
        return <PremiumPage />;

      case 'PROFILE':
        return <ProfilePage onOpenCreatorStudio={() => setView('CREATOR_DASHBOARD')} />;

      default:
        return <div className="p-8 text-center text-slate-500 font-black uppercase tracking-widest mt-20">Coming Soon...</div>;
    }
  };

  return (
    <div className="flex h-screen bg-background-dark text-neutral-100 selection:bg-primary/30 overflow-hidden font-display">
      {/* Sidebar */}
      <Sidebar currentView={currentView} setView={setView} userRole={userRole} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        <header className="sticky top-0 z-50 flex items-center justify-between px-10 py-5 glass-effect border-b border-white/5 shadow-2xl">
          <div className="flex items-center gap-6 flex-1">
            <div className="flex items-center gap-3">
              <button 
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-all border border-white/5 active:scale-90" 
                onClick={() => window.history.back()}
              >
                <span className="material-symbols-outlined text-base">chevron_left</span>
              </button>
              <button 
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 opacity-50 transition-all border border-white/5 active:scale-90" 
                onClick={() => window.history.forward()}
              >
                <span className="material-symbols-outlined text-base">chevron_right</span>
              </button>
            </div>
            
            {currentView !== 'DISCOVER' && (
              <div className="relative w-full max-w-lg ml-2">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xl font-bold">search</span>
                <input 
                  className="w-full bg-white/[0.03] border border-white/5 rounded-full py-2.5 pl-12 pr-6 text-sm focus:ring-2 focus:ring-primary focus:bg-white/10 placeholder:text-slate-600 transition-all font-medium text-white shadow-inner" 
                  placeholder="Search stories, creators, or genres..." 
                  type="text"
                  onFocus={() => setView('DISCOVER')}
                />
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-6">
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 relative group transition-all border border-white/5 active:scale-90">
              <span className="material-symbols-outlined text-xl text-slate-300 group-hover:text-white transition-colors">notifications</span>
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full border-2 border-background-dark shadow-primary/50 group-hover:scale-125 transition-transform"></span>
            </button>
            
            <div 
              onClick={() => setView('PROFILE')}
              className="flex items-center gap-3.5 p-1 pr-4 rounded-full bg-white/5 hover:bg-white/10 cursor-pointer transition-all border border-white/5 hover:border-white/10 group shadow-lg active:scale-95"
            >
              <div className="w-9 h-9 rounded-full bg-cover bg-center shadow-2xl border border-white/10 group-hover:scale-105 transition-transform" style={{ backgroundImage: "url('https://picsum.photos/seed/user1/100/100')" }}></div>
              <span className="text-sm font-black tracking-tight group-hover:text-primary transition-colors">Aman Sharma</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto custom-scrollbar pb-32 bg-background-dark">
          {renderView()}
        </main>
      </div>

      {/* Audio Player */}
      <AudioPlayer 
        currentSeries={activeSeries} 
        currentEpisode={activeEpisode} 
        onNext={handleNext}
        onPrev={handlePrev}
        isLiked={activeSeries ? likedSeriesIds.has(activeSeries.id) : false}
        onToggleLike={handleToggleLike}
        queueLength={queue.length}
      />
    </div>
  );
};

export default App;
