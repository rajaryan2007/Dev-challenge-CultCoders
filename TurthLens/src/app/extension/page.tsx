'use client';

import { Chrome, Download, ShieldCheck, Zap, Layers, Cpu } from "lucide-react";

export default function ExtensionPage() {
    return (
        <div className="min-h-screen bg-[#1e1e2e] flex flex-col items-center justify-center p-6 text-center space-y-12 pt-[100px] relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#cba6f7]/5 to-transparent pointer-events-none" />
            <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-[#cba6f7]/10 blur-[120px] rounded-full" />
            <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-[#89b4fa]/10 blur-[120px] rounded-full" />

            <div className="space-y-4 max-w-2xl z-10">
                <div className="w-24 h-24 rounded-[3rem] bg-[#313244]/50 border border-white/5 flex items-center justify-center mx-auto mb-8 backdrop-blur-3xl shadow-2xl animate-bounce-slow">
                    <Chrome size={48} className="text-[#cba6f7]" />
                </div>
                <h1 className="text-6xl font-black tracking-tighter text-[#cdd6f4]">
                    TruthLens <span className="text-[#cba6f7]">OS</span>
                </h1>
                <p className="text-xl text-[#9399b2] font-medium leading-relaxed max-w-lg mx-auto">
                    The ultimate truth-extraction engine, now directly in your browser context.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full z-10">
                {[
                    { icon: ShieldCheck, title: "Neural Bias Filter", desc: "Detects subtle political leanings through semantic analysis.", color: "text-[#cba6f7]" },
                    { icon: Zap, title: "Emotion Mapping", desc: "Visualizes manipulation tactics used in headlines.", color: "text-[#fab387]" },
                    { icon: Layers, title: "Cross-Reference", desc: "Automatically finds missing context from reliable sources.", color: "text-[#a6e3a1]" }
                ].map((feature, i) => (
                    <div key={i} className="p-8 rounded-[2rem] bg-[#313244]/30 border border-white/5 space-y-4 text-left backdrop-blur-xl hover:bg-[#313244]/50 transition-all group">
                        <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center ${feature.color} group-hover:scale-110 transition-transform`}>
                            <feature.icon size={28} />
                        </div>
                        <div className="space-y-2">
                            <h3 className="font-bold text-xl text-[#cdd6f4]">{feature.title}</h3>
                            <p className="text-sm text-[#7f849c] leading-relaxed">{feature.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="space-y-12 w-full max-w-4xl z-10">
                <div className="p-10 rounded-[3rem] bg-[#181825]/80 border border-white/5 backdrop-blur-3xl text-left space-y-10 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                    <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-[#cba6f7]/10 border border-[#cba6f7]/20 flex items-center justify-center">
                            <Cpu size={30} className="text-[#cba6f7]" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-[#cdd6f4]">Deployment Protocol</h2>
                            <p className="text-[#9399b2] text-sm">Initialize local TruthLens instance</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {[
                            { step: "01", title: "Archive Extraction", desc: "Download the core extension package to your secure local directory." },
                            { step: "02", title: "System Overwrite", desc: "Enable Developer Mode in `chrome://extensions` to bypass standard store limits." },
                            { step: "03", title: "Kernel Hook", desc: "Click 'Load unpacked' and initialize the `extension` directory." },
                            { step: "04", title: "Global Sync", desc: "TruthLens will automatically sync with your dashboard for persistent logs." }
                        ].map((item, i) => (
                            <div key={i} className="flex gap-6 group">
                                <span className="text-5xl font-black text-[#313244] group-hover:text-[#cba6f7]/20 transition-all uppercase italic leading-none">{item.step}</span>
                                <div className="space-y-2">
                                    <h4 className="font-bold text-lg text-[#bac2de] group-hover:text-[#cdd6f4] transition-colors">{item.title}</h4>
                                    <p className="text-xs text-[#6c7086] leading-relaxed font-medium">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="pt-8 flex flex-col items-center gap-8 border-t border-white/5">
                        <a
                            href="https://github.com/rajaryan2007/truthlens/releases/tag/truthlens"
                            className="bg-[#cba6f7] text-[#1e1e2e] hover:bg-[#b4befe] rounded-[2rem] px-16 py-6 text-xl font-black transition-all hover:scale-[1.05] active:scale-[0.95] shadow-[0_0_40px_rgba(203,166,247,0.3)] flex items-center gap-4 group"
                        >
                            <Download size={24} className="group-hover:translate-y-1 transition-transform" />
                            ACTIVATE PROTOCOL
                        </a>
                        <p className="text-[10px] text-[#585b70] uppercase tracking-[0.6em] font-black opacity-60">
                            TruthLens Engine v2.4.0 // Secured Connection
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}