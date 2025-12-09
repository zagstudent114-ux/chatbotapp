import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { format, subDays } from 'date-fns';

interface ChartData {
  date: string;
  weight: number | null;
  bodyFat: number | null;
  muscleMass: number | null;
}

export function MetricsCharts() {
  const { user } = useAuth();
  const [data, setData] = useState<ChartData[]>([]);
  const [range, setRange] = useState(30);

  useEffect(() => {
    loadChartData();
  }, [user, range]);

  const loadChartData = async () => {
    if (!user) return;

    const startDate = subDays(new Date(), range).toISOString().split('T')[0];

    const { data: metrics } = await supabase
      .from('fitness_metrics')
      .select('date, weight, body_fat_percentage, muscle_mass')
      .eq('athlete_id', user.id)
      .gte('date', startDate)
      .order('date', { ascending: true });

    if (metrics) {
      const chartData: ChartData[] = metrics.map((m) => ({
        date: format(new Date(m.date), 'MMM dd'),
        weight: m.weight,
        bodyFat: m.body_fat_percentage,
        muscleMass: m.muscle_mass,
      }));
      setData(chartData);
    }
  };

  if (data.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-6 text-center">
        <p className="text-sm text-gray-600">
          No data yet. Start logging your metrics to see charts!
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-700">Progress Charts</h3>
        <select
          value={range}
          onChange={(e) => setRange(Number(e.target.value))}
          className="text-xs border border-gray-300 rounded px-2 py-1"
        >
          <option value={7}>7 days</option>
          <option value={30}>30 days</option>
          <option value={90}>90 days</option>
        </select>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 10 }}
              stroke="#9ca3af"
            />
            <YAxis tick={{ fontSize: 10 }} stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '12px',
              }}
            />
            <Legend wrapperStyle={{ fontSize: '10px' }} />
            <Line
              type="monotone"
              dataKey="weight"
              stroke="#059669"
              strokeWidth={2}
              dot={{ r: 3 }}
              name="Weight (kg)"
            />
            <Line
              type="monotone"
              dataKey="muscleMass"
              stroke="#0d9488"
              strokeWidth={2}
              dot={{ r: 3 }}
              name="Muscle (kg)"
            />
            <Line
              type="monotone"
              dataKey="bodyFat"
              stroke="#f59e0b"
              strokeWidth={2}
              dot={{ r: 3 }}
              name="Body Fat (%)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
