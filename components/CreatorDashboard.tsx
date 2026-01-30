
import React, { useState } from 'react';
import { Upload, Plus, Trash2, Edit2, PlayCircle } from 'lucide-react';
import { Category, Series, Episode } from '../types';

interface CreatorDashboardProps {
  mySeries: Series[];
  onUpload: (series: Partial<Series>) => void;
}

const CreatorDashboard: React.FC<CreatorDashboardProps> = ({ mySeries, onUpload }) => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newSeries, setNewSeries] = useState({
    title: '',
    description: '',
    category: Category.DRAMA,
    thumbnail: 'https://picsum.photos/seed/newseries/400/400'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpload(newSeries);
    setShowUploadModal(false);
  };

  return (
    <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Creator Dashboard</h1>
          <p className="text-neutral-400">Manage your audio series and track your growth.</p>
        </div>
        <button 
          onClick={() => setShowUploadModal(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-6 rounded-full transition-all"
        >
          <Plus size={20} />
          Create New Series
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800">
          <p className="text-neutral-500 text-sm font-bold uppercase mb-1">Total Plays</p>
          <p className="text-4xl font-bold">42.5K</p>
          <p className="text-green-500 text-xs mt-2">+12% from last month</p>
        </div>
        <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800">
          <p className="text-neutral-500 text-sm font-bold uppercase mb-1">Followers</p>
          <p className="text-4xl font-bold">1,280</p>
          <p className="text-green-500 text-xs mt-2">+8% from last month</p>
        </div>
        <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800">
          <p className="text-neutral-500 text-sm font-bold uppercase mb-1">Earnings</p>
          <p className="text-4xl font-bold">₹8,450</p>
          <p className="text-neutral-400 text-xs mt-2">Next payout: Oct 15</p>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-6">Your Uploads</h2>
      <div className="bg-neutral-900 rounded-xl border border-neutral-800 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-black text-neutral-500 text-xs font-bold uppercase">
            <tr>
              <th className="px-6 py-4">Series</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Episodes</th>
              <th className="px-6 py-4">Plays</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800">
            {mySeries.map(series => (
              <tr key={series.id} className="hover:bg-neutral-800/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <img src={series.thumbnail} className="w-10 h-10 rounded object-cover" />
                    <div>
                      <p className="font-bold">{series.title}</p>
                      <p className="text-xs text-neutral-400">{series.category}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${series.isApproved ? 'bg-green-900/40 text-green-400' : 'bg-yellow-900/40 text-yellow-400'}`}>
                    {series.isApproved ? 'Approved' : 'Pending'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">{series.episodes.length}</td>
                <td className="px-6 py-4 text-sm font-mono">{series.plays.toLocaleString()}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-3 text-neutral-400">
                    <button className="hover:text-white"><Edit2 size={18} /></button>
                    <button className="hover:text-white"><PlayCircle size={18} /></button>
                    <button className="hover:text-red-500"><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Upload Modal Mockup */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-lg p-8 animate-in zoom-in-95 duration-200">
            <h2 className="text-2xl font-bold mb-6">Create New Series</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-neutral-400 mb-1">Title</label>
                <input 
                  required
                  type="text" 
                  value={newSeries.title}
                  onChange={e => setNewSeries({...newSeries, title: e.target.value})}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="The Mystery of Shadow Island"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-neutral-400 mb-1">Description</label>
                <textarea 
                  required
                  value={newSeries.description}
                  onChange={e => setNewSeries({...newSeries, description: e.target.value})}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-3 text-white h-24 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="A gripping tale about..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-neutral-400 mb-1">Category</label>
                  <select 
                    value={newSeries.category}
                    onChange={e => setNewSeries({...newSeries, category: e.target.value as Category})}
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-3 text-white focus:outline-none"
                  >
                    {Object.values(Category).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div>
                   <label className="block text-sm font-bold text-neutral-400 mb-1">Cover Art</label>
                   <div className="w-full bg-neutral-800 border-2 border-dashed border-neutral-700 rounded-lg p-3 text-neutral-500 flex items-center justify-center cursor-pointer hover:border-indigo-500 transition-colors">
                      <Upload size={20} />
                      <span className="ml-2 text-xs">Browse</span>
                   </div>
                </div>
              </div>
              <div className="flex gap-4 mt-8">
                <button 
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 py-3 text-neutral-400 hover:text-white font-bold transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-white text-black py-3 rounded-full font-bold hover:scale-105 transition-transform"
                >
                  Create Series
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatorDashboard;
