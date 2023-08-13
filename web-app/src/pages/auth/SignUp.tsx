import React from 'react';
import {useFormik} from "formik";
import {useLocation, useNavigate} from "react-router-dom";
import useSignUp from "../../api/auth/sign-up";
import {RegisterRequest, registerSchema} from "../../schemas/register-schema";

export const SignUpPage = () => {
    const {mutateAsync, isError} = useSignUp()
    const navigate = useNavigate()
    const location = useLocation();


    const signUpForm = useFormik<RegisterRequest>({
        initialValues: {
            userName: '',
            password: '',
        },
        validationSchema: registerSchema,
        onSubmit: async (values) => {
            // Handle form submission
            await mutateAsync(values)
            if (!isError) {
                const previousPath = location.state?.from?.pathname;
                navigate(previousPath ?? "/", {replace: true});
            }
        },
    });

    return (
        <div className={"flex justify-center"}>
            <form onSubmit={signUpForm.handleSubmit} className="card card-normal bg-base-300 justify-center min-w-[20rem] sm:min-w-[25rem] md:min-w-[30rem]">
                <div className={"card-body"}>
                    <h2 className="card-title">Sign Up</h2>

                    <div className={"form-control w-full"}>
                        <label className="label label-text">Email</label>
                        <input
                            type="email"
                            className="input input-bordered w-full"
                            id="userName"
                            name="userName"
                            value={signUpForm.values.userName} onChange={signUpForm.handleChange}
                        />
                        {signUpForm.touched.userName && signUpForm.errors.userName ?
                            <div className={"text-error"}>{signUpForm.errors.userName}</div> : null}

                    </div>
                    <div className={"form-control w-full"}>
                        <label className="label label-text">Password</label>
                        <input
                            type="password"
                            className="input input-bordered w-full"
                            name="password"
                            id="password"
                            value={signUpForm.values.password}
                            onChange={signUpForm.handleChange}
                        />
                        {signUpForm.touched.password && signUpForm.errors.password ?
                            <div className={"text-error"}>{signUpForm.errors.password}</div> : null}
                    </div>
                    <div className={"text-error"}>
                        {/*{isError ? error : null}*/}
                    </div>
                    <div className={"card-actions mt-5"}>
                        <button
                            className="btn btn-primary w-full"
                            type="submit"
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

