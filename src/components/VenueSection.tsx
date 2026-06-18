"use client";

import React from "react";
import { MapPin, Phone, Calendar, Clock, Home } from "lucide-react";
import { weddingConfig } from "@/config/weddingConfig";

interface VenueSectionProps {
  lang?: "en" | "ml";
}

const translations = {
  en: {
    title: "Date & Locations",
    dateLabel: "Date",
    timeLabel: "Time",
    venueLabel: "Wedding Venue",
    residenceLabel: "Bride's Residence",
    mapsVenueButton: "Open Venue in Google Maps",
    mapsResidenceButton: "Open Residence in Google Maps",
    contactTitle: "FOR ASSISTANCE",
    timeSuffix: "onwards",
  },
  ml: {
    title: "തീയതിയും പ്രധാന സ്ഥലങ്ങളും",
    dateLabel: "തീയതി",
    timeLabel: "സമയം",
    venueLabel: "വിവാഹ വേദി",
    residenceLabel: "വധുവിന്റെ ഭവനം",
    mapsVenueButton: "വിവാഹ വേദി ഗൂഗിൾ മാപ്പിൽ കാണുക",
    mapsResidenceButton: "വധുഗൃഹം ഗൂഗിൾ മാപ്പിൽ കാണുക",
    contactTitle: "സഹായത്തിനായി",
    timeSuffix: "മുതൽ",
  }
};

