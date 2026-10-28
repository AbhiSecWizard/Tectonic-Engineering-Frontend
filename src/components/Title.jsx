
const Title = ({ title, subtitle, light = false }) => {
  return (
    <div className="mb-10">
      <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-secondary">
        Tectonic Engineering
      </p>

      <h2
        className={`text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl ${
          light ? "text-surface" : "text-heading"
        }`}
      >
        {title}
        <span className="text-secondary">.</span>
      </h2>

      <div className="mt-5 h-1 w-16 rounded-full bg-secondary" />

      {subtitle && (
        <p
          className={`mt-5 max-w-2xl text-base leading-8 ${
            light ? "text-slate-300" : "text-muted"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default Title;
