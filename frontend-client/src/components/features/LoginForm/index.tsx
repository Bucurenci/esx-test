'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { api } from '@/utils/api';
import { useState } from 'react';
import {getErrorMessage} from "@/utils/getErrorMessage";

// 🔐 Zod schema
const loginSchema = z.object({
    email: z.string().email({ message: 'Invalid email' }),
    password: z.string().min(1, { message: 'Password is required' }),
});

type LoginData = z.infer<typeof loginSchema>;

export default function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginData>({
        resolver: zodResolver(loginSchema),
    });

    const [serverError, setServerError] = useState('');
    const router = useRouter();

    const onSubmit = async (data: LoginData) => {
        setServerError('');

        try {
            await api.post('/login', data);
            router.push('/about');
        } catch (err: unknown) {
            setServerError(getErrorMessage(err, "Login failed"));
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {serverError && <div className="alert alert-danger">{serverError}</div>}

            <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" {...register('email')} />
                {errors.email && (
                    <div className="text-danger small mt-1">{errors.email.message}</div>
                )}
            </div>

            <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" {...register('password')} />
                {errors.password && (
                    <div className="text-danger small mt-1">{errors.password.message}</div>
                )}
            </div>

            <div className="text-center mt-4">
                <button type="submit" className="btn btn-primary px-5">
                    Login
                </button>
            </div>
        </form>
    );
}