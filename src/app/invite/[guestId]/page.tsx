"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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
import { Clock, MapPin, Phone, ArrowLeft, Info, AlertTriangle, Home } from "lucide-react";
import { Guest } from "@/config/weddingConfig";

type FlowStep = "invite" | "details";

const uiTranslations = {
  en: {
    title: "We Invite You to Celebrate",
    countdownTitle: "Counting Down to the Big Day",
    viewDetails: "View Wedding Details",
    backLink: "← Back to Invitation",
    venueTitle: "Venue & Locations",
    galleryTitle: "Glimpses of Love",
    contactTitle: "Contact Information",
    errorTitle: "Invitation Link Not Found",
    errorText: "We couldn't find a guest matching this invitation link. It might be misspelled or expired. Please check the link or proceed to our general invitation page.",
    generalInviteButton: "General Invitation",
    relationBrideFather: "Father of the Bride",
    relationGroomFather: "Father of the Groom",
    timeLabel: "Time",
    timeSuffix: "onwards",
  },
  ml: {
    title: "ഞങ്ങളുടെ വിവാഹമംഗളത്തിലേക്ക് സ്വാഗതം",
    countdownTitle: "വിവാഹദിനത്തിലേക്കുള്ള കൗണ്ട്ഡൗൺ",
    viewDetails: "വിവാഹ വിവരങ്ങൾ കാണുക",
    backLink: "← ക്ഷണക്കത്തിലേക്ക് മടങ്ങുക",
    venueTitle: "വേദിയും പ്രധാന സ്ഥലങ്ങളും",
    galleryTitle: "മനോഹര നിമിഷങ്ങൾ",
    contactTitle: "ബന്ധപ്പെടേണ്ട നമ്പറുകൾ",
    errorTitle: "ക്ഷണക്കത്ത് ലിങ്ക് ലഭ്യല്ല",
    errorText: "ഈ ലിങ്കിലുള്ള അതിഥിയെ ഞങ്ങളുടെ ഡാറ്റാബേസിൽ കണ്ടെത്താൻ കഴിഞ്ഞില്ല. ദയവായി ലിങ്ക് പരിശോധിക്കുക അല്ലെങ്കിൽ പൊതുവായ ക്ഷണക്കത്തിലേക്ക് പോകുക.",
    generalInviteButton: "പൊതുവായ ക്ഷണക്കത്ത്",
    relationBrideFather: "വധുവിന്റെ പിതാവ്",
    relationGroomFather: "വരന്റെ പിതാവ്",
    timeLabel: "സമയം",
    timeSuffix: "മുതൽ",
  }
};

