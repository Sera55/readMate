"use client";

import React, { useState } from 'react';

interface ExchangeModalProps {
  book: any;
  user: any;
  onClose: () => void;
}

export default function ExchangeModal({ book, user, onClose }: ExchangeModalProps) {
  const [step, setStep] = useState(1);
  const [exchangeData, setExchangeData] = useState<any>(null);

  const initiateExchange = async (type: 'SWAP' | 'GIFT') => {
    try {
      const res = await fetch('/api/exchanges', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requesterId: user.id,
          bookId: book.id,
          type
        })
      });
      const data = await res.json();
      setExchangeData(data);
      setStep(2);
    } catch (error) {
      console.error('Failed to initiate exchange:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-cozy-charcoal/40 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-cozy-sand">
        {step === 1 ? (
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-cozy-saddle italic font-serif leading-tight">Requesting<br/>"{book.title}"</h2>
                <p className="text-cozy-charcoal/60 mt-1">Choose your exchange method.</p>
              </div>
              <button onClick={onClose} className="text-cozy-charcoal/20 hover:text-cozy-charcoal text-3xl transition-colors">×</button>
            </div>

            <div className="space-y-4 mb-8">
              <button 
                onClick={() => initiateExchange('SWAP')}
                className="w-full flex items-center gap-4 p-5 border-2 border-cozy-sand rounded-2xl hover:border-cozy-moss hover:bg-cozy-moss/5 transition-all group text-left"
              >
                <div className="text-3xl grayscale group-hover:grayscale-0 transition-all">🔄</div>
                <div>
                  <h4 className="font-bold text-cozy-charcoal group-hover:text-cozy-moss">Direct Swap</h4>
                  <p className="text-[10px] text-cozy-charcoal/50 uppercase font-bold tracking-widest mt-1">1-for-1 Exchange</p>
                </div>
              </button>

              <button 
                onClick={() => initiateExchange('GIFT')}
                className="w-full flex items-center gap-4 p-5 border-2 border-cozy-sand rounded-2xl hover:border-cozy-moss hover:bg-cozy-moss/5 transition-all group text-left"
              >
                <div className="text-3xl grayscale group-hover:grayscale-0 transition-all">🎁</div>
                <div>
                  <h4 className="font-bold text-cozy-charcoal group-hover:text-cozy-moss">Accept as Gift</h4>
                  <p className="text-[10px] text-cozy-charcoal/50 uppercase font-bold tracking-widest mt-1">Pay-it-Forward System</p>
                </div>
              </button>
            </div>

            <div className="bg-cozy-parchment/50 p-4 rounded-xl text-[10px] text-cozy-charcoal/60 italic border border-cozy-sand flex gap-3 items-center">
              <span className="text-xl not-italic">⚖️</span>
              <p>Our Anti-Commercial Policy strictly prohibits monetary transactions. If you are asked to pay, please report immediately.</p>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center">
            <div className="w-20 h-20 bg-cozy-moss/10 text-cozy-moss rounded-full flex items-center justify-center text-4xl mx-auto mb-6 border-2 border-cozy-moss/20">📖</div>
            <h2 className="text-2xl font-bold text-cozy-charcoal mb-2 italic font-serif">Exchange Initiated!</h2>
            <p className="text-sm text-cozy-charcoal/60 mb-8">We've notified the owner. While you wait, check out this suggestion:</p>

            <div className="bg-cozy-sand/30 p-6 rounded-2xl border border-cozy-sand mb-8 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cozy-saddle text-white text-[8px] px-3 py-1 rounded-full font-bold uppercase tracking-widest shadow-sm">Conversation Starter</div>
              <p className="text-lg font-serif italic text-cozy-saddle mb-4 leading-relaxed">
                "{exchangeData?.discussionPrompt}"
              </p>
              
              {exchangeData?.matchingTopics?.length > 0 && (
                <div>
                  <p className="text-[9px] text-cozy-charcoal/40 uppercase font-bold mb-2 tracking-widest">Shared Interests:</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {exchangeData.matchingTopics.map((topic: string) => (
                      <span key={topic} className="bg-white px-3 py-1 rounded-full text-[9px] font-bold text-cozy-moss border border-cozy-moss/20 uppercase tracking-tight">{topic}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <button className="flex-1 bg-cozy-moss text-white py-3.5 rounded-xl font-bold hover:bg-cozy-moss/90 transition-all shadow-lg shadow-cozy-moss/20">Yes, let's grab coffee!</button>
              <button onClick={onClose} className="flex-1 bg-white border border-cozy-sand text-cozy-charcoal/60 py-3.5 rounded-xl font-bold hover:bg-cozy-sand/50 transition-colors">Not today</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
