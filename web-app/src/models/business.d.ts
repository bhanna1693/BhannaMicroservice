import {SpecialDetail} from "./special-detail";


interface Business {
    id: number | null;
    yelpId: string;
    name: string;
    website: string;
    lastCheckForSpecials: string | null;
    specialDetailList: SpecialDetail[];
    createdAt: string;
    updatedAt: string;
}
