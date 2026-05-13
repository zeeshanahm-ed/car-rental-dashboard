import type { ReactNode } from "react";
import { Button } from "antd";

import ArrowBackIcon from "../../../assets/icons/arrow-back-icon.svg?react"

interface SubHeaderProps {
    title: string | ReactNode;
    subTitle?: string | ReactNode;
    primaryButton?: string;
    secondaryButton?: string;
    primaryButtonIcon?: ReactNode;
    secondaryButtonIcon?: ReactNode;
    className?: string;
    showBackButton?: boolean;
    onPrimaryButtonClick?: () => void;
    onSecondaryButtonClick?: () => void;
    onBackButtonClick?: () => void;
}

const SubHeader = (props: SubHeaderProps) => {
    const { title, subTitle, primaryButton = "", showBackButton, onPrimaryButtonClick, onSecondaryButtonClick, onBackButtonClick, secondaryButton = "", primaryButtonIcon = <></>, secondaryButtonIcon = <></> } = props;
    return (
        <div className="flex justify-between items-start pt-1">
            <div className="flex gap-2.5">
                {showBackButton && <Button onClick={onBackButtonClick} variant="text" type="text" className="px-2!">
                    <ArrowBackIcon className="text-text-secondary" />
                </Button>}
                <div className="flex flex-col ">
                    <h1 className="text-3xl font-bold text-text-primary mb-2">{title}</h1>
                    <p className="font-normal text-text-secondary">{subTitle}</p>
                </div>
            </div>

            {primaryButton || secondaryButton ?
                <div className="flex items-center gap-2.5">
                    {secondaryButton &&
                        <Button onClick={onSecondaryButtonClick} icon={secondaryButtonIcon} type="default" variant="text" className="h-11! bg-background! border-primary! text-primary! w-52 font-medium! gap-2.5! shadow-none!">
                            {secondaryButton}
                        </Button>
                    }
                    {primaryButton &&
                        <Button onClick={onPrimaryButtonClick} icon={primaryButtonIcon} type="primary" className="h-11! w-fit font-medium! gap-2.5! shadow-none!">
                            {primaryButton}
                        </Button>
                    }
                </div>
                : null
            }
        </div >
    )
}

export default SubHeader