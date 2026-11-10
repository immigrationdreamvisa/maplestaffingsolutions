import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, AlertCircle, Loader2, Building, Sparkles } from 'lucide-react';

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
    <section id="contact" className="py-20 sm:py-28 bg-[#F3F3E7] border-t border-[#F5EBD0] scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16 space-y-3"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F5EBD0] text-xs font-bold text-[#590907] uppercase tracking-widest border border-[#A5A79B]/40">
            <Sparkles className="w-3.5 h-3.5 text-[#7F011F]" />
            <span>Connect With Our Team</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#590907] tracking-tight font-heading">
            Contact Maple Staffing Solutions
          </h2>
          <p className="text-base sm:text-lg text-[#590907]/80 font-body">
            Headquartered in Brampton, Ontario. Reach our recruitment specialists and operational coordinators for rapid staffing deployment or career inquiries.
          </p>
        </motion.div>

        {/* Contact Info Cards Grid in Wine Red & Sand theme */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          
          <motion.div 
            whileHover={{ y: -4 }}
            className="p-6 rounded-2xl bg-white border border-[#F5EBD0] shadow-sm flex items-start gap-4 hover:border-[#A5A79B] transition-colors"
          >
            <div className="w-11 h-11 rounded-xl bg-[#F5EBD0] text-[#7F011F] flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-[#7F011F]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#590907] font-heading">Headquarters</h3>
              <p className="text-xs text-[#590907]/80 mt-1 font-body">2250 Bovaird Dr E, Suite 208, Brampton, ON L6R 0W3</p>
              <div className="text-[11px] text-[#7F011F] font-semibold mt-1">GTA Industrial Corridor</div>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -4 }}
            className="p-6 rounded-2xl bg-white border border-[#F5EBD0] shadow-sm flex items-start gap-4 hover:border-[#A5A79B] transition-colors"
          >
            <div className="w-11 h-11 rounded-xl bg-[#F5EBD0] text-[#7F011F] flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5 text-[#7F011F]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#590907] font-heading">Direct Phone</h3>
              <a href="tel:+19057930000" className="text-xs font-bold text-[#590907] hover:text-[#7F011F] mt-1 block">
                +1 (905) 793-0000
              </a>
              <div className="text-[11px] text-[#590907]/70 mt-1">Rapid Dispatch Desk</div>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -4 }}
            className="p-6 rounded-2xl bg-white border border-[#F5EBD0] shadow-sm flex items-start gap-4 hover:border-[#A5A79B] transition-colors"
          >
            <div className="w-11 h-11 rounded-xl bg-[#F5EBD0] text-[#7F011F] flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-[#7F011F]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#590907] font-heading">Email Support</h3>
              <a href="mailto:info@maplestaffingsolutions.com" className="text-xs font-bold text-[#590907] hover:text-[#7F011F] mt-1 block truncate">
                info@maplestaffingsolutions.com
              </a>
              <div className="text-[11px] text-[#590907]/70 mt-1">24-hour response SLA</div>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -4 }}
            className="p-6 rounded-2xl bg-white border border-[#F5EBD0] shadow-sm flex items-start gap-4 hover:border-[#A5A79B] transition-colors"
          >
            <div className="w-11 h-11 rounded-xl bg-[#F5EBD0] text-[#7F011F] flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-[#7F011F]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#590907] font-heading">Office Hours</h3>
              <p className="text-xs text-[#590907]/80 mt-1 font-body">Mon – Fri: 8:00 AM – 6:00 PM</p>
              <div className="text-[11px] text-[#7F011F] font-semibold mt-1">24/7 On-Call for Client Shifts</div>
            </div>
          </motion.div>

        </div>

        {/* Two-Column Form & Location Map Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-9 rounded-3xl border border-[#F5EBD0] shadow-sm">
            
            <div className="flex items-center gap-2 mb-6 border-b border-[#F5EBD0] pb-4">
              <button
                type="button"
                onClick={() => { setInquiryType('employer'); setSubject('Employer Staffing Inquiry'); }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  inquiryType === 'employer'
                    ? 'bg-[#7F011F] text-white shadow-sm'
                    : 'bg-[#F3F3E7] text-[#590907] hover:bg-[#F5EBD0]'
                }`}
              >
                Employer Staffing
              </button>

              <button
                type="button"
                onClick={() => { setInquiryType('candidate'); setSubject('Candidate / Career Inquiry'); }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  inquiryType === 'candidate'
                    ? 'bg-[#7F011F] text-white shadow-sm'
                    : 'bg-[#F3F3E7] text-[#590907] hover:bg-[#F5EBD0]'
                }`}
              >
                Candidate Careers
              </button>

              <button
                type="button"
                onClick={() => { setInquiryType('general'); setSubject('General Inquiry'); }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  inquiryType === 'general'
                    ? 'bg-[#7F011F] text-white shadow-sm'
                    : 'bg-[#F3F3E7] text-[#590907] hover:bg-[#F5EBD0]'
                }`}
              >
                General Inquiry
              </button>
            </div>

            {confirmationTicket ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 bg-[#F5EBD0] text-[#7F011F] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-2xl font-bold text-[#590907] font-heading">Inquiry Received</h3>
                <p className="text-sm text-[#590907]/80 max-w-md mx-auto font-body">
                  Thank you, <strong>{fullName}</strong>. Your inquiry has been logged under ticket{' '}
                  <span className="font-mono font-bold text-[#7F011F]">{confirmationTicket}</span>.
                  A staffing account representative will respond within 1 business day.
                </p>
                <button
                  onClick={() => {
                    setConfirmationTicket(null);
                    setMessage('');
                  }}
                  className="px-6 py-2.5 text-xs font-bold bg-[#7F011F] text-white rounded-xl hover:bg-[#590907] transition-colors cursor-pointer shadow-sm"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {errorMsg && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-center gap-2 text-xs text-red-800">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#590907] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#F3F3E7] border border-[#F5EBD0] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7F011F] text-[#590907]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#590907] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#F3F3E7] border border-[#F5EBD0] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7F011F] text-[#590907]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#590907] mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (905) ..."
                      className="w-full px-3.5 py-2.5 text-sm bg-[#F3F3E7] border border-[#F5EBD0] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7F011F] text-[#590907]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#590907] mb-1.5">
                      Company / Organization {inquiryType === 'employer' ? '*' : '(Optional)'}
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Acme Logistics Canada"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#F3F3E7] border border-[#F5EBD0] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7F011F] text-[#590907]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#590907] mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F3F3E7] border border-[#F5EBD0] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7F011F] text-[#590907]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#590907] mb-1.5">
                    Message / Staffing Requirements *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your shift requirements, workforce headcount, or questions for our recruitment directors..."
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F3F3E7] border border-[#F5EBD0] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7F011F] text-[#590907]"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#7F011F] hover:bg-[#590907] text-white text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#F5EBD0]" />
                      <span>Transmitting Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send className="w-4 h-4 text-[#F5EBD0]" />
                    </>
                  )}
                </motion.button>
              </form>
            )}

          </div>

          {/* Right Column: Location & Coverage Interactive Map Panel */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#F5EBD0] shadow-sm">
              <h3 className="font-bold text-[#590907] text-lg mb-2 flex items-center gap-2 font-heading">
                <Building className="w-5 h-5 text-[#7F011F]" />
                <span>Brampton Headquarters & GTA Coverage</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#590907]/75 mb-4 leading-relaxed font-body">
                Positioned in the logistics and manufacturing capital of Ontario, our coordinators service employers and job seekers across Brampton, Mississauga, Vaughan, Etobicoke, and the Greater Toronto Area.
              </p>

              {/* Stylized Interactive Map Card */}
              <div className="rounded-2xl overflow-hidden border border-[#F5EBD0] bg-[#590907] relative h-64 flex items-center justify-center">
                <div className="absolute inset-0 bg-[#590907] flex items-center justify-center p-6 text-center">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-full bg-[#F5EBD0] text-[#590907] flex items-center justify-center mx-auto shadow-lg animate-bounce">
                      <MapPin className="w-6 h-6 text-[#7F011F]" />
                    </div>
                    <div>
                      <div className="text-base font-bold text-white font-heading">Maple Staffing Solutions HQ</div>
                      <div className="text-xs text-[#F5EBD0]">2250 Bovaird Dr E, Suite 208, Brampton, ON</div>
                      <div className="text-[11px] text-[#A5A79B] font-mono mt-1">43.7315° N, 79.7624° W</div>
                    </div>
                    <div className="pt-1">
                      <span className="text-[11px] bg-white/10 text-[#F5EBD0] px-3 py-1 rounded-full border border-white/15">
                        Ontario License #MSS-2012
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Verified Office Details */}
              <div className="mt-4 pt-4 border-t border-[#F5EBD0] grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[#A5A79B] block text-[10px] font-bold uppercase">Office Access:</span>
                  <span className="font-semibold text-[#590907]">By Appointment & Inquiries</span>
                </div>
                <div>
                  <span className="text-[#A5A79B] block text-[10px] font-bold uppercase">Transit:</span>
                  <span className="font-semibold text-[#590907]">Brampton Transit Accessible</span>
                </div>
              </div>
            </div>

            {/* Emergency Shift Support Banner */}
            <div className="p-5 rounded-2xl bg-[#590907] text-white flex items-center gap-4 shadow-md border border-[#7F011F]">
              <div className="w-11 h-11 rounded-xl bg-[#F5EBD0] flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-[#7F011F]" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#F5EBD0] uppercase tracking-wider">Same-Day Shift Replacement</div>
                <div className="text-sm font-semibold text-white">Immediate Dispatch Line: +1 (905) 793-0000</div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
