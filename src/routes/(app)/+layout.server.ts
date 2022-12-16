import { redirect, type ServerLoad, type Redirect } from '@sveltejs/kit';
import JWT from 'jsonwebtoken';
import type { UserProps } from '$lib/types';

export const load: ServerLoad = async ({ cookies }) => {
	const token = cookies.get('token') || '';
	const refreshToken = cookies.get('refreshToken') || '';
	let user: UserProps | any;

	if (!token && refreshToken) {
		JWT.verify(refreshToken, import.meta.env.VITE_REFRESH_TOKEN, (err : any, decoded: any) => {
			console.log(decoded);

			if (err) throw redirect(307, '/auth/register');

			const accessToken = JWT.sign(
				{
					username: decoded.username,
					id: decoded.id,
					email: decoded.email,
					image: decoded.image,
					userId: decoded.userId
				},
				import.meta.env.VITE_ACCESS_TOKEN,
				{ expiresIn: '15m' }
			);

			cookies.set('token', accessToken, {
				path: '/',
				httpOnly: true,
				expires: new Date(Date.now() + 1000 * 60 * 15)
			});

			user = decoded;
		});

		return {
			user
		};
	}

	if (!token && !refreshToken) throw redirect(307, '/auth/register');

	if (token && refreshToken) {
		JWT.verify(token, import.meta.env.VITE_ACCESS_TOKEN, (err : any, decoded : any) => {
			console.log(err?.message);
			if (err) return console.log('Error access Token redirected..');

			user = decoded;
		});
	}

	return {
		user
	};
};

