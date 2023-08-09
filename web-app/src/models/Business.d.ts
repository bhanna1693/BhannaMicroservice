import {LocalDateTime, Nullable} from "./util";
import {SpecialDetail} from "./SpecialDetail";


export class Business {
    id: Nullable<number>;
    yelpId: string;
    name: string;
    website: string;
    lastCheckForSpecials: Nullable<LocalDateTime>;
    specialDetailList: Nullable<SpecialDetail[]>;
    createdAt: Nullable<LocalDateTime>;
    updatedAt: Nullable<LocalDateTime>;
}
