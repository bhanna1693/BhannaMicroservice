import {Business} from "./business";

interface CompositeBusinessDto {
    business: Business | null;
    yelpBusiness: YelpBusiness;
}
