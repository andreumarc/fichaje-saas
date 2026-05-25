import type { Metadata } from 'next'
import { BarChart3, Users, Shield, TrendingUp } from "lucide-react";
import { ImpulsoDentIcon } from "@/components/ImpulsoDentIcon";

export const metadata: Metadata = {
  title: 'Iniciar sesión',
  description: 'Accede a Fichajes ImpulsoDent. Control de jornada laboral con geolocalización y modo kiosco para tu clínica dental.',
  robots: { index: false, follow: false },
}

// Canonical ImpulsoDent suite features — identical across all apps.
const FEATURES = [
  { icon: BarChart3,  label: "Analítica financiera en tiempo real" },
  { icon: Users,      label: "Gestión centralizada de equipos" },
  { icon: Shield,     label: "Acceso seguro y con roles" },
  { icon: TrendingUp, label: "KPIs y reportes automáticos" },
];

// Per-app footer / form panel labels are passed via children (login page).
// The left panel is identical across the suite.
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* ── Left panel ─────────────────────────────────────────────── */}
      <div
        className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: "#003A70" }}
      >
        {/* Decorative circles */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-white/5" />
        <div className="absolute top-1/2 left-2/3 w-56 h-56 rounded-full" style={{ background: "rgba(0,169,157,0.08)" }} />

        {/* Brand logo — identical across the ImpulsoDent suite */}
        <div className="relative z-10 flex items-center gap-3">
          <ImpulsoDentIcon size={40} bg="#0d9488" />
          <div className="flex flex-col leading-tight">
            <span className="text-white font-bold text-xl tracking-tight">
              Impulso<span style={{ color: "#26c6bf" }}>Dent</span>
            </span>
            <span className="text-xs font-medium" style={{ color: "#8ba8c0" }}>
              Suite de Aplicaciones
            </span>
          </div>
        </div>

        {/* Headline */}
        <div className="relative z-10 space-y-4">
          <h1 className="text-4xl font-bold text-white leading-tight">
            Toda tu clínica,
            <br />
            <span style={{ color: "#26c6bf" }}>en un solo lugar.</span>
          </h1>
          <p className="text-base" style={{ color: "#8ba8c0" }}>
            Accede a todas las herramientas de la suite ImpulsoDent desde un único panel.
          </p>

          {/* Feature cards */}
          <div className="grid grid-cols-2 gap-3 mt-6">
            {FEATURES.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="rounded-xl px-4 py-3 flex items-center gap-3"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  backdropFilter: "blur(4px)",
                }}
              >
                <Icon style={{ width: 18, height: 18, color: "#26c6bf", flexShrink: 0 }} />
                <span className="text-white text-xs font-medium leading-tight">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs relative z-10" style={{ color: "#3d5a75" }}>
          © {new Date().getFullYear()} ImpulsoDent · Todos los derechos reservados
        </p>
      </div>

      {/* ── Right panel — form slot ────────────────────────────────── */}
      <div className="flex w-full lg:w-1/2 flex-col items-center justify-center bg-white p-8">
        {children}
      </div>
    </div>
  );
}
