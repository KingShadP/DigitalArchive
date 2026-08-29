'use client';

import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { initAuth, googleSignIn, getAccessToken, logout } from '../src/lib/firebase';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, X, LogOut, Check } from 'lucide-react';

interface Note {
  id: number;
  title: string;
  content: string;
  color: string;
  createdAt: string;
}

interface SanctumLogsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SanctumLogsModal({ isOpen, onClose }: SanctumLogsModalProps) {
  const [user, setUser] = useState<User | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [isComposing, setIsComposing] = useState(false);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const token = await getAccessToken();
      const res = await fetch('/api/notes', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setNotes(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = initAuth(
      (u) => { setUser(u); fetchNotes(); },
      () => { setUser(null); setLoading(false); }
    );
    return () => unsubscribe();
  }, []);

  const createNote = async () => {
    if (!newTitle.trim() && !newContent.trim()) return;
    
    try {
      const token = await getAccessToken();
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ title: newTitle, content: newContent })
      });
      
      if (res.ok) {
        setNewTitle('');
        setNewContent('');
        setIsComposing(false);
        fetchNotes();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteNote = async (id: number) => {
    const confirm = window.confirm("Erase this log from the archive?");
    if (!confirm) return;

    try {
      const token = await getAccessToken();
      const res = await fetch(`/api/notes/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setNotes(notes.filter(n => n.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!isOpen) return null;

  const renderContent = () => {
    if (loading && !user) {
      return (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-[#E5E4E2]/40 text-xs tracking-widest uppercase animate-pulse">Initializing Secure Link...</div>
        </div>
      );
    }

    if (!user) {
      return (
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="flex flex-col items-center justify-center p-12 border border-white/5 bg-[#050505] rounded-2xl max-w-md w-full mx-auto">
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mb-6">
              <span className="text-white/40 text-xl font-light">+</span>
            </div>
            <h3 className="text-white text-sm tracking-widest uppercase mb-2">Restricted Archive</h3>
            <p className="text-white/40 text-xs mb-8 text-center px-4 leading-relaxed">
              Access to the Sanctum Logs requires biometric verification via Google Protocol.
            </p>
            
            <button 
              onClick={googleSignIn}
              className="px-6 py-3 bg-[#E5E4E2] text-black text-xs font-semibold tracking-[0.2em] uppercase hover:bg-white transition-colors flex items-center gap-3 rounded-full"
            >
              <svg className="w-4 h-4" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-17.65z"></path>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                <path fill="none" d="M0 0h48v48H0z"></path>
              </svg>
              Initialize Link
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="w-full h-full flex flex-col overflow-y-auto overflow-x-hidden p-6 sm:p-12">
        <div className="flex items-center justify-between mb-16 border-b border-white/10 pb-8 shrink-0">
          <div>
            <h2 className="text-[#E5E4E2] text-xs tracking-[0.3em] uppercase mb-1">Sanctum Logs</h2>
            <p className="text-white/40 text-[10px] tracking-widest font-mono">OPR: {user.email?.split('@')[0].toUpperCase()}</p>
          </div>
          <button onClick={logout} className="text-white/40 hover:text-[#B76E79] transition-colors p-2 flex flex-col items-center gap-1 group">
            <LogOut size={16} />
            <span className="text-[8px] uppercase tracking-widest group-hover:text-white transition-colors">Sever</span>
          </button>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Composer Card */}
        <div className={`border border-white/10 bg-white/[0.02] p-6 transition-all duration-500 ease-in-out ${isComposing ? 'col-span-1 md:col-span-2 lg:col-span-3' : 'hover:bg-white/[0.04]'}`}>
          {!isComposing ? (
            <button onClick={() => setIsComposing(true)} className="w-full h-full min-h-[120px] flex items-center gap-4 text-white/40 hover:text-white transition-colors group">
              <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center group-hover:border-white/50 transition-colors">
                <Plus size={16} />
              </div>
              <span className="text-xs tracking-widest uppercase">Draft New Log</span>
            </button>
          ) : (
            <motion.form 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                createNote();
              }}
            >
              <input 
                type="text" 
                placeholder="LOG CLASSIFICATION" 
                aria-label="Log Classification"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="bg-transparent border-none outline-none text-white text-sm font-semibold tracking-wider uppercase placeholder:text-white/20 w-full"
              />
              <textarea 
                placeholder="Enter log details..."
                aria-label="Log Details"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                    e.preventDefault();
                    createNote();
                  }
                }}
                className="bg-transparent border-none outline-none text-white/70 text-sm leading-relaxed placeholder:text-white/20 w-full resize-none min-h-[100px]"
              />
              <div className="flex items-center justify-end gap-4 pt-4 border-t border-white/5">
                <button type="button" onClick={() => setIsComposing(false)} className="text-white/40 hover:text-white text-[10px] uppercase tracking-widest px-4 py-2">Abort</button>
                <button type="submit" className="bg-[#B76E79]/20 text-[#B76E79] hover:bg-[#B76E79] hover:text-white px-6 py-2 text-[10px] uppercase tracking-widest font-semibold transition-colors rounded-sm flex items-center gap-2">
                  <Check size={14} /> Commit Log
                </button>
              </div>
            </motion.form>
          )}
        </div>

        {/* Notes Grid */}
        <AnimatePresence>
          {notes.map((note) => (
            <motion.div 
              key={note.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="group relative border border-white/5 bg-transparent p-6 hover:bg-white/[0.02] transition-colors"
            >
              <button 
                onClick={() => deleteNote(note.id)}
                className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 text-white/30 hover:text-red-400 transition-all"
              >
                <X size={14} />
              </button>
              
              <div className="text-[9px] tracking-widest text-[#B76E79] mb-4 font-mono uppercase">
                SEQ_{note.id.toString().padStart(4, '0')}
              </div>
              
              {note.title && (
                <h3 className="text-white text-sm font-semibold tracking-wider uppercase mb-3">
                  {note.title}
                </h3>
              )}
              
              <p className="text-white/60 text-sm leading-relaxed whitespace-pre-wrap">
                {note.content}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>

      </div>
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="absolute inset-0 bg-[#050505]/95 backdrop-blur-xl"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-6xl h-[85vh] bg-[#0A0A0A] border border-white/10 flex flex-col shadow-2xl overflow-hidden rounded-2xl"
          >
            {/* Modal Header */}
            <div className="relative z-10 flex items-center justify-between px-6 sm:px-8 py-6 border-b border-white/10 shrink-0 bg-[#0A0A0A]/60 backdrop-blur-md">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#E5E4E2] block font-medium">
                KSP_ARCHIVE_SEC // LOGS
              </span>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full border border-white/20 hover:border-white/50 flex items-center justify-center text-white transition-colors"
                aria-label="Close logs"
              >
                <X size={16} />
              </button>
            </div>

            {/* Content Area */}
            {renderContent()}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
