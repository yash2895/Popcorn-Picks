import { NextResponse } from "next/server";
export async function GET(request) {
const id= request.nextUrl.searchParams.get("id")
  const data = await fetch(
    `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&i=${id}&plot=full`,
  ).then(response => {
  return response.json()}
    ).then(data => {
    return data
    })

  if(data.Error){
return NextResponse.json({success:false,status:404,error:data.Error})
  }
  return NextResponse.json({ success: true, status: 200, data });

}
