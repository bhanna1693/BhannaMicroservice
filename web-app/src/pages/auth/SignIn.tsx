import React from 'react';
import {useFormik} from "formik";
import {LoginRequest, loginSchema} from "../../schemas/login-schema";
import {useLocation, useNavigate} from "react-router-dom";
import useSignIn from "../../api/auth/sign-in";

export const SignInPage = () => {
    const {mutateAsync, error, isError} = useSignIn()
    const navigate = useNavigate()
    const location = useLocation();


    const loginForm = useFormik<LoginRequest>({
        initialValues: {
            userName: '',
            password: '',
        },
        validationSchema: loginSchema,
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
            <form onSubmit={loginForm.handleSubmit} className="card card-normal bg-base-300 justify-center min-w-[20rem] sm:min-w-[25rem] md:min-w-[30rem]">
                <div className={"card-body"}>
                    <h2 className="card-title">Login</h2>

                    <div className={"form-control w-full"}>
                        <label className="label label-text">Email</label>
                        <input
                            type="email"
                            className="input input-bordered w-full"
                            id="userName"
                            name="userName"
                            value={loginForm.values.userName} onChange={loginForm.handleChange}
                        />
                        {loginForm.touched.userName && loginForm.errors.userName ?
                            <div className={"text-error"}>{loginForm.errors.userName}</div> : null}

                    </div>
                    <div className={"form-control w-full"}>
                        <label className="label label-text">Password</label>
                        <input
                            type="password"
                            className="input input-bordered w-full"
                            name="password"
                            id="password"
                            value={loginForm.values.password}
                            onChange={loginForm.handleChange}
                        />
                        {loginForm.touched.password && loginForm.errors.password ?
                            <div className={"text-error"}>{loginForm.errors.password}</div> : null}
                    </div>
                    <div className={"text-error"}>
                        {/* @ts-ignore */}
                        {isError ? error : null}
                    </div>
                    <div className={"card-actions mt-5"}>
                        <button
                            className="btn btn-primary w-full"
                            type="submit"
                        >
                            Login
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

