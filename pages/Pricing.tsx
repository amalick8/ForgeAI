
import React from 'react';
import { Link } from 'react-router-dom';
import { Check, HelpCircle } from 'lucide-react';

const PricingPage: React.FC = () => {
  const tiers = [
    {
      name: 'Free',
      price: '$0',
      desc: 'Occasional checks.',
      features: ['GitHub basic scan', 'LeetCode stats', '1 Resume audit / mo', 'Community support'],
      cta: 'Start Free'
    },
    {
      name: 'Student',
      price: '$7',
      desc: 'Weekly progress.',
      features: ['Daily audit updates', 'Full bullet rewriter', 'ATS keyword audit', 'GitHub README audit'],
      cta: 'Select Student',
      highlight: true
    },
    {
      name: 'Pro',
      price: '$15',
      desc: 'Full audit + priority.',
      features: ['Everything in Student', 'Interview vault access', 'Priority analysis', '1-on-1 career logic'],
      cta: 'Select Pro'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 pt-14 pb-32">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">Simple, honest pricing.</h1>
        <p className="text-gray-400">Invest in your career. Upgrade when you're ready.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-24">
        {tiers.map((tier, i) => (
          <div 
            key={i} 
            className="
                p-10 rounded-xl border flex flex-col
                border-white/5 bg-[#111]
                transition-all duration-300
                hover:scale-[1.03]
                hover:border-white/20
                hover:bg-white/[0.03]
                hover:shadow-2xl hover:shadow-white/5
              "

          >
            <div className="mb-8">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">{tier.name}</span>
              <div className="text-4xl font-bold text-white mt-4">{tier.price}<span className="text-sm font-normal text-gray-500 ml-1">/mo</span></div>
              <p className="text-sm text-gray-400 mt-3 leading-relaxed">{tier.desc}</p>
            </div>
            
            <div className="flex-1 space-y-4 mb-10">
              {tier.features.map((f, idx) => (
                <div key={idx} className="flex items-start gap-3 text-sm">
                  <Check size={16} className="text-indigo-500 mt-0.5 shrink-0" />
                  <span className="text-gray-300">{f}</span>
                </div>
              ))}
            </div>

            <Link 
              to="/signup" 
              className={`w-full py-3 rounded-md text-sm font-bold text-center transition-all ${tier.highlight ? 'bg-white text-black hover:bg-gray-200 shadow-xl shadow-white/5' : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'}`}
            >
              {tier.cta}
            </Link>
          </div>
        ))}
      </div>

      {/* Comparison Table */}
      <section id="comparison" className="mb-24 scroll-mt-24">
        
        
      {/* Comparison Button (bigger + pushed upward + animated) */}
        <div className="flex justify-center -mt-16 mb-12">
          <button
            onClick={(e) => {
              const btn = e.currentTarget;

              // Button press animation
              btn.classList.add("scale-95");

              setTimeout(() => {
                btn.classList.remove("scale-95");
              }, 160);

              // Smooth animated scroll
              setTimeout(() => {
                const section = document.getElementById("comparison");
                if (!section) return;

                const targetY =
                  section.getBoundingClientRect().top +
                  window.pageYOffset -
                  80;

                window.scrollTo({
                  top: targetY,
                  behavior: "smooth",
                });
              }, 220);
            }}
            className="
              inline-flex items-center gap-2
              bg-white text-black
              px-6 py-3 rounded-xl
              text-sm font-semibold
              tracking-wide
              hover:bg-gray-200
              transition-transform duration-200
              transform
            "
          >
            Comparison
            <span className="text-base">↓</span>
          </button>
        </div>

        {/* Table */}
        <div className="border border-white/5 rounded-xl overflow-hidden text-sm bg-[#111]">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-[#161616]">
                <th className="p-4 font-bold text-gray-400 uppercase text-[10px]">Feature</th>
                <th className="p-4 font-bold text-center">Free</th>
                <th className="p-4 font-bold text-center">Student</th>
                <th className="p-4 font-bold text-center">Pro</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              {[
                ['GitHub Semantic Audit', 'Basic', 'Full', 'Full'],
                ['LeetCode Pattern Map', '-', '✓', '✓'],
                ['ATS Keywords', '-', '✓', '✓'],
                ['Interview Vault', '-', '-', '✓'],
                ['Analysis Priority', 'Standard', 'Standard', 'High'],
              ].map((row, i) => (
                <tr key={i} className="border-b border-white/[0.03]">
                  <td className="p-4 font-medium">{row[0]}</td>
                  <td className="p-4 text-center text-gray-500">{row[1]}</td>
                  <td className="p-4 text-center">{row[2]}</td>
                  <td className="p-4 text-center">{row[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </section>

      {/* FAQ */}
      <section className="max-w-2xl mx-auto">
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest text-center mb-12">FAQ</h2>
        <div className="space-y-8">
          {[
            { q: 'Can I cancel anytime?', a: 'Yes. Forge is a month-to-month service. No long-term contracts.' },
            { q: 'Is the student plan actually $7?', a: 'Yes. We require a valid .edu email address to verify student status during signup.' },
            { q: 'Do you store my code?', a: 'No. We only perform semantic analysis through official APIs. Your source code stays on GitHub.' },
            { q: 'What is priority analysis?', a: 'Pro users get routed to dedicated inference clusters, reducing audit latency from minutes to seconds.' }
          ].map((item, i) => (
            <div key={i} className="space-y-2">
              <h3 className="font-bold text-white flex items-center gap-2">
                <HelpCircle size={16} className="text-gray-500" /> {item.q}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed ml-6">{item.a}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center text-xs text-gray-600 space-x-4">
          <span>Cancel anytime</span>
          <span>•</span>
          <span>Secure payments</span>
          <span>•</span>
          <span>Student discount applies</span>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
