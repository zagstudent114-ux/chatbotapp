import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Plus, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { MetricsModal } from './MetricsModal';
import { NutritionModal } from './NutritionModal';
import { MetricsCharts } from './MetricsCharts';

interface MetricsSummary {
  latestWeight: number | null;
  latestBodyFat: number | null;
  latestMuscleMass: number | null;
  latestWorkoutScore: number | null;
  latestRecoveryScore: number | null;
  weightChange: number | null;
  todayCalories: number | null;
  todayProtein: number | null;
  todayCarbs: number | null;
  todayFats: number | null;
}

export function MetricsPanel() {
  const { user } = useAuth();
  const [showMetricsModal, setShowMetricsModal] = useState(false);
  const [showNutritionModal, setShowNutritionModal] = useState(false);
  const [summary, setSummary] = useState<MetricsSummary>({
    latestWeight: null,
    latestBodyFat: null,
    latestMuscleMass: null,
    latestWorkoutScore: null,
    latestRecoveryScore: null,
    weightChange: null,
    todayCalories: null,
    todayProtein: null,
    todayCarbs: null,
    todayFats: null,
  });

  useEffect(() => {
    loadMetricsSummary();
  }, [user]);

  const loadMetricsSummary = async () => {
    if (!user) return;

    const { data: metrics } = await supabase
      .from('fitness_metrics')
      .select('*')
      .eq('athlete_id', user.id)
      .order('date', { ascending: false })
      .limit(2);

    const { data: nutrition } = await supabase
      .from('nutrition_logs')
      .select('*')
      .eq('athlete_id', user.id)
      .eq('date', new Date().toISOString().split('T')[0]);

    const latest = metrics?.[0];
    const previous = metrics?.[1];

    const todayCalories = nutrition?.reduce((sum, log) => sum + (log.calories || 0), 0) || 0;
    const todayProtein = nutrition?.reduce((sum, log) => sum + (log.protein_grams || 0), 0) || 0;
    const todayCarbs = nutrition?.reduce((sum, log) => sum + (log.carbs_grams || 0), 0) || 0;
    const todayFats = nutrition?.reduce((sum, log) => sum + (log.fats_grams || 0), 0) || 0;

    setSummary({
      latestWeight: latest?.weight || null,
      latestBodyFat: latest?.body_fat_percentage || null,
      latestMuscleMass: latest?.muscle_mass || null,
      latestWorkoutScore: latest?.workout_performance_score || null,
      latestRecoveryScore: latest?.recovery_score || null,
      weightChange:
        latest?.weight && previous?.weight ? latest.weight - previous.weight : null,
      todayCalories: todayCalories > 0 ? todayCalories : null,
      todayProtein: todayProtein > 0 ? todayProtein : null,
      todayCarbs: todayCarbs > 0 ? todayCarbs : null,
      todayFats: todayFats > 0 ? todayFats : null,
    });
  };

  const getTrendIcon = (value: number | null) => {
    if (value === null) return <Minus className="w-4 h-4 text-gray-400" />;
    if (value > 0) return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (value < 0) return <TrendingDown className="w-4 h-4 text-red-600" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  return (
    <div className="h-full flex flex-col overflow-y-auto">
      <div className="p-4 md:p-6 border-b border-gray-200">
        <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4">Your Metrics</h2>

        <div className="space-y-2 md:space-y-3">
          <button
            onClick={() => setShowMetricsModal(true)}
            className="w-full bg-emerald-600 text-white px-4 py-2 md:py-3 text-sm md:text-base rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Log Metrics
          </button>

          <button
            onClick={() => setShowNutritionModal(true)}
            className="w-full bg-teal-600 text-white px-4 py-2 md:py-3 text-sm md:text-base rounded-lg font-medium hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Log Nutrition
          </button>
        </div>
      </div>

      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        <div>
          <h3 className="text-xs md:text-sm font-semibold text-gray-700 mb-2 md:mb-3">Body Composition</h3>
          <div className="space-y-2 md:space-y-3">
            <div className="bg-gray-50 rounded-lg p-3 md:p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-600">Weight</span>
                {getTrendIcon(summary.weightChange)}
              </div>
              <div className="text-xl md:text-2xl font-bold text-gray-900">
                {summary.latestWeight ? `${summary.latestWeight} kg` : '-'}
              </div>
              {summary.weightChange !== null && (
                <div className="text-xs text-gray-500 mt-1">
                  {summary.weightChange > 0 ? '+' : ''}
                  {summary.weightChange.toFixed(1)} kg
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 md:gap-3">
              <div className="bg-gray-50 rounded-lg p-3 md:p-4">
                <div className="text-xs text-gray-600 mb-1">Body Fat</div>
                <div className="text-base md:text-lg font-bold text-gray-900">
                  {summary.latestBodyFat ? `${summary.latestBodyFat}%` : '-'}
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 md:p-4">
                <div className="text-xs text-gray-600 mb-1">Muscle Mass</div>
                <div className="text-base md:text-lg font-bold text-gray-900">
                  {summary.latestMuscleMass ? `${summary.latestMuscleMass} kg` : '-'}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xs md:text-sm font-semibold text-gray-700 mb-2 md:mb-3">Performance</h3>
          <div className="grid grid-cols-2 gap-2 md:gap-3">
            <div className="bg-gray-50 rounded-lg p-3 md:p-4">
              <div className="text-xs text-gray-600 mb-1">Workout</div>
              <div className="text-base md:text-lg font-bold text-gray-900">
                {summary.latestWorkoutScore ? `${summary.latestWorkoutScore}/10` : '-'}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 md:p-4">
              <div className="text-xs text-gray-600 mb-1">Recovery</div>
              <div className="text-base md:text-lg font-bold text-gray-900">
                {summary.latestRecoveryScore ? `${summary.latestRecoveryScore}/10` : '-'}
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xs md:text-sm font-semibold text-gray-700 mb-2 md:mb-3">Today's Nutrition</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Calories</span>
              <span className="font-semibold text-gray-900">
                {summary.todayCalories ? `${summary.todayCalories.toFixed(0)} kcal` : '-'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Protein</span>
              <span className="font-semibold text-gray-900">
                {summary.todayProtein ? `${summary.todayProtein.toFixed(0)}g` : '-'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Carbs</span>
              <span className="font-semibold text-gray-900">
                {summary.todayCarbs ? `${summary.todayCarbs.toFixed(0)}g` : '-'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Fats</span>
              <span className="font-semibold text-gray-900">
                {summary.todayFats ? `${summary.todayFats.toFixed(0)}g` : '-'}
              </span>
            </div>
          </div>
        </div>

        <MetricsCharts />
      </div>

      {showMetricsModal && (
        <MetricsModal
          onClose={() => {
            setShowMetricsModal(false);
            loadMetricsSummary();
          }}
        />
      )}

      {showNutritionModal && (
        <NutritionModal
          onClose={() => {
            setShowNutritionModal(false);
            loadMetricsSummary();
          }}
        />
      )}
    </div>
  );
}
