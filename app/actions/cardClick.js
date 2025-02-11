"use server"
import { redirect } from 'next/navigation'
export const cardClick=async(e)=>{
redirect(`/movie/${e}`)
}
