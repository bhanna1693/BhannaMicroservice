interface YelpBusiness {
    id: string;
    alias: string;
    name: string;
    image_url: string;
    is_closed: number;
    url: string;
    review_count: number;
    categories: Category[];
    rating: number;
    coordinates: Coordinates;
    transactions: string[];
    price: string;
    location: Location;
    phone: string;
    display_phone: string;
    distance: number;
}

interface Category {
    alias: string;
    title: string;
}

interface Coordinates {
    latitude: number;
    longitude: number;
}

interface Location {
    address1: string;
    address2: string;
    address3: string;
    city: string;
    zip_code: string;
    country: string;
    state: string;
    display_address: string[];
}
