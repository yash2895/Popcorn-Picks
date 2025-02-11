import { NextRequest, NextResponse } from "next/server";
export async function GET(request) {
  const query = request.nextUrl.searchParams.get("query");
  const page =  Number(request.nextUrl.searchParams.get("page"))-1
 let value=[]
  let totalResults=0;
  let n=3;

  // As the API provides only ten entries on every hit, hitting it 3 time to get enough movies every time
  for(let i=1;i<=n;i++){
    console.log(`hitting http://www.omdbapi.com/?apikey=${process.env.API_KEY}&s='${query}'&page=${i+(page*3)}`);

  const data = await fetch(
    `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&s='${query}'&page=${i+(page*3)}`,
  ).then(response => {
  return response.json()}
    ).then(data => {
    return data
    })

  if(data.Error){
return NextResponse.json({success:false,status:404,error:data.Error})
  }

    value=[...value,...data.Search]
    totalResults=data.totalResults
    n=totalResults<30 ? totalResults/10 :3
  }

  return NextResponse.json({ success: true, status: 200, data:value,totalResults });

}
