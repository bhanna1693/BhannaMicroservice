import React, {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {HappyHourSearch, happyHourSearchSchema} from "../../schemas/happy-hour-search-schema";
import useGetCompositeBusinessesQuery from "../../api/happyhour/get-composite-businesses";
import HappyHourCard from "./HappyHourCard";

export const HappyHourSearchPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [formState, setFormState] = useState<HappyHourSearch>({
        search: searchParams.get("search") || "",
        location: searchParams.get("location") || ""
    })

    useEffect(() => {
        setFormState({
            search: searchParams.get("search") || "",
            location: searchParams.get("location") || ""
        })
    }, [searchParams])

    const {data} = useGetCompositeBusinessesQuery(formState, happyHourSearchSchema.isValidSync(formState))

    const handleSubmit = (values: HappyHourSearch) => {
        // Handle form submission
        setSearchParams(values)
    }


    return (
        <>
            <h2 className="text-center">Search for a Happy Hour near you!</h2>
            <div className="flex justify-center">
                <Formik initialValues={formState}
                        validationSchema={happyHourSearchSchema}
                        onSubmit={handleSubmit}>
                    <Form>
                        <div className="join">
                            <div>
                                <div>
                                    <Field id={"location"} name={"location"} type={"text"}
                                           className="input input-bordered join-item"
                                           placeholder="City, State"/>
                                </div>
                                <ErrorMessage name="location"/>
                            </div>
                            <div>
                                <div>
                                    <Field id={"search"} name={"search"} type={"text"}
                                           className="input input-bordered join-item"
                                           placeholder="Business name"/>
                                </div>
                                <ErrorMessage name={"search"}/>
                            </div>
                            {/*<select className="select select-bordered join-item">*/}
                            {/*    <option disabled selected>Filter</option>*/}
                            {/*    <option>Sci-fi</option>*/}
                            {/*    <option>Drama</option>*/}
                            {/*    <option>Action</option>*/}
                            {/*</select>*/}
                            <div>
                                <button className="btn btn-primary join-item" type={"submit"}>Search</button>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </div>

            {!data ? (
                <h3>Start by adding a location and searching for a business</h3>
            ) : (
                <>
                    <h3>Results found: {data.length}</h3>
                    {data.map((b) => <HappyHourCard b={b} key={b.yelpBusiness.id}/>)}
                </>
            )}
        </>
    )
}
