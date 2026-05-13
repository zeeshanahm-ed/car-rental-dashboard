import dayjs from "dayjs";
import { showErrorMessage } from "../utils/messageUtils";

export function debounce<T extends (...args: any[]) => void>(
    func: T,
    delay: number
): (...args: Parameters<T>) => void {
    let timer: ReturnType<typeof setTimeout>;
    return (...args: Parameters<T>) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, delay);
    };
};

export const getShortMonthName = (month: string) => {
    const months: Record<string, string> = {
        January: "Jan",
        February: "Feb",
        March: "Mar",
        April: "Apr",
        May: "May",
        June: "Jun",
        July: "Jul",
        August: "Aug",
        September: "Sep",
        October: "Oct",
        November: "Nov",
        December: "Dec",
    };
    return months[month] || month;
};

export const handleErrorMineImg: React.EventHandler<React.SyntheticEvent<HTMLImageElement, Event>> = (e) => {
    const target = e.target as HTMLImageElement;
    target.src = 'https://www.pngfind.com/pngs/m/676-6764065_default-profile-picture-transparent-hd-png-download.png'
};

export const formatFileSize = (bytes: number | undefined): number => {
    if (!bytes) return 0;
    const mb = bytes / (1024 * 1024);
    return parseFloat(mb.toFixed(2));
};

export const getFirstCharacterOfTheName = (name: string = "") => {
    return name.trim().charAt(0).toUpperCase();
};

export const getRandomLightColor = (seed = ''): string => {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash) % 360;
    return `hsl(${hue}, 70%, 85%)`;
};

export const getLeadStageStatusColor = (status: string) => {
    switch (status) {
        case "Contacted":
            return 'bg-[#1A73E80F] text-primary';
        case "Negotiation":
            return 'bg-[#F5880B0F] text-warning';
        case "Mature":
        case "Converted":
            return 'bg-[#16A34A0F] text-success';
        default:
            return 'bg-[#1A73E80F] text-primary';
    }
};

export const getLeadSourceStatusColor = (status: string) => {
    switch (status) {
        case "Upwork":
            return 'border-[#6FDA44] text-[#6FDA44]';
        case "Referral":
            return 'border-[#F5880B] text-warning';
        case "Fiver":
            return 'border-[#1DBF73] text-[#1DBF73]';
        case "WhatsApp":
            return 'border-[#25D366] text-[#25D366]';
        default:
            return 'border-primary text-primary';;
    };
};

export const getClientServiceStatusColor = (status: string) => {
    switch (status) {
        case "Project-based":
            return 'bg-primary';
        case "Support and Maintenance":
            return 'bg-warning';
        case "Resource Allocation":
            return 'bg-success';
        default:
            return 'bg-[#1A73E80F] text-primary';;
    }
};

export const generateStrongPassword = (length: number = 12) => {
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()-_=+[]{};:,.<>?";

    const allChars = lowercase + uppercase + numbers + symbols;

    // Ensure at least one character from each group
    let password = [
        lowercase[Math.floor(Math.random() * lowercase.length)],
        uppercase[Math.floor(Math.random() * uppercase.length)],
        numbers[Math.floor(Math.random() * numbers.length)],
        symbols[Math.floor(Math.random() * symbols.length)]
    ];

    for (let i = password.length; i < length; i++) {
        password.push(allChars[Math.floor(Math.random() * allChars.length)]);
    }

    // Shuffle to avoid predictable positions
    for (let i = password.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [password[i], password[j]] = [password[j], password[i]];
    }

    return password.join("");
};

export const STATUS_COLOR_MAP: Record<string, string> = {
    "In Progress": 'bg-primary',
    "Planning": 'bg-primary',
    "At Risk": 'bg-[#DC262614] text-danger!',
    "Completed": 'bg-success',
    "Cancelled": 'bg-gray',
    "Full Paid": 'bg-primary',
    "In Escrow": 'bg-gray',
    "Not Started": 'bg-gray',
    "Approved": 'bg-success',
    "Rejected": 'bg-gray',
    "Pending": 'bg-primary',
    "Active": 'bg-success',
    "Inactive": 'bg-gray',
    "ACTIVE": 'bg-success',
    "INACTIVE": 'bg-gray',
    "Contacted": 'bg-[#E8F1FF] ',
    "Negotiation": 'bg-[#FEF3C7] ',
    "Mature": 'bg-[#DCFCE7]',
};

export const getStatusColor = (status?: string) => {
    if (!status) {
        return { style: { backgroundColor: getRandomLightColor('default') } };
    }
    const className = STATUS_COLOR_MAP[status];
    if (className) {
        return { className };
    }
    return { className: getRandomLightColor(status) };
};

export const handleDownloadFile = async (url: string, fileName: string) => {
    try {
        const downloadUrl = url;
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error: unknown) {
        console.error(error);
        showErrorMessage((error as any)?.message || 'Error downloading the file.');
    }
};

export const formatTimeline = (startDate?: string, endDate?: string) => {
    if (!startDate || !endDate) return "-";

    const start = dayjs(startDate);
    const end = dayjs(endDate);

    const startFormatted = start.format("MMMM YYYY");
    const endFormatted = end.format("MMMM YYYY");

    return `${startFormatted} - ${endFormatted}`;
};
