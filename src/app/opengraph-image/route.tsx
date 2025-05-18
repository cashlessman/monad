// import { ImageResponse } from "next/og";
import { NextRequest} from "next/server";
import axios from "axios";
import { ImageResponse } from "@vercel/og";


export async function GET(req: NextRequest) {


  const fid = req.nextUrl.searchParams.get("fid")||"268438"
  

  const appUrl = process.env.NEXT_PUBLIC_URL;

  let pfpUrl: string = "";
  let username: string = "";



    try {
      
  
    
    const apiUrl = `https://api.warpcast.com/v2/user?fid=${fid}`;
    const response = await axios.get(apiUrl);
    pfpUrl = response.data?.result?.user?.pfp?.url; // Assign value to pfpUrl
    username = response.data?.result?.user?.username; // Assign value to username

  
  const imageResponse = new ImageResponse(
    (
     
      <div tw="flex flex-col w-full h-full bg-[#836EF9] text-2xl text-[#FBFAF9] font-bold">
            <div tw="flex top-7 left-7">
      <img
        src={`${appUrl}/icon.png`}
        alt="Rotating Icon"
        tw="w-12 h-12 animate-spin-slow"
      />
    </div>
      <div tw="flex items-center justify-center mt-20">
            <img
              src={pfpUrl}
              alt="Profile"
              tw="w-15 h-15 rounded-full mr-4"
            />
       </div>
      

<div tw="flex flex-col items-center text-center space-y-2">
  <div tw="flex text-lg font-bold text-gray-800">@{username}</div>
  <div tw="flex text-base font-bold text-gray-600">is requesting</div>
  <div tw="flex text-xl font-bold">0.69 testnet MON</div>
</div>


      </div>
    ),
    {
      width: 600,
      height: 400,
    }
  );
  const headers = new Headers(imageResponse.headers);
  headers.set(
    "Cache-Control",
    "public, s-maxage=300, stale-while-revalidate=59"
  );

  return new Response(imageResponse.body, {
    headers,
    status: imageResponse.status,
    statusText: imageResponse.statusText,
  });
} catch {
  return new Response("Failed to generate image", {
    status: 500,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
}