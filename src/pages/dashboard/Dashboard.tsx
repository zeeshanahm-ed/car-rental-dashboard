import { FaCar, FaCalendarCheck, FaClock, FaCheckCircle, FaFileAlt } from 'react-icons/fa';
import StatisticsCard from '../../components/core-ui/statistics-card/StatisticsCard';
import RevenueGrowthChart from './components/RevenueGrowthChart';
import SubHeader from '../../components/core-ui/sub-header/SubHeader';

interface Booking {
    id: string;
    carName: string;
    date: string;
    price: number;
    status: 'Confirmed' | 'Completed' | 'Pending';
}

function Dashboard() {
    // Sample data - replace with actual API data
    const stats = {
        totalCars: 8,
        totalBookings: 8,
        pendingBookings: 8,
        completedBookings: 8,
    };

    const recentBookings: Booking[] = [
        { id: '1', carName: 'BMW 3 Series', date: '4/1/2025', price: 475, status: 'Confirmed' },
        { id: '2', carName: 'Ford Explorer', date: '3/1/2025', price: 425, status: 'Completed' },
        { id: '3', carName: 'Toyota Corolla', date: '4/5/2025', price: 225, status: 'Pending' },
        { id: '4', carName: 'Tesla Model 3', date: '4/6/2025', price: 360, status: 'Confirmed' },
    ];

    const monthlyRevenue = 1060;

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Confirmed':
                return 'bg-info/10 text-info';
            case 'Completed':
                return 'bg-success/10 text-success';
            case 'Pending':
                return 'bg-warning/10 text-warning';
            default:
                return 'bg-gray-100 text-gray-600';
        }
    };

    return (
        <section className="space-y-6">
            {/* Header */}
            <SubHeader
                title="Admin Dashboard"
                subTitle="Monitor overall platform performance including total cars, bookings, revenue, and recent activities"
            />

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 mt-10 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="relative">
                    <StatisticsCard
                        title="Total Cars"
                        statistics={stats.totalCars}
                    />
                    <div className="absolute top-5 right-4 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FaCar className="text-primary text-lg" />
                    </div>
                </div>

                <div className="relative">
                    <StatisticsCard
                        title="Total Bookings"
                        statistics={stats.totalBookings}
                    />
                    <div className="absolute top-5 right-4 w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center">
                        <FaFileAlt className="text-info text-lg" />
                    </div>
                </div>

                <div className="relative">
                    <StatisticsCard
                        title="Pending Bookings"
                        statistics={stats.pendingBookings}
                    />
                    <div className="absolute top-5 right-4 w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                        <FaClock className="text-warning text-lg" />
                    </div>
                </div>

                <div className="relative">
                    <StatisticsCard
                        title="Completed Bookings"
                        statistics={stats.completedBookings}
                    />
                    <div className="absolute top-5 right-4 w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                        <FaCheckCircle className="text-success text-lg" />
                    </div>
                </div>
            </div>
            {/* Monthly Revenue */}
            <div role="card" className="custom-card mt-6">
                <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-1">Monthly Revenue</h2>
                    <p className="text-sm opacity-90">Revenue for current month</p>
                </div>

                <div className="my-8">
                    <div className="text-5xl font-bold mb-2">${monthlyRevenue}</div>
                    <div className="flex items-center gap-2 text-sm opacity-90">
                        <FaCalendarCheck className="text-lg" />
                        <span>February 2026</span>
                    </div>
                </div>

                <RevenueGrowthChart isLoading={false} />

            </div>
            {/* Recent Bookings */}
            <div role="card" className="custom-card mt-6">
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-text-primary mb-1">Recent Bookings</h2>
                    <p className="text-sm text-text-secondary">Latest customer bookings</p>
                </div>

                <div className="space-y-4">
                    {recentBookings.map((booking) => (
                        <div
                            key={booking.id}
                            className="flex items-center justify-between p-4 rounded-lg border border-border-gray/50 hover:border-primary/30 hover:bg-background transition-all duration-200"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <FaFileAlt className="text-primary text-sm" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-text-primary">{booking.carName}</h3>
                                    <p className="text-sm text-text-secondary">{booking.date}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <p className="font-semibold text-text-secondary">${booking.price}</p>
                                <span className={`px-3 py-1 rounded-md text-xs font-medium ${getStatusColor(booking.status)}`}>
                                    {booking.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


        </section>
    );
}

export default Dashboard;