import { useState } from 'react';
import { Pagination, Empty } from 'antd';
import { FaEye, FaTrash, FaUsers, FaCog } from 'react-icons/fa';
import { ALL_CARS } from '../../constants/global';
import SubHeader from '../../components/core-ui/sub-header/SubHeader';

export interface Car {
    id: string;
    name: string;
    image: string;
    seats: number;
    transmission: 'automatic' | 'manual';
    category: 'Economy' | 'Luxury' | 'SUV' | 'Sedan';
    price: number;
    status: 'Available' | 'Not Available';
}

const tableHeaders = [
    { label: "Car", showFilter: false },
    { label: "Category", showFilter: false },
    { label: "Price", showFilter: false },
    { label: "Status", showFilter: false },
    { label: "Actions", showFilter: false },
];

function ManageCars() {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    // Pagination logic
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentCars = ALL_CARS.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleView = (carId: string) => {
        console.log('View car:', carId);
        // Add navigation to car details page
    };

    const handleDelete = (carId: string) => {
        console.log('Delete car:', carId);
        // Add delete confirmation modal
    };

    return (
        <section>
            {/* Header */}
            <SubHeader
                title="Manage Cars"
                subTitle="View all listed cars, update their details, or remove them from the booking platform"
            />

            {/* Cars Table */}
            <div role="card" className="custom-card mt-10">
                <h2 className="text-2xl font-bold text-text-primary mb-2">All Cars {ALL_CARS.length}</h2>
                <div className="border border-border-gray rounded-lg overflow-auto">
                    <table className="w-full min-w-[1140px]">
                        <thead>
                            <tr className="bg-background border-b border-border-gray">
                                {tableHeaders.map((header) => (
                                    <th
                                        key={header.label}
                                        className="px-4 py-4 text-left text-base font-medium"
                                    >
                                        {header.label}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {currentCars && currentCars.length > 0 ? (
                                <>
                                    {currentCars.map((car) => (
                                        <tr
                                            key={car.id}
                                            className="border-b border-[#E6E6E6] hover:bg-background-hover transition-all duration-300"
                                        >
                                            {/* Car Column */}
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-16 h-auto rounded-lg bg-background flex items-center justify-center overflow-hidden shrink-0">
                                                        <img
                                                            src={car.image}
                                                            alt={car.name}
                                                            className="w-full h-full object-contain"
                                                        />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-text-primary mb-1">{car.name}</h3>
                                                        <div className="flex items-center gap-3 text-xs text-text-secondary">
                                                            <span className="flex items-center gap-1">
                                                                <FaUsers className="text-xs" />
                                                                {car.seats} seats
                                                            </span>
                                                            <span className="w-1 h-1 rounded-full bg-text-secondary"></span>
                                                            <span className="flex items-center gap-1">
                                                                <FaCog className="text-xs" />
                                                                {car.transmission}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Category Column */}
                                            <td className="px-4 py-4">
                                                <span className="text-sm text-text-primary">{car.category}</span>
                                            </td>

                                            {/* Price Column */}
                                            <td className="px-4 py-4">
                                                <span className="text-sm font-semibold text-text-primary">${car.price}/day</span>
                                            </td>

                                            {/* Status Column */}
                                            <td className="px-4 py-4">
                                                <span
                                                    className={`px-3 py-1 rounded-md text-xs font-medium ${car.status === 'Available'
                                                        ? 'bg-success/10 text-success'
                                                        : 'bg-danger/10 text-danger'
                                                        }`}
                                                >
                                                    {car.status}
                                                </span>
                                            </td>

                                            {/* Actions Column */}
                                            <td className="px-4 py-4">
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={() => handleView(car.id)}
                                                        className="w-9 h-9 cursor-pointer rounded-lg bg-background hover:bg-primary/10 flex items-center justify-center text-text-secondary hover:text-primary transition-all duration-200"
                                                        title="View Details"
                                                    >
                                                        <FaEye className="text-base" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(car.id)}
                                                        className="w-9 h-9 cursor-pointer rounded-lg bg-background hover:bg-danger/10 flex items-center justify-center text-text-secondary hover:text-danger transition-all duration-200"
                                                        title="Delete Car"
                                                    >
                                                        <FaTrash className="text-sm" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </>
                            ) : (
                                <tr>
                                    <td colSpan={5}>
                                        <Empty />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {currentCars && currentCars.length > 0 && (
                    <div className="mt-6 flex justify-center">
                        <Pagination
                            current={currentPage}
                            total={ALL_CARS.length}
                            pageSize={pageSize}
                            onChange={handlePageChange}
                        />
                    </div>
                )}
            </div>
        </section>
    );
}

export default ManageCars;