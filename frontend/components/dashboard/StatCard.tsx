import Card from "../common/Card";

type StatCardProps = {
  title: string;
  value: string;
  subtitle?: string;
};

export default function StatCard({
  title,
  value,
  subtitle,
}: StatCardProps) {
  return (
    <Card
      title={title}
      value={value}
      subtitle={subtitle}
    />
  );
}