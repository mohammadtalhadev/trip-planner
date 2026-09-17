import { GlassCard } from '../../components/common/GlassCard';
import { Chip } from '../../components/common/Chip';

export function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          TripPlanner
        </h1>

        <p className="text-xl text-center text-slate-600 mb-12">
          Smart travel planning web application â€” discover destinations, build multi-day itineraries, manage trip budgets, and save favorite places.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <GlassCard elevation="level2" className="hover:shadow-xl transition-shadow cursor-pointer">
            <h3 className="text-xl font-semibold mb-4">Discover Destinations</h3>
            <p className="text-slate-500 mb-6">
              Search for cities, countries, and landmarks with detailed information
            </p>
            <div className="flex gap-2">
              <Chip label="Explore" />
            </div>
          </GlassCard>

          <GlassCard elevation="level2" className="hover:shadow-xl transition-shadow cursor-pointer">
            <h3 className="text-xl font-semibold mb-4">Build Itineraries</h3>
            <p className="text-slate-500 mb-6">
              Create day-by-day plans with activities, timing, and notes
            </p>
            <div className="flex gap-2">
              <Chip label="Start Planning" />
            </div>
          </GlassCard>

          <GlassCard elevation="level2" className="hover:shadow-xl transition-shadow cursor-pointer">
            <h3 className="text-xl font-semibold mb-4">Manage Budget</h3>
            <p className="text-slate-500 mb-6">
              Track expenses and stay within your travel budget
            </p>
            <div className="flex gap-2">
              <Chip label="Track Spending" />
            </div>
          </GlassCard>

          <GlassCard elevation="level2" className="hover:shadow-xl transition-shadow cursor-pointer">
            <h3 className="text-xl font-semibold mb-4">Save Places</h3>
            <p className="text-slate-500 mb-6">
              Bookmark your favorite spots for easy access later
            </p>
            <div className="flex gap-2">
              <Chip label="View Saved" />
            </div>
          </GlassCard>

          <GlassCard elevation="level2" className="hover:shadow-xl transition-shadow cursor-pointer">
            <h3 className="text-xl font-semibold mb-4">Trip Dashboard</h3>
            <p className="text-slate-500 mb-6">
              Overview of your upcoming and past trips
            </p>
            <div className="flex gap-2">
              <Chip label="View Dashboard" />
            </div>
          </GlassCard>

          <GlassCard elevation="level2" className="hover:shadow-xl transition-shadow cursor-pointer">
            <h3 className="text-xl font-semibold mb-4">User Preferences</h3>
            <p className="text-slate-500 mb-6">
              Customize currency, units, theme and more
            </p>
            <div className="flex gap-2">
              <Chip label="Settings" />
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
