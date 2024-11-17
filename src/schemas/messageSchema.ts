import {boolean, z} from 'zod';

export const messageSchema = z.object({
    content:z.string().min(10,{message:"content atleast 10 characters"}).max(200,{message:"Max content reached "})
})