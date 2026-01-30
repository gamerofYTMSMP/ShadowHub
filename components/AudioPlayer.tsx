
import React, { useState, useEffect, useRef } from 'react';
import { Episode, Series } from '../types';

interface AudioPlayerProps {
  currentSeries: Series | null;
  currentEpisode: Episode | null;
  onNext: () => void;
  onPrev: () => void;
  isLiked: boolean;
  onToggleLike: (seriesId: string) => void;
  queueLength: number;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ 
  currentSeries, 
  currentEpisode, 
  onNext, 
  onPrev,
  isLiked,
  onToggleLike,
  queueLength
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  // Robust playback handler to fix the "silent play" bug
  useEffect(() => {
    if (currentEpisode && audioRef.current) {
      // 1. Pause current playback and reset state
      audioRef.current.pause();
      setIsPlaying(false);
      setProgress(0);

      // 2. Explicitly load the new source
      audioRef.current.load();

      // 3. Attempt playback after a small tick to ensure the DOM src is ready
      const playTimeout = setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play()
            .then(() => {
              setIsPlaying(true);
            })
            .catch((error) => {
              console.warn("Playback initialization failed:", error);
              // Fallback: stay in paused state so user can manual play
              setIsPlaying(false);
            });
        }
      }, 100);

      return () => clearTimeout(playTimeout);
    }
  }, [currentEpisode]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const handleRewind = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10);
    }
  };

  const handleForward = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(audioRef.current.duration, audioRef.current.currentTime + 10);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(p || 0);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current && audioRef.current.duration) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const clickedPercent = (x / rect.width);
      audioRef.current.currentTime = clickedPercent * audioRef.current.duration;
    }
  };

  const handleVolumeChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const newVolume = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
      if (newVolume > 0) setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      const nextMute = !isMuted;
      setIsMuted(nextMute);
      audioRef.current.muted = nextMute;
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!currentEpisode || !currentSeries) return null;

  return (
    <footer className="h-24 glass-effect border-t border-white/5 px-8 flex items-center justify-between z-[100] fixed bottom-0 left-0 right-0 shadow-[0_-10px_40px_rgba(0,0,0,0.6)]">
      <audio
        ref={audioRef}
        src={currentEpisode.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={onNext}
        preload="auto"
      />
      
      {/* Track Info (Left) */}
      <div className="flex items-center gap-4 w-1/4 min-w-[240px]">
        <div 
          className="w-14 h-14 rounded-xl bg-cover bg-center shadow-2xl border border-white/10 transition-transform hover:scale-105" 
          style={{ backgroundImage: `url('${currentSeries.thumbnail}')` }}
        ></div>
        <div className="overflow-hidden flex flex-col justify-center">
          <h6 className="text-sm font-black truncate text-white tracking-tight">{currentEpisode.title}</h6>
          <p className="text-[11px] text-slate-400 truncate font-bold uppercase tracking-widest mt-0.5">
            {currentSeries.creatorName} • Ep {currentEpisode.order}
          </p>
        </div>
        <button 
          onClick={() => onToggleLike(currentSeries.id)}
          className={`ml-2 transition-all duration-300 hover:scale-110 active:scale-90 ${isLiked ? 'text-red-500' : 'text-slate-500 hover:text-white'}`}
        >
          <span className={`material-symbols-outlined text-2xl ${isLiked ? 'fill-1' : ''}`}>favorite</span>
        </button>
      </div>

      {/* Player Controls (Middle) */}
      <div className="flex flex-col items-center gap-2.5 flex-1 max-w-xl px-4">
        <div className="flex items-center gap-10">
          <button 
            onClick={handleRewind} 
            className="text-slate-400 hover:text-white hover:scale-110 active:scale-90 transition-all"
            title="10 Seconds Back"
          >
            <span className="material-symbols-outlined text-3xl font-black">replay_10</span>
          </button>
          
          <button 
            onClick={togglePlay}
            className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-[0_0_25px_rgba(255,255,255,0.2)]"
            title={isPlaying ? "Pause" : "Play"}
          >
            <span className="material-symbols-outlined fill-1 text-4xl">
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>
          
          <button 
            onClick={handleForward} 
            className="text-slate-400 hover:text-white hover:scale-110 active:scale-90 transition-all"
            title="10 Seconds Forward"
          >
            <span className="material-symbols-outlined text-3xl font-black">forward_10</span>
          </button>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full flex items-center gap-4 px-2">
          <span className="text-[10px] text-slate-500 w-12 text-right font-black font-mono tracking-tighter opacity-80">
            {audioRef.current ? formatTime(audioRef.current.currentTime) : "0:00"}
          </span>
          <div 
            className="flex-1 h-1.5 bg-white/10 rounded-full relative group cursor-pointer overflow-visible"
            onClick={handleSeek}
          >
            <div 
              className="absolute inset-y-0 left-0 bg-primary group-hover:bg-primary/90 rounded-full transition-all duration-100 ease-linear shadow-[0_0_15px_rgba(127,19,236,0.4)]" 
              style={{ width: `${progress}%` }}
            ></div>
            {/* Seeking handle */}
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full opacity-0 group-hover:opacity-100 shadow-2xl border border-white/20 transition-all duration-100 pointer-events-none"
              style={{ left: `calc(${progress}% - 8px)` }}
            ></div>
          </div>
          <span className="text-[10px] text-slate-500 w-12 font-black font-mono tracking-tighter opacity-80">
            {currentEpisode.duration}
          </span>
        </div>
      </div>

      {/* Utility Utilities (Right) */}
      <div className="flex items-center justify-end gap-6 w-1/4 min-w-[240px]">
        <button className="text-slate-500 hover:text-white transition-all hover:scale-110" title="Connect Device">
          <span className="material-symbols-outlined text-2xl font-variation-fill-0">devices</span>
        </button>
        
        {/* Volume Control */}
        <div className="flex items-center gap-3 w-32 group">
          <button onClick={toggleMute} className="text-slate-500 hover:text-white transition-colors">
            <span className="material-symbols-outlined text-2xl">
              {isMuted || volume === 0 ? 'volume_off' : volume < 50 ? 'volume_down' : 'volume_up'}
            </span>
          </button>
          <div 
            className="flex-1 h-1 bg-white/10 rounded-full relative cursor-pointer group-hover:h-1.5 transition-all"
            onClick={handleVolumeChange}
          >
            <div 
              className="absolute inset-y-0 left-0 bg-slate-400 group-hover:bg-primary rounded-full transition-all duration-100" 
              style={{ width: `${isMuted ? 0 : volume}%` }}
            ></div>
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 shadow-lg transition-all duration-100"
              style={{ left: `calc(${(isMuted ? 0 : volume)}% - 6px)` }}
            ></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AudioPlayer;
