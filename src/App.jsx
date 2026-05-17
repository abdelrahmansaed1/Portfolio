import { useState, useEffect, useRef } from "react";

// ── Data ──────────────────────────────────────────────────────────────────────

const skillGroups = [
  {
    label: "Mobile Development",
    color: "#13B9FD",
    skills: [
      "Flutter",
      "Dart",
      "BLoC",
      "Provider",
      "GetX",
      "Clean Architecture",
      "Android",
      "iOS",
    ],
  },
  {
    label: "Backend & Infra",
    color: "#54C5F8",
    skills: ["Firebase", "REST APIs", "Git"],
  },
  {
    label: "Frontend Web",
    color: "#0175C2",
    skills: ["HTML", "CSS", "JavaScript", "Bootstrap", "Tailwind CSS"],
  },
];

const projects = [
  {
    num: "01",
    title: "Advanced E-Commerce App",
    desc: "Full-featured cross-platform e-commerce app built with Flutter. Product listings, cart management, user authentication, and a complete checkout flow. Targets Android, iOS, Web, and Desktop from a single codebase.",
    tags: [
      "Flutter",
      "Dart",
      "Provider",
      "Clean Architecture",
      "Cross-platform",
    ],
    link: "https://github.com/abdelrahmansaed1/Advanced-E-commerce-App-with-Flutter",
  },
];

const contactLinks = [
  {
    icon: "ti-brand-github",
    label: "GitHub",
    sublabel: "github.com/abdelrahmansaed1",
    href: "https://github.com/abdelrahmansaed1",
    color: "#54C5F8",
    bg: "rgba(84,197,248,0.07)",
    border: "rgba(84,197,248,0.18)",
  },
  {
    icon: "ti-brand-linkedin",
    label: "LinkedIn",
    sublabel: "abdelrahman-saed",
    href: "https://www.linkedin.com/in/abdelrahman-saed-21064a286/",
    color: "#0175C2",
    bg: "rgba(1,117,194,0.07)",
    border: "rgba(1,117,194,0.25)",
  },
  {
    icon: "ti-mail",
    label: "Email",
    sublabel: "abdelrahmansaeds321@gmail.com",
    href: "mailto:abdelrahmansaeds321@gmail.com",
    color: "#13B9FD",
    bg: "rgba(19,185,253,0.07)",
    border: "rgba(19,185,253,0.18)",
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function smoothScrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 700);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return mobile;
}

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Animate({ children, delay = 0, style = {} }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ── SectionLabel ──────────────────────────────────────────────────────────────

function SectionLabel({ children }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        marginBottom: "2.5rem",
      }}
    >
      <span
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 10,
          fontWeight: 700,
          color: "#13B9FD",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          background: "rgba(19,185,253,0.08)",
          border: "1px solid rgba(19,185,253,0.22)",
          padding: "5px 12px",
          borderRadius: 3,
          whiteSpace: "nowrap",
        }}
      >
        {children}
      </span>
      <div
        style={{
          flex: 1,
          height: 1,
          background:
            "linear-gradient(90deg, rgba(19,185,253,0.2), transparent)",
        }}
      />
    </div>
  );
}

// ── SkillChip ─────────────────────────────────────────────────────────────────

function SkillChip({ label, color, delay, visible }) {
  const [hov, setHov] = useState(false);
  return (
    <span
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: 11,
        padding: "5px 13px",
        borderRadius: 4,
        letterSpacing: "0.04em",
        cursor: "default",
        border: hov ? `1px solid ${color}66` : `1px solid ${color}22`,
        background: hov ? `${color}18` : `${color}08`,
        color: hov ? color : `${color}99`,
        transform: hov ? "translateY(-2px)" : "translateY(0)",
        opacity: visible ? 1 : 0,
        transition: `opacity 0.4s ease ${delay}ms, transform 0.2s, background 0.2s, border 0.2s, color 0.2s`,
      }}
    >
      {label}
    </span>
  );
}

function SkillGroup({ label, color, skills, delay }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      style={{
        marginBottom: "2rem",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-20px)",
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
      }}
    >
      <div
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 10,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color,
          marginBottom: "0.85rem",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div
          style={{
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: color,
          }}
        />
        {label}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        {skills.map((s, i) => (
          <SkillChip
            key={s}
            label={s}
            color={color}
            delay={i * 40}
            visible={visible}
          />
        ))}
      </div>
    </div>
  );
}

