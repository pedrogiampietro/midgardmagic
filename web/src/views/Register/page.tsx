'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function Register() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async () => {
		if (!name || !email || !password) {
			toast.warning('Oppssss!! Todos os dados são obrigatórios.', {
				position: 'top-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}

		try {
			await axios.post('http://localhost:3000/api/auth/sign-up', {
				email,
				name,
				password,
			});
		} catch (error: any) {
			console.error(error.message);

			toast.warning(`Oppssss!! ${error.response.data.message}.`, {
				position: 'top-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}
	};

	return (
		<section className='bg-gray-50 dark:bg-gray-900'>
			<div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
				<a
					href='#'
					className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'
				>
					<img
						className='w-8 h-8 mr-2'
						src='https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg'
						alt='logo'
					/>
					Midgard Magic
				</a>
				<div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
					<div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
						<h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
							Create and account
						</h1>
						<div className='space-y-4 md:space-y-6'>
							<div>
								<label
									htmlFor='name'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
								>
									Your Nickname
								</label>
								<input
									type='text'
									name='name'
									id='name'
									className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
									placeholder='Alilat'
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</div>
							<div>
								<label
									htmlFor='email'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
								>
									Your email
								</label>
								<input
									type='email'
									name='email'
									id='email'
									className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
									placeholder='name@company.com'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div>
								<label
									htmlFor='password'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
								>
									Password
								</label>
								<input
									type='password'
									name='password'
									id='password'
									placeholder='••••••••'
									className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
							<div className='flex items-start'>
								<div className='flex items-center h-5'>
									<input
										id='terms'
										aria-describedby='terms'
										type='checkbox'
										className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
									/>
								</div>
								<div className='ml-3 text-sm'>
									<label
										htmlFor='terms'
										className='font-light text-gray-500 dark:text-gray-300'
									>
										I accept the{' '}
										<a
											className='font-medium text-primary-600 hover:underline dark:text-primary-500'
											href='#'
										>
											Terms and Conditions
										</a>
									</label>
								</div>
							</div>
							<button
								type='button'
								className='block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-primary-600 border border-transparent rounded-lg active:bg-primary-600 hover:bg-primary-700 focus:outline-none focus:shadow-outline-primary'
								onClick={() => handleSubmit()}
							>
								Create account
							</button>
							<p className='text-sm font-light text-gray-500 dark:text-gray-400'>
								Already have an account?{' '}
								<Link
									href='/login'
									className='font-medium text-primary-600 hover:underline dark:text-primary-500'
								>
									Login here
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
