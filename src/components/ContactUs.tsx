import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, AlertCircle, Loader2, Building } from 'lucide-react';

interface ContactUsProps {
  initialSubject?: string;
}

export const ContactUs: React.FC<ContactUsProps> = ({ initialSubject = '' }) => {
  const [inquiryType, setInquiryType] = useState<'employer' | 'candidate' | 'general'>('employer');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [subject, setSubject] = useState(initialSubject || 'Staffing & Workforce Inquiry');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [confirmationTicket, setConfirmationTicket] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!fullName.trim()) {
      setErrorMsg('Full Name is required.');
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!message.trim() || message.length < 10) {
      setErrorMsg('Please write a message with at least 10 characters.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inquiryType,
          fullName,
          email,
          phone,
          companyName,
          subject,
          message
        })
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit inquiry.');
      }

      setConfirmationTicket(data.ticketId);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An error occurred. Please try again.';
      setErrorMsg(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-[#F6F8F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
          <div className="text-xs font-bold text-[#159B78] uppercase tracking-wider">
            Connect With Our Team
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#10243A] tracking-tight">
            Contact Maple Staffing Solutions
          </h2>
          <p className="text-base text-slate-600">
            Headquartered in Brampton, Ontario. Reach our recruitment specialists and operational coordinators for rapid staffing deployment or career inquiries.
          </p>
        </div>

        {/* Contact Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#159B78]/15 text-[#159B78] flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#10243A]">Headquarters</h3>
              <p className="text-xs text-slate-600 mt-1">Brampton, Ontario, Canada</p>
              <div className="text-[11px] text-[#159B78] font-medium mt-1">Serving the GTA Corridor</div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#159B78]/15 text-[#159B78] flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#10243A]">Direct Phone</h3>
              <a href="tel:+19057930000" className="text-xs font-semibold text-slate-800 hover:text-[#159B78] mt-1 block">
                +1 (905) 793-0000
              </a>
              <div className="text-[11px] text-slate-500 mt-1">Rapid Dispatch Desk</div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#159B78]/15 text-[#159B78] flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#10243A]">Email Support</h3>
              <a href="mailto:info@maplestaffingsolutions.com" className="text-xs font-semibold text-slate-800 hover:text-[#159B78] mt-1 block truncate">
                info@maplestaffingsolutions.com
              </a>
              <div className="text-[11px] text-slate-500 mt-1">24-hour response SLA</div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#159B78]/15 text-[#159B78] flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#10243A]">Office Hours</h3>
              <p className="text-xs text-slate-600 mt-1">Mon – Fri: 8:00 AM – 6:00 PM</p>
              <div className="text-[11px] text-slate-500 mt-1">24/7 On-Call for Client Shifts</div>
            </div>
          </div>

        </div>

        {/* Two-Column Form & Location Map Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
            
            <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
              <button
                type="button"
                onClick={() => { setInquiryType('employer'); setSubject('Employer Staffing Inquiry'); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  inquiryType === 'employer'
                    ? 'bg-[#10243A] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Employer Inquiry
              </button>

              <button
                type="button"
                onClick={() => { setInquiryType('candidate'); setSubject('Candidate / Career Inquiry'); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  inquiryType === 'candidate'
                    ? 'bg-[#10243A] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Candidate Inquiry
              </button>

              <button
                type="button"
                onClick={() => { setInquiryType('general'); setSubject('General Inquiry'); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  inquiryType === 'general'
                    ? 'bg-[#10243A] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                General Inquiry
              </button>
            </div>

            {confirmationTicket ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-[#159B78] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-[#10243A]">Inquiry Received</h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  Thank you, <strong>{fullName}</strong>. Your inquiry has been logged under ticket{' '}
                  <span className="font-mono font-bold text-[#10243A]">{confirmationTicket}</span>.
                  A staffing account representative will respond within 1 business day.
                </p>
                <button
                  onClick={() => {
                    setConfirmationTicket(null);
                    setMessage('');
                  }}
                  className="px-5 py-2 text-xs font-semibold bg-[#159B78] text-white rounded-lg hover:bg-[#128264]"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {errorMsg && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 flex items-center gap-2 text-xs text-red-700">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#159B78]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#159B78]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (905) ..."
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#159B78]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Company / Organization {inquiryType === 'employer' ? '*' : '(Optional)'}
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Acme Logistics Canada"
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#159B78]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#159B78]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Message / Staffing Requirements *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your shift requirements, workforce headcount, or questions for our recruitment directors..."
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#159B78]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#159B78] hover:bg-[#128264] text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

          </div>

          {/* Right Column: Location & Coverage Interactive Map Panel */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-[#10243A] text-lg mb-2 flex items-center gap-2">
                <Building className="w-5 h-5 text-[#159B78]" />
                <span>Brampton Headquarters & GTA Coverage</span>
              </h3>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                Positioned in the logistics and manufacturing capital of Ontario, our coordinators service employers and job seekers across Brampton, Mississauga, Vaughan, Etobicoke, and the Greater Toronto Area.
              </p>

              {/* Stylized Interactive Map Card */}
              <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 relative h-64 flex items-center justify-center">
                {/* SVG Map Illustration of Ontario GTA */}
                <div className="absolute inset-0 bg-[#10243A] flex items-center justify-center p-6 text-center">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-full bg-[#159B78] text-white flex items-center justify-center mx-auto shadow-lg animate-bounce">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">Maple Staffing Solutions HQ</div>
                      <div className="text-xs text-slate-300">Brampton, Ontario, Canada</div>
                      <div className="text-[11px] text-[#159B78] font-mono mt-1">43.7315° N, 79.7624° W</div>
                    </div>
                    <div className="pt-2">
                      <span className="text-[11px] bg-white/10 text-slate-200 px-3 py-1 rounded-full border border-white/10">
                        Ontario License #MSS-2012
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Verified Office Details */}
              <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Office Access:</span>
                  <span className="font-semibold text-slate-800">By Appointment / Walk-ins Welcome</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Parking & Transit:</span>
                  <span className="font-semibold text-slate-800">Brampton Transit Accessible</span>
                </div>
              </div>
            </div>

            {/* Emergency Shift Support Banner */}
            <div className="p-5 rounded-2xl bg-[#10243A] text-white flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#159B78] flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#159B78] uppercase">Same-Day Shift Replacement</div>
                <div className="text-sm font-semibold">Immediate Dispatch Line: +1 (905) 793-0000</div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
