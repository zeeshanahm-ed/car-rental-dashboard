import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { getShortMonthName } from "../../../helpers/CustomHelpers";
import FallbackLoader from "../../../components/core-ui/fallback-loader/FallbackLoader";

interface RevenueItem {
    year: number;
    month: string;
    date: string;
    revenueGenerated: number;
}

const data = [
    {
        "year": 2026,
        "month": "January",
        "date": "2026-01-14T07:48:22.719Z",
        "revenueGenerated": 13547
    },
    {
        "year": 2026,
        "month": "February",
        "date": "2026-02-01T00:00:00.000Z",
        "revenueGenerated": 10547
    },
    {
        "year": 2026,
        "month": "March",
        "date": "2026-03-01T00:00:00.000Z",
        "revenueGenerated": 14547
    },
    {
        "year": 2026,
        "month": "April",
        "date": "2026-04-01T00:00:00.000Z",
        "revenueGenerated": 13547
    },
    {
        "year": 2026,
        "month": "May",
        "date": "2026-05-01T00:00:00.000Z",
        "revenueGenerated": 15547
    },
    {
        "year": 2026,
        "month": "June",
        "date": "2026-06-01T00:00:00.000Z",
        "revenueGenerated": 9547
    },
    {
        "year": 2026,
        "month": "July",
        "date": "2026-07-01T00:00:00.000Z",
        "revenueGenerated": 0
    },
    {
        "year": 2026,
        "month": "August",
        "date": "2026-08-01T00:00:00.000Z",
        "revenueGenerated": 13547
    },
    {
        "year": 2026,
        "month": "September",
        "date": "2026-09-01T00:00:00.000Z",
        "revenueGenerated": 1347
    },
    {
        "year": 2026,
        "month": "October",
        "date": "2026-10-01T00:00:00.000Z",
        "revenueGenerated": 0
    },
    {
        "year": 2026,
        "month": "November",
        "date": "2026-11-01T00:00:00.000Z",
        "revenueGenerated": 137
    },
    {
        "year": 2026,
        "month": "December",
        "date": "2026-12-01T00:00:00.000Z",
        "revenueGenerated": 11547
    }
]

interface RevenueGrowthChartProps {
    isLoading?: boolean;
    data?: RevenueItem[];
}

function RevenueGrowthChart({ isLoading }: RevenueGrowthChartProps) {
    // Transform backend data into recharts format
    const formattedData = (data || []).map(item => ({
        name: getShortMonthName(item.month),
        Revenue: item.revenueGenerated,
    }));

    // Derive a dynamic Y-axis domain and ticks based on the data
    const revenueValues = formattedData.map(item => item.Revenue);
    const maxRevenue = revenueValues.length ? Math.max(...revenueValues) : 0;
    const paddedMax = maxRevenue === 0 ? 100000 : Math.ceil(maxRevenue * 1.1); // add 10% headroom
    const desiredTickCount = 5;
    const tickStep = paddedMax / desiredTickCount;
    const dynamicTicks = Array.from({ length: desiredTickCount + 1 }, (_, idx) =>
        Math.round(idx * tickStep),
    );

    return (
        <div>
            <h2 className="text-xl font-semibold text-text-primary mb-2">Revenue Growth</h2>
            <div className="w-full h-80">
                {isLoading ?
                    <FallbackLoader size="large" className="h-80" />
                    :
                    <ResponsiveContainer>
                        <AreaChart
                            data={formattedData}
                            margin={{ top: 10, right: 30, left: 15, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#1A73E8" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#1A73E8" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis
                                dataKey="name"
                                tick={{ fill: "#9ca3af", fontSize: 12, fontWeight: 400 }}
                            />
                            <YAxis
                                tick={{ fill: "#9ca3af", fontSize: 12, fontWeight: 400 }}
                                domain={[0, paddedMax]}
                                ticks={dynamicTicks}
                            />
                            <Tooltip />
                            <Area
                                type="monotone"
                                dataKey="Revenue"
                                stroke="#1A73E8"
                                strokeWidth={2}
                                strokeDasharray="4 4"
                                fillOpacity={0.8}
                                fill="url(#colorRevenue)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                }
            </div>
        </div>
    );
}

export default RevenueGrowthChart;
