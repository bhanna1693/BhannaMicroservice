import * as yup from 'yup';

export const checkForSpecialsSchema = yup.object().shape({
    url: yup.string().required("Website URL is required.").url("URL must be formatted correctly. ex) https://restaurant.com"),
});

export type CheckForSpecials = yup.InferType<typeof checkForSpecialsSchema>;