// ── ProjectCard ───────────────────────────────────────────────────────────────

function ProjectCard({ project }) {
  const [hov, setHov] = useState(false);
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.6s, transform 0.6s",
      }}
    >
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        onClick={() => window.open(project.link, "_blank")}
        style={{
          border: hov
            ? "1px solid rgba(19,185,253,0.35)"
            : "1px solid rgba(255,255,255,0.07)",
          borderRadius: 10,
          padding: "2rem 2rem",
          marginBottom: "1rem",
          background: hov ? "rgba(19,185,253,0.04)" : "rgba(255,255,255,0.012)",
          transition: "all 0.3s",
          cursor: "pointer",
          position: "relative",
          overflow: "hidden",
          boxShadow: hov ? "0 8px 40px rgba(19,185,253,0.08)" : "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 3,
            borderRadius: "10px 0 0 10px",
            background: "linear-gradient(180deg,#13B9FD,#0175C2)",
            opacity: hov ? 1 : 0,
            transition: "opacity 0.3s",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -60,
            right: -60,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(19,185,253,0.08) 0%, transparent 70%)",
            opacity: hov ? 1 : 0,
            transition: "opacity 0.4s",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "1rem",
          }}
        >
          <div style={{ flex: 1, paddingRight: 12 }}>
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 10,
                color: "#13B9FD",
                letterSpacing: "0.14em",
                marginBottom: "0.5rem",
                opacity: 0.55,
              }}
            >
              PROJECT {project.num}
            </div>
            <div
              style={{
                fontSize: "clamp(1rem, 3vw, 1.25rem)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                color: hov ? "#e8f8ff" : "#dddaf0",
                transition: "color 0.2s",
              }}
            >
              {project.title}
            </div>
          </div>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: hov
                ? "1px solid rgba(19,185,253,0.4)"
                : "1px solid rgba(255,255,255,0.08)",
              background: hov ? "rgba(19,185,253,0.12)" : "transparent",
              color: hov ? "#13B9FD" : "#333",
              fontSize: 16,
              transition: "all 0.25s",
              flexShrink: 0,
              marginTop: 4,
              transform: hov ? "rotate(-45deg)" : "rotate(0deg)",
            }}
          >
            ↗
          </div>
        </div>

        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 12,
            color: "#505068",
            lineHeight: 2,
            marginBottom: "1.5rem",
          }}
        >
          {project.desc}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {project.tags.map((t) => (
            <span
              key={t}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 10,
                padding: "4px 10px",
                background: hov
                  ? "rgba(19,185,253,0.08)"
                  : "rgba(255,255,255,0.03)",
                border: hov
                  ? "1px solid rgba(19,185,253,0.2)"
                  : "1px solid rgba(255,255,255,0.07)",
                color: hov ? "#13B9FDaa" : "#4a4a5a",
                borderRadius: 4,
                transition: "all 0.25s",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── NavButton ─────────────────────────────────────────────────────────────────

function NavButton({ label, active, onClick }) {
  const [hov, setHov] = useState(false);
  const [press, setPress] = useState(false);
  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => {
        setHov(false);
        setPress(false);
      }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      onClick={() => {
        setPress(true);
        setTimeout(() => setPress(false), 300);
        onClick();
      }}
      style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: 11,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        padding: "7px 16px",
        borderRadius: 6,
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        background: active
          ? "rgba(19,185,253,0.1)"
          : hov
            ? "rgba(19,185,253,0.06)"
            : "transparent",
        border: active
          ? "1px solid rgba(19,185,253,0.3)"
          : hov
            ? "1px solid rgba(19,185,253,0.15)"
            : "1px solid transparent",
        color: active ? "#13B9FD" : hov ? "rgba(19,185,253,0.7)" : "#48485e",
        transform: press ? "scale(0.93)" : "scale(1)",
        transition: "all 0.18s cubic-bezier(0.34,1.56,0.64,1)",
        boxShadow: active ? "0 0 16px rgba(19,185,253,0.12)" : "none",
      }}
    >
      {active && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "20%",
            right: "20%",
            height: 2,
            background: "linear-gradient(90deg,#0175C2,#13B9FD)",
            borderRadius: 2,
          }}
        />
      )}
      {label}
    </button>
  );
}

