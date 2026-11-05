/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Send, 
  X, 
  Minimize2, 
  Maximize2, 
  MessageCircle, 
  PhoneCall, 
  ExternalLink, 
  ArrowRight, 
  TrendingUp, 
  Truck, 
  Wrench, 
  Building2, 
  Sparkles, 
  Loader2, 
  RefreshCw, 
  CheckCheck,
  ShieldCheck,
  ChevronRight,
  HardHat
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  quickActions?: Array<{
    label: string;
    action: string;
    value?: string;
    tab?: string;
    text?: string;
  }>;
  card?: {
    type: string;
    title: string;
    subtitle: string;
    metric?: string;
    tag?: string;
    tab?: string;
    linkText?: string;
    image?: string;
  };
}

interface ClasqoLiveSupportProps {
  onNavigateTab: (tab: string, category?: string) => void;
  isLightMode?: boolean;
}

export default function ClasqoLiveSupport({ onNavigateTab, isLightMode = false }: ClasqoLiveSupportProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const whatsappNumber = '2348063342947';
  const hotlinePhone = '+2348020879468';

  // Seed initial welcome message
  useEffect(() => {
    setMessages([
      {
        id: 'msg-welcome',
        sender: 'assistant',
        text: `Welcome to Clasqo Integrated! I am **Clasqo Live Support**, your AI operations and equipment concierge.\n\nHow can I assist your project today? You can inquire about:\n• **Heavy Machinery Charters** (Sany 56m Boom Pumps, Cranes, Trailer Pumps)\n• **Deep Bored Piling & Foundations** in coastal Lagos sand beds\n• **Partners Investment & USD Profit Share** (18.5% – 32.4% Annualized APY, Min. $3,000 USD)\n• **Turkish DN125 Twin-Wall Pipelines & Coupling Clamps**`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickActions: [
          { label: '💰 USD Investment Program (18.5%–32.4%)', action: 'navigate', tab: 'invest' },
          { label: '🚜 Sany 56m Boom Pump Lease', action: 'navigate', tab: 'equipment' },
          { label: '🏗️ Bored Piling in Lekki', action: 'navigate', tab: 'construction' },
          { label: '🔩 Turkish DN125 Hardware', action: 'navigate', tab: 'parts' },
          { label: '💬 Direct WhatsApp Dispatch Desk', action: 'whatsapp', text: 'Hello Clasqo Live Support, I am reaching out to discuss equipment leasing and engineering services.' }
        ],
        card: {
          type: 'general',
          title: 'Clasqo Central Operations Yard',
          subtitle: '1 Dr Babatunde Ayeni St, Lekki Scheme, Eti-Osa, Lagos',
          metric: 'Dispatching Live',
          tag: 'Sany Tier-1 Fleet',
          tab: 'equipment',
          linkText: 'Explore Fleets & Services →',
          image: '/src/assets/images/sany_boom_pump_1780289808297.png'
        }
      }
    ]);

    // Show gentle teaser banner after 3.5 seconds
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  // Auto scroll to bottom of chat
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isMinimized, isLoading]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputText;
    if (!textToSend.trim() || isLoading) return;

    const userMessageId = `user-${Date.now()}`;
    const newMsg: ChatMessage = {
      id: userMessageId,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMsg]);
    if (!customText) setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend.trim(),
          history: messages.slice(-4).map(m => ({ sender: m.sender, text: m.text }))
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      
      // Determine card image based on card type
      let cardImage = data.card?.image;
      if (!cardImage && data.card?.type) {
        if (data.card.type === 'investment') {
          cardImage = '/src/assets/images/investor_portal_hero_1793855237606.jpg';
        } else if (data.card.type === 'equipment') {
          cardImage = '/src/assets/images/sany_boom_pump_1780289808297.png';
        } else if (data.card.type === 'service') {
          cardImage = '/src/assets/images/service_bored_piling_1793852380230.jpg';
        } else if (data.card.type === 'parts') {
          cardImage = '/src/assets/images/part_twinwall_elbow_90_1793852423091.jpg';
        } else if (data.card.type === 'labor') {
          cardImage = '/assets/aistudio/a988fb32-58ae-4b9b-a798-129545d20f7c_c8faa863.jpeg';
        }
      }

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || 'Thank you for your message. Our Lagos operations desk is ready to help.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickActions: data.quickActions,
        card: data.card ? { ...data.card, image: cardImage } : undefined
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error('Chat error:', err);
      // Fallback message
      const fallbackMsg: ChatMessage = {
        id: `assistant-fb-${Date.now()}`,
        sender: 'assistant',
        text: `Thank you for contacting Clasqo Integrated! Our Lagos dispatch center at Lekki Scheme is currently handling active site casts.\n\nYou can speak directly with our Senior Operations Lead right away on WhatsApp or telephone:`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickActions: [
          { label: '💬 Start WhatsApp Chat', action: 'whatsapp', text: `Hello Clasqo, I was asking: "${textToSend.trim()}"` },
          { label: '📞 Call Operations: +234 802 087 9468', action: 'call' },
          { label: '📊 View USD Investment Program', action: 'navigate', tab: 'invest' }
        ]
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleActionClick = (action: { label: string; action: string; value?: string; tab?: string; text?: string }) => {
    if (action.action === 'navigate' && action.tab) {
      onNavigateTab(action.tab);
      // On mobile, minimize chat window so user sees the page
      if (window.innerWidth < 768) {
        setIsMinimized(true);
      }
    } else if (action.action === 'whatsapp') {
      const text = action.text || `Hello Clasqo Live Support, I am reaching out from your website regarding ${action.label}.`;
      const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    } else if (action.action === 'call') {
      window.location.href = `tel:${hotlinePhone}`;
    }
  };

  const triggerDirectWhatsApp = (queryContext?: string) => {
    const text = queryContext 
      ? `Hello Clasqo Live Support, I was inquiring on your website about: ${queryContext}` 
      : 'Hello Clasqo Integrated, I am reaching out from your website to inquire about Sany heavy machinery leasing, piling foundations, and USD co-ownership.';
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 font-sans flex flex-col items-end">
      
      {/* Floating Teaser Notification Bubble */}
      <AnimatePresence>
        {showNotification && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className={`mb-3 max-w-xs sm:max-w-sm p-4 border shadow-2xl relative rounded-none select-none ${
              isLightMode 
                ? 'bg-white border-amber-500/80 text-[#0C122C]' 
                : 'bg-[#060a1a] border-amber-500/80 text-white shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
            }`}
          >
            <button
              onClick={() => setShowNotification(false)}
              className="absolute top-2 right-2 text-neutral-400 hover:text-amber-500 p-1 cursor-pointer"
              title="Close teaser"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 bg-amber-500 text-neutral-950 font-black flex items-center justify-center shrink-0 rounded-none shadow">
                <Bot className="w-5 h-5" />
              </div>
              <div className="space-y-1 pr-4">
                <div className="flex items-center gap-1.5 font-mono text-[9px] font-bold text-amber-500 uppercase tracking-widest">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
                  CLASQO LIVE SUPPORT ONLINE
                </div>
                <h5 className="text-xs font-black uppercase tracking-tight">Need Fleet Rates or USD Yields?</h5>
                <p className={`text-[11px] leading-snug ${isLightMode ? 'text-neutral-600' : 'text-neutral-300'}`}>
                  Ask our AI engineer about Sany boom pumps, bored piling in Lekki, or USD co-ownership returns.
                </p>
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => {
                      setIsOpen(true);
                      setIsMinimized(false);
                      setShowNotification(false);
                    }}
                    className="bg-amber-500 text-neutral-950 text-[10px] font-black uppercase px-3 py-1.5 tracking-wider hover:bg-neutral-900 hover:text-white transition-colors cursor-pointer"
                  >
                    Chat With Assistant &rarr;
                  </button>
                  <button
                    onClick={() => triggerDirectWhatsApp()}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold uppercase px-2.5 py-1.5 tracking-wider inline-flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-3 h-3" /> WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded Live Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.96 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? 'auto' : undefined
            }}
            exit={{ opacity: 0, y: 25, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className={`w-[calc(100vw-2rem)] sm:w-[420px] max-w-[440px] shadow-2xl border flex flex-col overflow-hidden mb-3 ${
              isLightMode 
                ? 'bg-white border-neutral-300 text-[#0C122C]' 
                : 'bg-[#060a1a] border-[#182747] text-white'
            } ${isMinimized ? 'h-auto' : 'h-[580px] sm:h-[620px] max-h-[85vh]'}`}
          >
            {/* Header Bar */}
            <div className="bg-gradient-to-r from-[#0C1430] via-[#091026] to-[#050918] p-4 text-white border-b border-[#182747] flex items-center justify-between select-none">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-amber-500 text-neutral-950 flex items-center justify-center font-black shadow border border-amber-400/50">
                    <Bot className="w-5 h-5" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-[#0C1430] rounded-full animate-pulse" />
                </div>
                <div className="leading-tight">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-xs font-black uppercase tracking-wider text-white">Clasqo Live Support</h3>
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                  </div>
                  <div className="flex items-center gap-2 mt-0.5 font-mono text-[9px] text-neutral-400">
                    <span className="text-emerald-400 font-bold">● ACTIVE</span>
                    <span>Lekki Yard Operations</span>
                  </div>
                </div>
              </div>

              {/* Action Icons */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => triggerDirectWhatsApp()}
                  className="p-1.5 text-emerald-400 hover:text-white hover:bg-emerald-600/30 transition-colors cursor-pointer"
                  title="Switch to WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title={isMinimized ? 'Expand' : 'Minimize'}
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-neutral-400 hover:text-white hover:bg-red-500/20 transition-colors cursor-pointer"
                  title="Close support chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Hotline Ribbon */}
            <div className="bg-[#0B1535] px-4 py-2 border-b border-[#182747] flex items-center justify-between font-mono text-[9.5px]">
              <span className="text-neutral-400 flex items-center gap-1">
                <HardHat className="w-3 h-3 text-amber-500" /> Urgent site casting?
              </span>
              <div className="flex items-center gap-3">
                <a 
                  href={`tel:${hotlinePhone}`}
                  className="text-amber-400 hover:text-white font-bold flex items-center gap-1"
                >
                  <PhoneCall className="w-3 h-3" /> Call Hotline
                </a>
                <span className="text-neutral-600">|</span>
                <button
                  onClick={() => triggerDirectWhatsApp()}
                  className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <MessageCircle className="w-3 h-3" /> WhatsApp
                </button>
              </div>
            </div>

            {/* Chat Body (Hidden when minimized) */}
            {!isMinimized && (
              <>
                <div className={`flex-1 overflow-y-auto p-4 space-y-4 text-xs ${
                  isLightMode ? 'bg-[#F8FAFC]' : 'bg-[#050918]'
                }`}>
                  {messages.map((msg) => {
                    const isUser = msg.sender === 'user';
                    return (
                      <div 
                        key={msg.id}
                        className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1.5`}
                      >
                        <div className="flex items-center gap-1.5 text-[9px] font-mono text-neutral-500 px-1">
                          <span>{isUser ? 'You' : 'Clasqo Live Support'}</span>
                          <span>•</span>
                          <span>{msg.timestamp}</span>
                        </div>

                        {/* Bubble */}
                        <div className={`p-3.5 max-w-[90%] leading-relaxed ${
                          isUser
                            ? 'bg-amber-500 text-neutral-950 font-medium'
                            : isLightMode
                              ? 'bg-white border border-neutral-200 text-[#0C122C] shadow-sm'
                              : 'bg-[#0B122C] border border-[#182747] text-neutral-200 shadow-md'
                        }`}>
                          <div className="whitespace-pre-line text-xs font-sans">
                            {msg.text}
                          </div>

                          {/* Quick Site-Like Display Card inside Assistant Bubble */}
                          {msg.card && (
                            <div className={`mt-3 p-3 border overflow-hidden ${
                              isLightMode ? 'bg-neutral-50 border-neutral-200' : 'bg-[#060a1a] border-amber-500/30'
                            }`}>
                              {msg.card.image && (
                                <div className="h-28 w-full overflow-hidden mb-2 relative">
                                  <img 
                                    src={msg.card.image} 
                                    alt={msg.card.title} 
                                    className="w-full h-full object-cover"
                                    referrerPolicy="no-referrer"
                                  />
                                  {msg.card.tag && (
                                    <span className="absolute top-1.5 left-1.5 bg-neutral-950/90 text-amber-500 text-[8px] font-mono font-bold px-2 py-0.5 uppercase tracking-wider">
                                      {msg.card.tag}
                                    </span>
                                  )}
                                  {msg.card.metric && (
                                    <span className="absolute bottom-1.5 right-1.5 bg-emerald-950/90 text-emerald-400 text-[8px] font-mono font-bold px-2 py-0.5 uppercase tracking-wider">
                                      {msg.card.metric}
                                    </span>
                                  )}
                                </div>
                              )}
                              <h5 className="font-black text-xs uppercase tracking-tight text-amber-500">
                                {msg.card.title}
                              </h5>
                              <p className={`text-[10px] mt-0.5 leading-snug ${
                                isLightMode ? 'text-neutral-600' : 'text-neutral-400'
                              }`}>
                                {msg.card.subtitle}
                              </p>
                              {msg.card.tab && (
                                <button
                                  onClick={() => handleActionClick({ label: msg.card!.title, action: 'navigate', tab: msg.card!.tab })}
                                  className="mt-2 text-amber-400 hover:text-amber-300 text-[10px] font-mono font-bold inline-flex items-center gap-1 uppercase tracking-wider cursor-pointer"
                                >
                                  {msg.card.linkText || 'View Details & Schedulers →'}
                                </button>
                              )}
                            </div>
                          )}

                          {/* Interactive Action Chips inside Bubble */}
                          {msg.quickActions && msg.quickActions.length > 0 && (
                            <div className="mt-3 pt-2.5 border-t border-neutral-500/20 flex flex-wrap gap-1.5">
                              {msg.quickActions.map((action, aIdx) => (
                                <button
                                  key={aIdx}
                                  onClick={() => handleActionClick(action)}
                                  className={`text-[9.5px] font-mono px-2.5 py-1 border transition-all inline-flex items-center gap-1 cursor-pointer font-bold ${
                                    action.action === 'whatsapp'
                                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500'
                                      : action.action === 'call'
                                        ? 'bg-amber-600 hover:bg-amber-500 text-white border-amber-500'
                                        : isLightMode
                                          ? 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800 border-neutral-300'
                                          : 'bg-neutral-900/90 hover:bg-amber-500 hover:text-neutral-950 text-amber-400 border-[#1c305e]'
                                  }`}
                                >
                                  <span>{action.label}</span>
                                  <ArrowRight className="w-2.5 h-2.5" />
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {/* Loading indicator */}
                  {isLoading && (
                    <div className="flex items-center gap-2 text-neutral-400 font-mono text-[10px] p-2">
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-500" />
                      <span>Clasqo Live Support is formulating engineering analysis...</span>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Prompts Bar */}
                <div className={`p-2 border-t overflow-x-auto whitespace-nowrap flex items-center gap-1.5 scrollbar-thin ${
                  isLightMode ? 'bg-neutral-100 border-neutral-200' : 'bg-[#080E24] border-[#182747]'
                }`}>
                  <span className="text-[8px] font-mono text-neutral-500 uppercase tracking-widest pl-1">QUICK:</span>
                  <button
                    onClick={() => handleSendMessage('What are the minimum capital entry and projected USD yields for the Partners Investment Program?')}
                    className="text-[9px] font-mono px-2 py-0.5 bg-neutral-900/60 hover:bg-amber-500 hover:text-neutral-950 text-neutral-300 border border-[#182747] cursor-pointer"
                  >
                    💰 USD Investment Returns
                  </button>
                  <button
                    onClick={() => handleSendMessage('How can I lease a Sany 56m Concrete Boom Pump for a high-rise cast in Lagos?')}
                    className="text-[9px] font-mono px-2 py-0.5 bg-neutral-900/60 hover:bg-amber-500 hover:text-neutral-950 text-neutral-300 border border-[#182747] cursor-pointer"
                  >
                    🚜 Sany 56m Boom Pump
                  </button>
                  <button
                    onClick={() => handleSendMessage('What bored piling equipment and slurry mud casing do you provide for swampy Lekki foundations?')}
                    className="text-[9px] font-mono px-2 py-0.5 bg-neutral-900/60 hover:bg-amber-500 hover:text-neutral-950 text-neutral-300 border border-[#182747] cursor-pointer"
                  >
                    🏗️ Bored Piling Rigs
                  </button>
                  <button
                    onClick={() => handleSendMessage('Tell me about Lead Engineer Emmanuel and his multi-skilled certifications in maintenance, line pump setup, and heavy machinery operation')}
                    className="text-[9px] font-mono px-2 py-0.5 bg-neutral-900/60 hover:bg-amber-500 hover:text-neutral-950 text-neutral-300 border border-[#182747] cursor-pointer"
                  >
                    👷 Engr. Emmanuel Mastery
                  </button>
                  <button
                    onClick={() => triggerDirectWhatsApp('Direct inquiry regarding machinery lease and quotation')}
                    className="text-[9px] font-mono px-2 py-0.5 bg-emerald-950/80 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-800 cursor-pointer"
                  >
                    💬 WhatsApp Direct
                  </button>
                </div>

                {/* Input Form */}
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className={`p-3 border-t flex items-center gap-2 ${
                    isLightMode ? 'bg-white border-neutral-200' : 'bg-[#060a1a] border-[#182747]'
                  }`}
                >
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type your engineering, fleet, or investment query..."
                    className={`flex-1 text-xs py-2 px-3 border rounded-none outline-none focus:border-amber-500 ${
                      isLightMode 
                        ? 'bg-neutral-50 border-neutral-300 text-[#0C122C] placeholder-neutral-400' 
                        : 'bg-[#0B122C] border-[#182747] text-white placeholder-neutral-500'
                    }`}
                  />
                  <button
                    type="submit"
                    disabled={!inputText.trim() || isLoading}
                    className="bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:hover:bg-amber-500 text-neutral-950 p-2.5 font-bold transition-colors cursor-pointer"
                    title="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Trigger Button */}
      <motion.button
        onClick={() => {
          setIsOpen(!isOpen);
          setShowNotification(false);
          if (isMinimized) setIsMinimized(false);
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="w-14 h-14 bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-2xl flex items-center justify-center transition-all cursor-pointer relative group rounded-none"
        title="Open Clasqo Live Support Assistant"
      >
        {/* Pulsing ring */}
        <span className="absolute inset-0 bg-amber-500 opacity-25 animate-ping pointer-events-none" style={{ animationDuration: '2.5s' }} />

        {/* Online green indicator badge */}
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-[#080D22] rounded-full flex items-center justify-center text-[8px] font-black text-white">
          ✓
        </span>

        {isOpen ? (
          <X className="w-6 h-6 transform transition-transform group-hover:rotate-90" />
        ) : (
          <div className="relative">
            <Bot className="w-7 h-7 text-neutral-950" />
          </div>
        )}
      </motion.button>
    </div>
  );
}
