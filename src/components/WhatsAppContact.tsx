/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { MessageSquare, X, Send, UserCheck, MessageCircle } from 'lucide-react';

export default function WhatsAppContact() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Auto trigger tooltip after 4 seconds to catch attention smoothly
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 4000);

    // Hide tooltip after 9 seconds if not interacted
    const hideTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 13000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  const whatsappNumber = '2348063342947';
  const defaultMessage = 'Hello Clasqo Integrated, I am reaching out from your website to inquire about Sany heavy machinery leasing and concrete casting services.';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      
      {/* Expanded Friendly Chat Box Popup */}
      {isOpen && (
        <div className="mb-4 w-80 bg-[#060a1a] border border-[#182747] shadow-2xl overflow-hidden rounded-none animate-fade-in text-neutral-100">
          
          {/* Header Banner - WhatsApp Green paired with brand colors */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-white/10 flex items-center justify-center border border-white/20">
                  <MessageCircle className="w-6 h-6 text-white shrink-0" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-emerald-600 rounded-full animate-pulse" />
              </div>
              <div className="leading-tight">
                <h4 className="text-xs font-black uppercase tracking-wider">Lagos Dispatch Desk</h4>
                <span className="text-[9px] text-emerald-100 font-mono font-bold tracking-wide">ONLINE • RESPONDING LIVE</span>
              </div>
            </div>
            
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/75 hover:text-white hover:bg-white/10 p-1 transition-colors"
              title="Close chat box"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Body Bubble */}
          <div className="p-4 geometric-dots relative text-[11px] space-y-4">
            <div className="absolute inset-0 bg-[#080D22]/90 pointer-events-none" />
            
            <div className="relative z-10 space-y-3">
              <div className="bg-[#121c3b] border border-[#182747] p-3 text-neutral-300 max-w-[85%] rounded-none">
                <span className="text-[8px] text-amber-500 font-mono font-extrabold uppercase block mb-1">CLASQO LOGISTICS HUB</span>
                Welcome to Clasqo Integrated! How can we assist you with concrete casting, piling, or Sany heavy equipment rental in Lagos?
              </div>
              <div className="bg-[#121c3b] border border-[#182747] p-3 text-neutral-300 max-w-[85%] rounded-none">
                Our active operations hub is fully staffed. Let's arrange a quote draft!
              </div>
            </div>
          </div>

          {/* Quick Action Link Footer Button */}
          <div className="p-3 bg-[#060a1a] border-t border-[#182747] flex flex-col gap-2">
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="w-full bg-[#25D366] hover:bg-emerald-500 text-[#060a1a] font-black text-center text-xs py-3 rounded-none uppercase tracking-widest inline-flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <Send className="w-3.5 h-3.5 fill-current" />
              Start WhatsApp Chat
            </a>
            
            <span className="text-[8.5px] text-center text-neutral-500 font-mono block">
              Direct Contact No: +234 806 334 2947
            </span>
          </div>
        </div>
      )}

      {/* Floating Interactive Trigger Bubble Button */}
      <div className="flex items-center gap-3">
        {/* Hover / Auto-Trigger Announcement Bubble */}
        {showTooltip && !isOpen && (
          <div className="bg-[#0B122C] border border-[#182747] p-3 shadow-2xl relative max-w-xs animate-fade-in flex items-center gap-2.5">
            <div className="leading-tight text-left">
              <span className="text-[8px] text-amber-500 font-mono font-black uppercase tracking-widest block mb-0.5">LAGOS OPERATOR ONLINE</span>
              <p className="text-[10px] text-neutral-300 font-medium">Have inquiries? Let us address operations instantly on WhatsApp.</p>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
              }}
              className="text-neutral-500 hover:text-white p-0.5"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* The Action Button */}
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setShowTooltip(false);
          }}
          className="w-14 h-14 bg-[#25D366] hover:bg-emerald-500 text-[#060a1a] shadow-2xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95 duration-250 cursor-pointer relative"
          title="Open WhatsApp Support Channel"
        >
          {/* Pulsing indicator ring */}
          <span className="absolute inset-0 bg-emerald-400 opacity-30 animate-ping" style={{ animationDuration: '2s' }} />
          
          <svg
            className="w-7 h-7 fill-current shrink-0 relative z-10"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.326 1.968 13.843.94 11.222.94a9.81 9.81 0 0 0-9.824 9.795c-.001 1.68.452 3.322 1.312 4.743L1.625 21.92l6.536-1.71c.01-.001.011-.001.022-.001-.012-.022-.012-.022 0 0zM17.65 14.28c-.286-.143-1.69-.834-1.952-.929-.261-.096-.452-.143-.642.143-.19.285-.736.929-.903 1.12-.166.19-.333.214-.619.071-.285-.143-1.207-.444-2.299-1.419-.849-.757-1.423-1.693-1.59-1.978-.166-.285-.018-.439.125-.581.128-.128.285-.333.428-.499.143-.167.19-.286.285-.476.095-.19.048-.356-.024-.499-.071-.143-.642-1.547-.88-2.118-.231-.557-.465-.482-.642-.49-.166-.008-.356-.009-.547-.009-.19 0-.499.071-.76.356-.261-.285-.998-.975-.998-2.378 0-1.402 1.022-2.757 1.165-2.947.143-.19 2.012-3.073 4.873-4.31.682-.295 1.214-.471 1.629-.603.684-.217 1.307-.187 1.8.114.549.336 1.165.714 1.328.905.163.19.243.356.123.599z"/>
          </svg>
        </button>
      </div>

    </div>
  );
}
