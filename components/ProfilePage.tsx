
import React from 'react';

interface ProfilePageProps {
  onOpenCreatorStudio: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onOpenCreatorStudio }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 bg-background-dark/50 min-h-full">
      <div className="max-w-6xl mx-auto flex flex-col gap-10 p-8">
        
        {/* Profile Hero Header */}
        <section className="flex flex-col md:flex-row items-center gap-8 bg-surface-dark p-8 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -z-10 group-hover:bg-primary/20 transition-colors duration-1000"></div>
          <div className="relative">
            <div className="size-32 rounded-full border-4 border-primary/30 p-1 group-hover:border-primary/60 transition-all duration-500">
              <div 
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-full shadow-2xl" 
                style={{ backgroundImage: "url('https://picsum.photos/seed/user1/200/200')" }}
              ></div>
            </div>
            <div className="absolute bottom-1 right-1 bg-primary text-white p-1 rounded-full border-2 border-surface-dark shadow-lg">
              <span className="material-symbols-outlined text-base font-black">verified</span>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-black tracking-tight text-white">Aman Sharma</h1>
              <span className="bg-gradient-to-r from-primary to-indigo-600 text-white text-[10px] uppercase font-black px-3 py-1.5 rounded-lg border border-white/10 tracking-widest">Creator / Pro</span>
            </div>
            <p className="text-slate-400 font-medium mb-6 max-w-lg leading-relaxed">
              Master storyteller and world-builder. Exploring the shadows between reality and fiction through immersive audio experiences. Based in Mumbai.
            </p>
            <div className="flex gap-4">
              <button className="bg-primary hover:bg-primary/90 text-white font-black py-3 px-8 rounded-2xl transition-all shadow-xl shadow-primary/25 active:scale-95">
                Edit Profile
              </button>
              <button className="bg-white/5 border border-white/10 text-white font-black py-3 px-8 rounded-2xl transition-all hover:bg-white/10 active:scale-95">
                View Public Profile
              </button>
            </div>
          </div>
        </section>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Listener Stats */}
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-black flex items-center gap-3 text-white px-1 uppercase tracking-widest">
              <span className="material-symbols-outlined text-primary text-2xl font-black">headphones</span>
              Listener Stats
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-surface-dark border border-white/5 p-6 rounded-3xl shadow-xl hover:border-primary/20 transition-all">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Time Spent</p>
                <p className="text-3xl font-black text-white">120 hrs</p>
                <div className="mt-4 w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-[70%] shadow-[0_0_10px_rgba(127,19,236,0.5)]"></div>
                </div>
              </div>
              <div className="bg-surface-dark border border-white/5 p-6 rounded-3xl shadow-xl hover:border-primary/20 transition-all">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Episodes</p>
                <p className="text-3xl font-black text-white">45</p>
                <p className="text-[10px] text-green-500 font-black tracking-widest mt-2 uppercase">Completed</p>
              </div>
              <div className="bg-surface-dark border border-white/5 p-6 rounded-3xl shadow-xl hover:border-primary/20 transition-all">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Top Genre</p>
                <p className="text-xl font-black text-primary truncate">Horror 👻</p>
                <p className="text-[10px] text-slate-500 font-black tracking-widest mt-2 uppercase">Preference</p>
              </div>
            </div>
          </div>

          {/* Creator Stats */}
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-black flex items-center gap-3 text-white px-1 uppercase tracking-widest">
              <span className="material-symbols-outlined text-indigo-500 text-2xl font-black">podcasts</span>
              Creator Stats
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-indigo-600/10 to-surface-dark border border-indigo-500/20 p-6 rounded-3xl shadow-2xl hover:border-indigo-500/40 transition-all">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Plays</p>
                  <span className="material-symbols-outlined text-indigo-400 text-sm font-black">trending_up</span>
                </div>
                <p className="text-3xl font-black text-white">1.2M</p>
                <p className="text-[10px] text-slate-500 font-bold tracking-widest mt-2 uppercase">Reach</p>
              </div>
              <div className="bg-gradient-to-br from-pink-600/10 to-surface-dark border border-pink-500/20 p-6 rounded-3xl shadow-2xl hover:border-pink-500/40 transition-all">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Likes</p>
                  <span className="material-symbols-outlined text-pink-500 text-sm fill-1">favorite</span>
                </div>
                <p className="text-3xl font-black text-white">45.8K</p>
                <p className="text-[10px] text-slate-500 font-bold tracking-widest mt-2 uppercase">Engagement</p>
              </div>
              <div className="bg-gradient-to-br from-cyan-600/10 to-surface-dark border border-cyan-500/20 p-6 rounded-3xl shadow-2xl hover:border-cyan-500/40 transition-all">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Followers</p>
                  <span className="material-symbols-outlined text-cyan-400 text-sm font-black">groups</span>
                </div>
                <p className="text-3xl font-black text-white">12.5K</p>
                <p className="text-[10px] text-slate-500 font-bold tracking-widest mt-2 uppercase">Audience</p>
              </div>
            </div>
          </div>
        </div>

        {/* Playlists Section */}
        <section className="flex flex-col gap-6">
          <div className="flex justify-between items-end px-1">
            <h2 className="text-2xl font-black text-white tracking-tight">My Playlists</h2>
            <button className="text-primary text-xs font-black flex items-center gap-1 hover:underline uppercase tracking-widest transition-all">
              View All <span className="material-symbols-outlined text-sm font-black">arrow_forward</span>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group cursor-pointer">
              <div className="relative aspect-square rounded-3xl overflow-hidden mb-4 bg-surface-dark border border-white/5 shadow-2xl">
                <div className="bg-center bg-no-repeat bg-cover size-full group-hover:scale-110 transition-transform duration-700" style={{ backgroundImage: "url('https://picsum.photos/seed/playlist1/400/400')" }}></div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                  <div className="bg-primary text-white rounded-full p-4 shadow-2xl shadow-primary/50 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="material-symbols-outlined text-3xl fill-1">play_arrow</span>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                  <p className="text-[10px] font-black text-white uppercase tracking-[0.2em]">12 Episodes</p>
                </div>
              </div>
              <h3 className="font-black text-white truncate text-base group-hover:text-primary transition-colors">The Midnight Archive</h3>
              <p className="text-[11px] text-slate-500 font-black uppercase tracking-widest mt-1">Updated 2 days ago</p>
            </div>

            <div className="group cursor-pointer">
              <div className="relative aspect-square rounded-3xl overflow-hidden mb-4 bg-surface-dark border border-white/5 shadow-2xl">
                <div className="bg-center bg-no-repeat bg-cover size-full group-hover:scale-110 transition-transform duration-700" style={{ backgroundImage: "url('https://picsum.photos/seed/playlist2/400/400')" }}></div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                  <div className="bg-primary text-white rounded-full p-4 shadow-2xl shadow-primary/50 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="material-symbols-outlined text-3xl fill-1">play_arrow</span>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                  <p className="text-[10px] font-black text-white uppercase tracking-[0.2em]">8 Episodes</p>
                </div>
              </div>
              <h3 className="font-black text-white truncate text-base group-hover:text-primary transition-colors">Psychological Thrillers</h3>
              <p className="text-[11px] text-slate-500 font-black uppercase tracking-widest mt-1">Saved last week</p>
            </div>

            <div className="group cursor-pointer">
              <div className="relative aspect-square rounded-3xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-3 hover:border-primary/50 hover:bg-primary/5 transition-all group active:scale-95 shadow-xl">
                <div className="size-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-inner">
                  <span className="material-symbols-outlined text-3xl font-black">add</span>
                </div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] group-hover:text-primary transition-colors">Create Playlist</p>
              </div>
            </div>
          </div>
        </section>

        {/* Creator CTA */}
        <section className="mb-20">
          <div className="bg-gradient-to-r from-primary/10 to-indigo-600/10 border border-primary/20 rounded-3xl p-10 flex flex-col md:flex-row justify-between items-center gap-8 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
            <div className="max-w-xl text-center md:text-left">
              <h3 className="text-3xl font-black text-white mb-3 tracking-tight">Ready to publish something new?</h3>
              <p className="text-slate-400 font-medium leading-relaxed">
                Jump back into your creator studio to manage your episodes, track growth analytics, and share your voice with millions of listeners.
              </p>
            </div>
            <button 
              onClick={onOpenCreatorStudio}
              className="whitespace-nowrap bg-primary text-white font-black px-10 py-4 rounded-2xl shadow-2xl shadow-primary/40 hover:scale-105 active:scale-95 transition-all text-sm uppercase tracking-widest"
            >
              Open Creator Studio
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;
