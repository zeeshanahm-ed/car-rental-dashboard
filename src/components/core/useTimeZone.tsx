import { useMemo } from "react";
import { getAllTimezones, getCountryForTimezone, type Timezone } from "countries-and-timezones";

export interface TimezoneOption {
    label: string;
    value: string;
}

export const useTimeZone = (): TimezoneOption[] => {
    const timezoneOptions = useMemo(() => {
        // Get all timezones
        const allTimezones = getAllTimezones();

        // Transform into "(GMT±HH:MM) City, Country" format
        const options = Object.values(allTimezones)
            .map((tz: Timezone) => {
                // Get the most relevant country for this timezone
                const country = getCountryForTimezone(tz.name);

                // Extract city/location name from timezone string (e.g., "Pacific/Midway" -> "Midway")
                const city = tz.name.split("/")[1]?.replace(/_/g, " ") || tz.name.split("/")[0];

                // Format city name (capitalize first letter of each word)
                const formattedCity = city
                    .split(" ")
                    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                    .join(" ");

                // Build label in GMT format: "(GMT-11:00) Midway Island, Samoa"
                const label = `(GMT${tz.utcOffsetStr}) ${formattedCity}, ${country?.name || "Unknown"}`;

                if (!country) {
                    return null; // Skip entries without a resolved country to avoid "Unknown"
                }
                return {
                    label,
                    value: tz.name,
                    utcOffset: tz.utcOffset // Store offset for sorting
                };
            })
            // Remove entries where country was missing
            .filter((option): option is { label: string; value: string; utcOffset: number } => option !== null)
            // Sort by UTC offset for better UX
            .sort((a, b) => a.utcOffset - b.utcOffset)
            // Remove utcOffset from final options
            .map(({ utcOffset, ...option }) => option);

        return options;
    }, []);

    return timezoneOptions;
};
