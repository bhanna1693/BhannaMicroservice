import * as yup from "yup";

export const updateBusinessRequestSchema = yup.object().shape({
    businessUrl: yup.string().required("Website URL is required.").url("URL must be formatted correctly. ex) https://restaurant.com"),
});

type PathVariable = {
    businessId: number
}

export type UpdateBusinessRequest = PathVariable & yup.InferType<typeof updateBusinessRequestSchema>
