'use client';

import { Sparkles, BookOpen, GraduationCap } from 'lucide-react';

export default function Header() {
  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-[#1A2B4A] via-[#2D4266] to-[#1A2B4A]">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#E85D4C] rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#E8A838] rounded-full blur-[100px] translate-x-1/3 translate-y-1/3" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#5B8F6B] rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Logo */}
          <div className="animate-fade-in-up">
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-[#E85D4C] rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />

              {/* Logo container */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#E85D4C] to-[#C94A3B] flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                <span className="text-white font-bold text-xl sm:text-2xl font-[family-name:var(--font-display)] tracking-tight">
                  ETD
                </span>

                {/* Decorative corner */}
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#E8A838] rounded-full animate-float" />
              </div>
            </div>
          </div>

          {/* Title and description */}
          <div className="flex-1 animate-fade-in-up delay-100">
            {/* Eyebrow text */}
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#E8A838]" />
              <span className="text-xs sm:text-sm font-medium text-[#E8A838] font-[family-name:var(--font-display)] uppercase tracking-wider">
                Singapore Schools
              </span>
            </div>

            {/* Main title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-[family-name:var(--font-display)] leading-tight">
              EdTech{' '}
              <span className="relative">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A6B] via-[#E85D4C] to-[#E8A838]">
                  Marketplace
                </span>
                {/* Underline decoration */}
                <svg className="absolute -bottom-1 left-0 w-full h-3 text-[#E85D4C]/30" viewBox="0 0 200 12" preserveAspectRatio="none">
                  <path d="M0,8 Q50,0 100,8 T200,8" stroke="currentColor" strokeWidth="4" fill="none" />
                </svg>
              </span>
            </h1>

            {/* Description */}
            <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Explore and discover innovative{' '}
              <span className="text-white font-medium">EdTech practices</span>{' '}
              from across the fraternity, supporting your digital transformation journey.
            </p>
          </div>

          {/* Floating stat cards */}
          <div className="hidden lg:flex flex-col gap-3 animate-slide-right delay-200">
            <div className="glass rounded-xl px-4 py-3 flex items-center gap-3 hover-lift cursor-default">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#10B981]/20 to-[#10B981]/10 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-[#10B981]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white font-[family-name:var(--font-display)]">12+</p>
                <p className="text-xs text-slate-400">Resources</p>
              </div>
            </div>

            <div className="glass rounded-xl px-4 py-3 flex items-center gap-3 hover-lift cursor-default">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#E8A838]/20 to-[#E8A838]/10 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-[#E8A838]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white font-[family-name:var(--font-display)]">11</p>
                <p className="text-xs text-slate-400">Schools</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>
    </header>
  );
}
