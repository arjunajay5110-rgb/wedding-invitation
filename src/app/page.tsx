"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LoadingScreen } from "@/components/LoadingScreen";
import { CountdownTimer } from "@/components/CountdownTimer";
import { MusicPlayer } from "@/components/MusicPlayer";
import { PhotoGallery } from "@/components/PhotoGallery";
import { VenueSection } from "@/components/VenueSection";
import { ShareButton } from "@/components/ShareButton";
import { GoldShower } from "@/components/GoldShower";
import { KasavuBorder, JasmineGarland, LotusDivider, KeralaElephant } from "@/components/KeralaDecorations";
import { weddingConfig } from "@/config/weddingConfig";
import { Clock, MapPin, Phone, ArrowLeft, Info } from "lucide-react";

type FlowStep = "invite" | "details";

const uiTranslations = {
  en: {
    greeting: "Dear Family and Friends,",
    viewDetails: "View Wedding Details",
    backLink: "← Back to Invitation",
    countdownTitle: "Counting Down to the Big Day",
    venueTitle: "Venue & Locations",
    galleryTitle: "Glimpses of Love",
    contactTitle: "Contact Information",
    relationBrideFather: "Father of the Bride",
    relationGroomFather: "Father of the Groom",
    timeLabel: "Time",
    timeSuffix: "onwards",
  },
  ml: {
    greeting: "പ്രിയപ്പെട്ട കുടുംബാംഗങ്ങളെ സുഹൃത്തുക്കളെ,",
    viewDetails: "വിവാഹ വിവരങ്ങൾ കാണുക",
    backLink: "← ക്ഷണക്കത്തിലേക്ക് മടങ്ങുക",
    countdownTitle: "വിവാഹദിനത്തിലേക്കുള്ള കൗണ്ട്ഡൗൺ",
    venueTitle: "വേദിയും പ്രധാന സ്ഥലങ്ങളും",
    galleryTitle: "മനോഹര നിമിഷങ്ങൾ",
    contactTitle: "ബന്ധപ്പെടേണ്ട നമ്പറുകൾ",
    relationBrideFather: "വധുവിന്റെ പിതാവ്",
    relationGroomFather: "വരന്റെ പിതാവ്",
    timeLabel: "സമയം",
    timeSuffix: "മുതൽ",
  }
};