// ── HeroButton ────────────────────────────────────────────────────────────────

function HeroButton({ children, onClick, primary }) {
  const [hov, setHov] = useState(false);
  const [press, setPress] = useState(false);
  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => {
        setHov(false);
        setPress(false);
      }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      onClick={onClick}
      style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: 11,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        padding: "0.85rem 1.75rem",
        borderRadius: 6,
        cursor: "pointer",
        fontWeight: primary ? 700 : 400,
        background: primary
          ? hov
            ? "linear-gradient(135deg,#1ea8e8,#0175C2)"
            : "linear-gradient(135deg,#13B9FD,#0175C2)"
          : hov
            ? "rgba(19,185,253,0.08)"
            : "transparent",
        color: primary ? "#fff" : hov ? "#13B9FD" : "#707080",
        border: primary
          ? "none"
          : hov
            ? "1px solid rgba(19,185,253,0.3)"
            : "1px solid rgba(255,255,255,0.09)",
        boxShadow: primary
          ? hov
            ? "0 6px 24px rgba(19,185,253,0.35)"
            : "0 2px 12px rgba(1,117,194,0.25)"
          : "none",
        transform: press
          ? "scale(0.96)"
          : hov
            ? "translateY(-2px)"
            : "scale(1)",
        transition: "all 0.2s cubic-bezier(0.34,1.56,0.64,1)",
      }}
    >
      {children}
    </button>
  );
}

// ── ContactCard ───────────────────────────────────────────────────────────────

