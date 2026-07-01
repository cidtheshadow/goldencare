/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { X, Calendar, Clock, MapPin, Phone, CheckCircle, Info } from "lucide-react";
import { Community, TourBooking } from "../types";

interface BookingModalProps {
  community: Community;
  onClose: () => void;
  onSaveBooking: (booking: TourBooking) => void;
}

export default function BookingModal({ community, onClose, onSaveBooking }: BookingModalProps) {
  const [formData, setFormData] = useState({
    date: "",
    timeSlot: "10:00 AM",
    userName: "",
    userEmail: "",
    userPhone: "",
    notes: ""
  });
  const [step, setStep] = useState<"form" | "success">("form");
  const [bookingDetails, setBookingDetails] = useState<TourBooking | null>(null);

  const timeSlots = ["9:00 AM", "10:30 AM", "1:00 PM", "2:30 PM", "4:00 PM"];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleTimeSelect = (time: string) => {
    setFormData({
      ...formData,
      timeSlot: time
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newBooking: TourBooking = {
      id: "bk-" + Math.random().toString(36).substr(2, 9),
      communityId: community.id,
      communityName: community.name,
      date: formData.date,
      timeSlot: formData.timeSlot,
      userName: formData.userName,
      userEmail: formData.userEmail,
      userPhone: formData.userPhone,
      notes: formData.notes,
      status: 'confirmed'
    };

    setBookingDetails(newBooking);
    onSaveBooking(newBooking);
    setStep("success");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-[#FAF6EE] rounded-[2rem] shadow-2xl border border-[#E7DFD4]/80 w-full max-w-lg overflow-hidden my-8 transform transition-all animate-scale-up">
        
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-[#E7DFD4]/50 flex justify-between items-center bg-[#E3ECE1]/35">
          <div>
            <span className="text-[10px] font-mono font-bold tracking-wider text-[#6D7A56] uppercase">Schedule Tour</span>
            <h3 className="font-serif text-lg font-bold text-[#2D3325] leading-tight">
              {community.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#5C6450] hover:bg-[#E7DFD4]/50 rounded-full transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === "form" ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-5 text-left">
            
            {/* Quick Details Alert */}
            <div className="bg-[#FAF6EE] p-3.5 rounded-xl border border-[#E7DFD4] flex items-start gap-2.5">
              <Info className="w-4 h-4 text-[#6D7A56] shrink-0 mt-0.5" />
              <div className="text-xs text-[#5C6450] leading-relaxed">
                <span className="font-semibold text-[#2D3325]">Free Advisory Match:</span> Book with GoldenCare, and a complimentary care advisor will join you to assist with questions and negotiation.
              </div>
            </div>

            {/* Date Picker */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-[#6D7A56] uppercase tracking-wide">
                1. Select Date
              </label>
              <div className="relative flex items-center">
                <Calendar className="absolute left-3.5 w-4 h-4 text-[#6D7A56] pointer-events-none" />
                <input
                  type="date"
                  name="date"
                  required
                  min={new Date().toISOString().split("T")[0]}
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-[#E7DFD4] rounded-xl pl-11 pr-4 py-3 text-sm text-[#2D3325] focus:outline-none focus:border-[#6D7A56] cursor-pointer"
                />
              </div>
            </div>

            {/* Time Slots */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-[#6D7A56] uppercase tracking-wide">
                2. Select Time Slot
              </label>
              <div className="flex flex-wrap gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => handleTimeSelect(time)}
                    className={`text-xs px-3.5 py-2 rounded-lg font-medium transition-all border cursor-pointer ${
                      formData.timeSlot === time
                        ? "bg-[#5A6844] text-[#FAF6EE] border-[#5A6844]"
                        : "bg-white text-[#5C6450] border-[#E7DFD4] hover:bg-[#6D7A56]/5"
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5 inline mr-1.5 shrink-0" />
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* User Details */}
            <div className="space-y-3.5">
              <label className="text-xs font-mono font-bold text-[#6D7A56] uppercase tracking-wide block">
                3. Your Information
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <input
                    type="text"
                    name="userName"
                    required
                    placeholder="Your Full Name"
                    value={formData.userName}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-[#E7DFD4] rounded-xl px-4 py-2.5 text-sm text-[#2D3325] focus:outline-none focus:border-[#6D7A56]"
                  />
                </div>
                <div className="space-y-1">
                  <input
                    type="tel"
                    name="userPhone"
                    required
                    placeholder="Phone Number"
                    value={formData.userPhone}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-[#E7DFD4] rounded-xl px-4 py-2.5 text-sm text-[#2D3325] focus:outline-none focus:border-[#6D7A56]"
                  />
                </div>
              </div>

              <div>
                <input
                  type="email"
                  name="userEmail"
                  required
                  placeholder="Email Address"
                  value={formData.userEmail}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-[#E7DFD4] rounded-xl px-4 py-2.5 text-sm text-[#2D3325] focus:outline-none focus:border-[#6D7A56]"
                />
              </div>

              <div>
                <textarea
                  name="notes"
                  rows={2}
                  placeholder="Special requests or care requirements (optional)..."
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-[#E7DFD4] rounded-xl px-4 py-2.5 text-sm text-[#2D3325] focus:outline-none focus:border-[#6D7A56]"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 border-t border-[#E7DFD4]/50 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 border border-[#E7DFD4] text-[#5C6450] py-3 rounded-xl text-sm font-semibold hover:bg-black/5 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-[#5A6844] text-[#FAF6EE] py-3 rounded-xl text-sm font-semibold hover:bg-[#485435] transition-all cursor-pointer shadow-sm text-center"
              >
                Confirm Tour
              </button>
            </div>

          </form>
        ) : (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#E3ECE1] flex items-center justify-center text-[#5A6844] mx-auto shadow-sm">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h4 className="font-serif text-2xl font-bold text-[#2D3325]">
                Tour Confirmed!
              </h4>
              <p className="text-sm text-[#5C6450] leading-relaxed max-w-md mx-auto">
                Thank you, <span className="font-semibold text-[#2D3325]">{bookingDetails?.userName}</span>. Your private tour of <span className="font-semibold text-[#2D3325]">{community.name}</span> has been locked in.
              </p>
            </div>

            {/* Tour card summaries */}
            <div className="bg-[#E3ECE1]/40 rounded-2xl p-4 border border-[#D1E0CE]/45 text-left text-sm space-y-2.5 max-w-sm mx-auto">
              <div className="flex items-center gap-2 text-[#2D3325] font-medium">
                <Calendar className="w-4 h-4 text-[#5A6844]" />
                <span>{bookingDetails?.date} at {bookingDetails?.timeSlot}</span>
              </div>
              <div className="flex items-start gap-2 text-[#5C6450]">
                <MapPin className="w-4 h-4 text-[#5A6844] shrink-0 mt-0.5" />
                <span>{community.address}, {community.city}</span>
              </div>
              <div className="flex items-center gap-2 text-[#5C6450]">
                <Phone className="w-4 h-4 text-[#5A6844]" />
                <span>{community.phone} (Front Desk)</span>
              </div>
            </div>

            <p className="text-xs text-[#8F9884] leading-relaxed max-w-sm mx-auto">
              A calendar invite and preparation checklist has been emailed to <span className="text-[#5C6450] font-medium">{bookingDetails?.userEmail}</span>. Sarah, your senior care concierge, will reach out shortly to coordinate your arrival.
            </p>

            <div className="pt-2">
              <button
                onClick={onClose}
                className="w-full bg-[#5A6844] text-[#FAF6EE] py-3 rounded-xl text-sm font-semibold hover:bg-[#485435] transition-all cursor-pointer shadow-sm text-center"
              >
                Close Window
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
