import React, {useEffect, useState} from "react";
import {Link, useSearchParams} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {HappyHourSearch, happyHourSearchSchema} from "../../schema/happy-hour-search-schema";
import useBusinessesQuery from "../../services/happyhour/businesses.service";

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

    const {data} = useBusinessesQuery(formState, happyHourSearchSchema.isValidSync(formState))
    const onSubmit = (values: HappyHourSearch) => {
        // Handle form submission
        setSearchParams(values)
    }

    return (
        <>
            <div className="flex justify-center py-5">
                <Formik initialValues={formState}
                        validationSchema={happyHourSearchSchema}
                        onSubmit={(values) => onSubmit(values)}>
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
                            <div className="indicator">
                                <button className="btn join-item" type={"submit"}>Search</button>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </div>

            <ul>
                {data?.map((b) => {
                    return <li key={b.yelpId}><Link to={`/happyhour/${b.yelpId}`}>{b.name} -- {b.yelpId} -- {b.id}</Link>
                    </li>
                })}
            </ul>
        </>
    )
}
