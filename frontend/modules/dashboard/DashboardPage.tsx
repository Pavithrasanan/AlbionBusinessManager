import DashboardHeader from "./components/DashboardHeader";
import DashboardStats from "./components/DashboardStats";
import AIWidget from "./components/AIWidget";
import MissionWidget from "./components/MissionWidget";
import MarketWidget from "./components/MarketWidget";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <div className="mx-auto max-w-7xl space-y-6">
        <DashboardHeader />

        <DashboardStats />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <AIWidget />
          <MissionWidget />
        </div>

        <MarketWidget />
      </div>
    </main>
  );
}