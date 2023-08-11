import React, {FunctionComponent} from "react";
import {CompositeBusinessDto} from "../../models/composite-business-dto";
import HappyHourCardActions from "./HappyHourCardActions";

const HappyHourCard: FunctionComponent<{ b: CompositeBusinessDto }> = ({b}) => {

    return <div className="card card-side bg-base-200 shadow-xl my-8">
        <figure className={"pl-8"}><img className={"max-h-60"} src={b.yelpBusiness.image_url}
                                        alt="business_img"/></figure>
        <div className="card-body">
            <h2 className="card-title">{b.yelpBusiness.name}</h2>
            <p>
                {b.yelpBusiness.rating} stars ({b.yelpBusiness.review_count} reviews)
                <br/>
                {b.yelpBusiness.categories.map(c => c.title).join(", ")}
                <br/>
                {b.yelpBusiness.is_closed ? "Closed :(" : "Open :)"}
                <br/>
                {b.yelpBusiness.location.display_address.join(", ")}
            </p>
            <div className="card-actions justify-end">
                <HappyHourCardActions b={b} />
            </div>
        </div>
    </div>
}

export default HappyHourCard
