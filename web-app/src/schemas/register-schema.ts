import * as yup from 'yup';

export const registerSchema = yup.object().shape({
    userName: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export type RegisterRequest = yup.InferType<typeof registerSchema>;