export default function PersonalizedInvitationPage() {
  const params = useParams();
  const router = useRouter();
  const guestId = params?.guestId as string;

  const [loadingScreenActive, setLoadingScreenActive] = useState(true);
  const [dbLoading, setDbLoading] = useState(true);
  const [guest, setGuest] = useState<Guest | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [step, setStep] = useState<FlowStep>("invite");
  const [lang, setLang] = useState<"en" | "ml">("en");

  // Fetch Guest Info on mount
  useEffect(() => {
    if (!guestId) return;

    const fetchGuest = async () => {
      try {
        setDbLoading(true);
        const response = await fetch(`/api/guest/${guestId}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Invalid Invitation Link");
          }
          throw new Error("Failed to load invitation details");
        }
        const data: Guest = await response.json();
        setGuest(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Something went wrong.");
      } finally {
        setDbLoading(false);
      }
    };

    fetchGuest();
  }, [guestId]);

  const handleLoaderComplete = () => {
    setLoadingScreenActive(false);
  };

  // Wait until both the 2-second loading screen animation AND database fetch complete
  const isCurrentlyLoading = loadingScreenActive || dbLoading;

  const t = uiTranslations[lang];

  // Localized Personalized Greeting
  const personalizedGreeting = guest
    ? (lang === "en"
      ? (guest.guestName.en.toLowerCase().includes("family")
        ? `Dear ${guest.guestName.en},`
        : `Dear ${guest.guestName.en} & Family,`)
      : `പ്രിയപ്പെട്ട ${guest.guestName.ml} കൂടാതെ കുടുംബാംഗങ്ങൾക്കും,`)
    : "";

  const localizedDay = lang === "en" ? "SUNDAY" : "ഞായറാഴ്ച";
  const localizedMonthDay = lang === "en" ? "SEPTEMBER 13" : "സെപ്റ്റംബർ 13";
  const localizedYear = "2026";

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#1E3F20] flex flex-col items-center justify-between pb-12 relative overflow-x-hidden">
      {isCurrentlyLoading ? (
        <LoadingScreen onComplete={handleLoaderComplete} />
      ) : error || !guest ? (
        <>
          <KasavuBorder position="top" className="fixed top-0 left-0 z-30" />
          <JasmineGarland className="absolute top-2 left-0 right-0 z-10 opacity-70" />

          {/* Floating Language Switcher Container (Aligned with max-w-lg content frame) */}
          <div className="fixed inset-x-0 top-0 pointer-events-none z-40 flex justify-center">
            <div className="w-full max-w-lg relative h-[96px]">
              <div className="absolute top-16 right-6 sm:top-6 sm:right-6 pointer-events-auto">
                <button
                  onClick={() => setLang(lang === "en" ? "ml" : "en")}
                  className="px-3.5 py-1.5 bg-white/85 backdrop-blur-md border border-[#C5A059]/40 rounded-full text-xs font-bold text-[#1E3F20] shadow-md transition-all hover:bg-white"
                >
                  {lang === "en" ? "മലയാളം" : "English"}
                </button>
              </div>
            </div>
          </div>

          <div className="w-full max-w-md px-6 pt-32 pb-8 flex-grow flex flex-col justify-center items-center text-center gap-6 z-20">
            <div className="w-16 h-16 rounded-full bg-red-50 border border-red-200 text-red-600 flex items-center justify-center mb-2">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <h2 className="font-serif text-2xl font-bold text-[#1E3F20]">
              {t.errorTitle}
            </h2>

            <p className="text-sm text-[#1E3F20]/70 leading-relaxed max-w-sm">
              {t.errorText}
            </p>

            <LotusDivider />

            <button
              onClick={() => router.push("/")}
              className="w-full py-3 bg-[#1E3F20] hover:bg-[#2e5f31] text-white rounded-xl text-sm font-bold tracking-wider uppercase transition-colors duration-200 flex items-center justify-center gap-2 shadow-md shadow-[#1E3F20]/10"
            >
              <Home className="w-4 h-4" />
              {t.generalInviteButton}
            </button>
          </div>

          <KasavuBorder position="bottom" className="fixed bottom-0 left-0 z-30" />
        </>
      ) : (
        <>
          {/* Gold Shower Transition Particle Effect */}
          <GoldShower trigger={step} />

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
              <KeralaElephant className="mb-1" />

              {/* Greeting */}
              <p className="font-serif text-md md:text-lg text-[#C5A059] italic font-semibold tracking-wide px-4 leading-relaxed">
                {personalizedGreeting}
              </p>

              {/* Invitation Card */}
              <div className="bg-white/65 backdrop-blur-md border border-[#C5A059]/30 rounded-3xl p-6 md:p-8 shadow-xl shadow-[#1E3F20]/5 w-full relative">
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

                {/* 2. Invitation Message Paragraph */}
                <p className="font-serif text-sm md:text-[15px] text-center leading-relaxed text-[#1E3F20]/90 mt-5 mb-2 px-2 max-w-sm mx-auto">
                  {weddingConfig.invitationMessage[lang]}
                </p>

                <LotusDivider className="my-5" />

                {/* 3. Wedding Date */}
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

                {/* 5. Venue Name & Location */}
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

              {/* 5. Countdown Timer */}
              <div className="w-full flex flex-col items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C5A059] mb-1">
                  {t.countdownTitle}
                </span>
                <CountdownTimer
                  targetDate={weddingConfig.weddingDate}
                  lang={lang}
                />
              </div>

              {/* 6. Single Button: View Wedding Details */}
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

              {/* Share Invitation */}
              <ShareButton
                customUrl={`/invite/${guest.guestId}`}
                title="Wedding Invitation"
                text={`You are invited to Keerthana & Sreerag's wedding!`}
              />

              {/* Bottom Back Button */}
              <button
                onClick={() => setStep("invite")}
                className="py-2.5 px-4 bg-[#FDFBF7] hover:bg-white text-[#1E3F20] border border-[#C5A059]/40 rounded-xl text-xs font-bold tracking-wider uppercase transition-colors duration-200 text-center flex items-center justify-center gap-1.5 self-center mt-4 relative z-50 pointer-events-auto cursor-pointer"
              >
                <ArrowLeft size={12} />
                {t.backLink}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <KasavuBorder position="bottom" className="fixed bottom-0 left-0 z-30" />
        </>
      )}

      {/* Floating Music BGM Player (Always mounted, controls fade in after loader is gone and no error page is shown) */}
      <MusicPlayer showControls={!isCurrentlyLoading && !error && guest !== null} />
    </main>
  );
}
