import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
    const session = await event.locals.auth()

    if(!session?.user){
        redirect(300,"/")
    }

    if(event.params.slug !== session.user.email){
        redirect(300,"/")
    }

    const res = await fetch(`http://localhost:8080/api/getMyFavorite/${event.params.slug}`);

    const data = await res.json()
    
    return {
        favorite: data
    };
}) satisfies PageServerLoad;