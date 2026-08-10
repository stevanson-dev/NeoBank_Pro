export default function GlassCard({ children, className = "" }) {
  return (
    <div
      className={`bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl ${className}`}
    >
      {children}
    </div>
  );
}