export default function GenericInvitationPage() {
  const [showLoader, setShowLoader] = useState(true);
  const [step, setStep] = useState<FlowStep>("invite");
  const [lang, setLang] = useState<"en" | "ml">("en");

  const handleLoaderComplete = () => {
    setShowLoader(false);
  };

  React.useEffect(() => {
    if (!showLoader) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [step, showLoader]);

  const t = uiTranslations[lang];

  // Prominent date formatting
  const localizedDay = lang === "en" ? "SUNDAY" : "ഞായറാഴ്ച";
  const localizedMonthDay = lang === "en" ? "SEPTEMBER 13" : "സെപ്റ്റംബർ 13";
  const localizedYear = "2026";

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#1E3F20] flex flex-col items-center justify-between pb-12 relative overflow-x-hidden">
      {showLoader ? (
        <LoadingScreen onComplete={handleLoaderComplete} />
      ) : (
        <>
          {/* Gold Shower Transition Particle Effect */}
          <GoldShower trigger={step} />

          {/* Top Border */}
          <KasavuBorder position="top" className="fixed top-0 left-0 z-30" />

          {/* Floating Language Switcher Container (Aligned with max-w-lg content frame) */}
          <div className="fixed inset-x-0 top-0 pointer-events-none z-40 flex justify-center">
            <div className="w-full max-w-lg relative h-[96px]">
              <div className="absolute top-16 right-6 sm:top-6 sm:right-6 pointer-events-auto">
                <button
                  onClick={() => setLang(lang === "en" ? "ml" : "en")}
                  className="px-3.5 py-1.5 bg-white/85 backdrop-blur-md border border-[#C5A059]/40 rounded-full text-xs font-bold text-[#1E3F20] shadow-md transition-all hover:bg-white active:scale-95"
                >
                  {lang === "en" ? "മലയാളം" : "English"}
                </button>
              </div>
            </div>
          </div>

          {/* Decorative Jasmine Garlands */}
          <JasmineGarland className="absolute top-2 left-0 right-0 z-10 opacity-70" />

          {/* Main Container */}
          <div className="w-full max-w-lg px-6 pt-24 pb-8 flex-grow flex flex-col justify-start gap-8 relative z-20">
            <AnimatePresence mode="wait">
          {step === "invite" && (
            <motion.div
              key="invite-step"
              initial={{ opacity: 0, scale: 0.97, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.03, y: -8 }}
              transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
              className="flex flex-col items-center text-center gap-6"
            >
              {/* Kerala Festival Elephant Motif */}
              <KeralaElephant className="mb-1" />

              {/* Greeting */}
              <p className="font-serif text-md md:text-lg text-[#C5A059] italic font-semibold tracking-wide">
                {t.greeting}
              </p>

              {/* Invitation Card */}
              <div className="bg-white/65 backdrop-blur-md border border-[#C5A059]/30 rounded-3xl p-6 md:p-8 shadow-xl shadow-[#1E3F20]/5 w-full relative">
                {/* Double Border Accent */}
                <div className="absolute inset-3 border border-double border-[#C5A059]/20 rounded-2xl pointer-events-none" />

                {/* 1. Bride & Groom names (Primary Focus) */}
                <div className="flex flex-col gap-4 mt-2">
                  {/* Bride Details */}
                  <div className="flex flex-col gap-1.5">
                    <h1 className="font-serif text-3.5xl md:text-4xl font-extrabold text-[#1E3F20] tracking-wide leading-none">
                      {weddingConfig.brideName[lang]}
                    </h1>
                    {/* Parents: Increased size by 25%, slightly bolder, solid contrast, placed directly below */}
                    <p className="text-[14px] md:text-[15px] font-semibold text-[#1E3F20] italic leading-relaxed">
                      {lang === "en"
                        ? `Daughter of Mrs. ${weddingConfig.brideParents.mother.en} & Mr. ${weddingConfig.brideParents.father.en}`
                        : `ശ്രീമതി ${weddingConfig.brideParents.mother.ml} & ശ്രീ ${weddingConfig.brideParents.father.ml} എന്നിവരുടെ മകൾ`}
                      {/* Increased bride address size to text-xs md:text-sm, dark contrast, medium weight */}
                      <span className="text-xs md:text-sm text-[#1E3F20]/75 font-sans not-italic font-semibold block mt-1">
                        ({weddingConfig.brideResidenceName[lang]}, {weddingConfig.brideResidenceAddress[lang]})
                      </span>
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="flex items-center justify-center gap-3 py-1">
                    <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#C5A059]" />
                    <span className="font-serif text-[#C5A059] italic text-lg font-extrabold">
                      {lang === "en" ? "and" : "വിവാഹിതരാകുന്നു"}
                    </span>
                    <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#C5A059]" />
                  </div>

                  {/* Groom Details */}
                  <div className="flex flex-col gap-1.5">
                    <h1 className="font-serif text-3.5xl md:text-4xl font-extrabold text-[#1E3F20] tracking-wide leading-none">
                      {weddingConfig.groomName[lang]}
                    </h1>
                    {/* Parents: Increased size by 25%, slightly bolder, solid contrast, placed directly below */}
                    <p className="text-[14px] md:text-[15px] font-semibold text-[#1E3F20] italic leading-relaxed">
                      {lang === "en"
                        ? `Son of Mrs. ${weddingConfig.groomParents.mother.en} & Mr. ${weddingConfig.groomParents.father.en}`
                        : `ശ്രീമതി ${weddingConfig.groomParents.mother.ml} & ശ്രീ ${weddingConfig.groomParents.father.ml} എന്നിവരുടെ മകൻ`}
                      {/* Increased groom address size to text-xs md:text-sm, dark contrast, medium weight */}
                      <span className="text-xs md:text-sm text-[#1E3F20]/75 font-sans not-italic font-semibold block mt-1">
                        ({weddingConfig.groomResidenceAddress[lang]})
                      </span>
                    </p>
                  </div>
                </div>

                {/* 2. Invitation Message Paragraph (Restored below couple names, above date) */}
                <p className="font-serif text-sm md:text-[15px] text-center leading-relaxed text-[#1E3F20]/90 mt-5 mb-2 px-2 max-w-sm mx-auto">
                  {weddingConfig.invitationMessage[lang]}
                </p>

                <LotusDivider className="my-5" />

                {/* 3. Wedding Date (Maintained current size & prominence) */}
                <div className="flex flex-col items-center gap-1.5 mb-1.5">
                  <div className="flex items-center gap-3 py-1 px-4 border-y border-[#C5A059]/30 font-serif text-[#C5A059] font-bold">
                    <span className="text-xs md:text-sm tracking-wider">{localizedDay}</span>
                    <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full" />
                    <span className="text-xl md:text-2xl tracking-widest text-[#1E3F20] font-black">{localizedMonthDay}</span>
                    <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full" />
                    <span className="text-xs md:text-sm tracking-wider">{localizedYear}</span>
                  </div>
                </div>

                {/* 4. Muhurtham / Wedding Time (Increased size by 40%, bolder, clock icon, gold accent, above the fold) */}
                <div className="flex items-center justify-center gap-2 text-base md:text-lg font-black text-[#C5A059] tracking-wide mb-5">
                  <Clock className="w-5 h-5 text-[#C5A059] stroke-[2.5]" />
                  <span>{weddingConfig.weddingTimeRange[lang]}</span>
                </div>

                {/* 5. Venue Name & Location (Restructured for increased readability, size, and spacing) */}
                <div className="flex flex-col items-center gap-1.5 pt-1.5 border-t border-[#C5A059]/10">
                  <span className="text-[10px] font-extrabold tracking-widest text-[#C5A059] uppercase">
                    {lang === "en" ? "VENUE" : "വേദി"}
                  </span>
                  <span className="font-serif text-base font-bold text-[#1E3F20] leading-snug">
                    {weddingConfig.venueName[lang]}
                  </span>
                  {/* Increased Venue Address Font Size to text-sm md:text-base */}
                  <span className="text-sm md:text-base text-[#1E3F20]/80 leading-relaxed max-w-xs">
                    {weddingConfig.venueAddress[lang]}
                  </span>
                </div>
              </div>

              {/* 5. Countdown Timer (Increased size/spacing, Outline boxes/cards, PLACED ABOVE THE BUTTON) */}
              <div className="w-full flex flex-col items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C5A059] mb-1">
                  {t.countdownTitle}
                </span>
                <CountdownTimer
                  targetDate={weddingConfig.weddingDate}
                  lang={lang}
                />
              </div>

              {/* 6. Single Button: View Wedding Details (Maintained same design/button style) */}
              <button
                onClick={() => setStep("details")}
                className="w-full max-w-sm py-3.5 bg-[#1E3F20] hover:bg-[#2e5f31] text-white border border-[#C5A059]/40 rounded-xl text-sm font-bold tracking-wider uppercase transition-colors duration-200 shadow-md shadow-[#1E3F20]/15 flex items-center justify-center gap-2 mt-2"
              >
                <Info className="w-4 h-4 text-[#C5A059]" />
                {t.viewDetails}
              </button>
            </motion.div>
          )}

          {step === "details" && (
            <motion.div
              key="details-step"
              initial={{ opacity: 0, scale: 0.97, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.03, y: -8 }}
              transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
              className="flex flex-col gap-6 w-full pb-28"
            >
              {/* Venue & Residence details (consistent address, Google Maps button) */}
              <VenueSection lang={lang} />

              {/* Photo Gallery */}
              <div className="flex flex-col gap-2">
                <h3 className="font-serif text-xl font-bold text-center text-[#1E3F20]">
                  {t.galleryTitle}
                </h3>
                <LotusDivider />
                <PhotoGallery />
              </div>

              {/* Elegant Closing Message */}
              <div className="flex flex-col items-center text-center px-4 py-1.5 mt-2 max-w-sm mx-auto gap-2">
                <p className="font-serif text-[15px] sm:text-base text-[#1E3F20] italic font-semibold leading-relaxed">
                  {lang === "en"
                    ? "Your presence and blessings will make our celebration truly special."
                    : "നിങ്ങളുടെ സാന്നിധ്യവും അനുഗ്രഹങ്ങളും ഞങ്ങളുടെ ആഘോഷത്തെ കൂടുതൽ ധന്യമാക്കും."}
                </p>
                <div className="flex flex-col items-center mt-1.5">
                  <span className="font-serif text-xs sm:text-sm text-[#C5A059] italic font-bold">
                    {lang === "en" ? "With Love," : "സ്നേഹത്തോടെ,"}
                  </span>
                  <span className="font-serif text-sm sm:text-base text-[#1E3F20] font-extrabold tracking-wide mt-0.5">
                    {lang === "en" ? "Keerthana & Sreerag" : "കീർത്തന & ശ്രീരാഗ്"}
                  </span>
                </div>
                <div className="w-1.5 h-1.5 bg-[#C5A059]/50 rounded-full mt-2" />
              </div>

              {/* Bottom Back Button */}
              <button
                onClick={() => setStep("invite")}
                className="py-2.5 px-4 bg-[#FDFBF7] hover:bg-white text-[#1E3F20] border border-[#C5A059]/40 rounded-xl text-xs font-bold tracking-wider uppercase transition-colors duration-200 text-center flex items-center justify-center gap-1.5 self-center mt-4 relative z-50 pointer-events-auto cursor-pointer"
              >
                <ArrowLeft size={12} />
                {t.backLink}
              </button>

              {/* Developer Signature Credit Footer with elegant Pop, Slide & Fade In-View Animation */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-10px" }}
                transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }} // bouncy pop feel
                className="flex flex-col items-center justify-center mt-8 mb-2 select-none font-sans relative z-30"
              >
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#1E3F20]/50 font-bold">
                  MADE WITH
                </span>
                
                {/* Custom cursive path with exact left-tilted red heart matching the reference image */}
                <svg width="220" height="65" viewBox="0 0 220 65" className="my-1 pointer-events-none">
                  {/* Cursive 'l' and connection to the heart */}
                  <path
                    d="M 20,42 C 45,42 60,42 70,35 C 80,24 88,8 90,6 C 92,4 90,4 85,14 C 77,30 73,43 83,43 C 90,43 95,36 99,30"
                    fill="none"
                    stroke="#1E3F20"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  {/* Cursive 'v', 'e' and exit tail */}
                  <path
                    d="M 116,26 C 122,26 125,20 128,20 C 131,20 131,33 137,33 C 142,33 144,22 149,22 C 152,22 152,32 158,32 C 162,32 170,35 195,35"
                    fill="none"
                    stroke="#1E3F20"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  {/* Perfect left-tilted heart for 'o' */}
                  <g transform="translate(97, 18) rotate(-10)">
                    <path
                      d="M 10,4 C 8,-1 1,-1 1,6 C 1,11 5,15 10,20 C 15,15 19,11 19,6 C 19,-1 12,-1 10,4 Z"
                      fill="#E11D48"
                      stroke="#1E3F20"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>

                <span className="text-[11px] sm:text-xs text-[#1E3F20]/70 font-medium tracking-wide flex items-center gap-1">
                  Designed by{" "}
                  <a
                    href="https://www.instagram.com/a.rjunajay"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#1E3F20] tracking-wide hover:text-[#C5A059] hover:underline cursor-pointer pointer-events-auto"
                  >
                    @Sachu Mon
                  </a>{" "}
                  😊
                </span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Kasavu Footer */}
      <KasavuBorder position="bottom" className="fixed bottom-0 left-0 z-30" />
        </>
      )}

      {/* Floating Music BGM Player (Always mounted, controls fade in after loader is gone) */}
      <MusicPlayer showControls={!showLoader} />
    </main>
  );
}
