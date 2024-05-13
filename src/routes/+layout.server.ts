import type { LayoutServerLoad } from './$types';
import jsonwebtoken from 'jsonwebtoken';
import { SECRET_AUTH_JWT } from '$env/static/private';

interface AllRecipesType {
	objectId: object;
	id: number;
	title: string;
	ingredients: string[];
	instructions: string;
}

export const load: LayoutServerLoad = async (event) => {
	const res = await fetch('http://localhost:8080/api/getAll');

	const data = (await res.json()) as AllRecipesType[];

	const login = await event.locals.auth();

	if (login) {
		const authCookie = event.cookies.get('authCookie');

		if (new Date(login.expires) > new Date()) {


			CreateNewUser({
				"email":login.user?.email,
				"userName":login.user?.name,
				"profilePic":login.user?.image
			})


			if (!authCookie) {
				const jwt = jsonwebtoken.sign({ email: login.user?.email }, `${SECRET_AUTH_JWT}`);

				const expirationDate = new Date();
				expirationDate.setMonth(expirationDate.getMonth() + 1);

				event.cookies.set('authCookie', jwt, {
					httpOnly: true,
					secure: true,
					sameSite: 'strict',
					path: '/',
					expires: expirationDate
				});
			}
		} else {
			if (!authCookie) {
				event.cookies.delete('authCookie', { path: '/' });
			}
		}
	} else {
		event.cookies.delete('authCookie', { path: '/' });
	}

	return { recipes: data, session: await event.locals.auth() };
};


async function CreateNewUser(body:object) {
	
	try {
		
		const res = await fetch("http://localhost:8080/api/createUser",{
			method:"POST",
			headers:{
				'Content-Type': 'application/json',
			},
			body:JSON.stringify(body)
		})

	} catch (error) {
		
		console.log(error)

	}

}