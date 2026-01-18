import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart } from 'recharts';
import { DailyAggregate } from '../../utils/progressReplay';

interface ReadinessChartProps {
  aggregates: DailyAggregate[];
  metric: 'readiness' | 'attempts' | 'grade9Speed';
}

export function ReadinessChart({ aggregates, metric }: ReadinessChartProps) {
  const chartData = aggregates.map(day => {
    const date = new Date(day.date);
    return {
      date: date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
      readiness: day.readinessPct,
      attempts: day.attemptsCount,
      grade9Speed: aggregates.slice(0, aggregates.indexOf(day) + 1).reduce((sum, d) => sum + d.grade9SpeedCount, 0),
    };
  });

  const getMetricLabel = () => {
    if (metric === 'readiness') return 'Readiness %';
    if (metric === 'attempts') return 'Attempts';
    return 'Grade 9 Speed (Cumulative)';
  };

  const getMetricKey = () => {
    if (metric === 'readiness') return 'readiness';
    if (metric === 'attempts') return 'attempts';
    return 'grade9Speed';
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="p-3 rounded-xl shadow-lg"
          style={{ background: 'rgb(var(--surface))', border: '1px solid rgb(var(--surface-2))' }}
        >
          <p className="text-sm font-bold mb-2" style={{ color: 'rgb(var(--text))' }}>
            {payload[0].payload.date}
          </p>
          <p className="text-xs font-semibold" style={{ color: 'rgb(var(--text-secondary))' }}>
            {getMetricLabel()}: <span style={{ color: 'rgb(var(--accent))' }}>{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  if (metric === 'attempts') {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(var(--text-secondary), 0.1)" />
          <XAxis
            dataKey="date"
            tick={{ fill: 'rgb(var(--text-secondary))', fontSize: 12, fontWeight: 600 }}
            stroke="rgba(var(--text-secondary), 0.2)"
          />
          <YAxis
            tick={{ fill: 'rgb(var(--text-secondary))', fontSize: 12, fontWeight: 600 }}
            stroke="rgba(var(--text-secondary), 0.2)"
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="attempts" fill="rgb(var(--accent))" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(var(--text-secondary), 0.1)" />
        <XAxis
          dataKey="date"
          tick={{ fill: 'rgb(var(--text-secondary))', fontSize: 12, fontWeight: 600 }}
          stroke="rgba(var(--text-secondary), 0.2)"
        />
        <YAxis
          tick={{ fill: 'rgb(var(--text-secondary))', fontSize: 12, fontWeight: 600 }}
          stroke="rgba(var(--text-secondary), 0.2)"
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey={getMetricKey()}
          stroke="rgb(var(--accent))"
          strokeWidth={3}
          dot={{ fill: 'rgb(var(--accent))', r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
