/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  ArrowRight, 
  Download, 
  AlertCircle, 
  ChevronRight, 
  Eye, 
  Target, 
  ShieldAlert,
  UserX,
  XCircle,
  Clock,
  LockOpen
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Player from '@vimeo/player';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function App() {
  const [timeLeft, setTimeLeft] = useState(861); // 14 mins 21 secs
  const [showButton, setShowButton] = useState(true);
  const [showVideoBtn, setShowVideoBtn] = useState(false);
  const HOTMART_LINK = "https://pay.hotmart.com/W105526885V?checkoutMode=10";

  useEffect(() => {
    // Show button after 1 minute 30 seconds (90000ms)
    const timer = setTimeout(() => setShowVideoBtn(true), 90000);
    return () => clearTimeout(timer);
  }, []);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    let player: Player | null = null;
    
    // Solo inicializamos el player si el ref existe
    const initPlayer = () => {
      if (iframeRef.current) {
        player = new Player(iframeRef.current);

        player.on('timeupdate', (data) => {
          // Mostrar botón después de 90 segundos
          if (data.seconds >= 90) {
            setShowButton(true);
          }
        });

        player.on('play', () => {
          player?.setVolume(1).catch(() => {});
        });
      }
    };

    // Pequeño delay para asegurar que el iframe esté en el DOM
    const timeoutId = setTimeout(initPlayer, 500);

    return () => {
      clearInterval(timer);
      clearTimeout(timeoutId);
      if (player) {
        player.destroy();
      }
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-black font-sans selection:bg-white selection:text-black">
      <main className="w-full max-w-[480px] px-6 py-12 space-y-24 md:max-w-[1080px]">
        
        {/* HERO SECTION */}
        <section id="hero" className="flex flex-col items-center text-center space-y-8">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-4"
          >
            <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-black font-display tracking-tighter leading-[0.8] italic uppercase flex flex-col items-center">
              <span>TU INSTAGRAM</span>
              <span className="text-white">DA PENA!</span>
            </motion.h1>
            <motion.h2 variants={fadeIn} className="text-2xl md:text-4xl font-bold font-display uppercase leading-tight text-white/90">
              DA PENA PORQUE PROYECTAS <span className="text-white underline decoration-neutral-600 underline-offset-4">DEBILIDAD.</span>
            </motion.h2>
            <motion.p variants={fadeIn} className="text-white/60 font-medium text-xl">
              Dame 60 segundos que te explico el porque en este vídeo ⬇
            </motion.p>
          </motion.div>

          <div className="w-full max-w-4xl mx-auto px-0 md:px-4 z-10">
            <div className="relative pt-[56.25%] bg-neutral-900 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.05)] border border-white/5">
              <iframe 
                ref={iframeRef}
                src="https://player.vimeo.com/video/1188273823" 
                className="absolute top-0 left-0 w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture" 
                allowFullScreen
                title="VSL Video"
              ></iframe>
            </div>

            {/* Delayed Button below video */}
            {showVideoBtn && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  scale: [1, 1.02, 1]
                }}
                transition={{
                  scale: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                className="w-full pt-8 flex justify-center"
              >
                <a 
                  href={HOTMART_LINK}
                  className="w-full bg-white text-black py-5 px-4 rounded-xl font-black font-display text-base md:text-xl uppercase tracking-wider text-center transition-all duration-300 hover:bg-neutral-200 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                >
                  DESCARGAR EBOOK AHORA
                </a>
              </motion.div>
            )}
          </div>

        </section>

        {/* THE TRUTH / PAIN POINTS */}
        <section className="space-y-12">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-6 text-center"
          >
            <motion.h3 variants={fadeIn} className="text-3xl md:text-5xl font-black font-display leading-[0.9] tracking-tighter uppercase">
              PERFIL DE <span className="text-white underline decoration-neutral-700 underline-offset-8">DEPREDADOR</span> 
            </motion.h3>
            
            <motion.p variants={fadeIn} className="text-lg text-neutral-300 leading-relaxed">
              Es el <span className="text-white font-bold uppercase tracking-widest text-sm">manual brutal</span> que destruye tu imagen de hombre invisible y te enseña cómo construir un perfil que transmite presencia, estatus y control.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 gap-4"
          >
            {["Aunque no tengas dinero.", "Aunque no seas modelo.", "Aunque hoy parezcas un fan más."].map((text, i) => (
              <motion.div key={i} variants={fadeIn} className="flex items-center space-x-4 p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                <ShieldAlert className="w-5 h-5 text-neutral-600 shrink-0" />
                <span className="text-neutral-400 font-bold uppercase text-xs tracking-widest">{text}</span>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* BULLISH WARNING SECTION */}
        <section className="p-8 border border-white/10 rounded-3xl bg-neutral-900/40 space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
             <AlertCircle className="w-24 h-24 text-white/[0.03] -rotate-12" />
          </div>
          
          <div className="space-y-4">
            <h4 className="text-xl md:text-2xl font-black font-display uppercase tracking-tight text-white max-w-[280px] mx-auto text-center">
              TU PERFIL PROBABLEMENTE <br /> ESTÁ HACIENDO ESTO:
            </h4>
          </div>

          <ul className="space-y-4">
            {[
              "Hacerte ver necesitado.",
              "Hacerte parecer desesperado por validación femenina.",
              "Hacerte parecer “el amigo”.",
              "Hacerte ver blando, inseguro y olvidable.",
              "Destruir tu presencia masculina antes de hablar."
            ].map((item, i) => (
              <motion.li 
                key={i} 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start space-x-3 text-neutral-400"
              >
                <XCircle className="w-5 h-5 text-neutral-700 mt-1 shrink-0" />
                <span className="font-medium text-lg leading-snug">{item}</span>
              </motion.li>
            ))}
          </ul>
        </section>

        {/* WHAT'S INSIDE / FEATURES */}
        <section className="space-y-12">
          <div className="space-y-2 text-center">
            <LockOpen className="w-8 h-8 text-neutral-700 mx-auto mb-4" />
            <h2 className="text-2xl font-black font-display uppercase leading-tight tracking-tighter md:text-5xl mx-auto">
              DENTRO DE PERFIL DE DEPREDADOR <br /> VAS A DESCUBRIR:
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {[
              "Qué fotos debes borrar inmediatamente.",
              "Cómo construir un perfil que proyecte estatus sin aparentar riqueza.",
              "Cómo dejar de parecer un hombre desesperado.",
              "Cómo generar presencia masculina con simples cambios visuales.",
              "Cómo verte mejor con luz, postura y ángulos correctos.",
              "Cómo escribir una bio que genere misterio.",
              "Cómo dejar de actuar como fan de mujeres que ni saben que existes.",
              "Cómo transformar tu perfil en una vitrina de valor masculino."
            ].map((benefit, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center space-x-4 group"
              >
                <div className="flex-none p-2 rounded-lg bg-neutral-900 border border-white/5 group-hover:bg-white group-hover:text-black transition-all">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <p className="text-neutral-300 font-medium md:text-lg">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PHILOSOPHY / TARGET AUDIENCE */}
        <section className="space-y-12 py-12 border-y border-white/5">
          <div className="space-y-8 max-w-2xl mx-auto text-center">
            <p className="text-2xl font-bold italic text-neutral-500">
              Este ebook no fue escrito para hombres sensibles.
            </p>

            <div className="space-y-4">
              <p className="text-xl font-medium text-neutral-300 uppercase tracking-widest text-sm text-center">Fue escrito para hombres cansados de:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {["ser ignorados", "parecer invisibles", "regalar atención", "verse como NPCs digitales"].map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-neutral-900 border border-white/10 text-white text-xs font-bold uppercase rounded-md tracking-wider">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4 border-l-4 border-white pl-6 py-4 bg-white/5 text-left overflow-hidden">
              <p className="text-xl md:text-2xl font-black font-display uppercase tracking-tighter leading-none whitespace-nowrap">
                Aquí no se acaricia tu ego.
              </p>
              <p className="text-lg md:text-xl font-medium text-neutral-400">
                Aquí se destruye la versión débil que estás mostrando al mundo.
              </p>
            </div>
          </div>
        </section>

        {/* FINAL CLOSING PARAGRAPH */}
        <section className="text-center space-y-8">
           <div className="space-y-4 max-w-lg mx-auto">
             <p className="text-lg font-medium text-neutral-400">
               Puedes seguir siendo otro hombre invisible desplazándose por historias ajenas…
             </p>
             <p className="text-2xl font-black font-display uppercase tracking-tight text-white italic">
               O puedes construir una presencia masculina que cambie completamente cómo te perciben.
             </p>
           </div>
        </section>

        {/* PRICING & CHECKOUT */}
        <section id="checkout" className="glass rounded-[40px] p-8 md:p-16 space-y-12 border-white/20 relative overflow-hidden bg-white/[0.01]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/10 rounded-full blur-[60px]" />
          
          <div className="text-center space-y-4 relative z-10">
            <h5 className="text-[10px] font-black tracking-[0.4em] uppercase text-neutral-500">Acceso Inmediato</h5>
            <div className="space-y-1">
              <p className="text-sm font-bold text-neutral-400 line-through">47.00 USD</p>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-6xl md:text-8xl font-black font-display tracking-tighter leading-none italic">9.97</span>
                <span className="text-2xl font-bold font-display uppercase text-white/50">USD</span>
              </div>
            </div>
          </div>

          <div className="space-y-6 relative z-10">
             <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-3 text-neutral-400 p-4 border border-white/5 rounded-full bg-black/40">
                  <Clock className="w-5 h-5 text-neutral-600" />
                  <p className="text-sm font-medium">El precio actual <span className="text-white font-bold">no será permanente.</span></p>
                </div>
                <div className="flex items-center space-x-3 text-neutral-400 p-4 border border-white/5 rounded-full bg-black/40">
                  <Download className="w-5 h-5 text-neutral-600" />
                  <p className="text-sm font-medium">Acceso digital <span className="text-white font-bold">desde cualquier dispositivo.</span></p>
                </div>
             </div>

             <div className="space-y-4 pt-4 text-center">
              <p className="text-xs md:text-sm font-bold text-white uppercase italic tracking-tighter max-w-[220px] md:max-w-none mx-auto leading-tight">
                ¿Cuánto tiempo más vas a seguir <br /> viéndote como un fan más?
              </p>
             </div>

               <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-white text-black py-6 rounded-full font-black font-display text-xl uppercase tracking-widest border-2 border-white shadow-[0_0_30px_rgba(255,255,255,0.1)] flex flex-col items-center justify-center transition-all duration-300"
                onClick={() => {
                  window.location.href = HOTMART_LINK;
                }}
              >
                <span className="text-center px-4">LO QUIERO AHORA</span>
              </motion.button>
          </div>
        </section>

        {/* FOOTER - CLEANER */}
        <footer className="w-full text-center py-20 px-6 border-t border-white/5 bg-black">
           <div className="max-w-2xl mx-auto space-y-10">
              {/* Hotmart Purchase Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <a 
                  href="https://pay.hotmart.com/YOUR_HOTMART_CODE" 
                  className="inline-flex items-center justify-center w-full max-w-md py-6 text-xl font-black tracking-widest text-black uppercase transition-all duration-300 rounded-full bg-white border-2 border-white hover:bg-neutral-200 active:scale-95 group font-display"
                >
                  COMPRAR AHORA
                  <ChevronRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
           </div>
        </footer>

      </main>
    </div>
  );
}
