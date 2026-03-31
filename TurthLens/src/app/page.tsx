"use client"
import Hyperspeed from "@/components/Hyperspeed";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      
      <div className="fixed inset-0 -z-10 bg-black">
        <Hyperspeed 
          effectOptions={{
            distortion: 'turbulentDistortion',
            length: 400,
            roadWidth: 10,
            islandWidth: 2,
            lanesPerRoad: 4,
            fov: 90,
            fovSpeedUp: 150,
            speedUp: 3,
            carLightsFade: 0.4,
            totalSideLightSticks: 20,
            lightPairsPerRoadWay: 40,
            shoulderLinesWidthPercentage: 0.05,
            brokenLinesWidthPercentage: 0.1,
            brokenLinesLengthPercentage: 0.5,
            lightStickWidth: [0.12, 0.5],
            lightStickHeight: [1.3, 1.7],
            movingAwaySpeed: [60, 80],
            movingCloserSpeed: [-120, -160],
            carLightsLength: [400 * 0.03, 400 * 0.2],
            carLightsRadius: [0.05, 0.14],
            carWidthPercentage: [0.3, 0.5],
            carShiftX: [-0.8, 0.8],
            carFloorSeparation: [0, 5],
            colors: {
              roadColor: 0x181825,
              islandColor: 0x1e1e2e,
              background: 0x11111b,
              shoulderLines: 0xcdd6f4,
              brokenLines: 0xcdd6f4,
              leftCars: [0xcba6f7, 0xf5c2e7, 0xf2cdcd],
              rightCars: [0x89b4fa, 0x89dceb, 0x94e2d5],
              sticks: 0xb4befe
            }
          }}
        />
      </div>

    
      <div className="z-10 text-center px-4 max-w-4xl animate-in fade-in zoom-in duration-1000 ease-out">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-[#cdd6f4] to-[#cba6f7] animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          Welcome to <span className="text-[#cba6f7]">TruthLens</span>
        </h1>
        <p className="text-lg md:text-xl text-[#bac2de] max-w-2xl mx-auto mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
          Transforming information extraction with clarity and precision. 
          Experience the future of intelligent data processing.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-2 duration-1000 delay-700">
          <Link 
            href="/chat" 
            className="px-12 py-5 bg-[#cba6f7] text-[#1e1e2e] font-black rounded-full hover:bg-[#b4befe] hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(203,166,247,0.3)] text-xl"
          >
            Start Exploring
          </Link>
          <Link 
            href="/extension" 
            className="px-12 py-5 bg-white/5 text-white font-black rounded-full border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:scale-105 transition-all duration-300 text-xl"
          >
            Get Extension
          </Link>
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#cba6f7]/10 blur-[150px] rounded-full -z-10 animate-pulse transition-all duration-5000" />
    </div>
  );
}
