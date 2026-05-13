import { Spin } from 'antd';

interface StatisticsCardProps {
    title: string;
    statistics: string | number;
    percentage?: string | number;
    className?: string;
    isLoading?: boolean;
}

const StatisticsCard = ({
    title,
    statistics = 0,
    percentage,
    isLoading = false,
    className = ''
}: StatisticsCardProps) => {
    return (
        <div
            role='button'
            className={`custom-card cursor-auto! ${className}`} >
            {/* Title */}
            <p className="text-sm text-text-secondary font-normal mb-2 flex items-center justify-between">
                {title}
            </p>

            {/* Data */}
            <div className='space-y-1.5'>
                {isLoading ?
                    <Spin size="default" className="mt-2!" />
                    :
                    <>
                        <h3 className="text-xl xl:text-2xl font-semibold text-black">
                            {statistics}
                        </h3>
                        {percentage && <p className="text-xs text-success">
                            +{percentage}%
                        </p>}
                    </>
                }
            </div>

        </div>
    );
};

export default StatisticsCard;
