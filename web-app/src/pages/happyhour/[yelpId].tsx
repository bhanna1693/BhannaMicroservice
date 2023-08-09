import React from "react";
import {useParams} from "react-router-dom";
import useBusinessQuery from "../../services/happyhour/business.service";

export const HappyHourDetailsPage = () => {
    const {yelpId} = useParams()

    const {data: business} = useBusinessQuery(yelpId!!, true)

    const handleCheckForSpecialsClick = () => {

    };

    return (
        <>
            <h1>Yelp Business Search</h1>
            <div>
                {JSON.stringify(business)}
            </div>

            {business?.specialDetailList?.length ? (
                <div>
                    <h1>Specials for {business.name}</h1>
                    <ul>
                        {business.specialDetailList.map(special => {
                            return <li>
                                <div>Type: {special.type}</div>
                                <div>Day: {special.day}</div>
                                <div>Time: {special.time}</div>
                                <div>Details: {special.details}</div>
                            </li>
                        })}
                    </ul>
                </div>
            ) : !business?.specialDetailList?.length && !business?.lastCheckForSpecials?.length ? (
                <div>
                    <h1>We've never checked specials for {business?.name}</h1>
                    <h3>Would you like us to check?</h3>
                    <h3>Please provide the website url where we can find the specials for {business?.name}</h3>
                    <h4>Be as specific as possible! We can only find what is found on that page.</h4>

                    <div className="join">
                        <div>
                            <div>
                                <input id={"url"} name={"url"} type={"url"}
                                       className="input input-bordered join-item"
                                       placeholder="https://restaurant.com/specials"/>
                            </div>
                        </div>
                        <div className="indicator">
                            <button className="btn join-item" type={"submit"}
                                    onClick={() => handleCheckForSpecialsClick()}>Search
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <h1>No specials found for {business?.name}</h1>
                    <h2>Last checked: {business?.lastCheckForSpecials}</h2>

                    <button className="btn btn-primary">Click to check for specials</button>
                </div>
            )}

        </>
    )
}
