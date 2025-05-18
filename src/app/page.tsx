import { Metadata } from "next";
import App from "~/app/app";

const appUrl = process.env.NEXT_PUBLIC_URL;

export const revalidate = 300;

interface Props {
  searchParams: Promise<{
    fid: string;
    add:string;
  }>;
}

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { fid} = await searchParams || "268438"
    const { add} = await searchParams  || "6100B29a235ebb272F4B10c1964AD9692EE67e13"

  
  const frame = {
    version: "next",
    imageUrl:`${appUrl}/opengraph-image?fid=${fid}`,  
        button: {
      title: `SEND`,
    action: {
      type: "launch_frame",
      name: "0.69 MON",
      url: `${appUrl}?fid=${fid}&add=${add}`,
      splashImageUrl: `https://raw.githubusercontent.com/cashlessman/images/refs/heads/main/pfp.png`,
      splashBackgroundColor: "#200052",
      },
    },
  };

  return {
    title: "Monad testnet",
    openGraph: {
      title: "Monad testnet mini app",
      description: "Monad testnet mini app by cashlessman.eth",
    },
    other: {
      "fc:frame": JSON.stringify(frame),
    },
  };
}

export default function Home() {
  return (<App />);
}


