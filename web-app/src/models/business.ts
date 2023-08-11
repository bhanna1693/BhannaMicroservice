import {SpecialDetail} from "./special-detail";

export enum SpecialCheckStatus {
    INITIAL = "INITIAL",
    FAILED = "FAILED",
    COMPLETED = "COMPLETED",
    PENDING = "PENDING"
}

export interface Business {
    id: number;
    yelpId: string;
    name: string;
    website: string;
    latestSpecialsCheck: string | null;
    specialCheckStatus: SpecialCheckStatus;
    specialDetailList: SpecialDetail[];
    createdAt: string;
    updatedAt: string;
}
