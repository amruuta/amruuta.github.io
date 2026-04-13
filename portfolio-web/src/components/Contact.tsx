import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import Container from './ui/Container';
import SectionHeading from './ui/SectionHeading';
import { fadeInUp, staggerContainer, viewport } from '../lib/animations';

interface FormState {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  const { personal } = portfolioData;
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  return (
    <section id="contact" className="py-32 bg-white">
      <Container>
        <SectionHeading
          label="Get In Touch"
          title="Ready to Collaborate?"
          subtitle="Whether you have a project, opportunity, or just want to chat — reach out!"
        />

        {/* High-energy CTA panel */}
        <motion.div
          className="relative border-4 p-12 lg:p-16 overflow-hidden"
          style={{
            backgroundColor: '#FEFCE8',
            borderColor: '#FACC15',
            boxShadow: '8px 8px 0px #000000',
          }}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          custom={0.1}
        >
          {/* Background accent strips */}
          <div
            className="absolute top-0 right-0 w-96 h-96 opacity-5 pointer-events-none"
            style={{
              background: 'radial-gradient(circle, #FACC15 0%, transparent 70%)',
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-64 h-64 opacity-5 pointer-events-none"
            style={{
              background: 'radial-gradient(circle, #F59E0B 0%, transparent 70%)',
            }}
          />

          {/* Content */}
          <div className="relative z-10">
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              {/* Left: contact info */}
              <motion.div 
                className="flex flex-col justify-center gap-8"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={fadeInUp} custom={0.1}>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    Have a project you'd like to discuss? Need a senior backend engineer for your team? Or just want to connect?
                  </p>
                </motion.div>

                {/* Contact items */}
                <motion.div className="flex flex-col gap-6" variants={staggerContainer}>
                  <motion.div variants={fadeInUp} custom={0.2}>
                    <ContactItem
                      icon="email"
                      label="Email"
                      value={personal.email}
                      href={`mailto:${personal.email}`}
                    />
                  </motion.div>
                  <motion.div variants={fadeInUp} custom={0.3}>
                    <ContactItem
                      icon="location"
                      label="Location"
                      value={personal.location}
                    />
                  </motion.div>
                  <motion.div variants={fadeInUp} custom={0.4}>
                    <ContactItem
                      icon="linkedin"
                      label="LinkedIn"
                      value="amruta-bendale"
                      href={personal.linkedin}
                      external
                    />
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Right: form */}
              <motion.div
                className="flex flex-col gap-6"
                variants={fadeInUp}
                custom={0.2}
              >
                {submitted ? (
                  <div className="flex flex-col items-center justify-center gap-3 py-12 text-center h-full">
                    <span className="text-5xl">✅</span>
                    <p className="font-bold text-black text-xl">Message ready!</p>
                    <p className="text-gray-600">Your email client is opening. Thanks for reaching out!</p>
                    <button
                      className="mt-4 font-semibold text-sm text-yellow-600 hover:text-yellow-700 underline"
                      onClick={() => { setSubmitted(false); setForm({ name: '', email: '', message: '' }); }}
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-700 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Your full name"
                        className="w-full border-3 border-black px-4 py-3 text-sm text-black placeholder-gray-500 outline-none transition-all duration-150 focus:bg-yellow-100"
                        style={{ backgroundColor: '#FFF9E6' }}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="your@email.com"
                        className="w-full border-3 border-black px-4 py-3 text-sm text-black placeholder-gray-500 outline-none transition-all duration-150 focus:bg-yellow-100"
                        style={{ backgroundColor: '#FFF9E6' }}
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-700 mb-2">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        placeholder="What's on your mind?"
                        className="w-full border-3 border-black px-4 py-3 text-sm text-black placeholder-gray-500 outline-none transition-all duration-150 resize-none focus:bg-yellow-100"
                        style={{ backgroundColor: '#FFF9E6' }}
                      />
                    </div>

                    {/* Submit button */}
                    <motion.button
                      type="submit"
                      className="w-full py-4 font-bold text-base text-white uppercase tracking-wide transition-all duration-200 cursor-pointer border-4 border-black"
                      style={{
                        background: 'linear-gradient(135deg, #F59E0B 0%, #FACC15 100%)',
                        boxShadow: '4px 4px 0px #000000',
                      }}
                      whileHover={{
                        y: -2,
                        boxShadow: '6px 6px 0px #000000',
                        transform: 'scale(1.01)',
                      }}
                      whileTap={{ y: 1, boxShadow: '2px 2px 0px #000000' }}
                    >
                      Send Message →
                    </motion.button>
                  </form>
                )}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

const ICONS: Record<string, JSX.Element> = {
  email: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  location: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  linkedin: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
};

interface ContactItemProps {
  icon: string;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}

function ContactItem({ icon, label, value, href, external }: ContactItemProps) {
  const content = (
    <motion.div
      className="flex items-center gap-4 p-4 border-3 border-gray-300 transition-all duration-200"
      style={{
        backgroundColor: '#FFFBEB',
        boxShadow: '3px 3px 0px #000000',
      }}
      whileHover={{
        y: -2,
        borderColor: '#F59E0B',
        boxShadow: '4px 4px 0px #000000',
      }}
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: '#FEF3C7', color: '#F59E0B', border: '2px solid #F59E0B' }}
      >
        {ICONS[icon]}
      </div>
      <div>
        <p className="text-xs uppercase tracking-widest font-bold text-gray-700">{label}</p>
        <p className="text-base font-semibold text-black mt-0.5">{value}</p>
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className="hover:opacity-90 transition-opacity block"
      >
        {content}
      </a>
    );
  }

  return content;
}
