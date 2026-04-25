/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, ReactNode } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { 
  Shield, 
  Flame, 
  Dna, 
  Users, 
  ArrowRight,
  PlayCircle,
  Clock,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  X
} from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 15 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5, ease: "easeOut" }
};

export default function App() {
  const [timeLeft, setTimeLeft] = useState(8 * 60 + 37);
  const [timerStarted, setTimerStarted] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const testimoniesRef = useRef(null);
  const isInView = useInView(testimoniesRef, { once: true, amount: 0.1 });

  useEffect(() => {
    // Notify visit via Telegram
    console.log("Attempting to notify visit...");
    fetch("/api/notify-visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
    .then(async (res) => {
      const data = await res.json();
      console.log("Notification response:", data);
    })
    .catch((err) => console.error("Notification error:", err));
  }, []);

  useEffect(() => {
    if (isInView) {
      setTimerStarted(true);
    }
  }, [isInView]);

  useEffect(() => {
    if (!timerStarted) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [timerStarted]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeString = `00:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div className="bg-brand-black text-white font-sans overflow-x-hidden rustic-grain">
      
      {/* 1. EL GANCHO */}
      <section className="pt-16 pb-12 px-5 md:pt-24 border-b border-white/10 min-h-[90vh] flex flex-col justify-center">
        <div className="max-w-4xl mx-auto w-full">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#fcf6ba] text-black py-3 px-6 rounded-lg mb-10 flex items-center justify-center gap-4 font-display font-bold shadow-[0_0_30px_rgba(252,246,186,0.3)] border-b-4 border-black/20"
          >
            <motion.div
              animate={{ 
                rotate: [0, -10, 10, -10, 10, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <AlertTriangle className="text-black" size={24} />
            </motion.div>
            <span className="text-sm md:text-lg tracking-widest uppercase italic">
              ¡Advertencia! Falta poco tiempo...
            </span>
            <div className="hidden md:block w-px h-6 bg-black/20 mx-2" />
            <span className="hidden md:inline font-mono text-sm">{timeString}</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[3.5rem] leading-[0.85] md:text-8xl lg:text-[9rem] mb-8 text-white word-break-words"
          >
            EL MUNDO NO TE RESPETA PORQUE NO TIENES NADA QUE RESPETAR.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-2xl text-neutral-400 font-sans leading-relaxed text-center md:text-left max-w-2xl mx-auto md:mx-0"
          >
            Tu mandíbula caída, tu mirada sumisa y tu falta de propósito son la prueba de tu rendición. 
            <span className="text-white font-bold block mt-4 border-l-2 border-brand-brown pl-4 text-left">
              O recuperas tu diseño original hoy, o acepta tu destino como un hombre invisible.
            </span>
          </motion.p>

          {/* Integrated Image with Shadows */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 relative max-w-4xl mx-auto md:mx-0 group"
          >
            <div className="relative overflow-hidden rounded-2xl">
              {/* Subtle Overlays for integration without covering the image */}
              <div className="absolute inset-0 z-10 shadow-[inset_0_0_60px_rgba(0,0,0,0.8)] pointer-events-none" />
              <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-brand-black/80 to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-brand-black/80 to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-brand-black/80 to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-brand-black/80 to-transparent z-10 pointer-events-none" />
              
              <img 
                src="https://i.imgur.com/VlbDUGy.png" 
                alt="Diseño Original" 
                className="w-full h-auto transition-all duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. LA HISTORIA Y LA EMPATÍA */}
      <section className="py-12 px-5 md:py-20 border-b border-white/10 bg-brand-gray/50">
        <div className="max-w-3xl mx-auto">
          <motion.h2 {...fadeIn} className="text-4xl md:text-6xl mb-10 text-white">
            Yo no vengo a caerte bien.
          </motion.h2>
          
          <motion.div {...fadeIn} className="space-y-8 text-lg font-sans text-neutral-300 leading-relaxed">
            <p>
              Hubo un tiempo donde yo también era parte de la masa dócil. Un hombre que pedía permiso para hablar, con la cara hundida por la mala respiración y la mente nublada por placeres baratos. Creía que "portarme bien" me daría el éxito. <span className="text-white font-bold italic">Me equivoqué.</span>
            </p>
            <div className="h-px w-full bg-white/10 my-8"></div>
            <p className="font-serif text-2xl md:text-3xl italic text-white leading-snug">
              El momento de claridad: Me di cuenta de que el sistema te quiere blando porque un hombre blando es <span className="text-brand-brown">fácil de controlar</span>.
            </p>
            <p>
              Me cansé de dar lástima. Me dediqué a descifrar la arquitectura del hombre que impone respeto: desde su estructura ósea hasta su autoridad espiritual. Lo que descubrí no está en los libros de texto modernos, porque la verdad es demasiado peligrosa para los débiles.
            </p>

            {/* Integrated Image with Shadows in Section 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-12 relative max-w-4xl mx-auto md:mx-0 group"
            >
              <div className="relative overflow-hidden rounded-2xl">
                <div className="absolute inset-0 z-10 shadow-[inset_0_0_60px_rgba(0,0,0,0.8)] pointer-events-none" />
                <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-brand-black/80 to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-brand-black/80 to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-brand-black/80 to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-brand-black/80 to-transparent z-10 pointer-events-none" />
                
                <img 
                  src="https://i.imgur.com/jZYTFjb.png" 
                  alt="Arquitectura del Hombre" 
                  className="w-full h-auto transition-all duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. LA PRESENTACIÓN DE LA "NUEVA OPORTUNIDAD" */}
      <section className="py-12 px-5 md:py-20 border-b border-white/10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2 {...fadeIn} className="text-3xl md:text-5xl mb-6">Olvida la motivación barata.</motion.h2>
          <motion.p {...fadeIn} className="text-lg text-neutral-400 mb-8 max-w-2xl mx-auto">
            Si tu química interna está rota, ninguna frase bonita te va a salvar.
          </motion.p>
          <motion.p {...fadeIn} className="text-xl md:text-2xl text-white font-serif italic mb-6">
            EL FIN DEL HOMBRE BLANDO es el único vehículo de reestructura total. Es un método de ingeniería masculina que ataca la raíz.
          </motion.p>
          <motion.p {...fadeIn} className="text-neutral-400 max-w-2xl mx-auto">
            Mientras los demás se quejan de la sociedad, nosotros reconstruimos el hardware y el software del hombre. Es la única salida real para el que todavía tiene una gota de orgullo.
          </motion.p>

          {/* Integrated Image with Shadows in Section 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 relative max-w-4xl mx-auto group"
          >
            <div className="relative overflow-hidden rounded-2xl">
              <div className="absolute inset-0 z-10 shadow-[inset_0_0_60px_rgba(0,0,0,0.8)] pointer-events-none" />
              <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-brand-black/80 to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-brand-black/80 to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-brand-black/80 to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-brand-black/80 to-transparent z-10 pointer-events-none" />
              
              <img 
                src="https://i.imgur.com/0x1ehEN.png" 
                alt="Proyecto Reestructura" 
                className="w-full h-auto transition-all duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. EL CONTENIDO DEL PROGRAMA */}
      <section className="py-12 px-5 md:py-20 border-b border-white/10 bg-brand-gray/30">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeIn} className="mb-14 text-center md:text-left">
            <h2 className="text-4xl md:text-6xl mb-4 text-white font-display leading-[0.9] tracking-tight">
              ESTO ES LO QUE VAS A EJECUTAR <br className="hidden md:block"/>PARA DEJAR DE SER UNA SOMBRA
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-8">
            <ProtocolCard 
              icon={<Dna size={40} strokeWidth={1} />}
              title="REESTRUCTURA FACIAL"
              desc="Los protocolos de masticación y postura lingual para forjar la mandíbula de un líder y eliminar la cara de víctima."
            />
            <ProtocolCard 
              icon={<Flame size={40} strokeWidth={1} />}
              title="QUÍMICA DE GUERRA"
              desc="Cómo purgar el estrógeno y disparar tu testosterona de forma natural. Sin trucos, solo biología pura."
            />
            <ProtocolCard 
              icon={<Users size={40} strokeWidth={1} />}
              title="DOMINIO DEL LOBO"
              desc="La psicología de autoridad innegociable. Deja de suplicar atención y empieza a proyectar poder."
            />
            <ProtocolCard 
              icon={<Shield size={40} strokeWidth={1} />}
              title="EL TRONO DEL PATRIARCA"
              desc="Liderazgo bíblico. Cómo convertirte en el roble de tu estirpe y recuperar el mando de tu hogar."
            />
          </div>

          {/* 3D BOOK PREVIEW INSIDE PROGRAM CONTENT */}
          <div className="mt-20 flex flex-col items-center overflow-x-hidden">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8 px-4"
            >
              <h3 className="text-2xl md:text-3xl font-display uppercase tracking-tight mb-1">
                PREVIEW
              </h3>
              <h2 className="text-lg md:text-2xl font-sans uppercase tracking-[0.2em] text-brand-brown">
                "EL FIN DEL HOMBRE BLANDO"
              </h2>
            </motion.div>

            <BookPreview />
            
            <motion.div 
              {...fadeIn} 
              className="mt-12 flex justify-center w-full"
            >
              <a 
                href="#oferta" 
                className="btn-brutal !w-[280px] md:!w-[340px] !py-4 !text-xl shadow-[0_10px_30px_rgba(188,170,164,0.2)]"
              >
                SEGUIR LEYENDO
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. PRUEBA SOCIAL INNEGABLE */}
      <section ref={testimoniesRef} className="py-12 px-5 md:py-20 border-b border-white/10 overflow-hidden">
        <div className="max-w-[100vw] mx-auto">
          <motion.div {...fadeIn} className="text-center mb-12">
             <h2 className="text-4xl md:text-6xl text-white">RESULTADOS BRUTALES</h2>
          </motion.div>

          <div className="relative w-full overflow-hidden mb-8">
            <div className="absolute inset-y-0 left-0 w-12 md:w-32 bg-gradient-to-r from-brand-black to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-12 md:w-32 bg-gradient-to-l from-brand-black to-transparent z-10 pointer-events-none" />
            
            <div className="flex w-max gap-6 px-6 animate-[scroll_30s_linear_infinite] hover:[animation-play-state:paused]">
              {[
                "https://i.imgur.com/8x3QiN1.png",
                "https://i.imgur.com/gf6sSD8.png",
                "https://i.imgur.com/K5p8Xxc.png",
                "https://i.imgur.com/8x3QiN1.png",
                "https://i.imgur.com/gf6sSD8.png",
                "https://i.imgur.com/K5p8Xxc.png"
              ].map((imgUrl, i) => (
                <img 
                  key={i} 
                  src={imgUrl} 
                  alt="Testimonio de cliente" 
                  onClick={() => setSelectedImage(imgUrl)}
                  className="w-[280px] md:w-[350px] xl:w-[400px] h-auto rounded-3xl object-cover shadow-[0_10px_30px_rgba(0,0,0,0.8)] border border-white/10 cursor-pointer transition-transform hover:scale-[1.02] active:scale-95" 
                  referrerPolicy="no-referrer"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. LA OFERTA Y LA GARANTÍA */}
      <section id="oferta" className="py-12 px-5 md:py-20 border-b border-white/10 bg-brand-gray/80">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p {...fadeIn} className="text-xl md:text-2xl text-neutral-400 mb-10">
            Podrías gastar miles de dólares en terapia para "aceptar tu debilidad", o podrías invertir una fracción en eliminarla.
          </motion.p>

          <motion.div {...fadeIn} className="relative flex justify-center mb-10 group">
            {/* Soft Golden Background Glow */}
            <motion.div 
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-brown/20 rounded-full blur-[80px] pointer-events-none"
            />
            <motion.div 
              animate={{ 
                scale: [1, 1.15, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-white/5 rounded-full blur-[60px] pointer-events-none"
            />
            
            <img 
              src="https://i.imgur.com/LtDhOsg.png" 
              alt="Mockup El Fin del Hombre Blando" 
              className="relative z-10 w-full max-w-[280px] drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-transform duration-700 group-hover:scale-105" 
              referrerPolicy="no-referrer" 
            />
          </motion.div>
          
          <motion.div {...fadeIn} className="mb-14 relative pt-16">
             {/* Eye-catching Discount Badge */}
             <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-20">
               <motion.div 
                 animate={{ 
                   scale: [1, 1.02, 1],
                 }}
                 transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                 className="bg-red-600 text-white px-5 py-1.5 rounded-full font-display font-bold text-sm md:text-base shadow-[0_0_20px_rgba(220,38,38,0.2)] border-2 border-white/10 whitespace-nowrap italic"
               >
                 67% DE DESCUENTO EN ESTE INSTANTE
               </motion.div>
             </div>

             <div className="text-sm md:text-lg font-mono uppercase tracking-[0.4em] mb-4 text-brand-brown/50 line-through">
               VALOR ORIGINAL $44.97
             </div>
             
             <div className="text-[6.5rem] md:text-[10rem] font-display leading-[0.8] text-[#fcf6ba] gold-text relative z-10">
               $14.97
             </div>
          </motion.div>

          <motion.div {...fadeIn} className="flex flex-col items-center mb-16">
            <a href="https://pay.hotmart.com/W105526885V?off=qmsrqdaf" className="btn-brutal relative group overflow-hidden w-full md:max-w-xl mx-auto mb-6">
              <span className="relative z-10 flex items-center md:mx-auto gap-2">
                SÍ, QUIERO MI REESTRUCTURA AHORA <ArrowRight className="group-hover:translate-x-2 transition-transform hidden md:block" />
              </span>
            </a>

            <div className="flex flex-col items-center mb-10 w-full">
              <div className="flex items-center gap-3 mb-4 text-red-500 opacity-80">
                <Clock size={20} />
                <span className="font-mono text-sm uppercase tracking-[0.4em]">Oferta expira en:</span>
              </div>
              <div className={`w-full md:max-w-xl py-6 border-2 border-red-500/30 rounded-2xl bg-red-500/5 flex items-center justify-center ${timeLeft < 300 && timerStarted ? 'animate-pulse' : ''}`}>
                <div className="text-6xl md:text-8xl font-display tracking-widest text-red-500">
                  {timeString}
                </div>
              </div>
              {!timerStarted && (
                <div className="mt-4 text-neutral-500 font-mono text-[10px] uppercase tracking-widest">
                  El tiempo empezará a correr en breve...
                </div>
              )}
            </div>

            <p className="text-xs text-neutral-600 font-mono tracking-widest uppercase flex items-center gap-2">
              <Shield size={12} /> Pago seguro procesado por Hotmart
            </p>
          </motion.div>

          <motion.div {...fadeIn} className="flex flex-col items-center">
             <img 
                src="https://i.imgur.com/8zKpbAj.png" 
                alt="Garantía de 7 días" 
                className="w-full max-w-[280px] rounded-[2rem] mb-10 drop-shadow-[0_10px_40px_rgba(188,170,164,0.15)]" 
                referrerPolicy="no-referrer" 
             />
             <p className="text-neutral-400 text-lg md:text-xl leading-relaxed max-w-2xl">
                Tienes 7 días. Si al abrir el manual sientes que es "demasiado duro" para ti, pide el reembolso. Te devolveré tu dinero para que puedas seguir comprando la comodidad que te está matando. 
                <span className="block mt-4 text-white font-bold">El riesgo es mío; la vergüenza de seguir igual es tuya.</span>
             </p>
          </motion.div>
        </div>
      </section>

      {/* 7. ESCASEZ Y URGENCIA REAL */}
      <section className="py-12 px-5 md:py-20 bg-black">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2 {...fadeIn} className="text-5xl md:text-7xl mb-8 text-white tracking-tighter">
            ESTA ES TU ÚNICA ADVERTENCIA.
          </motion.h2>

          <motion.div {...fadeIn} className="space-y-4 text-lg text-neutral-400 mb-12 text-left md:text-center">
            <p>
              No estoy aquí para perseguirte. Si decides cerrar esta página sin el manual, mañana te despertarás siendo el mismo hombre intrascendente.
            </p>
            <p>
              Pero esta oferta de <strong className="text-white">$14.97</strong> es solo para los primeros que actúen. Una vez que el cupo se llene, el precio subirá permanentemente.
            </p>
            <p className="text-2xl md:text-3xl text-white font-serif italic pt-4">
              El tiempo de la duda se acabó. O te forjas o te doblas.
            </p>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-5 md:p-10 cursor-zoom-out"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full max-h-screen flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 md:-top-16 md:-right-16 p-3 text-white hover:bg-white/10 rounded-full transition-colors z-10"
              >
                <X size={32} />
              </button>
              <img 
                src={selectedImage} 
                alt="Enlarged testimony" 
                className="max-w-full max-h-[85vh] object-contain rounded-2xl md:rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.8)] border border-white/10"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

function ProtocolCard({ icon, title, desc }: { icon: ReactNode, title: string, desc: string }) {
  return (
    <div className="flex flex-col group h-full">
      {/* Top horizontal bar card */}
      <div className="bg-brand-gray/80 backdrop-blur-sm border border-white/10 px-5 py-3 rounded-t-xl flex items-center gap-3 w-fit ml-4 -mb-[1px] relative z-10 transition-colors group-hover:bg-brand-gray group-hover:border-brand-brown/40">
        <div className="text-brand-brown shrink-0 scale-90">
          {icon}
        </div>
        <h4 className="text-sm font-display text-white uppercase tracking-[0.2em]">{title}</h4>
      </div>
      
      {/* Main content square card */}
      <div className="bg-black/40 border border-white/10 p-8 rounded-2xl rounded-tl-none group-hover:border-brand-brown/30 transition-all duration-500 flex-grow shadow-2xl backdrop-blur-md">
        <p className="text-neutral-400 font-sans text-base md:text-lg leading-relaxed group-hover:text-neutral-200 transition-colors">
          {desc}
        </p>
      </div>
    </div>
  );
}

function BookPreview() {
  const [currentPage, setCurrentPage] = useState(0);
  const pages = [
    "https://i.imgur.com/GrJmihR.png",
    "https://i.imgur.com/SFu89vt.png",
    "https://i.imgur.com/7mfl3z0.png",
    "https://i.imgur.com/qxnwjVr.png",
    "https://i.imgur.com/qGXek5g.png"
  ];

  const next = () => setCurrentPage((prev) => Math.min(prev + 1, pages.length - 1));
  const prev = () => setCurrentPage((prev) => Math.max(prev - 1, 0));

  return (
    <div className="w-full flex flex-col items-center relative">
      {/* Book Area - Free floating with no background glow */}
      <div className="relative w-[280px] md:w-[340px] aspect-[1/1.4] preserve-3d perspective-[2500px] mb-12">
        {pages.map((src, index) => {
          const isFlipped = index < currentPage;
          const isCurrent = index === currentPage;
          
          return (
            <motion.div
              key={index}
              initial={false}
              animate={{
                rotateY: isFlipped ? -175 : 0,
                zIndex: isFlipped ? index : pages.length - index,
                x: isFlipped ? "-100%" : "0%",
                opacity: (index > currentPage + 2 && !isFlipped) ? 0 : 1,
              }}
              transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1]
              }}
              onClick={() => {
                if (isCurrent) next();
                else if (index === currentPage - 1) prev();
              }}
              className="absolute inset-0 origin-left preserve-3d cursor-pointer shadow-[20px_20px_60px_rgba(0,0,0,0.5)] rounded-r-xl overflow-hidden border-l border-white/5"
            >
              <div className="w-full h-full relative">
                <img 
                  src={src} 
                  alt={`Página ${index + 1}`} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual depth and lighting */}
                <motion.div 
                  animate={{ opacity: isFlipped ? 0.3 : 0 }}
                  className="absolute inset-0 bg-black pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-black/10 pointer-events-none" />
                <div className="absolute inset-y-0 left-0 w-[1.5px] bg-black/40 z-20" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Nav Controls */}
      <div className="flex items-center gap-6 relative z-50">
        <button 
          onClick={prev}
          disabled={currentPage === 0}
          className={`p-3 rounded-full border border-white/10 transition-all ${currentPage === 0 ? 'opacity-20 cursor-not-allowed' : 'hover:bg-brand-brown text-white hover:border-brand-brown'}`}
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex gap-2">
          {pages.map((_, i) => (
            <div 
              key={i} 
              className={`h-0.5 rounded-full transition-all duration-500 ${currentPage === i ? 'w-8 bg-brand-brown' : 'w-2 bg-white/10'}`} 
            />
          ))}
        </div>

        <button 
          onClick={next}
          disabled={currentPage === pages.length - 1}
          className={`p-3 rounded-full border border-white/10 transition-all ${currentPage === pages.length - 1 ? 'opacity-20 cursor-not-allowed' : 'hover:bg-brand-brown text-white hover:border-brand-brown'}`}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

