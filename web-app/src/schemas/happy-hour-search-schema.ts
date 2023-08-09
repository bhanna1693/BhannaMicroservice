import * as yup from 'yup';

export const happyHourSearchSchema = yup.object().shape({
    location: yup.string().required(),
    search: yup.string().required(),
});

export type HappyHourSearch = yup.InferType<typeof happyHourSearchSchema>;
