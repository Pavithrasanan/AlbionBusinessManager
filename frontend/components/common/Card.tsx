type CardProps = {
  title: string;
  value: string;
  subtitle?: string;
};

export default function Card({
  title,
  value,
  subtitle,
}: CardProps) {
  return (
    <div className="rounded-xl bg-slate-800 p-5 shadow-lg border border-slate-700">
      <h3 className="text-sm text-slate-400">{title}</h3>

      <h2 className="mt-2 text-3xl font-bold text-white">
        {value}
      </h2>

      {subtitle && (
        <p className="mt-2 text-sm text-green-400">
          {subtitle}
        </p>
      )}
    </div>
  );
}