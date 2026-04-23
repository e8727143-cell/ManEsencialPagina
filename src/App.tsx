/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReactNode } from "react";
import { motion } from "motion/react";
import { 
  Shield, 
  Flame, 
  Dna, 
  Users, 
  CheckCircle2, 
  ArrowRight,
  ChevronDown,
  X,
  Menu
} from "lucide-react";
import { useState, useEffect } from "react";

const fadeIn = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    function importHotmart() {
      // Check if already imported
      if (document.querySelector('script[src*="hotmart.com"]')) return;

      const imported = document.createElement('script');
      imported.src = 'https://static.hotmart.com/checkout/widget.min.js';
      document.head.appendChild(imported);
      
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = 'https://static.hotmart.com/css/hotmart-fb.min.css';
      document.head.appendChild(link);
    }
    importHotmart();
  }, []);

  return (
    <div className="min-h-screen bg-brand-black text-brand-bone font-sans overflow-x-hidden rustic-grain">
      {/* Navbar */}
      <nav 
        id="navbar"
        className="fixed top-0 w-full z-50 px-5 py-4 flex justify-between items-center bg-brand-black/95 border-b-2 border-brand-bone/10"
      >
        <div className="font-display text-3xl tracking-tighter uppercase">
          El Fin del <span className="text-brand-brown">Hombre Blando</span>
        </div>
        
        <button 
          className="md:hidden text-brand-bone"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <div className="hidden md:flex gap-8 items-center font-display text-xl uppercase tracking-widest">
          <a href="#manifiesto" className="hover:text-brand-brown transition-colors">Manifiesto</a>
          <a href="#desafio" className="hover:text-brand-brown transition-colors">Desafío</a>
          <a href="https://pay.hotmart.com/W105526885V?off=qmsrqdaf" className="px-6 py-2 bg-brand-bone text-brand-black font-bold hover:bg-brand-brown hover:text-white transition-all">
            Comprar ahora
          </a>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-brand-black flex flex-col items-center justify-center gap-8 font-display text-4xl uppercase p-10">
          <a href="#manifiesto" onClick={() => setMobileMenuOpen(false)}>Manifiesto</a>
          <a href="#desafio" onClick={() => setMobileMenuOpen(false)}>Desafío</a>
          <a href="https://pay.hotmart.com/W105526885V?off=qmsrqdaf" className="btn-brutal w-full mt-4 text-center">Comprar ahora</a>
        </div>
      )}      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pb-20 px-6 pt-32 overflow-hidden border-b-8 border-brand-brown">
        <div className="absolute inset-0 z-0 bg-brand-black">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(62,39,35,0.15)_0%,transparent_70%)]" />
        </div>

        <div className="relative z-20 max-w-5xl text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8 inline-block"
          >
            <span className="px-6 py-2 border-2 border-brand-brown text-brand-brown font-mono text-sm uppercase tracking-[0.5em]">
              Protocolo de Emergencia
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-6xl md:text-[11rem] mb-10 leading-[0.8] tracking-tighter"
          >
            EL MUNDO YA TIENE <br />
            <span className="text-stroke-thin opacity-30">SUFICIENTES</span> ADORNOS. <br />
            LO QUE NECESITA SON <span className="text-brand-brown">HOMBRES.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-xl md:text-3xl text-neutral-500 max-w-3xl mx-auto mb-14 leading-tight font-light italic"
          >
            Tu mandíbula caída, tu mirada sumisa y tu falta de propósito no son "genética". 
            <span className="text-brand-bone block mt-4 font-bold not-italic decoration-brand-brown underline decoration-4 underline-offset-8">Son tu rendición documentada.</span>
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex justify-center"
          >
            <a href="https://pay.hotmart.com/W105526885V?off=qmsrqdaf" className="btn-brutal px-12 py-8 text-2xl md:text-4xl group">
              QUIERO RECUPERAR MI DISEÑO ORIGINAL
              <ArrowRight size={40} className="group-hover:translate-x-4 transition-transform hidden md:block" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* The Mirror Section */}
      <section className="py-24 px-6 bg-brand-black border-b border-brand-bone/5">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <motion.div {...fadeIn} className="relative aspect-square bg-brand-gray border-8 border-brand-brown flex flex-col items-center justify-center p-12 text-center group">
            <div className="font-display text-[20rem] leading-none opacity-5 absolute select-none">!</div>
            <h2 className="text-7xl md:text-[10rem] leading-none mb-6 relative z-10">MÍRATE.</h2>
            <p className="text-brand-brown font-mono tracking-widest uppercase text-sm relative z-10 font-bold">Espejo de Realidad</p>
          </motion.div>

          <motion.div {...fadeIn} className="space-y-10 text-left">
            <h2 className="text-5xl md:text-7xl leading-none">
              NO EL FILTRO QUE USAS PARA ENGAÑAR A EXTRAÑOS EN INTERNET.
            </h2>
            <div className="h-2 w-32 bg-brand-brown" />
            <div className="space-y-8 text-2xl text-neutral-400 leading-snug font-light">
              <p>
                Mira el espejo real. El que muestra a un hombre que pide permiso para existir, 
                que baja la voz para no molestar y que se refugia en una pantalla porque la realidad le queda grande.
              </p>
              <p>
                Te convencieron de que ser <span className="text-white font-black italic">"suave"</span> era una virtud. 
                Te dijeron que tu agresividad natural, tu ambición y tu deseo de dominio eran "tóxicos".
              </p>
              <div className="p-10 bg-brand-brown/10 border-l-[12px] border-brand-brown">
                <p className="text-brand-brown uppercase font-display text-5xl md:text-6xl leading-none tracking-tighter">
                  Te castraron con tu propio consentimiento. 
                </p>
              </div>
              <p className="text-white font-bold opacity-80 uppercase tracking-tighter text-3xl">
                El resultado es el que vives cada mañana:
              </p>
            </div>
          </motion.div>
        </div>

        <div className="mt-20 max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-4 px-2">
          {[
            { title: "UN CUERPO", desc: "Que no impone respeto." },
            { title: "MENTE SECUESTRADA", desc: "Por la dopamina barata del porno y el azúcar." },
            { title: "UNA MUJER", desc: "Que te ve como un mueble, no como un líder." },
            { title: "HIJOS", desc: "Que no tienen un roble donde apoyarse, sino un arbusto que se dobla." }
          ].map((item, i) => (
            <motion.div 
              key={i}
              variants={fadeIn}
              whileHover={{ scale: 1.02 }}
              className="p-8 bg-brand-gray border-2 border-brand-bone/5 hover:border-brand-brown transition-all"
            >
              <div className="text-brand-brown font-display text-3xl mb-2">{item.title}</div>
              <p className="text-neutral-500 font-light italic leading-tight">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* The Solution: Book Mockup Layout */}
      <section id="manifiesto" className="py-24 bg-neutral-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl text-brand-brown mb-2">EL FIN DEL HOMBRE BLANDO</h2>
            <h3 className="text-5xl md:text-8xl">EL MANIFIESTO</h3>
            <p className="mt-8 text-xl text-neutral-400 max-w-3xl mx-auto font-light leading-relaxed italic">
              He escrito esto no para que te sientas mejor, sino para que el tipo mediocre que eres hoy muera de una vez. 
              Este no es un libro de "autoayuda" con frases bonitas. Es un manual de ingeniería biológica y espiritual.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Mockup area */}
            <div className="lg:col-span-12 flex flex-col md:flex-row gap-12 items-center justify-center py-12">
              <div className="relative group">
                <div className="absolute -inset-10 bg-brand-brown/10 blur-[100px] animate-pulse" />
                
                {/* Book Mockup Built with CSS - Masculine & Rustic */}
                <div className="relative w-80 h-[520px] bg-brand-gray border-t-[1px] border-l-[1px] border-white/20 shadow-[30px_30px_0px_#3E2723] flex flex-col p-10 transform -rotate-2 hover:rotate-0 transition-all duration-700 hover:shadow-[15px_15px_0px_#3E2723]">
                  {/* Spine effect */}
                  <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-black/40 to-transparent border-r border-white/5" />
                  
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div>
                      <div className="font-mono text-[10px] tracking-[0.4em] text-brand-brown mb-6 uppercase">Documento Clasificado</div>
                      <h4 className="text-5xl leading-[0.8] mb-4">EL FIN DEL <br /> <span className="text-brand-brown">HOMBRE</span> <br /> BLANDO</h4>
                      <div className="h-1 w-12 bg-brand-brown mt-6" />
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 bg-brand-black/50 border border-white/5">
                        <Shield size={40} className="text-brand-brown mb-2" />
                        <div className="text-[10px] uppercase tracking-widest opacity-40">Protocolo de ejecución</div>
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="text-[8px] font-mono opacity-30">© MANUAL DE INGENIERÍA</div>
                        <div className="text-xl font-display text-brand-brown">V.1</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="max-w-md space-y-8 text-center md:text-left">
                 <h4 className="text-4xl md:text-6xl leading-none">MÁS QUE UN LIBRO. <br /> UN ARMA.</h4>
                 <p className="text-xl text-neutral-500 font-light italic">
                    "Has estado desarmado ante el mundo. Es hora de recuperar tu arsenal biológico."
                 </p>
                 <a href="https://pay.hotmart.com/W105526885V?off=qmsrqdaf" className="btn-brutal w-full text-center">RECLAMAR COPIA</a>
              </div>
            </div>

            {/* Protocols area */}
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
              <ProtocolCard 
                icon={<Dna />} 
                title="REESTRUCTURA FACIAL" 
                desc="Cómo recuperar la mandíbula de cazador que la respiración bucal te robó." 
              />
              <ProtocolCard 
                icon={<Flame />} 
                title="QUÍMICA DE GUERRA" 
                desc="El plan exacto para que tu testosterona deje de convertirse en estrógeno." 
              />
              <ProtocolCard 
                icon={<Users />} 
                title="DOMINIO DEL LOBO" 
                desc="La psicología cruda de por qué las mujeres no respetan a los 'hombres buenos'." 
              />
              <ProtocolCard 
                icon={<Shield />} 
                title="EL TRONO DEL PATRIARCA" 
                desc="Cómo liderar una familia bajo principios bíblicos para que tu apellido signifique algo." 
              />
            </div>
          </div>
        </div>
      </section>

      {/* The 30 Day Challenge - Aggressive Style */}
      <section id="desafio" className="py-24 px-6 bg-brand-brown/10 border-y-4 border-brand-brown">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2 {...fadeIn} className="text-5xl md:text-8xl mb-8">EL DESAFÍO DE 30 DÍAS</motion.h2>
          <motion.div {...fadeIn} className="bg-brand-black p-8 md:p-16 border-2 border-brand-bone relative">
            <div className="absolute top-0 right-0 px-4 py-2 bg-brand-brown text-white font-display text-2xl -translate-y-1/2 translate-x-4">
              URGENTE
            </div>
            
            <p className="text-xl md:text-2xl text-neutral-300 leading-relaxed mb-8">
              Si crees que esto es "demasiado", cierra esta página. Sigue consumiendo Netflix, sigue perdiendo tu semilla frente a una pantalla y sigue siendo invisible. El mundo no te va a extrañar.
            </p>
            
            <p className="text-2xl md:text-3xl text-brand-bone mb-12 font-display uppercase tracking-widest leading-none">
              Pero si todavía te queda una gota de sangre hirviendo, dentro del manual encontrarás el <span className="text-brand-brown">Protocolo de 30 Días.</span>
            </p>

            <div className="grid md:grid-cols-3 gap-8 py-8 border-y border-brand-bone/10 mb-12 uppercase font-display text-2xl tracking-tighter opacity-80">
              <div>Sin Excusas</div>
              <div>Sin Negociaciones</div>
              <div>Sin Descanso</div>
            </div>

            <p className="text-xl text-neutral-400 italic mb-12">
              Al día 30, no serás perfecto, pero por primera vez en años, serás un hombre que se reconoce en el espejo.
            </p>

            <a href="https://pay.hotmart.com/W105526885V?off=qmsrqdaf" className="btn-brutal w-full md:w-auto text-3xl px-16 py-8 text-center">
              RECLAMAR MI PROTOCOLO
            </a>
          </motion.div>
        </div>
      </section>

      {/* Offer Final */}
      <section className="py-24 px-6 bg-brand-bone text-brand-black text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-7xl md:text-9xl leading-[0.8] mb-4">EL FIN DEL <br /> HOMBRE BLANDO</h2>
          <p className="text-2xl font-mono opacity-60 mb-12 uppercase tracking-[0.2em]">
            (Incluye el Manual de Emergencia para Hombres Débiles)
          </p>
          
          <div className="mb-16">
            <div className="text-sm font-bold uppercase tracking-widest mb-2 opacity-40">Precio de inversión</div>
            <div className="text-9xl md:text-[12rem] font-display leading-none">$14.97</div>
          </div>

          <p className="text-3xl md:text-5xl font-display mb-12 leading-tight uppercase px-4 max-w-2xl mx-auto">
            "No es el precio de un libro. <br /> Es el precio de <span className="italic underline decoration-4 underline-offset-8">dejar de dar lástima.</span>"
          </p>

          <a href="https://pay.hotmart.com/W105526885V?off=qmsrqdaf" className="w-full md:w-auto px-12 py-8 bg-brand-black text-brand-bone font-display text-4xl hover:scale-105 transition-transform duration-300 text-center flex items-center justify-center">
            QUIERO RECUPERAR MI DISEÑO ORIGINAL
          </a>

          <div className="mt-8 flex justify-center">
            {/* Hotmart Checkout Widget */}
            <a 
              onClick={(e) => e.preventDefault()} 
              href="https://pay.hotmart.com/W105526885V?checkoutMode=2&off=qmsrqdaf" 
              className="hotmart-fb hotmart__button-checkout"
            >
              Comprar ahora
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-brand-bone/10 flex flex-col items-center">
        <motion.div 
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="text-center"
        >
          <div className="text-3xl md:text-4xl italic text-neutral-400 mb-4 max-w-2xl font-serif">
            "Portaos como hombres, sed fuertes."
          </div>
          <div className="font-display text-2xl text-brand-brown uppercase tracking-widest">
            — 1 Corintios 16:13
          </div>
        </motion.div>
        
        <div className="mt-20 text-[10px] uppercase tracking-[0.5em] opacity-20">
          Manual de Ingeniería Biológica y Espiritual &copy; {new Date().getFullYear()}
        </div>
      </footer>

      {/* Decorative Scrolls Hint */}
      <motion.div 
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30 opacity-20 hidden md:block"
      >
        <ChevronDown size={24} />
      </motion.div>
    </div>
  );
}

function ProtocolCard({ icon, title, desc }: { icon: ReactNode, title: string, desc: string }) {
  return (
    <motion.div 
      {...fadeIn}
      whileHover={{ y: -5 }}
      className="p-8 bg-brand-black border-2 border-brand-bone/5 hover:border-brand-brown transition-all group"
    >
      <div className="text-brand-brown mb-6 p-4 border-2 border-brand-brown/20 inline-block group-hover:bg-brand-brown transition-colors group-hover:text-white">
        {icon}
      </div>
      <h4 className="text-2xl mb-4 leading-none">{title}</h4>
      <p className="text-neutral-500 text-sm italic font-light group-hover:text-neutral-300 transition-colors">
        {desc}
      </p>
    </motion.div>
  );
}

