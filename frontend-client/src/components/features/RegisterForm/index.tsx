'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { api } from '@/utils/api';
import { useState } from 'react';
import {getErrorMessage} from "@/utils/getErrorMessage";

const registerSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z
        .string()
        .email({ message: 'Invalid email address' }),
    password: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters' })
        .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
        .regex(/[0-9]/, { message: 'Password must contain at least one number' })
        .regex(/[\W_]/, { message: 'Password must contain at least one special character' }),
    password_confirmation: z
        .string()
        .min(8, { message: 'Please confirm your password' })
}).refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ['password_confirmation'],
});

type RegisterData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterData>({
        resolver: zodResolver(registerSchema),
    });

    const [serverError, setServerError] = useState('');
    const router = useRouter();

    const onSubmit: SubmitHandler<RegisterData> = async (data) => {
        setServerError('');

        try {
            await api.post('/register', data);
            router.push('/login');
        } catch (err: unknown) {
            setServerError(getErrorMessage(err, "Register failed"));
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            {serverError && <div className="alert alert-danger">{serverError}</div>} {/* Server errors */}

            <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                    type="text"
                    className="form-control"
                    {...register('name')}
                />
                {errors.name && (
                    <div className="text-danger small mt-1">{errors.name.message}</div>
                )}
            </div>

            <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                    type="email"
                    className="form-control"
                    {...register('email')}
                />
                {errors.email && (
                    <div className="text-danger small mt-1">{errors.email.message}</div>
                )}
            </div>

            <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                    type="password"
                    className="form-control"
                    {...register('password')}
                />
                {errors.password && (
                    <div className="text-danger small mt-1">{errors.password.message}</div>
                )}
            </div>

            <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <input
                    type="password"
                    className="form-control"
                    {...register('password_confirmation')}
                />
                {errors.password_confirmation && (
                    <div className="text-danger small mt-1">{errors.password_confirmation.message}</div>
                )}
            </div>

            <div className="text-center mt-4">
                <button type="submit" className="btn btn-primary px-5">
                    Register
                </button>
            </div>
        </form>
    );
}