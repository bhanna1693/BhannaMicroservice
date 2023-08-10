import * as yup from 'yup';

export const createBusinessRequestSchema = yup.object().shape({
    businessUrl: yup.string().required("Website URL is required.").url("URL must be formatted correctly. ex) https://restaurant.com"),
    yelpId: yup.string().required(),
    businessName: yup.string().required()
});

export type CreateBusinessRequest = yup.InferType<typeof createBusinessRequestSchema>;
