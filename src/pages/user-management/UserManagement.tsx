import { useCallback, useState } from "react";
import type { GetUsersParams } from "./core/_modules";
//components
import { Input, Pagination, Select } from "antd";
import SubHeader from "../../components/core-ui/sub-header/SubHeader";
import StatisticsCard from "../../components/core-ui/statistics-card/StatisticsCard";
import UsersTable from "./components/UsersTable";
import UsersTableSkeleton from "./components/UsersTableSkeleton";
//hooks
import { debounce } from "../../helpers/CustomHelpers";
import useGetAllUserData from "./core/hooks/useGetAllUserData";
import { STATUS_OPTIONS } from "../../constants/global";
//icons
import SearchIcon from "../../assets/icons/search-icon.svg?react";
import ArrowDownIcon from "../../assets/icons/arrow-dropdown-icon.svg?react";

const UserManagement = () => {

    const [search, setSearch] = useState('');
    const [params, setParams] = useState<GetUsersParams>({
        page: 1,
        limit: 10,
        role: undefined,
        search: undefined,
        status: undefined
    });

    const { usersData, pagination, isPending, statistics } = useGetAllUserData(params);

    const debouncedSetParams = useCallback(
        debounce((value: string) => {
            setParams(prev => ({ ...prev, search: value }))
        }, 600),
        []
    );

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        debouncedSetParams(e.target.value.trim());
    };

    const handlePageChange = (page: number) => {
        setParams(prev => ({ ...prev, page }));
    };

    return (
        <section>
            <SubHeader
                title="Users & Roles"
                subTitle="Manage system users and their roles."
            />
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-6 gap-3 xl:gap-4">
                <StatisticsCard
                    title="Total Users"
                    statistics={statistics?.totalUsers || 0}
                />
                <StatisticsCard
                    title="Active Users"
                    statistics={statistics?.totalActive || 0}
                />
                <StatisticsCard
                    title="Inactive Users"
                    statistics={statistics?.totalInactive || 0}
                />
            </div>
            <div className='flex items-center gap-4 mt-6'>
                <Input
                    value={search}
                    onChange={handleSearch}
                    placeholder="Search users..."
                    prefix={<SearchIcon className='mr-2' />}
                    className='w-full min-w-[300px] bg-transparent!'
                    allowClear
                />
                <Select
                    options={STATUS_OPTIONS}
                    placeholder="Status"
                    allowClear
                    className='w-80 bg-transparent!'
                    suffixIcon={<ArrowDownIcon />}
                    onChange={value => setParams(prev => ({ ...prev, status: value, page: 1 }))}
                />
            </div>

            <div className='mt-6'>

                {isPending ?
                    <UsersTableSkeleton />
                    :
                    <>
                        <UsersTable usersData={usersData} totalUsers={pagination?.total} />
                    </>
                }

                {pagination?.total > params?.limit &&
                    <Pagination
                        className="mt-8! justify-center"
                        current={params?.page}
                        pageSize={params?.limit}
                        total={pagination?.total}
                        onChange={handlePageChange}
                        showSizeChanger={false}
                    />}
            </div>

        </section>
    )
}

export default UserManagement;