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
  ArrowRight,
  PlayCircle,
  Clock
} from "lucide-react";
import { useState, useEffect } from "react";

const fadeIn = {
  initial: { opacity: 0, y: 15 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5, ease: "easeOut" }
};

export default function App() {
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeString = `00:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div className="bg-brand-black text-white font-sans overflow-x-hidden rustic-grain">
      
      {/* 1. EL GANCHO */}
      <section className="pt-16 pb-12 px-5 md:pt-24 border-b border-white/10 min-h-[90vh] flex flex-col justify-center">
        <div className="max-w-4xl mx-auto w-full">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 flex justify-start"
          >
            <span className="px-4 py-1 border border-white/20 text-white/60 font-mono text-xs uppercase tracking-widest">
              Advertencia
            </span>
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
            className="text-lg md:text-2xl text-neutral-400 font-sans leading-relaxed mb-10 max-w-2xl"
          >
            Tu mandíbula caída, tu mirada sumisa y tu falta de propósito son la prueba de tu rendición. 
            <span className="text-white font-bold block mt-4 border-l-2 border-brand-brown pl-4">
              O recuperas tu diseño original hoy, o acepta tu destino como un hombre invisible.
            </span>
          </motion.p>
          
          {/* VSL Placeholder */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="video-placeholder group mt-10 md:mt-16"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_60%)] z-0" />
            <div className="relative z-10 flex flex-col items-center">
              <PlayCircle size={64} className="text-white/80 mb-4 group-hover:scale-110 transition-transform" strokeWidth={1} />
              <p className="font-mono text-xs tracking-[0.3em] text-white/50 uppercase">ESTO NO ES PARA TODOS.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. LA HISTORIA Y LA EMPATÍA */}
      <section className="py-20 px-5 md:py-32 border-b border-white/10 bg-brand-gray/50">
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
          </motion.div>
        </div>
      </section>

      {/* 3. LA PRESENTACIÓN DE LA "NUEVA OPORTUNIDAD" */}
      <section className="py-20 px-5 md:py-32 border-b border-white/10">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeIn} className="p-8 md:p-12 border border-white/20 bg-brand-gray relative overflow-hidden flex flex-col md:flex-row items-center gap-10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
            <div className="md:w-1/2 relative z-10 w-full">
              <h2 className="text-3xl md:text-5xl mb-6">Olvida la motivación barata.</h2>
              <p className="text-lg text-neutral-400 mb-8">
                Si tu química interna está rota, ninguna frase bonita te va a salvar.
              </p>
              <p className="text-xl md:text-2xl text-white font-serif italic mb-6">
                EL FIN DEL HOMBRE BLANDO es el único vehículo de reestructura total. Es un método de ingeniería masculina que ataca la raíz.
              </p>
              <p className="text-neutral-400">
                Mientras los demás se quejan de la sociedad, nosotros reconstruimos el hardware y el software del hombre. Es la única salida real para el que todavía tiene una gota de orgullo.
              </p>
            </div>
            <div className="md:w-1/2 relative z-10 w-full flex justify-center">
               <img src="https://i.imgur.com/hecf4aT.png" alt="Libro El Fin del Hombre Blando" className="w-full max-w-[350px] drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform hover:scale-105 duration-500" referrerPolicy="no-referrer" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. EL CONTENIDO DEL PROGRAMA */}
      <section className="py-20 px-5 md:py-32 border-b border-white/10 bg-brand-gray/30">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeIn} className="mb-16 text-center md:text-left">
            <h2 className="text-5xl md:text-7xl mb-6">ESTO ES LO QUE VAS A EJECUTAR</h2>
            <p className="text-xl text-neutral-400 font-mono uppercase tracking-widest text-sm md:text-base">Para dejar de ser una sombra</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-px bg-white/10 border border-white/10">
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
        </div>
      </section>

      {/* 5. PRUEBA SOCIAL INNEGABLE */}
      <section className="py-20 px-5 md:py-32 border-b border-white/10 overflow-hidden">
        <div className="max-w-[100vw] mx-auto">
          <motion.div {...fadeIn} className="text-center mb-16">
             <h2 className="text-4xl md:text-6xl text-white">RESULTADOS BRUTALES</h2>
          </motion.div>

          <div className="relative w-full overflow-hidden">
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
                  className="w-[280px] md:w-[350px] xl:w-[400px] h-auto rounded-3xl object-cover shadow-[0_10px_30px_rgba(0,0,0,0.8)] border border-white/10" 
                  referrerPolicy="no-referrer"
                />
              ))}
            </div>
          </div>
          <p className="text-center text-xs font-mono uppercase tracking-[0.2em] mt-12 text-neutral-600">
            (Más testimonios de hombres que despertaron en el interior)
          </p>
        </div>
      </section>

      {/* 6. LA OFERTA Y LA GARANTÍA */}
      <section className="py-20 px-5 md:py-32 border-b border-white/10 bg-brand-gray/80">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p {...fadeIn} className="text-xl md:text-2xl text-neutral-400 mb-12">
            Podrías gastar miles de dólares en terapia para "aceptar tu debilidad", o podrías invertir una fracción en eliminarla.
          </motion.p>
          
          <motion.div {...fadeIn} className="mb-16">
             <div className="text-sm font-mono uppercase tracking-[0.4em] mb-4 text-brand-brown">Acceso Inmediato Por Solo:</div>
             <div className="text-[6rem] md:text-[9rem] font-display leading-[0.8] text-white">$14.97</div>
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
      <section className="py-20 px-5 md:py-32 bg-black">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2 {...fadeIn} className="text-5xl md:text-7xl mb-8 text-white tracking-tighter">
            ESTA ES TU ÚNICA ADVERTENCIA.
          </motion.h2>

          <motion.div {...fadeIn} className="space-y-6 text-lg text-neutral-400 mb-12 text-left md:text-center">
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

          {/* TIMER */}
          <motion.div {...fadeIn} className="mb-12 inline-flex flex-col items-center">
            <div className="flex items-center gap-3 mb-2 opacity-60">
              <Clock size={16} />
              <span className="font-mono text-xs uppercase tracking-[0.3em]">Tiempo restante</span>
            </div>
            <div className={`text-6xl md:text-8xl font-display tracking-widest ${timeLeft < 300 ? 'text-red-500' : 'text-white'}`}>
              {timeString}
            </div>
          </motion.div>

          <motion.div {...fadeIn} className="flex flex-col items-center">
            <a href="https://pay.hotmart.com/W105526885V?off=qmsrqdaf" className="btn-brutal relative group overflow-hidden w-full md:max-w-md">
              <span className="relative z-10 flex items-center md:mx-auto gap-2">
                SÍ, QUIERO MI REESTRUCTURA AHORA <ArrowRight className="group-hover:translate-x-2 transition-transform hidden md:block" />
              </span>
            </a>
            <p className="mt-6 text-xs text-neutral-600 font-mono tracking-widest uppercase flex items-center gap-2">
              <Shield size={12} /> Pago seguro procesado por Hotmart
            </p>
          </motion.div>
        </div>
      </section>

    </div>
  );
}

function ProtocolCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-8 md:p-12 bg-black hover:bg-brand-gray transition-colors border border-transparent hover:border-white/10 group flex flex-col items-start">
      <div className="text-white/40 mb-8 pb-4 border-b border-white/10 group-hover:text-brand-brown transition-colors">
        {icon}
      </div>
      <h4 className="text-3xl md:text-4xl mb-4 leading-none text-white">{title}</h4>
      <p className="text-neutral-400 font-sans text-lg leading-relaxed">
        {desc}
      </p>
    </div>
  );
}

