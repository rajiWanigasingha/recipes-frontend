import type { Actions } from './$types.js';

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();

		const id = data.get('id');
		const email = data.get('email');

		const authCookie = cookies.get('authCookie');

		const res = await fetch('http://localhost:8080/api/createNewFavorite', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${authCookie}`
			},
			body: JSON.stringify({
				id: id,
				email: email
			})
		});

		const dataRes = await res.json();

		if (dataRes) {
			return JSON.stringify({
				data: dataRes
			});
		}
	}
};
