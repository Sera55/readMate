"use client";

import React, { useEffect, useState } from 'react';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock user for demo
    fetch('/api/auth/mock', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'demo@example.com',
        name: 'Julian Barnes',
        topics: ['Philosophy', '19th Century Literature', 'Urban Planning']
      })
    })
    .then(res => res.json())
    .then(data => {
      setUser(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="py-20 text-center italic text-cozy-charcoal/50">Loading your library lounge...</div>;

  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="bg-white rounded-2xl shadow-sm border border-cozy-sand overflow-hidden">
        <div className="h-32 bg-cozy-moss/10 border-b border-cozy-sand"></div>
        <div className="px-8 pb-8">
          <div className="relative -mt-12 flex items-end gap-6 mb-6">
            <div className="w-24 h-24 bg-cozy-saddle rounded-full border-4 border-white flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              {user.name?.[0]}
            </div>
            <div className="pb-2">
              <h1 className="text-3xl font-bold text-cozy-charcoal italic font-serif">{user.name}</h1>
              <p className="text-cozy-charcoal/60 italic">{user.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <section>
                <h2 className="text-xl font-bold text-cozy-saddle mb-4 flex items-center gap-2 italic">
                  <span className="text-2xl not-italic">🏷️</span> Topics I love to discuss
                </h2>
                <div className="flex flex-wrap gap-2">
                  {user.topics?.map((topic: any) => (
                    <span key={topic.id} className="bg-cozy-sand/50 text-cozy-moss px-4 py-1.5 rounded-full text-sm font-bold border border-cozy-moss/10 uppercase tracking-tight">
                      {topic.name}
                    </span>
                  ))}
                  <button className="text-sm text-cozy-moss/60 hover:text-cozy-moss px-3 py-1.5 rounded-full border border-dashed border-cozy-moss/20 transition-colors">+ Add Topic</button>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-cozy-saddle mb-4 italic">My Story</h2>
                <p className="text-cozy-charcoal/80 leading-relaxed bg-cozy-parchment/30 p-4 rounded-xl italic border border-cozy-sand/50">
                  {user.bio || "Passionate reader and community advocate. Always looking for the next philosophical deep-dive or historical journey."}
                </p>
              </section>
            </div>

            <div className="space-y-8">
              <section className="bg-cozy-sand/20 p-6 rounded-2xl border border-cozy-sand">
                <h2 className="text-lg font-bold text-cozy-saddle mb-4 flex items-center gap-2 italic">
                  <span className="text-xl not-italic">🏆</span> Badges
                </h2>
                <div className="space-y-4">
                  {user.badges && user.badges.length > 0 ? (
                    user.badges.map((badge: any) => (
                      <div key={badge.id} className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm border border-cozy-sand/50">
                        <span className="text-2xl">{badge.icon}</span>
                        <span className="text-[10px] font-bold text-cozy-charcoal uppercase tracking-widest">{badge.name}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-cozy-charcoal/40 text-sm italic">
                      <p>No badges yet.</p>
                      <p className="text-[10px] mt-1">Participate to earn badges!</p>
                    </div>
                  )}
                </div>
              </section>

              <section className="bg-cozy-moss text-white p-6 rounded-2xl shadow-lg shadow-cozy-moss/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-10 text-6xl rotate-12">📚</div>
                <h2 className="text-sm font-bold mb-1 italic opacity-80 uppercase tracking-widest">Social Credits</h2>
                <p className="text-5xl font-bold mb-2">{user.socialCredits}</p>
                <p className="text-[10px] opacity-70 leading-tight">Gained from gifting knowledge to your neighborhood.</p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
