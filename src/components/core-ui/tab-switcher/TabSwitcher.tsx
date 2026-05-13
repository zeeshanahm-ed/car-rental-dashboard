import { Button } from "antd";

type Tab = {
    label: string;
    count?: number;
};

type TabSwitcherProps = {
    selectedTab: number;
    onSelectTab: (index: number) => void;
    tabs: Tab[];
    className?: string
};

function TabSwitcher({ selectedTab, onSelectTab, tabs, className }: TabSwitcherProps) {

    return (
        <div className={`flex gap-4 items-center relative text-center border-b border-b-border-gray! ${className}`}>
            {tabs.map((tab, index) => (
                <div key={index} className='w-[300px] relative'>
                    <Button
                        variant="text"
                        type="text"
                        className={`h-12 w-full bg-transparent border-none gap-3 px-3 transition font-medium text-lg relative justify-center ${selectedTab === index ? 'text-primary!' : 'text-gray'}`}
                        onClick={() => onSelectTab(index)}
                    >
                        {tab.label}
                        <div className={`absolute -bottom-0.5 rounded-tr-sm rounded-tl-sm h-1 ${selectedTab === index ? 'bg-primary w-full' : ''}`} />
                    </Button>
                </div>
            ))}
        </div>
    );
}

export default TabSwitcher;