function ContactCard({
  icon,
  label,
  sublabel,
  href,
  color,
  bg,
  border,
  mobile,
}) {
  const [hov, setHov] = useState(false);

  if (mobile) {
    // Row layout for mobile: icon | label + sublabel | arrow
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          textDecoration: "none",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "0.9rem",
          padding: "1rem 1.25rem",
          borderRadius: 10,
          width: "100%",
          border: hov ? `1px solid ${color}50` : `1px solid ${border}`,
          background: hov ? `${color}12` : bg,
          transform: hov ? "translateX(4px)" : "translateX(0)",
          transition: "all 0.25s",
          boxShadow: hov ? `0 6px 24px ${color}18` : "none",
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: hov ? `${color}22` : `${color}0e`,
            border: `1px solid ${color}${hov ? "44" : "22"}`,
            transition: "all 0.25s",
          }}
        >
          <i
            className={`ti ${icon}`}
            style={{
              fontSize: 22,
              color: hov ? color : `${color}bb`,
              transition: "color 0.25s",
            }}
          />
        </div>
        {/* Text */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: "'Syne',sans-serif",
              fontWeight: 700,
              fontSize: 13,
              color: hov ? color : "#c0bdde",
              marginBottom: 2,
              transition: "color 0.2s",
            }}
          >
            {label}
          </div>
          <div
            style={{
              fontFamily: "'Space Mono',monospace",
              fontSize: 9,
              color: "#404055",
              letterSpacing: "0.02em",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {sublabel}
          </div>
        </div>
        {/* Arrow */}
        <span
          style={{
            fontSize: 14,
            color: hov ? color : "#2a2a3a",
            transition: "all 0.2s",
            transform: hov ? "translate(2px,-2px)" : "none",
            flexShrink: 0,
          }}
        >
          ↗
        </span>
      </a>
    );
  }

  // Desktop: vertical card
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        textDecoration: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem 1.5rem",
        borderRadius: 12,
        gap: "1rem",
        border: hov ? `1px solid ${color}50` : `1px solid ${border}`,
        background: hov ? `${color}12` : bg,
        transform: hov ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        boxShadow: hov ? `0 16px 40px ${color}20` : "none",
        flex: 1,
        minWidth: 0,
      }}
    >
      {/* Icon circle */}
      <div
        style={{
          width: 60,
          height: 60,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: hov ? `${color}22` : `${color}0e`,
          border: `1px solid ${color}${hov ? "44" : "22"}`,
          transition: "all 0.3s",
        }}
      >
        <i
          className={`ti ${icon}`}
          style={{
            fontSize: 28,
            color: hov ? color : `${color}cc`,
            transition: "color 0.3s",
          }}
        />
      </div>
      {/* Text */}
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontFamily: "'Syne',sans-serif",
            fontWeight: 700,
            fontSize: 14,
            color: hov ? color : "#c0bdde",
            marginBottom: 5,
            transition: "color 0.2s",
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontFamily: "'Space Mono',monospace",
            fontSize: 10,
            color: "#404055",
            letterSpacing: "0.03em",
            wordBreak: "break-all",
            lineHeight: 1.6,
          }}
        >
          {sublabel}
        </div>
      </div>
      {/* Arrow */}
      <div
        style={{
          fontFamily: "'Space Mono',monospace",
          fontSize: 10,
          color: hov ? color : "#303042",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          transition: "color 0.2s",
          display: "flex",
          alignItems: "center",
          gap: 4,
        }}
      >
        Visit{" "}
        <span
          style={{
            transform: hov ? "translate(2px,-2px)" : "none",
            display: "inline-block",
            transition: "transform 0.2s",
          }}
        >
          ↗
        </span>
      </div>
    </a>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function Portfolio() {
  const [activeNav, setActiveNav] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 80);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["hero", "skills", "work", "experience", "contact"];
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveNav(e.target.id);
        }),
      { rootMargin: "-38% 0px -58% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  // Close mobile menu on scroll
  useEffect(() => {
    const onScroll = () => {
      if (menuOpen) setMenuOpen(false);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  const navItems = [
    { id: "work", label: "Work" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ];

  function handleNav(id) {
    smoothScrollTo(id);
    setMenuOpen(false);
  }

  return (
    <div
      style={{
        fontFamily: "'Syne','Segoe UI',sans-serif",
        background: "#050d1a",
        color: "#e4e2ef",
        minHeight: "100vh",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;700;800&display=swap"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css"
      />

      {/* BG grid */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          backgroundImage: `linear-gradient(rgba(1,117,194,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(1,117,194,0.03) 1px,transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />
      <div
        style={{
          position: "fixed",
          top: -300,
          right: -200,
          width: 700,
          height: 700,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(19,185,253,0.08) 0%,transparent 65%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: -200,
          left: -100,
          width: 550,
          height: 550,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(1,117,194,0.06) 0%,transparent 65%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ── Navbar ── */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem 1.5rem",
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: scrolled ? "rgba(5,13,26,0.97)" : "rgba(5,13,26,0.75)",
          backdropFilter: "blur(20px)",
          borderBottom: scrolled
            ? "1px solid rgba(19,185,253,0.15)"
            : "1px solid rgba(19,185,253,0.07)",
          boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.5)" : "none",
          transition: "all 0.3s",
        }}
      >
        {/* Logo */}
        <button
          onClick={() => handleNav("hero")}
          style={{
            fontFamily: "'Space Mono',monospace",
            fontSize: isMobile ? 12 : 13,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          <span style={{ color: "#54C5F8", fontWeight: 700 }}>abdelrahman</span>
          <span style={{ color: "#0175C2" }}>.dev</span>
          <span
            style={{
              color: "#13B9FD",
              animation: "cursor-blink 1.1s step-end infinite",
              display: "inline-block",
            }}
          >
            _
          </span>
        </button>

        {/* Desktop nav */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.2rem" }}>
            {navItems.map(({ id, label }) => (
              <NavButton
                key={id}
                label={label}
                active={activeNav === id}
                onClick={() => handleNav(id)}
              />
            ))}
            <a
              href="https://github.com/abdelrahmansaed1"
              target="_blank"
              rel="noreferrer"
              style={{
                fontFamily: "'Space Mono',monospace",
                fontSize: 11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginLeft: "0.75rem",
                background: "linear-gradient(135deg,#0175C2,#02569B)",
                color: "#fff",
                fontWeight: 700,
                padding: "7px 16px",
                borderRadius: 6,
                textDecoration: "none",
                boxShadow: "0 2px 12px rgba(1,117,194,0.3)",
              }}
            >
              GitHub ↗
            </a>
          </div>
        )}

        {/* Hamburger */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen((o) => !o)}
            style={{
              background: "none",
              border: "1px solid rgba(19,185,253,0.25)",
              borderRadius: 6,
              padding: "6px 8px",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              gap: 4,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: 18,
                  height: 2,
                  background: "#13B9FD",
                  borderRadius: 2,
                  transform: menuOpen
                    ? i === 0
                      ? "rotate(45deg) translate(4px,4px)"
                      : i === 2
                        ? "rotate(-45deg) translate(4px,-4px)"
                        : "opacity:0"
                    : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                  transition: "all 0.25s",
                }}
              />
            ))}
          </button>
        )}
      </nav>

      {/* Mobile dropdown menu */}
      {isMobile && (
        <div
          style={{
            position: "fixed",
            top: 57,
            left: 0,
            right: 0,
            zIndex: 99,
            background: "rgba(5,13,26,0.99)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(19,185,253,0.12)",
            padding: menuOpen ? "1rem 1.5rem 1.5rem" : "0 1.5rem",
            maxHeight: menuOpen ? 300 : 0,
            overflow: "hidden",
            transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}
          >
            {navItems.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => handleNav(id)}
                style={{
                  fontFamily: "'Space Mono',monospace",
                  fontSize: 12,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  padding: "0.75rem 1rem",
                  borderRadius: 6,
                  cursor: "pointer",
                  textAlign: "left",
                  background:
                    activeNav === id ? "rgba(19,185,253,0.08)" : "transparent",
                  border:
                    activeNav === id
                      ? "1px solid rgba(19,185,253,0.25)"
                      : "1px solid transparent",
                  color: activeNav === id ? "#13B9FD" : "#666",
                  transition: "all 0.2s",
                }}
              >
                {label}
              </button>
            ))}
            <a
              href="https://github.com/abdelrahmansaed1"
              target="_blank"
              rel="noreferrer"
              style={{
                fontFamily: "'Space Mono',monospace",
                fontSize: 12,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "0.75rem 1rem",
                borderRadius: 6,
                textAlign: "center",
                marginTop: "0.4rem",
                background: "linear-gradient(135deg,#0175C2,#02569B)",
                color: "#fff",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              GitHub ↗
            </a>
          </div>
        </div>
      )}

      {/* ── Page ── */}
      <div
        style={{
          maxWidth: 860,
          margin: "0 auto",
          padding: isMobile ? "0 1.25rem" : "0 2rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* ── Hero ── */}
        <section
          id="hero"
          style={{ padding: isMobile ? "4rem 0 3.5rem" : "6.5rem 0 5.5rem" }}
        >
          {/* Status badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginBottom: "2rem",
              fontFamily: "'Space Mono',monospace",
              fontSize: isMobile ? 9 : 10,
              color: "#13B9FD",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              border: "1px solid rgba(19,185,253,0.25)",
              padding: "5px 14px",
              borderRadius: 20,
              background: "rgba(19,185,253,0.05)",
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                background: "#13B9FD",
                borderRadius: "50%",
                animation: "blink 2s infinite",
                flexShrink: 0,
              }}
            />
            Software Engineer · Graduated 2026
          </div>

          {/* Name */}
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
            }}
          >
            <h1
              style={{
                fontSize: isMobile
                  ? "clamp(1.8rem, 7vw, 2.2rem)"
                  : "clamp(3rem, 7vw, 5.4rem)",
                fontWeight: 800,
                lineHeight: 1.06,
                letterSpacing: isMobile ? "-0.02em" : "-0.04em",
                margin: 0,
              }}
            >
              Abdelrahman
            </h1>
            <h1
              style={{
                fontSize: isMobile
                  ? "clamp(2rem, 9.5vw, 2.8rem)"
                  : "clamp(3rem, 7vw, 5.4rem)",
                fontWeight: 800,
                lineHeight: 1.06,
                letterSpacing: isMobile ? "-0.02em" : "-0.04em",
                marginBottom: "1.2rem",
                WebkitTextStroke: isMobile
                  ? "1px rgba(19,185,253,0.5)"
                  : "1.5px rgba(19,185,253,0.5)",
                color: "transparent",
              }}
            >
              Sa'ed.
            </h1>
          </div>

          {/* Role */}
          <div
            style={{
              fontFamily: "'Space Mono',monospace",
              fontSize: isMobile ? 11 : 14,
              marginBottom: "1.75rem",
              background: "linear-gradient(90deg,#13B9FD,#0175C2)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s ease 0.35s, transform 0.7s ease 0.35s",
            }}
          >
            // Flutter Developer & Software Engineer
          </div>

          {/* Sub */}
          <p
            style={{
              fontFamily: "'Space Mono',monospace",
              fontSize: isMobile ? 11 : 13,
              color: "#505068",
              lineHeight: 2.1,
              maxWidth: 460,
              marginBottom: "2.75rem",
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s ease 0.45s, transform 0.7s ease 0.45s",
            }}
          >
            Building cross-platform mobile apps with{" "}
            <span style={{ color: "#13B9FD" }}>Flutter & Dart</span>.<br />
            Clean architecture, great UX, production-ready code.
          </p>

          {/* CTA */}
          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              flexWrap: "wrap",
              marginBottom: "3.5rem",
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s ease 0.55s, transform 0.7s ease 0.55s",
            }}
          >
            <HeroButton primary onClick={() => smoothScrollTo("work")}>
              View Projects →
            </HeroButton>
            <HeroButton onClick={() => smoothScrollTo("contact")}>
              Contact Me
            </HeroButton>
          </div>

          {/* Stats — wraps gracefully on mobile */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              background: "rgba(19,185,253,0.07)",
              borderRadius: 8,
              overflow: "hidden",
              width: isMobile ? "100%" : "fit-content",
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.7s ease 0.65s, transform 0.7s ease 0.65s",
            }}
          >
            {[
              { num: "1+", label: "Projects" },
              { num: "4+", label: "Platforms" },
              { num: "TS2G", label: "Training" },
              { num: "3", label: "Skill Areas" },
            ].map(({ num, label }) => (
              <div
                key={label}
                style={{
                  padding: isMobile ? "0.8rem 0" : "1rem 1.75rem",
                  background: "#050d1a",
                  flex: isMobile ? "1 1 calc(50% - 1px)" : "none",
                  textAlign: isMobile ? "center" : "left",
                }}
              >
                <div
                  style={{
                    fontSize: isMobile ? "1.1rem" : "1.35rem",
                    fontWeight: 800,
                    letterSpacing: "-0.03em",
                    background: "linear-gradient(135deg,#13B9FD,#0175C2)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {num}
                </div>
                <div
                  style={{
                    fontFamily: "'Space Mono',monospace",
                    fontSize: 9,
                    color: "#1a2a3a",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    marginTop: 3,
                    whiteSpace: "nowrap",
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Skills ── */}
        <section
          id="skills"
          style={{
            padding: "4rem 0",
            borderTop: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <Animate>
            <SectionLabel>Skills & Stack</SectionLabel>
          </Animate>
          {skillGroups.map((g, i) => (
            <SkillGroup key={g.label} {...g} delay={i * 120} />
          ))}
        </section>

        {/* ── Projects ── */}
        <section
          id="work"
          style={{
            padding: "4rem 0",
            borderTop: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <Animate>
            <SectionLabel>Projects</SectionLabel>
          </Animate>
          {projects.map((p, i) => (
            <ProjectCard key={i} project={p} />
          ))}
        </section>

        {/* ── Experience ── */}
        <section
          id="experience"
          style={{
            padding: "4rem 0",
            borderTop: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <Animate>
            <SectionLabel>Experience</SectionLabel>
          </Animate>
          <Animate delay={100}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "170px 1fr",
                gap: isMobile ? "1rem" : "2.5rem",
              }}
            >
              {/* Timeline */}
              <div style={{ paddingTop: isMobile ? 0 : 6 }}>
                <div
                  style={{
                    fontFamily: "'Space Mono',monospace",
                    fontSize: 10,
                    color: "#13B9FD",
                    letterSpacing: "0.05em",
                    lineHeight: 2.1,
                    border: "1px solid rgba(19,185,253,0.15)",
                    borderRadius: 6,
                    padding: "8px 12px",
                    background: "rgba(19,185,253,0.04)",
                    display: "inline-block",
                  }}
                >
                  Apr 2026 — May 2026
                </div>
                {!isMobile && (
                  <div
                    style={{
                      marginTop: 12,
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <div
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "#34d399",
                      }}
                    />
                    <div
                      style={{
                        fontFamily: "'Space Mono',monospace",
                        fontSize: 9,
                        color: "#34d399",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}
                    >
                      1 month
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div>
                <div
                  style={{
                    display: "inline-block",
                    fontFamily: "'Space Mono',monospace",
                    fontSize: 9,
                    color: "#34d399",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    marginBottom: "0.75rem",
                    background: "rgba(52,211,153,0.07)",
                    border: "1px solid rgba(52,211,153,0.18)",
                    padding: "4px 10px",
                    borderRadius: 3,
                  }}
                >
                  Training · Internship
                </div>
                <div
                  style={{
                    fontSize: "1.15rem",
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                    marginBottom: "0.4rem",
                  }}
                >
                  Flutter Developer
                </div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: "1.1rem",
                    background: "rgba(19,185,253,0.05)",
                    border: "1px solid rgba(19,185,253,0.15)",
                    borderRadius: 6,
                    padding: "6px 12px",
                  }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 2,
                      background: "linear-gradient(135deg,#13B9FD,#0175C2)",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'Space Mono',monospace",
                      fontSize: isMobile ? 11 : 12,
                      color: "#54C5F8",
                      letterSpacing: "0.03em",
                      fontWeight: 700,
                    }}
                  >
                    Technical Solutions To Globe
                  </span>
                  <span
                    style={{
                      fontFamily: "'Space Mono',monospace",
                      fontSize: 10,
                      color: "#1a4a6a",
                      letterSpacing: "0.06em",
                    }}
                  >
                    · TS2G
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: "'Space Mono',monospace",
                    fontSize: 12,
                    color: "#505068",
                    lineHeight: 2,
                    marginBottom: "1.25rem",
                  }}
                >
                  Trained intensively in Flutter mobile development at TS2G — a
                  Palestinian tech company specializing in software and digital
                  solutions. Designed and shipped a complete e-commerce
                  application from scratch.
                </p>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 8 }}
                >
                  {[
                    "Built Advanced E-Commerce App (Android, iOS, Web, Desktop)",
                    "Applied Provider state management and Clean Architecture",
                    "Integrated Firebase for auth and real-time data",
                  ].map((item, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        gap: 10,
                        alignItems: "flex-start",
                      }}
                    >
                      <div
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: "50%",
                          background: "#13B9FD",
                          marginTop: 6,
                          flexShrink: 0,
                        }}
                      />
                      <span
                        style={{
                          fontFamily: "'Space Mono',monospace",
                          fontSize: 11,
                          color: "#5a5a7a",
                          lineHeight: 1.7,
                        }}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Animate>
        </section>

        {/* ── Contact ── */}
        <section
          id="contact"
          style={{
            padding: "4rem 0",
            borderTop: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <Animate>
            <SectionLabel>Contact</SectionLabel>
          </Animate>

          <Animate delay={60}>
            <div style={{ marginBottom: "2.5rem" }}>
              <h2
                style={{
                  fontSize: isMobile ? "1.8rem" : "2.2rem",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.15,
                  marginBottom: "1rem",
                }}
              >
                Let's build
                <br />
                <span
                  style={{
                    background: "linear-gradient(90deg,#13B9FD,#0175C2)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  something great.
                </span>
              </h2>
              <p
                style={{
                  fontFamily: "'Space Mono',monospace",
                  fontSize: 12,
                  color: "#505068",
                  lineHeight: 2,
                }}
              >
                Open to full-time roles, freelance contracts, and interesting
                side projects.
              </p>
            </div>
          </Animate>

          {/* Contact cards */}
          <Animate delay={140}>
            <div
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                gap: isMobile ? "0.6rem" : "1rem",
              }}
            >
              {contactLinks.map((c) => (
                <ContactCard key={c.href} {...c} mobile={isMobile} />
              ))}
            </div>
          </Animate>
        </section>
      </div>

      {/* Footer */}
      <footer
        style={{
          padding: "2rem 1.5rem",
          borderTop: "1px solid rgba(255,255,255,0.04)",
          textAlign: "center",
          fontFamily: "'Space Mono',monospace",
          fontSize: 11,
          color: "#1e1e30",
          letterSpacing: "0.06em",
          position: "relative",
          zIndex: 1,
        }}
      >
        © 2026 Abdelrahman Saed — crafted with Flutter passion & late nights
      </footer>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.25} }
        @keyframes cursor-blink { 0%,100%{opacity:1} 50%{opacity:0} }
        html, body { margin: 0; padding: 0; background: #050d1a; }
        * { box-sizing: border-box; }
        button { font-family: inherit; }
        button:focus-visible, a:focus-visible { outline: 2px solid #13B9FD; outline-offset: 3px; }
        h1 { word-break: keep-all; overflow-wrap: normal; }
        @media (max-width: 500px) {
          .contact-card { min-width: 100% !important; }
        }
      `}</style>
    </div>
  );
}
