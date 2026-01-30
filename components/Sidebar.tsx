
import React from 'react';
import { ViewState, UserRole } from '../types';

interface SidebarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  userRole: UserRole;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, userRole }) => {
  const navItems = [
    { id: 'HOME', label: 'Home', icon: 'home' },
    { id: 'DISCOVER', label: 'Search', icon: 'search' },
    { id: 'PLAYLISTS', label: 'Library', icon: 'auto_stories' },
    { id: 'LIKED_STORIES', label: 'Liked Stories', icon: 'favorite' },
  ];

  return (
    <aside className="w-64 flex flex-col bg-background-dark border-r border-white/5 p-4 shrink-0 h-full">
      {/* Brand Logo */}
      <div className="flex items-center gap-3 px-2 py-6 cursor-pointer" onClick={() => setView('HOME')}>
        <div className="bg-primary rounded-xl p-2.5 flex items-center justify-center shadow-lg shadow-primary/20">
          <span className="material-symbols-outlined text-white text-2xl font-bold">graphic_eq</span>
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl font-black tracking-tight text-primary leading-tight">ShadowHub</h1>
          <p className="text-slate-500 text-[10px] uppercase tracking-[0.2em] font-black">Audio Series</p>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex flex-col gap-1 mt-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id as ViewState)}
            className={`flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-200 group ${
              currentView === item.id 
                ? 'bg-white/5 text-white font-bold' 
                : 'hover:bg-white/5 text-slate-400 hover:text-white'
            }`}
          >
            <span className={`material-symbols-outlined transition-transform duration-200 group-hover:scale-110 ${currentView === item.id ? 'fill-1 text-primary' : ''}`}>
              {item.icon}
            </span>
            <span className="text-sm tracking-wide">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Playlists Section */}
      <div className="mt-10 px-2 flex flex-col gap-4">
        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Playlists</h3>
        <div className="flex flex-col gap-4">
          <a className="text-sm font-medium text-slate-400 hover:text-primary transition-colors truncate" href="#">Late Night Horrors</a>
          <a className="text-sm font-medium text-slate-400 hover:text-primary transition-colors truncate" href="#">Chill Storytelling</a>
          <a className="text-sm font-medium text-slate-400 hover:text-primary transition-colors truncate" href="#">True Crime Weekly</a>
        </div>
      </div>

      {/* Premium Upgrade Card */}
      <div className="mt-auto mb-4 p-5 bg-white/[0.03] rounded-2xl border border-white/5 shadow-xl">
        <p className="text-xs font-bold text-slate-200 leading-relaxed mb-4">
          Upgrade for high-fidelity audio and offline listening.
        </p>
        <button 
          onClick={() => setView('PREMIUM')}
          className="w-full py-2.5 bg-primary hover:bg-primary/90 text-white rounded-xl text-xs font-black transition-all shadow-lg shadow-primary/30 active:scale-95"
        >
          Get Premium
        </button>
      </div>

      {/* Workspace (Admin/Creator) */}
      {(userRole === UserRole.CREATOR || userRole === UserRole.ADMIN) && (
        <div className="mt-2 pt-4 border-t border-white/5 flex flex-col gap-2">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2 mb-1">Workspace</p>
          <button
            onClick={() => setView('CREATOR_DASHBOARD')}
            className={`flex items-center gap-4 px-3 py-2.5 rounded-xl text-sm transition-all ${
              currentView === 'CREATOR_DASHBOARD' ? 'bg-primary/10 text-primary font-bold' : 'text-slate-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-xl">dashboard</span>
            Dashboard
          </button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
