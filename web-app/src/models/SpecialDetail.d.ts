import {Business} from "./Business";
import {LocalDateTime} from "./util";

export enum SpecialType {
    FOOD = "FOOD",
    DRINK = "DRINK"
}

export interface SpecialDetail {
    id: string;

    business: Business;

    type: SpecialType;

    day: string;

    time: string;

    details: string;

    createdAt: LocalDateTime;

    updatedAt: LocalDateTime;
}
