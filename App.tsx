import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Instagram, 
  MessageCircle, 
  Star, 
  MapPin, 
  Clock, 
  Menu, 
  X, 
  Users, 
  CalendarCheck, 
  ArrowRight, 
  Maximize2, 
  Quote 
} from 'lucide-react';

// --- Constants ---
const WHATSAPP_URL = "https://wa.me/5547992140323";
const INSTAGRAM_URL = "https://www.instagram.com/joanaflorbeautystudio";

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of the navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 80, damping: 18 }}
      className={`fixed w-full z-[100] transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-lg py-3 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border-b border-neutral-100' : 'bg-transparent py-6'}`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="group cursor-pointer flex items-center" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img
            src="/logonav.png"
            alt="Joana Floriani"
            className="h-16 md:h-20 lg:h-24 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity"
          />
        </div>

        <div className="hidden md:flex space-x-10 items-center">
          <a href="#trabalhos" onClick={(e) => scrollToSection(e, 'trabalhos')} className="text-[11px] uppercase tracking-[0.2em] font-bold text-neutral-600 hover:text-[#C48B7F] transition">Trabalhos</a>
          <a href="#espaco" onClick={(e) => scrollToSection(e, 'espaco')} className="text-[11px] uppercase tracking-[0.2em] font-bold text-neutral-600 hover:text-[#C48B7F] transition">Nosso Espaço</a>
          <a href="#servicos" onClick={(e) => scrollToSection(e, 'servicos')} className="text-[11px] uppercase tracking-[0.2em] font-bold text-neutral-600 hover:text-[#C48B7F] transition">Serviços</a>
          <a href="#depoimentos" onClick={(e) => scrollToSection(e, 'depoimentos')} className="text-[11px] uppercase tracking-[0.2em] font-bold text-neutral-600 hover:text-[#C48B7F] transition">Depoimentos</a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="bg-[#C48B7F] text-white px-8 py-2.5 rounded-full font-bold text-[11px] tracking-widest transition hover:scale-105 hover:shadow-[0_10px_20px_rgba(196,139,127,0.3)] active:scale-95 flex items-center gap-2">
            <MessageCircle size={14} /> AGENDAR
          </a>
        </div>

        <button className="md:hidden text-[#C48B7F]" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
            className="md:hidden absolute top-full left-0 w-full bg-white border-b border-neutral-100 p-8 flex flex-col space-y-8 text-center shadow-2xl"
          >
            <a href="#trabalhos" className="text-lg uppercase tracking-widest font-cinzel text-neutral-800" onClick={(e) => scrollToSection(e, 'trabalhos')}>Trabalhos</a>
            <a href="#espaco" className="text-lg uppercase tracking-widest font-cinzel text-neutral-800" onClick={(e) => scrollToSection(e, 'espaco')}>Nosso Espaço</a>
            <a href="#servicos" className="text-lg uppercase tracking-widest font-cinzel text-neutral-800" onClick={(e) => scrollToSection(e, 'servicos')}>Serviços</a>
            <a href="#depoimentos" className="text-lg uppercase tracking-widest font-cinzel text-neutral-800" onClick={(e) => scrollToSection(e, 'depoimentos')}>Depoimentos</a>
            <a href={WHATSAPP_URL} className="bg-[#C48B7F] text-white py-4 rounded-xl font-bold flex justify-center items-center gap-2 tracking-widest">
              <MessageCircle size={20} /> WHATSAPP
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const ServiceCategory = ({ title, services, highlight = false }: { title: string, services: string[], highlight?: boolean }) => {
  const priorities = ["Mechas", "Iluminados", "Dia de noiva", "Esmaltação em gel", "Botox", "Lipo Enzimática", "Preenchimento labial"];
  const [openService, setOpenService] = React.useState<string | null>(null);

  // Detalhes dos serviços
  const serviceDetails: { [key: string]: React.ReactNode } = {
    'bioestimuladores de colágeno': (
      <div className="max-w-md p-8 bg-white rounded-3xl shadow-2xl border border-[#C48B7F]/40 text-neutral-900 relative">
        <button className="absolute top-4 right-4 text-[#C48B7F] hover:text-[#a36a5c] text-xl font-bold" onClick={() => setOpenService(null)} aria-label="Fechar">×</button>
        <h3 className="font-cinzel text-2xl font-bold mb-4 text-[#C48B7F]">Bioestimulador de Colágeno</h3>
        <p className="mb-4 text-base leading-relaxed">Substâncias injetáveis que estimulam a produção natural de colágeno, promovendo firmeza, sustentação e melhora progressiva da flacidez.</p>
        <div className="mb-4"><span className="font-bold text-[#C48B7F]">Regiões de aplicação:</span>
          <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
            <li>Rosto</li>
            <li>Pescoço</li>
            <li>Colo</li>
            <li>Braços</li>
            <li>Abdômen</li>
            <li>Glúteos</li>
            <li>Coxas</li>
          </ul>
        </div>
      </div>
    ),
    'lipo enzimática': (
      <div className="max-w-md p-8 bg-white rounded-3xl shadow-2xl border border-[#C48B7F]/40 text-neutral-900 relative">
        <button className="absolute top-4 right-4 text-[#C48B7F] hover:text-[#a36a5c] text-xl font-bold" onClick={() => setOpenService(null)} aria-label="Fechar">×</button>
        <h3 className="font-cinzel text-2xl font-bold mb-4 text-[#C48B7F]">Intradermoterapia (Enzimas)</h3>
        <p className="mb-4 text-base leading-relaxed">Tratamento que consiste na aplicação de ativos diretamente na área desejada, promovendo melhora da gordura localizada, da circulação, da qualidade da pele e auxiliando em diversos tratamentos estéticos.</p>
        <div className="mb-4"><span className="font-bold text-[#C48B7F]">Indicações:</span>
          <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
            <li>Gordura localizada</li>
            <li>Celulite</li>
            <li>Estrias</li>
            <li>Flacidez</li>
            <li>Melhora da circulação</li>
            <li>Auxílio no tratamento capilar</li>
          </ul>
        </div>
        <div className="mb-4"><span className="font-bold text-[#C48B7F]">Regiões de aplicação:</span>
          <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
            <li>Abdômen</li>
            <li>Flancos</li>
            <li>Costas</li>
            <li>Culotes</li>
            <li>Coxas</li>
            <li>Glúteos</li>
            <li>Braços</li>
            <li>Face</li>
            <li>Couro cabeludo (capilar)</li>
          </ul>
        </div>
      </div>
    ),
    'botox': (
      <div className="max-w-md p-8 bg-white rounded-3xl shadow-2xl border border-[#C48B7F]/40 text-neutral-900 relative">
        <button className="absolute top-4 right-4 text-[#C48B7F] hover:text-[#a36a5c] text-xl font-bold" onClick={() => setOpenService(null)} aria-label="Fechar">×</button>
        <h3 className="font-cinzel text-2xl font-bold mb-4 text-[#C48B7F]">Botox (Toxina Botulínica)</h3>
        <p className="mb-4 text-base leading-relaxed">A toxina botulínica age relaxando temporariamente a musculatura responsável pelas linhas de expressão, prevenindo e suavizando rugas, além de ajudar no rejuvenescimento facial.</p>
        <div className="mb-4"><span className="font-bold text-[#C48B7F]">Regiões de aplicação:</span>
          <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
            <li>Testa</li><li>Glabela (entre as sobrancelhas)</li><li>Área dos olhos (Pés de galinha)</li><li>Nariz (bunny line)</li><li>Mento (queixo)</li><li>Pescoço (platisma)</li><li>Bruxismo (masseter)</li><li>Sorriso gengival</li><li>Têmporas (enxaqueca)</li><li>Hiperidrose (axilas, mãos e pés)</li>
          </ul>
        </div>
        <div className="mt-4"><span className="font-bold text-[#C48B7F]">Destaque:</span> Terço superior completo (testa, glabela e área dos olhos), que são as regiões mais procuradas.</div>
      </div>
    ),
    'secagem de vasinhos': (
      <div className="max-w-md p-8 bg-white rounded-3xl shadow-2xl border border-[#C48B7F]/40 text-neutral-900 relative">
        <button className="absolute top-4 right-4 text-[#C48B7F] hover:text-[#a36a5c] text-xl font-bold" onClick={() => setOpenService(null)} aria-label="Fechar">×</button>
        <h3 className="font-cinzel text-2xl font-bold mb-4 text-[#C48B7F]">Secagem de Vasinhos (Microvasos)</h3>
        <p className="mb-4 text-base leading-relaxed">Procedimento indicado para o tratamento de microvasos aparentes, promovendo melhora estética e uniformização da pele.</p>
      </div>
    ),
    'microagulhamento': (
      <div className="max-w-md p-8 bg-white rounded-3xl shadow-2xl border border-[#C48B7F]/40 text-neutral-900 relative">
        <button className="absolute top-4 right-4 text-[#C48B7F] hover:text-[#a36a5c] text-xl font-bold" onClick={() => setOpenService(null)} aria-label="Fechar">×</button>
        <h3 className="font-cinzel text-2xl font-bold mb-4 text-[#C48B7F]">Microagulhamento</h3>
        <p className="mb-4 text-base leading-relaxed">Técnica que utiliza microagulhas para estimular a renovação da pele, potencializando a absorção de ativos e a produção natural de colágeno.</p>
        <div className="mb-4"><span className="font-bold text-[#C48B7F]">Indicações:</span>
          <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
            <li>Uniformização de manchas</li>
            <li>Tratamento de cicatrizes de acne</li>
            <li>Tratamento de estrias</li>
            <li>Hidratação profunda</li>
            <li>Estímulo de colágeno</li>
            <li>Melhora da textura e do viço da pele</li>
          </ul>
        </div>
        <div className="mb-4"><span className="font-bold text-[#C48B7F]">Regiões tratadas:</span>
          <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
            <li>Rosto</li>
            <li>Pescoço</li>
            <li>Colo</li>
            <li>Pernas</li>
            <li>Glúteos (bumbum)</li>
            <li>Couro cabeludo</li>
          </ul>
        </div>
      </div>
    ),
      'preenchimento facial estratégico': (
        <div className="max-w-md p-8 bg-white rounded-3xl shadow-2xl border border-[#C48B7F]/40 text-neutral-900 relative">
          <button className="absolute top-4 right-4 text-[#C48B7F] hover:text-[#a36a5c] text-xl font-bold" onClick={() => setOpenService(null)} aria-label="Fechar">×</button>
          <h3 className="font-cinzel text-2xl font-bold mb-4 text-[#C48B7F]">Preenchimento com Ácido Hialurônico</h3>
          <p className="mb-4 text-base leading-relaxed">Procedimento que repõe volume, melhora contornos e hidrata profundamente a pele, proporcionando resultados naturais e harmônicos.</p>
          <div className="mb-4"><span className="font-bold text-[#C48B7F]">Áreas tratadas:</span>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
              <li>Lábios</li>
              <li>Olheiras</li>
              <li>Malar</li>
              <li>Bigode chinês</li>
              <li>Mandíbula</li>
              <li>Queixo</li>
              <li>Sulcos e linhas profundas</li>
              <li>Glúteos</li>
              <li>Rugas de marionete</li>
            </ul>
          </div>
          <div className="mt-4"><span className="font-bold text-[#C48B7F]">Destaque:</span> Preenchimento labial, focado em volume, contorno, hidratação e naturalidade.</div>
        </div>
      ),
      'fios lisos de pdo': (
        <div className="max-w-md p-8 bg-white rounded-3xl shadow-2xl border border-[#C48B7F]/40 text-neutral-900 relative">
          <button className="absolute top-4 right-4 text-[#C48B7F] hover:text-[#a36a5c] text-xl font-bold" onClick={() => setOpenService(null)} aria-label="Fechar">×</button>
          <h3 className="font-cinzel text-2xl font-bold mb-4 text-[#C48B7F]">Fios Lisos de PDO</h3>
          <p className="mb-4 text-base leading-relaxed">Utilizados exclusivamente para estímulo de colágeno, melhorando a qualidade da pele de forma gradual, sem efeito de tração.</p>
          <div className="mb-4"><span className="font-bold text-[#C48B7F]">Regiões indicadas:</span>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
              <li>Rosto</li>
              <li>Pescoço</li>
              <li>Colo</li>
              <li>Áreas com flacidez leve</li>
            </ul>
          </div>
        </div>
      ),
      'skinbooster': (
        <div className="max-w-md p-8 bg-white rounded-3xl shadow-2xl border border-[#C48B7F]/40 text-neutral-900 relative">
          <button className="absolute top-4 right-4 text-[#C48B7F] hover:text-[#a36a5c] text-xl font-bold" onClick={() => setOpenService(null)} aria-label="Fechar">×</button>
          <h3 className="font-cinzel text-2xl font-bold mb-4 text-[#C48B7F]">Skinbooster</h3>
          <p className="mb-4 text-base leading-relaxed">Tratamento injetável à base de ácido hialurônico de baixa concentração, indicado para hidratação profunda, melhora da textura, viço, sem promover volume.</p>
          <div className="mb-4"><span className="font-bold text-[#C48B7F]">Benefícios:</span>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
              <li>Hidratação intensa e prolongada</li>
              <li>Melhora da qualidade e luminosidade da pele</li>
              <li>Suaviza linhas finas</li>
              <li>Previne o envelhecimento precoce</li>
            </ul>
          </div>
          <div className="mb-4"><span className="font-bold text-[#C48B7F]">Regiões de aplicação:</span>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
              <li>Rosto</li>
              <li>Pescoço</li>
              <li>Colo</li>
              <li>Mãos</li>
            </ul>
          </div>
        </div>
      ),
      'mechas & iluminados (master)': (
        <div className="max-w-md p-8 bg-white rounded-3xl shadow-2xl border border-[#C48B7F]/40 text-neutral-900 relative">
          <button className="absolute top-4 right-4 text-[#C48B7F] hover:text-[#a36a5c] text-xl font-bold" onClick={() => setOpenService(null)} aria-label="Fechar">×</button>
          <h3 className="font-cinzel text-2xl font-bold mb-4 text-[#C48B7F]">Mechas</h3>
          <p className="mb-4 text-base leading-relaxed">Técnica de clareamento em pontos estratégicos do cabelo para criar contraste, dimensão e movimento.</p>
          <div className="mb-4">
            <span className="font-bold text-[#C48B7F]">Total blond:</span> é uma técnica voltada para quem deseja um resultado predominantemente loiro, com alto nível de clareamento e luminosidade intensa.
          </div>
          <div className="mb-4">
            <span className="font-bold text-[#C48B7F]">Iluminado:</span> é o resultado de um conjunto de poucas mechas bem posicionadas, que trazem luz, profundidade e naturalidade ao visual. A proposta é realçar a cor base, criando brilho e sofisticação sem perder a identidade do cabelo.
          </div>
          <div className="mb-4">
            <span className="font-bold text-[#C48B7F]">Blond Reverse</span><br/>
            Perfeita pra quem deseja sair do loirão e retornar ao moreno iluminado sem abrir mão da luz.<br/><br/>
            No Blond Reverse, mantemos mechas claras estrategicamente posicionadas, devolvemos profundidade ao fundo em pontos específicos e reconstruímos contraste e dimensão.<br/><br/>
            O resultado é um cabelo mais equilibrado, sofisticado e visualmente mais saudável — com luminosidade na medida certa e muito menos manutenção.
          </div>
        </div>
      ),
      'alisamentos & alinhamentos': (
        <div className="max-w-md p-8 bg-white rounded-3xl shadow-2xl border border-[#C48B7F]/40 text-neutral-900 relative">
          <button className="absolute top-4 right-4 text-[#C48B7F] hover:text-[#a36a5c] text-xl font-bold" onClick={() => setOpenService(null)} aria-label="Fechar">×</button>
          <h3 className="font-cinzel text-2xl font-bold mb-4 text-[#C48B7F]">Alisamentos e alinhamento</h3>
          <p className="mb-4 text-base leading-relaxed">Progressiva orgânica - promove alisamento e redução de volume, utiliza ativos mais suaves e livres de formol agressivo.</p>
          <p className="mb-4 text-base leading-relaxed">Alisa, alinha, dá brilho, movimento e possui alta durabilidade, com retoque aconselhado de 3 a 4 meses.</p>
          <p className="mb-4 text-base leading-relaxed">Botox-  promove disciplina, brilho e redução do frizz, mantendo o movimento natural dos fios e causando menos agressão à estrutura capilar. Com retoque aconselhado de 2 a 3 meses.</p>
        </div>
      ),
      'tratamentos capilares de luxo': (
        <div className="max-w-md p-8 bg-white rounded-3xl shadow-2xl border border-[#C48B7F]/40 text-neutral-900 relative">
          <button className="absolute top-4 right-4 text-[#C48B7F] hover:text-[#a36a5c] text-xl font-bold" onClick={() => setOpenService(null)} aria-label="Fechar">×</button>
          <h3 className="font-cinzel text-2xl font-bold mb-4 text-[#C48B7F]">Tratamentos capilares de luxo</h3>
          <div className="mb-4">
            <span className="font-bold text-[#C48B7F]">Reposição de Carbono</span>
            <p className="text-base leading-relaxed">Tratamento tecnológico que repõe massa e fortalece a fibra capilar, devolvendo resistência, brilho e vitalidade aos fios fragilizados.</p>
          </div>
          <div className="mb-4">
            <span className="font-bold text-[#C48B7F]">Hidratação</span>
            <p className="text-base leading-relaxed">Reposição de água para o cabelo. Devolve maciez, leveza e brilho, combatendo o ressecamento e a opacidade.</p>
          </div>
          <div className="mb-4">
            <span className="font-bold text-[#C48B7F]">Nutrição</span>
            <p className="text-base leading-relaxed">Reposição de lipídios (óleos). Ideal para fios porosos e com frizz, trazendo alinhamento, sedosidade e controle.</p>
          </div>
          <div className="mb-4">
            <span className="font-bold text-[#C48B7F]">Reconstrução</span>
            <p className="text-base leading-relaxed">Tratamento profundo que repõe proteínas e reestrutura fios danificados por química, devolvendo força e elasticidade.</p>
          </div>
          <div className="mb-4">
            <span className="font-bold text-[#C48B7F]">Reposição de Queratina</span>
            <p className="text-base leading-relaxed">Foco na reposição de queratina perdida, fortalecendo a fibra capilar e prevenindo quebra.</p>
          </div>
        </div>
      ),
      'penteados & dia de noiva': (
        <div className="max-w-md p-8 bg-white rounded-3xl shadow-2xl border border-[#C48B7F]/40 text-neutral-900 relative">
          <button className="absolute top-4 right-4 text-[#C48B7F] hover:text-[#a36a5c] text-xl font-bold" onClick={() => setOpenService(null)} aria-label="Fechar">×</button>
          <h3 className="font-cinzel text-2xl font-bold mb-4 text-[#C48B7F]">Penteados e dia de noiva</h3>
          <p className="mb-4 text-base leading-relaxed">Mais do que prender o cabelo, é criar uma composição que valorize o formato do rosto, o vestido e a ocasião. Do clássico ao moderno, o penteado certo traz harmonia, sofisticação e personalidade ao visual.</p>
          <p className="mb-4 text-base leading-relaxed">Deixe seu evento ainda mais especial, com uma composição que destaque o melhor de você.</p>
          <div className="mb-4">
            <span className="font-bold text-[#C48B7F]">Dia de Noiva</span>
            <p className="text-base leading-relaxed">Um momento exclusivo de cuidado e preparação para o grande dia. Envolve produção completa, organização do cronograma e um atendimento acolhedor, para que a noiva se sinta segura, tranquila e absolutamente deslumbrante. Entre em contato e conheça nossos pacotes!</p>
          </div>
        </div>
      ),
      'limpeza de pele indolor': (
        <div className="max-w-md p-8 bg-white rounded-3xl shadow-2xl border border-[#C48B7F]/40 text-neutral-900 relative">
          <button className="absolute top-4 right-4 text-[#C48B7F] hover:text-[#a36a5c] text-xl font-bold" onClick={() => setOpenService(null)} aria-label="Fechar">×</button>
          <h3 className="font-cinzel text-2xl font-bold mb-4 text-[#C48B7F]">Limpeza de pele indolor</h3>
          <p className="mb-4 text-base leading-relaxed">Limpeza de pele indolor é um tratamento que remove impurezas, células mortas e excesso de oleosidade sem causar desconforto.</p>
          <p className="mb-4 text-base leading-relaxed">Com técnicas e produtos específicos, promove higienização profunda, desobstrução dos poros e renovação da pele de forma suave, preservando a sensibilidade e mantendo o conforto durante todo o procedimento.</p>
          <p className="mb-4 text-base leading-relaxed">Resultado: pele mais limpa, luminosa e com aspecto saudável — sem sofrimento.</p>
        </div>
      ),
      'depilação a laser (inovador)': (
        <div className="max-w-md p-8 bg-white rounded-3xl shadow-2xl border border-[#C48B7F]/40 text-neutral-900 relative">
          <button className="absolute top-4 right-4 text-[#C48B7F] hover:text-[#a36a5c] text-xl font-bold" onClick={() => setOpenService(null)} aria-label="Fechar">×</button>
          <h3 className="font-cinzel text-2xl font-bold mb-4 text-[#C48B7F]">Depilação a laser</h3>
          <p className="mb-4 text-base leading-relaxed">Depilação a laser é um tratamento que utiliza tecnologia de luz para enfraquecer progressivamente o pelo desde a raiz, reduzindo seu crescimento ao longo das sessões.</p>
          <p className="mb-4 text-base leading-relaxed">É um método seguro e eficaz, que proporciona pele mais lisa, menos irritações e redução duradoura dos pelos.</p>
          <p className="mb-4 text-base leading-relaxed">Praticidade, conforto e resultado a longo prazo para quem busca liberdade na rotina de cuidados. Entre em contato e conheça nossos pacotes disponíveis!</p>
        </div>
      ),
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, type: 'spring', bounce: 0.25 }}
        className={`p-10 rounded-3xl transition-all duration-700 hover:translate-y-[-10px] relative overflow-hidden group ${highlight ? 'bg-[#1A1A1A] text-white border-b-4 border-r-4 border-[#C48B7F] shadow-2xl' : 'bg-white border border-neutral-100 shadow-sm hover:shadow-xl'}`}
      >
        <motion.h3
          initial={{ x: -40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className={`font-cinzel text-xl mb-8 flex items-center gap-3 ${highlight ? 'text-white' : 'text-neutral-900'}`}
        >
          <div className="w-2 h-6 bg-[#C48B7F] rounded-full" /> {title}
        </motion.h3>
        <ul className="space-y-5">
          {services.map((service, idx) => {
            const isPriority = priorities.some(p => service.toLowerCase().includes(p.toLowerCase()));
            const isBiomedHighlight = ["Botox", "Lipo Enzimática", "Preenchimento labial"].includes(service);
            // Serviços clicáveis
            const clickableServices = [
              "Botox",
              "Lipo Enzimática",
              "Bioestimuladores de Colágeno",
              "Secagem de Vasinhos (PEIM)",
              "Microagulhamento",
              "Preenchimento Facial Estratégico",
              "Fios Lisos de PDO",
              "Skinbooster",
              "Mechas & Iluminados (Master)",
              "Alisamentos & Alinhamentos",
              "Tratamentos Capilares de Luxo",
              "Penteados & Dia de Noiva",
              "Limpeza de Pele Indolor",
              "Depilação a Laser (Inovador)"
            ];
            let detailKey = service.toLowerCase();
            if (service === "Secagem de Vasinhos (PEIM)") detailKey = "secagem de vasinhos";
            if (service === "Microagulhamento") detailKey = "microagulhamento";
            if (service === "Botox") detailKey = "botox";
            if (service === "Preenchimento Facial Estratégico") detailKey = "preenchimento facial estratégico";
            if (service === "Fios Lisos de PDO") detailKey = "fios lisos de pdo";
            if (service === "Skinbooster") detailKey = "skinbooster";
            if (service === "Mechas & Iluminados (Master)") detailKey = "mechas & iluminados (master)";
            if (service === "Alisamentos & Alinhamentos") detailKey = "alisamentos & alinhamentos";
            if (service === "Tratamentos Capilares de Luxo") detailKey = "tratamentos capilares de luxo";
            if (service === "Penteados & Dia de Noiva") detailKey = "penteados & dia de noiva";
            if (service === "Limpeza de Pele Indolor") detailKey = "limpeza de pele indolor";
            if (service === "Depilação a Laser (Inovador)") detailKey = "depilação a laser (inovador)";
            if (clickableServices.includes(service)) {
              return (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: idx * 0.07 }}
                  className="flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 bg-[#C48B7F]`} />
                    <button
                      className={`text-sm md:text-base font-bold underline focus:outline-none ${highlight ? 'text-white hover:text-[#C48B7F]' : 'text-neutral-900 hover:text-[#C48B7F]'}`}
                      onClick={() => setOpenService(detailKey)}
                      type="button"
                      style={{ textAlign: 'left', display: 'inline', whiteSpace: 'normal', verticalAlign: 'middle', width: 'auto', margin: 0, padding: 0 }}
                    >
                      {service}
                    </button>
                  </div>
                </motion.li>
              );
            }
            return (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.07 }}
                className="flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${isPriority ? 'bg-[#C48B7F]' : (highlight ? 'bg-white/20' : 'bg-neutral-200 group-hover:bg-[#C48B7F]')}`} />
                  <span className={`text-sm md:text-base transition-colors duration-300 ${isBiomedHighlight ? 'font-bold text-neutral-900' : isPriority ? (highlight ? 'text-[#C48B7F] font-bold' : 'text-neutral-900 font-bold') : (highlight ? 'text-white/60' : 'text-neutral-500 group-hover:text-neutral-900')}`}>{service}
                  </span>
                </div>
                {isPriority && !isBiomedHighlight && (
                  <span className="text-[9px] font-bold uppercase tracking-tighter bg-[#C48B7F]/10 text-[#C48B7F] px-2 py-0.5 rounded border border-[#C48B7F]/20">Prioridade</span>
                )}
              </motion.li>
            );
          })}
        </ul>
      </motion.div>
      {/* Modal/Balão de detalhes do serviço */}
      <AnimatePresence>
        {openService && serviceDetails[openService] && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={() => setOpenService(null)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={e => e.stopPropagation()}
            >
              {serviceDetails[openService]}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const TeamCard = ({ name, role, focus, image }: { name: string, role: string, focus: string, image: string }) => (
  <motion.div
    className="group relative overflow-hidden rounded-3xl bg-white border border-neutral-100 transition-all duration-500 hover:border-[#C48B7F]/50 shadow-sm hover:shadow-2xl"
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.8, type: 'spring', bounce: 0.2 }}
  >
    <div className="aspect-[3/4] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
      <img src={image} alt={name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
    </div>
    <div className="p-8 text-center space-y-3 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-1 bg-[#C48B7F] rounded-full"></div>
      <h4 className="font-cinzel text-xl text-neutral-900 uppercase tracking-wider font-bold">{name}</h4>
      <p className="text-[#C48B7F] text-xs font-bold uppercase tracking-[0.25em]">{role}</p>
      <p className="text-neutral-400 text-[11px] leading-relaxed uppercase tracking-widest pt-2 font-medium">{focus}</p>
    </div>
  </motion.div>
);

const App: React.FC = () => {
    const [modalImg, setModalImg] = useState<{src: string, title: string} | null>(null);
  const [activeTab, setActiveTab] = useState('Todas');
  const categories = ['Todas', 'Cabelos', 'Unhas', 'Estética', 'Antes e Depois', 'Noivas'];

  // Helper para gerar título amigável
  function formatTitle(filename) {
    let name = filename.replace(/\.[^/.]+$/, ''); // remove extensão
    name = name.replace(/%20/g, ' ');
    name = name.replace(/-/g, ' ');
    name = name.replace(/_/g, ' ');
    // Corrige nomes específicos conhecidos
    name = name.replace(/penteadoformanda/i, 'Penteado Formanda');
    name = name.replace(/penteadosocial/i, 'Penteado Social');
    name = name.replace(/totalblondcorteemcamadas/i, 'Total Blond Corte em Camadas');
    name = name.replace(/cabelo \(4\)/i, 'Cabelo (4)');
    name = name.replace(/iluminadosoftbrown/i, 'Iluminado Soft Brown');
    name = name.replace(/shortbob/i, 'Short Bob');
    // Capitaliza cada palavra
    name = name.replace(/\b\w/g, l => l.toUpperCase());
    return name;
  }

  const works = [
    // Cabelos
    { category: 'Cabelos', img: '/mechas.png', title: 'Iluminado Soft Brown' },
    { category: 'Cabelos', img: '/mechas2.png', title: 'Iluminado Butter Shine' },
    { category: 'Cabelos', img: '/cabelo.jpeg', title: 'Total Blond' },
    { category: 'Cabelos', img: '/IluminadoSoftBrown.jpeg', title: formatTitle('IluminadoSoftBrown.jpeg') },
    { category: 'Cabelos', img: '/Shortbob.jpeg', title: formatTitle('Shortbob.jpeg') },
    { category: 'Cabelos', img: '/Totalblondcorteemcamadas.jpeg', title: formatTitle('Totalblondcorteemcamadas.jpeg') },
    { category: 'Cabelos', img: '/penteadoformanda.jpeg', title: formatTitle('penteadoformanda.jpeg') },
    { category: 'Cabelos', img: '/penteadosocial.jpeg', title: formatTitle('penteadosocial.jpeg') },
    // Novos trabalhos de cabelo
    { category: 'Cabelos', img: '/corte butterfly cut (cabelo liso).jpeg', title: 'Corte Butterfly Cut (Cabelo Liso)' },
    { category: 'Cabelos', img: '/totalblond.jpeg', title: 'Total Blond' },
    { category: 'Cabelos', img: '/iluminado Golden Gold.jpeg', title: 'Iluminado Golden Gold' },
    { category: 'Cabelos', img: '/corte long bob .jpeg', title: 'Corte Long Bob' },

    // Unhas (todos com o mesmo nome)
    { category: 'Unhas', img: '/unhas.png', title: 'Esmaltação em Gel' },
    { category: 'Unhas', img: '/unhas2.png', title: 'Esmaltação em Gel' },
    { category: 'Unhas', img: '/unhas3.png', title: 'Esmaltação em Gel' },
    // Placeholders para novas imagens de Unhas
    { category: 'Unhas', img: '/unhas4.jpeg', title: 'Esmaltação em Gel' },
    { category: 'Unhas', img: '/unhas5.jpeg', title: 'Esmaltação em Gel' },
    { category: 'Unhas', img: '/unhas6.jpeg', title: 'Esmaltação em Gel' },
    { category: 'Unhas', img: '/unhas7.jpeg', title: 'Esmaltação em Gel' },
    { category: 'Unhas', img: '/unhas8.jpeg', title: 'Esmaltação em Gel' },

    // Estética
    { category: 'Estética', img: '/limpeza.png', title: formatTitle('limpeza.png') },
    { category: 'Estética', img: '/preenchimento.png', title: 'Preenchimento Labial' },
    { category: 'Estética', img: '/preenchimento2.jpeg', title: 'Preenchimento Labial' },
    { category: 'Estética', img: '/botoxtesta.jpeg', title: 'Botox Testa' },
    { category: 'Estética', img: '/botoxtesta2.jpeg', title: 'Botox Testa' },
    { category: 'Estética', img: '/botoxtesta3.jpeg', title: 'Botox Testa' },
    { category: 'Estética', img: '/depilação.png', title: 'Depilação a Laser' },
    { category: 'Estética', img: '/depilação1.png', title: 'Depilação a Laser' },
    // Noivas
    { category: 'Noivas', img: '/noivas1.jpeg', title: 'Noiva' },
    { category: 'Noivas', img: '/noivas2.jpeg', title: 'Noiva' },
    { category: 'Noivas', img: '/noivas3.jpeg', title: 'Noiva' },
    { category: 'Noivas', img: '/noivas4.jpeg', title: 'Noiva' },
  ].map((w, i) => ({ ...w, id: i + 1 }));

  const filteredWorks =
    activeTab === 'Todas'
      ? works
      : works.filter(w => w.category === activeTab);

  return (
    <div className="min-h-screen selection:bg-[#C48B7F] selection:text-white bg-white text-neutral-900 overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative min-h-screen flex flex-col justify-center items-center bg-black text-white px-3 md:px-6 pt-20 md:pt-28"
        style={{ WebkitTapHighlightColor: 'transparent', willChange: 'opacity,transform', marginBottom: 0, paddingBottom: 0 }}
      >
        <div className="absolute inset-0 z-0">
          <img 
            src="/capa.jpeg" 
            alt="Joana Floriani - Especialista" 
            className="w-full h-full object-cover bg-cover bg-center bg-no-repeat opacity-75 brightness-[0.65] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-transparent to-black/80"></div>
        </div>

        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2, type: 'spring', bounce: 0.2 }}
          className="container mx-auto relative z-10 flex flex-col items-center text-center gap-y-6 md:gap-y-8"
        >
          <span className="font-cinzel text-[9px] md:text-[11px] tracking-[1.2em] text-[#C48B7F] uppercase font-bold opacity-80">
            ESTILO & SOFISTICAÇÃO
          </span>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex flex-col items-center"
          >
            <img
              src="/logo.png"
              alt="Joana Floriani"
              className="w-full max-w-[520px] md:max-w-[720px] lg:max-w-[820px] max-h-[320px] md:max-h-[400px] lg:max-h-[440px] object-contain h-auto drop-shadow-2xl"
            />
            
            <div className="flex items-center gap-6 mt-4 md:mt-6 w-full justify-center">
              <div className="h-[1px] w-12 md:w-20 bg-[#C48B7F] opacity-40"></div>
              <div className="w-2 h-2 rounded-full border border-[#C48B7F] rotate-45"></div>
              <div className="h-[1px] w-12 md:w-20 bg-[#C48B7F] opacity-40"></div>
            </div>
          </motion.div>

          <div className="space-y-2 md:space-y-3">
            <h2 className="font-cinzel text-[11px] md:text-sm tracking-[0.35em] font-light opacity-80 uppercase text-neutral-300">
              REFERÊNCIA <span className="text-[#C48B7F] font-bold mx-1">EM</span> MECHAS
            </h2>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="font-cinzel text-base md:text-xl lg:text-2xl tracking-[0.25em] font-bold text-rose-gold uppercase"
            >
              BEAUTY STUDIO PREMIUM
            </motion.h2>
          </div>

          <div className="max-w-2xl px-4">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-[9px] md:text-[10px] tracking-[0.35em] font-light text-neutral-400 uppercase leading-relaxed max-w-lg mx-auto border-t border-white/10 pt-6"
            >
              DESIGN DE BELEZA PERSONALIZADO PARA REVELAR SUA IDENTIDADE ÚNICA.
            </motion.p>
          </div>

          <div className="mt-2">
            <motion.a 
              href={WHATSAPP_URL} 
              target="_blank" 
              rel="noopener noreferrer"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 1 }}
              className="group relative bg-[#C48B7F] text-white px-10 md:px-14 py-4 md:py-5 transition-all duration-700 hover:scale-105 active:scale-95 flex items-center gap-4 overflow-hidden shadow-[0_30px_60px_rgba(196,139,127,0.3)] mb-16 md:mb-0"
            >
              <div className="absolute inset-0 w-full h-full bg-black/20 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500"></div>
              <MessageCircle size={20} fill="currentColor" className="relative z-10 text-white" />
              <span className="relative z-10 font-cinzel text-[11px] md:text-xs tracking-[0.45em] font-bold uppercase">
                Agendar seu horário
              </span>
            </motion.a>
          </div>
        </motion.div>

        {/* Stats Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.2 }}
          className="absolute bottom-6 w-full max-w-4xl px-6 flex justify-between items-center opacity-60 shadow-[0_8px_32px_0_rgba(0,0,0,0.35)] bg-black/60 rounded-2xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="text-center"
          >
            <span className="font-cinzel text-lg md:text-xl font-bold text-[#C48B7F]">4+</span>
            <p className="text-[7px] md:text-[9px] tracking-[0.3em] uppercase text-white/50 font-medium mt-1">ANOS DE DOMÍNIO</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="text-center"
          >
            <span className="font-cinzel text-lg md:text-xl font-bold text-[#C48B7F]">VIP</span>
            <p className="text-[7px] md:text-[9px] tracking-[0.3em] uppercase text-white/50 font-medium mt-1">TIMBÓ - SC</p>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Fim da seção Hero */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="bg-[#1A1A1A] py-32 relative"
      >
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#C48B7F]/10 rounded-full blur-[120px]"></div>
        <div className="container mx-auto px-6 text-center space-y-10 relative z-10">
          <div className="w-24 h-1 bg-[#C48B7F] mx-auto rounded-full"></div>
          <span className="font-script text-5xl text-[#C48B7F]">Referência em Santa Catarina</span>
          <h2 className="font-cinzel text-4xl md:text-6xl max-w-5xl mx-auto leading-tight text-white font-bold">
            “A arte do cabelo <span className="text-[#C48B7F]">iluminado individualizado</span>”
          </h2>
          <p className="text-neutral-400 max-w-3xl mx-auto text-xl font-light leading-relaxed">
            Joana Luiza Floriani, reconhecida por suas técnicas que unem saúde capilar e sofisticação nos resultados. Cada mecha é desenhada para iluminar não apenas o rosto, mas a essência de cada mulher.
          </p>
          <div className="flex justify-center gap-3">
            <div className="flex flex-col items-center w-full mt-6 mb-2">
              <p className="text-neutral-400 text-xs md:text-sm max-w-xl text-center italic font-light mb-2">É sobre criar luz, profundidade e movimento de forma estratégica e personalizada.</p>
              <div className="flex justify-center gap-2">
                {[...Array(5)].map((_, i) => <Star key={i} size={24} fill="#C48B7F" className="text-[#C48B7F]" />)}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* NOSSOS TRABALHOS */}
      <motion.section
        id="trabalhos"
        className="py-32 bg-white overflow-hidden"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center space-y-6 mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="font-cinzel text-[#C48B7F] tracking-[0.4em] text-[10px] md:text-xs uppercase font-black">
              TRANSFORMAÇÕES REAIS
            </span>
            <motion.h2
              className="font-cinzel text-4xl md:text-6xl text-neutral-900 font-bold uppercase"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Nossos Trabalhos
            </motion.h2>
            <div className="w-24 h-[1px] bg-[#C48B7F] mx-auto opacity-40"></div>
            <motion.div
              className="flex flex-wrap justify-center gap-4 md:gap-8 pt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              {categories.map((cat, idx) => (
                <motion.button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`font-cinzel text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold py-2 px-4 border-b-2 transition-all duration-300 ${
                    activeTab === cat 
                      ? 'border-[#C48B7F] text-[#C48B7F]' 
                      : 'border-transparent text-neutral-400 hover:text-neutral-600'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: 0.6 + idx * 0.1 }}
                >
                  {cat}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>

          {/* Renderização condicional dos trabalhos */}
          {(() => {
            if (activeTab === 'Antes e Depois') {
              return (
                <div className="flex flex-col items-center justify-center py-12 gap-12">
                  {/* Par 1 */}
                  <div className="flex flex-row gap-10">
                    <div className="flex flex-col items-center">
                      <span className="font-cinzel text-sm text-neutral-500 mb-3">Antes</span>
                      <img src="/antes1.jpeg" alt="Antes 1" className="w-[340px] h-[510px] object-contain rounded-2xl shadow-2xl" style={{ imageRendering: 'auto' }} />
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="font-cinzel text-sm text-neutral-500 mb-3">Depois</span>
                      <img src="/depois1.jpeg" alt="Depois 1" className="w-[340px] h-[510px] object-contain rounded-2xl shadow-2xl" style={{ imageRendering: 'auto' }} />
                    </div>
                  </div>
                  {/* Par 2 */}
                  <div className="flex flex-row gap-10">
                    <div className="flex flex-col items-center">
                      <span className="font-cinzel text-sm text-neutral-500 mb-3">Antes</span>
                      <img src="/antes2.jpeg" alt="Antes 2" className="w-[340px] h-[510px] object-contain rounded-2xl shadow-2xl" style={{ imageRendering: 'auto' }} />
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="font-cinzel text-sm text-neutral-500 mb-3">Depois</span>
                      <img src="/depois2.jpeg" alt="Depois 2" className="w-[340px] h-[510px] object-contain rounded-2xl shadow-2xl" style={{ imageRendering: 'auto' }} />
                    </div>
                  </div>
                  {/* Par 3 (corrigido) */}
                  <div className="flex flex-row gap-10">
                    <div className="flex flex-col items-center">
                      <span className="font-cinzel text-sm text-neutral-500 mb-3">Antes</span>
                      <img src="/antes3.jpeg" alt="Antes 3" className="w-[340px] h-[510px] object-contain rounded-2xl shadow-2xl" style={{ imageRendering: 'auto' }} />
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="font-cinzel text-sm text-neutral-500 mb-3">Depois</span>
                      <img src="/depois3.jpeg" alt="Depois 3" className="w-[340px] h-[510px] object-contain rounded-2xl shadow-2xl" style={{ imageRendering: 'auto' }} />
                    </div>
                  </div>
                </div>
              );
            } else {
              // Sem animação para todas as abas exceto 'Antes e Depois'
              return (
                <div className="flex flex-wrap justify-center gap-2 md:gap-6 min-h-[100px] bg-white py-6 overflow-visible">
                  {filteredWorks.length === 0 ? (
                    <div className="col-span-full text-center text-neutral-400 py-12 text-lg font-cinzel">Nenhum trabalho encontrado para esta categoria.</div>
                  ) : (
                    filteredWorks.map((work) => (
                      <div
                        key={work.id}
                        className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-700 bg-neutral-100 cursor-pointer w-[110px] h-[150px] sm:w-[160px] sm:h-[220px] md:w-[240px] md:h-[340px] lg:w-[280px] lg:h-[400px] mx-auto"
                        onClick={() => setModalImg({ src: work.img, title: work.title })}
                        tabIndex={0}
                        role="button"
                        aria-label={`Ver imagem ampliada de ${work.title}`}
                      >
                        {/* Se for card de Unhas e imagem vazia ou inexistente, mostra unhas5.jpeg */}
                        {work.category === 'Unhas' && (!work.img || work.img === '') ? (
                          <img
                            src="/unhas5.jpeg"
                            alt="Unhas 5"
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 min-h-[80px] min-w-[60px] max-h-full max-w-full aspect-square"
                            draggable={false}
                          />
                        ) : (
                          <img
                            src={work.img}
                            alt={work.title}
                            onError={e => { if (work.category === 'Unhas') e.currentTarget.src = '/unhas5.jpeg'; }}
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 min-h-[80px] min-w-[60px] max-h-full max-w-full aspect-square"
                            draggable={false}
                          />
                        )}
                        <div
                          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4 md:p-6"
                        >
                          <span className="font-cinzel text-[#C48B7F] text-[9px] uppercase tracking-widest font-bold mb-1">
                            {work.category}
                          </span>
                          <h4 className="font-cinzel text-white text-sm md:text-base tracking-wider font-bold">
                            {work.title}
                          </h4>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              );
            }
          })()}
          {/* Modal de imagem ampliada */}
          <AnimatePresence>
            {modalImg && (
              <motion.div
                className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setModalImg(null)}
                tabIndex={-1}
                aria-modal="true"
                role="dialog"
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative max-w-3xl w-full mx-4"
                  onClick={e => e.stopPropagation()}
                >
                  <button
                    className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-2 hover:bg-black/80 transition"
                    onClick={() => setModalImg(null)}
                    aria-label="Fechar imagem ampliada"
                    tabIndex={0}
                  >
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </button>
                  <img
                    src={modalImg.src}
                    alt={modalImg.title}
                    className="w-full h-auto max-h-[80vh] rounded-2xl object-contain bg-neutral-900"
                    draggable={false}
                  />
                  <div className="text-center mt-4">
                    <span className="font-cinzel text-lg md:text-xl font-bold text-white bg-black/60 px-4 py-2 rounded-xl inline-block">
                      {modalImg.title}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>

      {/* NOSSO ESPAÇO */}
      <motion.section
        id="espaco"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="py-32 bg-[#1A1A1A] relative overflow-hidden"
      >
        <div className="container mx-auto px-6">
          <div className="text-center space-y-6 mb-20">
            <span className="font-cinzel text-[#C48B7F] tracking-[0.4em] text-[10px] md:text-xs uppercase font-black">
              AMBIENTE PREMIUM
            </span>
            <h2 className="font-cinzel text-4xl md:text-6xl text-white font-bold uppercase">
              Nosso Espaço
            </h2>
            <p className="text-neutral-400 font-light text-sm md:text-lg max-w-2xl mx-auto uppercase tracking-widest">
              Um studio pensado em cada detalhe para te receber.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-12 max-w-7xl mx-auto">
            {[
              '/estudio%20(1).jpeg',
              '/estudio%20(2).jpeg',
              '/estudio%20(3).jpeg',
              '/estudio%20(4).jpeg',
              '/estudio%20(5).jpeg',
              '/estudio%20(6).jpeg',
            ].map((src, idx) => (
              <div key={idx} className="group relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-neutral-900/50">
                <img
                  src={src}
                  alt={`Nosso espaço ${idx + 1}`}
                  loading="lazy"
                  decoding="async"
                  style={{ imageRendering: 'auto' }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Services Menu Section */}
      <motion.section
        id="servicos"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="py-32 bg-[#F9F9F9] relative"
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-10">
            <div className="space-y-6">
              <span className="text-[#C48B7F] tracking-[0.5em] text-xs uppercase font-black flex items-center gap-3">
                <div className="w-12 h-1 bg-[#C48B7F] rounded-full"></div> Menu de Experiências
              </span>
              <h2 className="font-cinzel text-5xl md:text-6xl text-neutral-900 font-bold">Especialidades do Studio</h2>
            </div>
            <p className="text-neutral-400 max-w-sm text-sm uppercase tracking-[0.25em] font-bold leading-loose text-center md:text-left">
              Procedimentos premium realizados por especialistas dedicadas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="flex flex-col items-center">
              <ServiceCategory 
                title="Cabelo" 
                services={[
                  "Mechas & Iluminados (Master)",
                  "Tratamentos Capilares de Luxo",
                  "Alisamentos & Alinhamentos",
                  "Coloração & Visagismo",
                  "Penteados & Dia de Noiva",
                  "Cortes de Estilo"
                ]}
                highlight={true}
              />
              {/* Botão WhatsApp Cabelo */}
              <div className="flex justify-center items-center mt-4 w-full">
                <a
                  href="https://api.whatsapp.com/send/?phone=554792140323&text&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#C48B7F] text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-[#a36a5c] transition-all duration-300 w-full max-w-xs text-center"
                  style={{ boxShadow: '0 10px 30px rgba(196,139,127,0.15)' }}
                >
                  Chamar no WhatsApp - Joana Floriani
                </a>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <ServiceCategory 
                title="Nails & Feet" 
                services={[ 
                  "Esmaltação em Gel & Blindagens",
                  "Spa de Pés & Plástica de Pés",
                  "Manicure & Pedicure Premium",
                  "Alongamentos em Fibra",
                  "Alongamento em Molde F1"
                ]}
              />
              {/* Botão WhatsApp Nails & Feet */}
              <div className="flex justify-center items-center mt-4 w-full">
                <a
                  href="https://api.whatsapp.com/send/?phone=554796375230&text&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#C48B7F] text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-[#a36a5c] transition-all duration-300 w-full max-w-xs text-center"
                  style={{ boxShadow: '0 10px 30px rgba(196,139,127,0.15)' }}
                >
                  Chamar no WhatsApp - Caroline Hinsching
                </a>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <ServiceCategory 
                title="Estética" 
                services={[
                  "Depilação a Laser (Inovador)",
                  "Limpeza de Pele Indolor",
                  "Designer de Sobrancelhas",
                  "Depilação com Cera",
                  "Maquiagem Social de Luxo"
                ]}
              />
              {/* Botão WhatsApp Estética */}
              <div className="flex justify-center items-center mt-4 w-full">
                <a
                  href="https://api.whatsapp.com/send/?phone=554796375230&text&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#C48B7F] text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-[#a36a5c] transition-all duration-300 w-full max-w-xs text-center"
                  style={{ boxShadow: '0 10px 30px rgba(196,139,127,0.15)' }}
                >
                  Chamar no WhatsApp - Caroline Hinsching
                </a>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <ServiceCategory 
                title="Biomédica" 
                services={[
                  "Botox",
                  "Lipo Enzimática",
                  "Preenchimento labial",
                  "Tecnologias avançadas",
                  "Bioestimuladores de Colágeno",
                  "Skinbooster",
                  "Microagulhamento",
                  "Preenchimento Facial Estratégico",
                  "Secagem de Vasinhos (PEIM)",
                  "Fios Lisos de PDO"
                ]}
              />
              {/* Botão WhatsApp Biomédica */}
              <div className="flex justify-center items-center mt-4 w-full">
                <a
                  href="https://api.whatsapp.com/send/?phone=554791875335&text&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#C48B7F] text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-[#a36a5c] transition-all duration-300 w-full max-w-xs text-center"
                  style={{ boxShadow: '0 10px 30px rgba(196,139,127,0.15)' }}
                >
                  Chamar no Whatsapp - Daniele Gütz
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* DEPOIMENTOS */}
      <motion.section
        id="depoimentos"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="py-32 bg-white relative"
      >
        <div className="container mx-auto px-6">
          <div className="text-center space-y-6 mb-24">
            <span className="font-cinzel text-[#C48B7F] tracking-[0.4em] text-[10px] md:text-xs uppercase font-black">
              RECONHECIMENTO VIP
            </span>
            <h2 className="font-cinzel text-4xl md:text-6xl text-neutral-900 font-bold uppercase">
              O Que as Nossas Clientes Dizem
            </h2>
            <div className="w-24 h-[1px] bg-[#C48B7F] mx-auto opacity-40"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { 
                  name: "Carol", 
                  text: "Oiii .. só passando pra falar que eu amei vc ,não só vc, mais seu trabalho. O teu jeito de atender. Me senti realmente mto bem,e como já te conhecia a anos. Se eu conseguir o seguro, vou aí pintar o cabelo com vc", 
                  role: "Feedback" 
                },
              { 
                name: "Deise", 
                text: "Joanaaaa!!! Passando pra dizer que eu amei o meu cabelo!! Ele ficou intacto até o final da festa!! Total de 12 horas!!! Obrigado pela sua dedicação e profissionalismo sempre!! Sou sua Fã!!!!!!! Beijosss", 
                role: "Feedback" 
              },
              { 
                name: "Sara", 
                text: "Oiie amiga! Tudo bem? Sério que atendimento emm, parabéns!! 👏👏👏👏 Amei o seu trabalho, super indico de coração!! Amei tudo ❤️ Você é uma pessoa incrível!! Vai muito longe", 
                role: "Feedback" 
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-neutral-50 p-12 rounded-[3rem] border border-neutral-100 hover:bg-white hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)] transition-all duration-700 group">
                <div className="mb-8">
                  <Quote size={40} className="text-[#C48B7F] opacity-20 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#C48B7F" className="text-[#C48B7F]" />)}
                </div>
                <p className="text-neutral-700 text-lg leading-relaxed font-light mb-10 italic">
                  "{testimonial.text}"
                </p>
                <div>
                  <h4 className="font-cinzel text-neutral-900 font-bold tracking-widest text-sm uppercase">{testimonial.name}</h4>
                  <p className="text-[10px] text-[#C48B7F] uppercase tracking-[0.3em] font-black mt-1">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        id="equipe"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="py-32 bg-[#F9F9F9] relative overflow-hidden"
      >
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#C48B7F]/10 blur-[150px] rounded-full translate-x-1/2"></div>
        <div className="container mx-auto px-6">
          <div className="text-center mb-24 space-y-6">
            <span className="font-script text-5xl text-[#C48B7F]">Expertise e Acolhimento</span>
            <h2 className="font-cinzel text-4xl md:text-5xl text-neutral-900 font-bold uppercase tracking-widest">Nossa Equipe de <span className="text-[#C48B7F]">Especialistas</span></h2>
            <div className="w-32 h-1 bg-[#C48B7F] mx-auto rounded-full mt-8"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-16 max-w-7xl mx-auto">
            <TeamCard 
              name="Joana Luiza Floriani"
              role="Hair Specialist & Bridal Artist"
              focus="Especialista em Mechas, Iluminados, Penteados, Dia de Noiva e Designer de Sobrancelhas"
              image="/joana.jpeg"
            />
            <TeamCard 
              name="Caroline Hinsching Ribeiro"
              role="Nail Design & Estética"
              focus="Esmaltação em Gel, Blindagem, Spa de Pés e Designer de Sobrancelhas"
              image="/caroline.jpeg"
            />
            <TeamCard 
              name="Daniele Gütz"
              role="Biomédica Esteta"
              focus="Harmonização Facial, Botox, Laser Lavieen, Bioestimuladores e Skinbooster"
              image="/daniele.jpeg"
            />
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-[#1A1A1A] pt-40 pb-20 border-t border-neutral-800 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-24 mb-32">
            <div className="space-y-10 text-center lg:text-left">
              <div className="flex flex-col">
                <span className="font-cinzel text-xl md:text-2xl tracking-widest text-white uppercase font-bold">Joana Floriani</span>
                <span className="font-cinzel text-[10px] md:text-xs tracking-[0.5em] text-[#C48B7F] uppercase -mt-1 font-black">Beauty Studio</span>
              </div>
              <p className="text-neutral-500 text-lg leading-relaxed max-w-sm mx-auto lg:ml-0 font-light">
                O refúgio da beleza sofisticada em Timbó.<br />
                Exclusividade, excelência técnica e o cuidado que você merece
              </p>
            </div>

            <div className="space-y-10 text-center lg:text-left">
              <h4 className="font-cinzel text-2xl text-white tracking-[0.3em] uppercase font-bold">Atendimento</h4>
              <ul className="space-y-8 text-neutral-400">
                <li className="flex flex-col items-center lg:items-start gap-3">
                  <div className="flex items-center gap-4 text-[#C48B7F]">
                    <MapPin size={24} />
                    <span className="uppercase tracking-widest text-xs font-black">Localização</span>
                  </div>
                  <span className="font-medium text-lg text-white">Rua Amazonas, 480 Estados Timbó – Santa Catarina, Brasil</span>
                </li>
                <li className="flex flex-col items-center lg:items-start gap-3">
                  <div className="flex items-center gap-4 text-[#C48B7F]">
                    <Clock size={24} />
                    <span className="uppercase tracking-widest text-xs font-black">Modalidade</span>
                  </div>
                  <span className="font-medium text-lg text-white">Exclusivamente por Agendamento</span>
                </li>
              </ul>
            </div>

            <div className="space-y-10">
              <div className="bg-neutral-900 p-12 rounded-[3rem] border border-[#C48B7F]/30 text-center space-y-8 shadow-2xl">
                <h4 className="font-cinzel text-3xl text-white uppercase tracking-widest font-bold">Inicie sua Mudança</h4>
                <a 
                  href={WHATSAPP_URL} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block w-full bg-[#C48B7F] text-white font-bold py-5 rounded-full transition-all duration-700 hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(196,139,127,0.4)] tracking-[0.3em] text-xs uppercase"
                >
                  Agendar AGORA via WhatsApp
                </a>
              </div>
            </div>
          </div>
          <div className="pt-20 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-10 text-[10px] uppercase tracking-[0.4em] text-neutral-600 font-black">
            <p>© 2026 Joana Floriani Beauty Studio. Premium Experience.</p>
          </div>
        </div>
      </footer>

      {/* Conversion FAB (oculto no mobile) */}
      <a 
        href={WHATSAPP_URL} 
        target="_blank" 
        rel="noopener noreferrer"
        className="hidden sm:fixed sm:bottom-12 sm:right-12 sm:z-[100] sm:bg-[#25D366] sm:text-white sm:p-6 sm:rounded-full sm:shadow-[0_20px_50px_rgba(0,0,0,0.3)] sm:transition-all sm:duration-500 sm:hover:scale-110 sm:active:scale-90 sm:group sm:border-4 sm:border-white"
      >
        <MessageCircle size={36} />
      </a>
    </div>
  );
}

export default App;
