'use client';

import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

import { RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnalysisResultProps {
   result: {
      emotions: {
         fear: number;
         anger: number;
         hope: number;
         sadness: number;
      };
      bias: {
         direction: 'left' | 'right' | 'neutral';
         confidence: number;
         explanation: string;
      };
      missing_context: string[];
      rewrite: string;
      manipulation_score: number;
   };
}

export default function AnalysisResult({ result }: AnalysisResultProps) {
   const { emotions, bias, missing_context, rewrite, manipulation_score } = result;

   const getScoreColor = (score: number) => {
      if (score < 30) return 'text-[#a6e3a1]'; // Green
      if (score < 70) return 'text-[#fab387]'; // Peach/Yellow
      return 'text-[#f38ba8]'; // Red
   };

   return (
      <div className="space-y-4 animate-in fade-in slide-in-from-bottom-6 duration-1000 ease-out">
         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

            <Card className="bg-[#1e1e2e]/50 border-white/5 shadow-2xl backdrop-blur-3xl rounded-2xl overflow-hidden group">
               <CardContent className="flex flex-col items-center justify-center pt-6 pb-4 px-4">
                  <div className="relative mb-3">
                     <div className={cn(
                        "absolute inset-0 blur-2xl opacity-10 transition-all duration-1000 group-hover:opacity-30",
                        getScoreColor(manipulation_score).replace('text-', 'bg-')
                     )} />
                     <span className={cn("relative text-5xl font-black tracking-tighter", getScoreColor(manipulation_score))}>
                        {manipulation_score}
                     </span>
                  </div>
                  <p className="text-[9px] text-[#9399b2] font-bold uppercase tracking-[0.2em] text-center leading-tight">
                     MANIPULATION
                  </p>
               </CardContent>
            </Card>


            <Card className="bg-[#1e1e2e]/50 border-white/5 shadow-2xl backdrop-blur-3xl rounded-2xl md:col-span-3 flex flex-col justify-center px-6">
               <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-4">
                  <div className="space-y-0.5">
                     <span className="text-[9px] font-bold text-[#9399b2] uppercase tracking-widest">Bias Vector</span>
                     <h3 className="text-xl font-bold text-[#cdd6f4] capitalize">{bias.direction} Perspective</h3>
                  </div>
                  <div className="flex items-center gap-4 bg-white/[0.02] border border-white/[0.05] px-3 py-1.5 rounded-lg">
                     <div className="flex flex-col items-end">
                        <span className="text-[8px] font-bold text-[#7f849c] uppercase">Confidence</span>
                        <span className="text-xs font-black text-[#cdd6f4]">{Math.round(bias.confidence * 100)}%</span>
                     </div>
                     <div className="w-16 h-1 bg-[#313244] rounded-full overflow-hidden">
                        <div
                           className="h-full bg-[#a6e3a1] transition-all duration-1000"
                           style={{ width: `${bias.confidence * 100}%` }}
                        />
                     </div>
                  </div>
               </div>
               <div className="pb-4 border-t border-white/[0.05] pt-3">
                  <p className="text-xs text-[#bac2de] font-medium leading-relaxed italic line-clamp-2">
                     &quot;{bias.explanation}&quot;
                  </p>
               </div>
            </Card>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <Card className="bg-[#1e1e2e]/50 border-white/5 shadow-2xl backdrop-blur-3xl rounded-2xl p-6">
               <div className="mb-4">
                  <span className="text-[9px] font-bold text-[#9399b2] uppercase tracking-widest">Sentiment Resonance</span>
               </div>
               <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                  <EmotionMiniBar label="Fear" value={emotions.fear} color="text-[#cba6f7]" bgColor="bg-[#cba6f7]/20" />
                  <EmotionMiniBar label="Anger" value={emotions.anger} color="text-[#f38ba8]" bgColor="bg-[#f38ba8]/20" />
                  <EmotionMiniBar label="Hope" value={emotions.hope} color="text-[#a6e3a1]" bgColor="bg-[#a6e3a1]/20" />
                  <EmotionMiniBar label="Sadness" value={emotions.sadness} color="text-[#89b4fa]" bgColor="bg-[#89b4fa]/20" />
               </div>
            </Card>


            <Card className="bg-[#1e1e2e]/50 border-white/5 shadow-2xl backdrop-blur-3xl rounded-2xl p-6">
               <div className="mb-4">
                  <span className="text-[9px] font-bold text-[#9399b2] uppercase tracking-widest">Missing Perspectives</span>
               </div>
               <ScrollArea className="h-[100px] pr-4">
                  <div className="space-y-2">
                     {missing_context.map((item, i) => (
                        <div key={i} className="flex gap-3 items-start group">
                           <div className="w-0.5 h-0.5 rounded-full bg-[#45475a] mt-2.5 group-hover:bg-[#cba6f7] transition-colors" />
                           <p className="text-[11px] text-[#bac2de] font-medium leading-relaxed group-hover:text-[#cdd6f4] transition-colors">{item}</p>
                        </div>
                     ))}
                  </div>
               </ScrollArea>
            </Card>
         </div>


         <Card className="bg-[#181825]/80 border border-white/5 shadow-2xl backdrop-blur-3xl rounded-2xl p-8 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#cba6f7]/[0.05] blur-[120px] rounded-full -z-10" />
            <div className="flex flex-col gap-4">
               <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#cba6f7]/5 flex items-center justify-center border border-[#cba6f7]/10">
                     <RefreshCw className="w-3.5 h-3.5 text-[#cba6f7]/50" />
                  </div>
                  <span className="text-[9px] font-bold text-[#9399b2] uppercase tracking-widest">Objective Reconstruction</span>
               </div>
               <p className="text-sm text-[#cdd6f4] font-medium leading-[1.6] tracking-tight">
                  {rewrite}
               </p>
            </div>
         </Card>
      </div>
   );
}

function EmotionMiniBar({ label, value, color, bgColor }: { label: string, value: number, color: string, bgColor: string }) {
   return (
      <div className="space-y-2">
         <div className="flex justify-between items-end">
            <span className="text-[8px] font-bold uppercase tracking-widest text-[#9399b2]">{label}</span>
            <span className="text-[10px] font-black text-[#cdd6f4]">{Math.round(value * 100)}%</span>
         </div>
         <div className="h-1 w-full bg-[#313244] rounded-full overflow-hidden">
            <div className={cn("h-full transition-all duration-1000", bgColor)} style={{ width: `${value * 100}%` }} />
         </div>
      </div>
   );
}
