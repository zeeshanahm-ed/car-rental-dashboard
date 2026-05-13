import { Skeleton } from "antd";
import { USERS_TABLE_HEADERS } from "../../../constants/global";

export default function UsersTableSkeleton() {
    // Generate 10 skeleton rows to match typical page size
    const skeletonRows = Array.from({ length: 10 });

    return (
        <div role="card" className="custom-card">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <h1 className="text-xl font-medium">All Users</h1>
            </div>

            {/* Table */}
            <div className="border border-border-gray rounded-lg overflow-auto">
                <table className="w-full min-w-[1140px]">
                    <thead>
                        <tr className="bg-background border-b border-border-gray">
                            {USERS_TABLE_HEADERS.map((header) => (
                                <th
                                    key={header.key}
                                    className="px-4 py-4 text-left text-base font-medium "
                                >
                                    {header.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {skeletonRows.map((_, index) => (
                            <tr
                                key={index}
                                className="border-b border-[#E6E6E6] transition-all duration-300"
                            >
                                {/* User Column */}
                                <td className="px-4 py-3">
                                    <span className="flex items-center gap-2">
                                        <Skeleton.Avatar active />
                                        <Skeleton active paragraph={{ rows: 0 }} />
                                    </span>
                                </td>

                                {/* Email Column */}
                                <td className="px-4 py-3">
                                    <Skeleton active paragraph={{ rows: 0 }} />
                                </td>

                                {/* Role Column */}
                                <td className="px-4 py-3">
                                    <Skeleton active paragraph={{ rows: 0 }} />
                                </td>

                                {/* Status Column */}
                                <td className="px-4 py-3">
                                    <Skeleton active paragraph={{ rows: 0 }} />
                                </td>

                                {/* Last Login Column */}
                                <td className="px-4 py-3">
                                    <Skeleton active paragraph={{ rows: 0 }} />
                                </td>

                                {/* Actions Column */}
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <Skeleton.Button active size="small" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
