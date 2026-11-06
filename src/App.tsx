import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { HeadlineSection } from './components/HeadlineSection';
import { SideCards } from './components/SideCards';
import { Decorations } from './components/Decorations';
import { ThreeScene } from './components/ThreeScene';
import { X, Check, Sparkles } from 'lucide-react';

export default function App() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [appModalOpen, setAppModalOpen] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setEmailSubmitted(true);
    }
  };

  return (
    <main className="relative w-full h-screen min-h-[720px] mindly-ambient-bg flex flex-col justify-between overflow-hidden select-none">
      {/* 1. Header Navigation */}
      <header className="relative z-30 w-full shrink-0">
        <Navigation onGetAppClick={() => setAppModalOpen(true)} />
      </header>

      {/* 2. Main Hero Section Canvas */}
      <section className="relative z-20 flex-1 flex flex-col justify-between w-full overflow-hidden">
        {/* Headline & CTAs */}
        <div className="w-full shrink-0">
          <HeadlineSection
            onGetStarted={() => setAppModalOpen(true)}
            onWatchVideo={() => setVideoModalOpen(true)}
          />
        </div>

        {/* Central 3D Visual Experience anchored to bottom */}
        <div className="relative w-full flex-1 -mt-8 sm:-mt-12 md:-mt-14 flex items-end justify-center overflow-visible">
          <ThreeScene />
        </div>

        {/* Side Floating Information Cards with Hairline Connectors */}
        <SideCards />

        {/* Editorial Decorative Details & Badges */}
        <Decorations />
      </section>

      {/* --- VIDEO PREVIEW MODAL --- */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#111111] text-white rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            <div className="flex items-center justify-between p-5 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-semibold tracking-wide">Mindly Product Tour</span>
              </div>
              <button
                onClick={() => setVideoModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-video bg-neutral-900 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-4">
                <div className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[14px] border-l-white translate-x-0.5" />
              </div>
              <h3 className="font-editorial text-2xl font-light">Experience the Calm</h3>
              <p className="mt-2 text-xs text-white/60 max-w-md">
                Discover how Mindly’s spatial interface, ambient audio cues, and seamless device syncing create the ultimate focus sanctuary.
              </p>
            </div>

            <div className="p-4 bg-white/[0.03] flex items-center justify-between text-xs text-white/50">
              <span>Mindly Desktop & Mobile v2.4</span>
              <button
                onClick={() => {
                  setVideoModalOpen(false);
                  setAppModalOpen(true);
                }}
                className="px-4 py-1.5 rounded-full bg-white text-black font-medium hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                Try Mindly Free
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- GET THE APP / ONBOARDING MODAL --- */}
      {appModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-[#FAF9F6] text-[#111111] rounded-[28px] p-6 sm:p-8 shadow-2xl border border-black/10">
            <button
              onClick={() => {
                setAppModalOpen(false);
                setEmailSubmitted(false);
              }}
              className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-black/5 text-neutral-500 hover:text-black transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {!emailSubmitted ? (
              <div>
                <span className="text-[11px] font-semibold tracking-wider uppercase text-neutral-500">
                  Early Access
                </span>
                <h3 className="font-editorial text-3xl font-normal mt-1 leading-tight">
                  Start your clearer mind journey.
                </h3>
                <p className="mt-2 text-xs text-[#7A7670] leading-relaxed">
                  Join 50,000+ creators who use Mindly to declutter their thoughts, spark breakthroughs, and maintain effortless deep work.
                </p>

                <form onSubmit={handleEmailSubmit} className="mt-6 flex flex-col gap-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your work email"
                    className="w-full px-4 py-3 rounded-full bg-white border border-black/10 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
                  />
                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-[#111111] hover:bg-black text-white text-sm font-semibold transition-transform active:scale-[0.98] cursor-pointer"
                  >
                    Get Instant Access
                  </button>
                </form>

                <div className="mt-4 flex items-center justify-center gap-4 text-[11px] text-neutral-400">
                  <span>No credit card required</span>
                  <span>•</span>
                  <span>14-day free trial</span>
                </div>
              </div>
            ) : (
              <div className="py-6 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-editorial text-2xl font-normal">Welcome to Mindly</h3>
                <p className="mt-2 text-xs text-neutral-600">
                  We've sent an invitation link to <strong className="text-black">{email}</strong>. Check your inbox to begin!
                </p>
                <button
                  onClick={() => {
                    setAppModalOpen(false);
                    setEmailSubmitted(false);
                    setEmail('');
                  }}
                  className="mt-6 px-6 py-2.5 rounded-full bg-[#111111] text-white text-xs font-semibold cursor-pointer"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
