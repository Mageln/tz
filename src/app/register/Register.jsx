'use client'

import React from 'react'
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation'
import { yupResolver } from "@hookform/resolvers/yup"
import { useDispatch } from 'react-redux';
import * as yup from "yup"

const schema = yup.object({
    username: yup.string().required('Имя пользователя является обязательным').matches(/^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u, "Только буквы"),
    email: yup.string().email('Некорректный адрес электронной почты').required('Электронная почта является обязательной'),
    password: yup.string().min(6, "Минимум 6 символов").required('Пароль является обязательным'),
});

const Register = () => {

    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)

    });


    const router = useRouter()

    const onSubmit = async (data) => {

        dispatch({ type: "REGISTER_USER", username: data.username, email: data.email });
        sessionStorage.setItem("user", JSON.stringify(data))


        router.push("/profile")


    };


    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Регистрация</h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label className="block">
                        <span className="block text-sm font-medium text-slate-700">Имя пользователя:</span>
                        <input className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"  type="text" {...register('username')} />
                        {errors && errors.username && <div style={{ color: 'red' }}>{errors.username.message}</div>}
                    </label>


                    <label className="block">
                        <span className="block text-sm font-medium text-slate-700">Электронная почта:</span>
                        <input className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500" type="email" {...register('email')} />
                        {errors && errors.email && <div style={{ color: 'red' }}>{errors.email.message}</div>}
                    </label>

                    <label className="block">
                        <span className="block text-sm font-medium text-slate-700">Пароль:</span>
                        <input className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500" type="password" {...register('password')} />
                        {errors && errors.password && <div style={{ color: 'red' }}>{errors.password.message}</div>}
                    </label>
                        <div>
                    <button type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-3">Зарегистрироваться</button>
                        </div>
                </form>
            </div>
        </div>
    )
}

export default Register