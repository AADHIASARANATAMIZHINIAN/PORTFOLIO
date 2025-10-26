import React, { useState } from 'react';
import Section from './Section';
import { SOCIAL_LINKS } from '../constants';
import { AiIconContact } from './AiIcons';
import PixelatedText from './PixelatedText';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [emailError, setEmailError] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const validateEmail = (email: string) => {
    if (!email) {
      setEmailError('Email address is required.');
      return false;
    }
    // Standard email regex for validation
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regex.test(email.toLowerCase())) {
      setEmailError('Please enter a valid email address.');
      return false;
    }
    setEmailError(null);
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'email') {
      // Validate on change to provide immediate feedback
      if (value && !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value.toLowerCase())) {
           setEmailError('Please enter a valid email address.');
      } else {
           setEmailError(null);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isEmailValid = validateEmail(formData.email);
    if (isEmailValid && formData.name && formData.message) {
      setStatus('submitting');
      // Simulate an API call
      setTimeout(() => {
        console.log('Form submitted:', formData);
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        // Reset to idle after a few seconds
        setTimeout(() => setStatus('idle'), 4000);
      }, 1500);
    }
  };
  
  const inputStyle = "w-full bg-black/25 backdrop-blur-lg border border-white/10 rounded-lg p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all duration-300 shadow-inner shadow-black/20";

  return (
    <Section id="contact" title="Get In Touch" icon={<AiIconContact />}>
      <div className="max-w-2xl mx-auto">
        <p className="text-lg text-gray-300 mb-8 text-center">
          Have a project in mind or just want to connect? Drop me a message below. I'm always excited to hear about new ideas and collaborations.
        </p>
        
        {status === 'success' ? (
          <div className="text-center p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
              <p className="font-bold text-green-300">Thank you! Your message has been sent successfully.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
                required 
                className={inputStyle} 
                placeholder="John Doe" 
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Your Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                required 
                aria-invalid={!!emailError}
                aria-describedby="email-error"
                className={`${inputStyle} ${emailError ? 'border-red-500/50 ring-2 ring-red-500/50' : ''}`}
                placeholder="you@example.com" 
              />
              {emailError && <p id="email-error" className="mt-2 text-sm text-red-400">{emailError}</p>}
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
              <textarea 
                id="message" 
                name="message" 
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required 
                className={inputStyle}
                placeholder="Let's build something amazing together..."
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="inline-block rounded-lg border border-white/10 text-white font-semibold px-8 py-3 bg-white/5 backdrop-blur-lg transition-all duration-300 uppercase tracking-wider transform hover:-translate-y-1 hover:bg-white/10 hover:border-white/20 hover:shadow-xl hover:shadow-white/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <PixelatedText>{status === 'submitting' ? 'Sending...' : 'Send Message'}</PixelatedText>
              </button>
            </div>
          </form>
        )}
        
        <div className="mt-12 flex justify-center gap-6">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                className="text-gray-400 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
              >
                {React.cloneElement(link.icon, { className: 'h-8 w-8' })}
              </a>
            ))}
          </div>
      </div>
    </section>
  );
};

export default Contact;