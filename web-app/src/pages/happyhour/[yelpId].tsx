import React from "react";
import {useParams, useSearchParams} from "react-router-dom";
import useGetBusinessByYelpIdQuery from "../../api/happyhour/get-business-by-yelpId";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {CheckForSpecials, checkForSpecialsSchema} from "../../schemas/check-for-specials-schema";

interface CheckForSpecialsButtonGroupProps {
    onClick: (values: CheckForSpecials) => void,
    url?: string
}

function CheckForSpecialsButtonAction({url, onClick}: CheckForSpecialsButtonGroupProps) {

    const handleSubmit = (values: CheckForSpecials) => {
        onClick(values)
    };

    return <>
        <Formik initialValues={{url: url || ""}}
                validationSchema={checkForSpecialsSchema}
                onSubmit={handleSubmit}>
            <Form>
                <div className="join">
                    <div>
                        <div>
                            <Field id={"url"} name={"url"} type={"url"}
                                   className="input input-bordered join-item"
                                   placeholder="https://restaurant.com/specials"/>
                        </div>
                        <ErrorMessage name={"url"}/>
                    </div>

                    <div className="indicator">
                        <button className="btn join-item" type={"submit"}>Click to check for specials</button>
                    </div>
                </div>
            </Form>
        </Formik>
    </>;
}

function NewBusiness(props: { onClick: () => void }) {
    const [searchParams] = useSearchParams()

    return <div>
        <h1>We've never checked specials for {searchParams.get("yelpName")}</h1>
        <h3>Would you like us to check?</h3>
        <h3>Please provide the website url where we can find the specials for {searchParams.get("yelpName")}</h3>
        <h4>Be as specific as possible! We can only find what is found on that page.</h4>

        <CheckForSpecialsButtonAction onClick={props.onClick}/>
    </div>;
}

export const HappyHourDetailsPage = () => {
    const {yelpId} = useParams()

    const {data: business} = useGetBusinessByYelpIdQuery(yelpId!!, true)

    const handleCheckForSpecialsClick = () => {

    };

    function hasCheckedForSpecialsToday() {
        return false;
    }

    if (!business) {
        // New business
        return <NewBusiness onClick={handleCheckForSpecialsClick}/>
    } else {
        // existing business
        return <>
            <h1>Yelp Business Search</h1>
            <div>
                <pre>{JSON.stringify(business, null, 2)}</pre>
            </div>

            {business.lastCheckForSpecials === null ? (
                // have never checked or possibly errored out
                <div>
                    <h1>We cannot seem to get specials for {business.name}</h1>
                    <p>Try again?</p>
                    <CheckForSpecialsButtonAction onClick={handleCheckForSpecialsClick}/>
                </div>
            ) : business.specialDetailList?.length ? (
                // Specials exist
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

                    {/* Optionally show option to recheck specials */}
                    {!hasCheckedForSpecialsToday() && (
                        <div>
                            <h2>Last checked: {business.lastCheckForSpecials}</h2>
                            <CheckForSpecialsButtonAction onClick={handleCheckForSpecialsClick}/>
                        </div>
                    )}
                </div>
            ) : (
                // Specials do not exist
                <div>
                    <h1>No specials found for {business.name}</h1>
                    <h2>Last checked: {business.lastCheckForSpecials}</h2>

                    {!hasCheckedForSpecialsToday() ? (
                        <div>
                            <CheckForSpecialsButtonAction onClick={handleCheckForSpecialsClick}/>
                        </div>
                    ) : (
                        <h3>Already checked for specials today. Try again tomorrow.</h3>
                    )}
                </div>
            )}
        </>
    }
}
