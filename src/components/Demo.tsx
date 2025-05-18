"use client";

import { useEffect, useCallback, useState } from "react";
import sdk, {
  type Context,
} from "@farcaster/frame-sdk";
import {
  useAccount,
  useSendTransaction,
  useConnect,
  useChainId,
  useSwitchChain,
  useDisconnect
} from "wagmi";

import { monadTestnet } from "viem/chains";
import { parseEther } from "viem";
import { config } from "~/components/providers/WagmiProvider";
import { truncateAddress } from "~/lib/truncateAddress";
import { BaseError, UserRejectedRequestError } from "viem";
import { useSearchParams } from "next/navigation";


export default function Demo(
) {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [context, setContext] = useState<Context.FrameContext>();

 const chainId = useChainId();
  const { isConnected } = useAccount();
  const {switchChain} = useSwitchChain();
  const {
    sendTransaction,
    error: sendTxError,
    isError: isSendTxError,
    isPending: isSendTxPending,
  } = useSendTransaction();


  const { connect } = useConnect();

  useEffect(() => {
    const load = async () => {
      const context = await sdk.context;
      setContext(context);

      sdk.actions.ready({});
    };
    if (sdk && !isSDKLoaded) {
      setIsSDKLoaded(true);
      load();
      return () => {
        sdk.removeAllListeners();
      };
    }
  }, [isSDKLoaded]);

      useEffect(() => {
  if (!isConnected) {
    connect({ connector: config.connectors[0] })
  }
}, [context]); 


    useEffect(() => {
  if (isConnected && chainId !== monadTestnet.id ) {
    switchChain({ chainId: monadTestnet.id })
  }
}, []); 
 const searchParams = useSearchParams();
  const fid = searchParams.get("fid") || "268438"
  const add = searchParams.get("add")?.slice(2) || "6100B29a235ebb272F4B10c1964AD9692EE67e13"

  async function sendMON() {
    sendTransaction({
      to: `0x${add}`,
      value: parseEther("0.69"),
    });
  }
 



  interface ProfileResponse {
    pfpUrl: string;
    username: string;
    display_name: string;
    fids: string;
    followingcount: string;
    followerscount: string;
    }
  const [profileData, setProfileData] = useState<ProfileResponse >();

  const fetchProfile = useCallback(async (fid: string) => {
    try {
      const profileResponse = await fetch(`/api/profile?fid=${fid}`);
      if (!profileResponse.ok) {
        throw new Error(`Fid HTTP error! Status: ${profileResponse.status}`);
      }
      const profileResponseData = await profileResponse.json();
      setProfileData({
        pfpUrl: profileResponseData.pfpUrl,
        username: profileResponseData.username,
        display_name: profileResponseData.display_name,
        fids: profileResponseData.fids,
        followingcount: profileResponseData.followCount,
        followerscount: profileResponseData.followerscount,
        
          
        });
    } catch (err) {
      console.error("Error fetching profile data", err);
    }
  
  }, []);
  
  useEffect(() => {
    if (context?.user.fid) {
      fetchProfile(String(fid));
    } 
  }, [context?.user.fid]);

  
  

        if (!context?.user.fid)
          return (
            <div className="flex items-center justify-center h-screen bg-gray-900">
            <div className="flex flex-col items-center justify-center text-white text-2xl p-4">
              <p className="flex items-center justify-center text-center">
                you need to access this frame from inside a farcaster client
              </p>
              <p className="flex items-center justify-center text-center">
                (click on the logo to open in Warpcast)
              </p>
          
              <div className="flex items-center justify-center p-2 bg-white rounded-lg mt-4">
              <a href="https://warpcast.com/cashlessman.eth/0xcaf78007" target="_blank" rel="noopener noreferrer" className="shadow-lg shadow-white">
  <img 
    src="https://warpcast.com/og-logo.png"
    alt="Profile" 
    className="w-28 h-28 shadow-lg" 
  />
</a>

              </div>
            </div>
          </div>
          
          );
      return (
        <div style={{ 
          paddingTop: context?.client.safeAreaInsets?.top ?? 0, 
          paddingBottom: context?.client.safeAreaInsets?.bottom ?? 0,
          paddingLeft: context?.client.safeAreaInsets?.left ?? 0,
          paddingRight: context?.client.safeAreaInsets?.right ?? 0 ,
        }}>
    <Mon/>
      </div>
    
    
      );
    
    
      function Mon( ) {

        return (
<div className="flex flex-col w-full min-h-screen bg-[#200052] text-[#FBFAF9] items-center justify-center p-6">
  <Chain/>   <WalletButton/> <Share/>
      <div className="flex justify-center items-center">
      <img
        src="/icon.png"
        alt="Rotating Icon"
        className="w-12 h-12 animate-spin-slow"
      />
    </div>

      <div className="bg-white bg-opacity-10 p-6 rounded-2xl shadow-lg flex flex-col items-center text-center mt-10 w-full max-w-md">
        <img src={profileData?.pfpUrl} alt="Profile" className="w-28 h-28 rounded-full border-4 border-white shadow-lg" />
        <div className="mt-4">
          <h2 className="text-2xl font-extrabold text-white">{profileData?.display_name}</h2>
          <p className="text-lg text-gray-300">@{profileData?.username}</p>
        </div>
        <div className="flex justify-around w-full mt-4">
          <div className="bg-white bg-opacity-20 px-4 py-2 rounded-lg">
            <span className="text-lg font-bold text-white">{profileData?.followingcount}</span>
            <p className="text-gray-300 text-sm">Following</p>
          </div>
          <div className="bg-white bg-opacity-20 px-4 py-2 rounded-lg">
            <span className="text-lg font-bold text-white">{profileData?.followerscount}</span>
            <p className="text-gray-300 text-sm">Followers</p>
          </div>
        </div>
      </div>
    
      <Mint /> 
    </div>
        
        );
      }
    
      function Mint(){

        const [isClicked, setIsClicked] = useState(false);
      
      
      
        const handleMint = () => {
          setIsClicked(true);
          setTimeout(() => { 
            if (isConnected) {
               sendMON()
            } else {
              connect({ connector: config.connectors[0] }); // Otherwise, call connect
            }
          }, 500);
          
         
          setTimeout(() => setIsClicked(false), 500); // Reset after animation
        
        };

        return (
          <div className="flex flex-col">
              <button
            onClick={handleMint}
            disabled={isSendTxPending}
      
            className="text-white mt-8 text-center py-3 rounded-xl font-semibold text-lg shadow-lg relative overflow-hidden transform transition-all duration-200 hover:scale-110 active:scale-95 flex items-center justify-center gap-2"
            style={{
              background: "linear-gradient(90deg, #8B5CF6, #7C3AED, #A78BFA, #8B5CF6)",
              backgroundSize: "300% 100%",
              animation: "gradientAnimation 3s infinite ease-in-out"
            }}
          >     
            <div className={`absolute inset-0 bg-[#38BDF8] transition-all duration-500 ${isClicked ? 'scale-x-100' : 'scale-x-0'}`} style={{ transformOrigin: "center" }}></div>
            <style>{`
              @keyframes gradientAnimation {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
              }
            `}</style>
             {isConnected ? <MintButton/> : "Connect Wallet"}
          </button>
          <div className="text-center">
          {isSendTxError && renderError(sendTxError)}
                      </div>
          </div>
        
        )
      }
       function MintButton(){
        return(
<div className="flex flex-row items-center gap-2 px-5">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 relative z-10"> 
    <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
  </svg>
  
  <span className="relative z-10">send 0.69 MON to @{profileData?.username}</span>
  
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 relative z-10"> 
    <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
  </svg>
</div>

        )
       }

 function WalletButton(){
          const { address, isConnected } = useAccount();
          
 const { disconnect } = useDisconnect();
  const { connect } = useConnect();

        return(
<div className="fixed top-4 right-4 z-10">
  <div
    className="flex items-center px-4 py-2 bg-[#836EF9] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
  >
    {!isConnected ? (
      <span className="flex items-center gap-2 text-sm font-medium"
      onClick={()=>connect({ connector: config.connectors[0] })}>
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          ></path>
        </svg>
        Connect Wallet
      </span>
    ) : (
      <span className="text-sm font-mono"
       onClick={()=>disconnect()}>{truncateAddress(address||"address")}</span>
    )}
  </div>
</div>
        )
       }

       function Chain(){
        return(
<div className="fixed top-4 left-4 z-10">
  <div
    className="flex items-center px-4 py-2 bg-[#836EF9] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
  >
      {chainId === 10143 ? (
        "MonadTestNet"
      ) : (
        <span onClick={()=> switchChain({ chainId: monadTestnet.id })} style={{ cursor: "pointer", color: "red" }}>
          Wrong Chain
        </span>
      )}
  </div>
</div>
        )
       }

function Share(){
            const { address } = useAccount();
const cast = async (): Promise<string | undefined> => {
  try {
    const result = await sdk.actions.composeCast({ 
      text: "Want to use your MON airdrop? send me just 0.69 MON through this mini app by @cashlessman.eth",
      embeds: [`https://testnet-monad.vercel.app?fid=${context?.user.fid}&add=${address}`],
    });

    return result.cast?.hash;
  } catch (error) {
    console.error("Error composing cast:", error);
    return undefined;
  }
};
        return(
<div className="fixed bottom-10 left-4 z-10">
  <div
    className="flex items-center px-4 py-2 bg-[#836EF9] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
  onClick={cast}
  > Request 0.69 MON
  
  </div>
</div>
        )
       }
}

const renderError = (error: Error | null) => {
  if (!error) return null;
  if (error instanceof BaseError) {
    const isUserRejection =
    error instanceof UserRejectedRequestError ||
    (error.cause && error.cause instanceof UserRejectedRequestError);
  

    if (isUserRejection) {
      return <div className="text-red-500 text-xs mt-1">Rejected by user.</div>;
    }
  }

  return <div className="text-red-500 text-xs mt-1">{error.message}</div>;
};