export const VenueSection: React.FC<VenueSectionProps> = ({ lang = "en" }) => {
  const {
    venueName,
    venueAddress,
    googleMapsLink,
    brideResidenceName,
    brideResidenceAddress,
    brideResidenceMapsLink,
    contactNumbers,
    weddingDate,
    weddingTimeRange
  } = weddingConfig;

  const t = translations[lang];

  // Format date for display
  const dateObj = new Date(weddingDate);
  const formattedDate = lang === "en"
    ? dateObj.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "2026 സെപ്റ്റംബർ 13, ഞായറാഴ്ച";

  const formattedTime = weddingTimeRange[lang];

  return (
    <div className="w-full max-w-md mx-auto bg-white/70 backdrop-blur-md border border-[#C5A059]/30 rounded-2xl p-6 md:p-8 shadow-xl shadow-[#1E3F20]/5 relative overflow-hidden flex flex-col gap-6">
      {/* Decorative Top Accent */}
      <div className="absolute top-0 left-0 w-full h-[4px] bg-[#C5A059]" />

      <h3 className="font-serif text-2xl font-semibold text-[#1E3F20] text-center border-b border-[#C5A059]/20 pb-3">
        {t.title}
      </h3>

      {/* Date & Time */}
      <div className="flex gap-4 items-start">
        <div className="p-2.5 bg-[#FDFBF7] border border-[#C5A059]/30 rounded-xl text-[#C5A059] shrink-0">
          <Calendar className="w-5 h-5" />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex justify-between items-center w-full">
            <span className="text-xs font-bold text-[#1E3F20]/60 uppercase tracking-wider">
              {t.dateLabel}
            </span>
            <div className="flex gap-2 text-[10px] font-bold text-[#C5A059]">
              <a
                href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Keerthana+%26+Sreerag%27s+Wedding&dates=20260913T043000Z/20260913T073000Z&details=You+are+cordially+invited+to+celebrate+the+wedding+of+Keerthana+%26+Sreerag+and+grace+the+occasion+with+your+presence+and+blessings.&location=Nanak+Convention+Centre%2C+SH+1%2C+Pandalam%2C+Kerala+689501"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline transition-all cursor-pointer"
              >
                + Google Cal
              </a>
              <span className="opacity-30">|</span>
              <a
                href={`data:text/calendar;charset=utf-8,${encodeURIComponent(
                  [
                    "BEGIN:VCALENDAR",
                    "VERSION:2.0",
                    "BEGIN:VEVENT",
                    "DTSTART:20260913T043000Z",
                    "DTEND:20260913T073000Z",
                    "SUMMARY:Keerthana & Sreerag's Wedding",
                    "DESCRIPTION:You are cordially invited to celebrate the wedding of Keerthana & Sreerag.",
                    "LOCATION:Nanak Convention Centre, SH 1, Pandalam, Kerala 689501",
                    "END:VEVENT",
                    "END:VCALENDAR"
                  ].join("\r\n")
                )}`}
                download="wedding_invitation.ics"
                className="hover:underline transition-all cursor-pointer"
              >
                + Apple / ICS
              </a>
            </div>
          </div>
          <span className="text-sm md:text-base font-bold text-[#1E3F20] mt-0.5">{formattedDate}</span>
        </div>
      </div>

      <div className="flex gap-4 items-start">
        <div className="p-2.5 bg-[#FDFBF7] border border-[#C5A059]/30 rounded-xl text-[#C5A059] shrink-0">
          <Clock className="w-5 h-5" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-bold text-[#1E3F20]/60 uppercase tracking-wider mb-1">
            {t.timeLabel}
          </span>
          <span className="text-sm md:text-base font-bold text-[#1E3F20]">{formattedTime} {t.timeSuffix}</span>
        </div>
      </div>

      <hr className="border-[#C5A059]/20" />

      {/* Section 1: Wedding Venue */}
      <div className="flex gap-4 items-start">
        <div className="p-2.5 bg-[#FDFBF7] border border-[#C5A059]/30 rounded-xl text-[#C5A059] shrink-0">
          <MapPin className="w-5 h-5" />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <div>
            <span className="text-xs font-bold text-[#1E3F20]/60 uppercase tracking-wider block mb-1">
              {t.venueLabel}
            </span>
            <span className="text-base font-extrabold text-[#1E3F20] block leading-snug">
              {venueName[lang]}
            </span>
            {/* Increased Venue Address Font Size to text-sm md:text-base */}
            <span className="text-sm md:text-base text-[#1E3F20]/80 leading-relaxed block mt-1">
              {venueAddress[lang]}
            </span>
          </div>

          <a
            href={googleMapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center py-2.5 px-5 text-white rounded-lg text-xs font-bold tracking-wider uppercase shadow-md mt-1 self-start animate-button-blink"
          >
            {t.mapsVenueButton}
          </a>
        </div>
      </div>



      {/* Contact Details */}
      <div className="border-t border-[#C5A059]/20 pt-5 mt-2">
        <h4 className="text-xs font-extrabold text-[#1E3F20]/70 uppercase tracking-widest text-center mb-4">
          {t.contactTitle}
        </h4>
        <div className="flex flex-col gap-3.5">
          {contactNumbers.map((c, i) => (
            <div
              key={i}
              className="flex justify-between items-center bg-[#FDFBF7]/60 border border-[#C5A059]/15 rounded-xl p-3.5 shadow-sm"
            >
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-[#1E3F20]">{c.name}</span>
                <span className="text-[10px] text-[#C5A059] font-semibold uppercase tracking-wider">
                  {lang === "en"
                    ? c.relation
                    : c.relation === "Bride's Family"
                    ? "വധുവിന്റെ കുടുംബം"
                    : c.relation === "Groom's Family"
                    ? "വരന്റെ കുടുംബം"
                    : c.relation === "Father of the Bride"
                    ? "വധുവിന്റെ പിതാവ്"
                    : c.relation === "Father of the Groom"
                    ? "വരന്റെ പിതാവ്"
                    : c.relation}
                </span>
                <a
                  href={`tel:${c.number.replace(/\s+/g, "")}`}
                  className="flex items-center gap-1.5 text-xs text-[#1E3F20]/80 font-semibold hover:text-[#C5A059] transition-colors mt-0.5"
                >
                  <span>📞</span>
                  <span>{c.number}</span>
                </a>
              </div>
              <a
                href={`tel:${c.number.replace(/\s+/g, "")}`}
                className="p-3 bg-[#1E3F20]/5 hover:bg-[#1E3F20]/10 rounded-full text-[#1E3F20] transition-colors duration-200 shadow-sm shrink-0"
                aria-label={`Call ${c.name}`}
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default VenueSection;
