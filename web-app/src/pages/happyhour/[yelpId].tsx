import React, {ReactElement, useState} from "react";
import {useParams} from "react-router-dom";
import useGetBusinessByYelpIdQuery from "../../api/happyhour/get-business-by-yelpId";
import {ErrorMessage, Field, Form, Formik, useFormikContext} from "formik";
import {CreateBusinessRequest, createBusinessRequestSchema} from "../../schemas/create-business-request-schema";
import useCreateOrUpdateBusiness from "../../api/happyhour/post-business";

const ErrorsDisplay = () => {
    const {errors} = useFormikContext<CreateBusinessRequest>();

    const errorKeys = (Object.keys(errors) as [keyof CreateBusinessRequest])
        .filter(key => key !== "businessUrl");

    if (errorKeys.length > 0) {
        return (
            <div className="text-error">
                {errorKeys.map((key) => (
                    <div key={key}>{errors[key]}</div>
                ))}
            </div>
        );
    }

    return null;
};

interface CheckForSpecialsButtonGroupProps {
    onClick: (values: CreateBusinessRequest) => void,
    initialValues: CreateBusinessRequest
}

const CheckForSpecialsButtonAction: React.FunctionComponent<CheckForSpecialsButtonGroupProps> = ({
                                                                                                     initialValues,
                                                                                                     onClick
                                                                                                 }) => {

    const handleSubmit = (values: CreateBusinessRequest) => {
        onClick(values)
    };

    return <>
        <Formik initialValues={initialValues}
                validationSchema={createBusinessRequestSchema}
                onSubmit={handleSubmit}>
            <Form>
                <div className="join">
                    <div>
                        <div>
                            <Field id={"businessUrl"} name={"businessUrl"} type={"businessUrl"}
                                   className="input input-bordered join-item"
                                   placeholder="https://restaurant.com/specials"/>
                        </div>
                        <ErrorMessage name={"businessUrl"}/>
                    </div>

                    <div className="indicator">
                        <button className="btn btn-primary join-item" type={"submit"}>Click to check for specials
                        </button>
                    </div>
                </div>
                <div>
                    <ErrorsDisplay/>
                </div>
            </Form>
        </Formik>
    </>;
};

const NewBusiness: React.FunctionComponent<{ children: ReactElement, businessName: string }> = ({
                                                                                                    children,
                                                                                                    businessName
                                                                                                }) => {

    return <div>
        <h1>We've never checked specials for {businessName}</h1>
        <h3>Would you like us to check?</h3>
        <h3>Please provide the website url where we can find the specials for {businessName}</h3>
        <h4>Be as specific as possible! We can only find what is found on that page.</h4>

        {children}
    </div>;
};

export const HappyHourDetailsPage = () => {
    const {yelpId, yelpName} = useParams()

    const {data: business} = useGetBusinessByYelpIdQuery(yelpId!!, true)
    const {mutateAsync} = useCreateOrUpdateBusiness()
    const [createBusinessRequestState] = useState<CreateBusinessRequest>({
        businessName: yelpName!!,
        businessUrl: "",
        yelpId: yelpId!!
    })

    const handleCheckForSpecialsClick = async (values: CreateBusinessRequest) => {
        await mutateAsync(values)
    };

    function hasCheckedForSpecialsToday() {
        return false;
    }

    if (!business) {
        // New business
        return <NewBusiness businessName={yelpName!!}>
            <CheckForSpecialsButtonAction initialValues={createBusinessRequestState}
                                          onClick={handleCheckForSpecialsClick}/>
        </NewBusiness>
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
                    <CheckForSpecialsButtonAction initialValues={createBusinessRequestState}
                                                  onClick={handleCheckForSpecialsClick}/>
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
                            <CheckForSpecialsButtonAction initialValues={createBusinessRequestState}
                                                          onClick={handleCheckForSpecialsClick}/>
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
                            <CheckForSpecialsButtonAction initialValues={createBusinessRequestState}
                                                          onClick={handleCheckForSpecialsClick}/>
                        </div>
                    ) : (
                        <h3>Already checked for specials today. Try again tomorrow.</h3>
                    )}
                </div>
            )}
        </>
    }
}
