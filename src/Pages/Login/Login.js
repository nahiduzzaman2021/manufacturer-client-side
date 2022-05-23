import React from 'react';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../Shared/Loading';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const { register, formState: { errors }, handleSubmit, getValues, reset } = useForm();
    const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    const onSubmit = data => {
        console.log(data);
        signInWithEmailAndPassword(data.email, data.password)
    }

    const handleResetPassword = async () => {

        const email = getValues('email');
        if (email) {
            await sendPasswordResetEmail(email);
            toast.success('Send Email, Check your email !')
            reset();
        }
        else {
            toast.error('Provide Your Email Please !')
        }
    }

    if (user || gUser) {
        navigate(from, { replace: true });
    }

    if (loading || gLoading || sending) {
        return <Loading></Loading>
    }

    let signInError;
    if (error || gError) {
        signInError = <p className='text-red-500'><small>{error?.message || gError?.message}</small></p>
    }

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className="card w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="text-xl font-bold text-center">Login</h2>

                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="form-control w-full max-w-md">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="input input-bordered w-full max-w-md"
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: 'Email is Required.'
                                    },
                                    pattern: {
                                        value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                        message: 'Provide a valid Email.'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.email?.type === 'required' &&
                                    <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                {errors.email?.type === 'pattern' &&
                                    <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                            </label>
                        </div>
                        <div className="form-control w-full max-w-md">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Password"
                                className="input input-bordered w-full max-w-md"
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: 'Password is Required.'
                                    },
                                    minLength: {
                                        value: 6,
                                        message: 'Must be 6 characters or longer.'
                                    }

                                })}
                            />
                            <label className="label">
                                {errors.password?.type === 'required' &&
                                    <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                {errors.password?.type === 'minLength' &&
                                    <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                            </label>
                            <label className='mb-5'>
                                <p
                                    style={{ cursor: 'pointer' }}
                                    className='text-xs font-bold text-neutral' onClick={handleResetPassword}> Forgot Password ?</p>
                            </label>
                        </div>

                        {signInError}
                        <input className='btn w-full max-w-md' type="submit" value='Login' />
                    </form>

                    <p className='text-xs text-center font-bold'>New to Tools Provita Ltd ? <Link to='/signup' className='text-primary'>Create New Account</Link></p>
                    <div className="divider">OR</div>

                    <button
                        onClick={() => signInWithGoogle()}
                        className="btn btn-outline tracking-wider"><FcGoogle className='mr-2 text-lg' /> Continue with Google </button>
                </div>
            </div>
        </div>
    );
};

export default Login;