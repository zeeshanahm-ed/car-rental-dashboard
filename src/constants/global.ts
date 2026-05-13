import type { Car } from "../pages/manage-cars/ManageCars";

export const ALL_CARS: Car[] = [
    {
        id: '1',
        name: 'Toyota Corolla',
        image: '/images/toyota_yaris.png',
        seats: 5,
        transmission: 'automatic',
        category: 'Economy',
        price: 45,
        status: 'Available'
    },
    {
        id: '2',
        name: 'Honda Civic',
        image: '/images/honda_BRV.png',
        seats: 5,
        transmission: 'automatic',
        category: 'Economy',
        price: 48,
        status: 'Not Available'
    },
    {
        id: '3',
        name: 'BMW 3 Series',
        image: '/images/suzuki_swift.png',
        seats: 5,
        transmission: 'automatic',
        category: 'Luxury',
        price: 95,
        status: 'Available'
    },
    {
        id: '4',
        name: 'Tesla Model 3',
        image: '/images/Suzuki_Cultus.png',
        seats: 5,
        transmission: 'automatic',
        category: 'Luxury',
        price: 120,
        status: 'Available'
    },
    {
        id: '5',
        name: 'Ford Explorer',
        image: '/images/toyota_fortuner.png',
        seats: 7,
        transmission: 'automatic',
        category: 'SUV',
        price: 85,
        status: 'Available'
    },
    {
        id: '6',
        name: 'Toyota Land Cruiser',
        image: '/images/Toyota_Land_Cruiser.png',
        seats: 7,
        transmission: 'automatic',
        category: 'SUV',
        price: 150,
        status: 'Not Available'
    },
    {
        id: '7',
        name: 'Hyundai Tucson',
        image: '/images/Hyundai_Tucson.png',
        seats: 5,
        transmission: 'automatic',
        category: 'SUV',
        price: 70,
        status: 'Available'
    },
    {
        id: '8',
        name: 'Changan Alsvin',
        image: '/images/changan_alsvin.png',
        seats: 5,
        transmission: 'manual',
        category: 'Sedan',
        price: 40,
        status: 'Available'
    },
    {
        id: '9',
        name: 'Suzuki Swift',
        image: '/images/suzuki_swift.png',
        seats: 4,
        transmission: 'automatic',
        category: 'Economy',
        price: 42,
        status: 'Available'
    },
    {
        id: '10',
        name: 'Honda BR-V',
        image: '/images/honda_BRV.png',
        seats: 7,
        transmission: 'automatic',
        category: 'SUV',
        price: 65,
        status: 'Not Available'
    },
    {
        id: '11',
        name: 'Toyota Fortuner',
        image: '/images/toyota_fortuner.png',
        seats: 7,
        transmission: 'automatic',
        category: 'SUV',
        price: 130,
        status: 'Available'
    },
    {
        id: '12',
        name: 'Suzuki Cultus',
        image: '/images/Suzuki_Cultus.png',
        seats: 4,
        transmission: 'manual',
        category: 'Economy',
        price: 35,
        status: 'Available'
    },
];

export const CAR_CATEGORIES = [
    { label: "Economy", value: "economy" },
    { label: "Sedan", value: "sedan" },
    { label: "SUV", value: "suv" },
    { label: "Luxury", value: "luxury" },
    { label: "Van / MPV", value: "mpv" },
    { label: "Pickup", value: "pickup" },
    { label: "Electric", value: "electric" }
];

export const TRANSMISSION_TYPES = [
    { label: "Semi-Automatic", value: "semi-automatic" },
    { label: "Manual", value: "manual" },
    { label: "Automatic", value: "automatic" },
];

export const FUEL_TYPES = [
    { label: "Petrol", value: "petrol" },
    { label: "Diesel", value: "diesel" },
    { label: "LPG", value: "lpg" },
    { label: "CNG", value: "cng" },
    { label: "Hybrid", value: "hybrid" },
    { label: "Electric", value: "electric" },
];

export const SEATING_CAPACITY = [
    { label: "2 Seats", value: 2 },
    { label: "4 Seats", value: 4 },
    { label: "5 Seats", value: 5 },
    { label: "7 Seats", value: 7 },
];

export const ROLES_OPTIONS = [
    { label: "Admin", value: "admin" },
    { label: "User", value: "user" },
];

export const CAR_FEATURES = [
    // Safety Features
    { label: "ABS (Anti-lock Braking System)", value: "abs" },
    { label: "Airbags", value: "airbags" },
    { label: "Traction Control", value: "traction_control" },
    { label: "Electronic Stability Control", value: "esc" },
    { label: "Parking Sensors", value: "parking_sensors" },
    { label: "Rear Camera", value: "rear_camera" },
    { label: "360° Camera", value: "camera_360" },
    { label: "Fog Lights", value: "fog_lights" },

    // Technology & Entertainment
    { label: "Bluetooth", value: "bluetooth" },
    { label: "Android Auto", value: "android_auto" },
    { label: "Apple CarPlay", value: "apple_carplay" },
    { label: "GPS / Navigation", value: "gps" },
    { label: "Dash Cam", value: "dash_cam" },
    { label: "Front Speakers", value: "front_speakers" },
    { label: "Rear Speakers", value: "rear_speakers" },

    // Comfort & Convenience
    { label: "Air Conditioning", value: "air_conditioning" },
    { label: "Climate Control", value: "climate_control" },
    { label: "Heated Seats", value: "heated_seats" },
    { label: "Ventilated Seats", value: "ventilated_seats" },
    { label: "Cruise Control", value: "cruise_control" },
    { label: "Keyless Entry", value: "keyless_entry" },
    { label: "Push Start", value: "push_start" },
    { label: "Sunroof", value: "sunroof" },
    { label: "Power Steering", value: "power_steering" },
    { label: "Power Windows", value: "power_windows" },
    { label: "Power Mirrors", value: "power_mirrors" },

    // Additional Features
    { label: "Child Seat", value: "child_seat" },
    { label: "Spare Tyre", value: "spare_tyre" },
    { label: "Roadside Assistance", value: "roadside_assistance" },
    { label: "Mobile Charger", value: "mobile_charger" },
    { label: "USB Charging", value: "usb_charging" },
];

export const STATUS_OPTIONS = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
];

export const USERS_TABLE_HEADERS = [
    { label: "User", key: "user" },
    { label: "Email", key: "email" },
    { label: "Role", key: "role" },
    { label: "Status", key: "status" },
    { label: "Last Login", key: "last_login" },
    { label: "Actions", key: "actions", className: "text-center!" },
];