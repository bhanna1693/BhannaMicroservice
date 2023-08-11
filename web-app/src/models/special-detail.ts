import {Business} from "./business";

export enum SpecialType {
    FOOD = "FOOD",
    DRINK = "DRINK"
}

export interface SpecialDetail {
    id: string;
    business: Business; // Reference to Business type
    type: SpecialType;
    daysOfTheWeek: string;
    operatingHours: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}
