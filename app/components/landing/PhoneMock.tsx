import LogoWhite from "@/app/assets/logo-white.svg";

// A static picture of the real chat: typed questions and answers, then the
// reply in progress. Keep it in line with how the app actually behaves.
const PhoneMock = () => (
  <div
    role="img"
    aria-label="Example chat: the user describes a squeal when braking and DashClue asks a follow-up question."
    className="relative mx-auto w-full max-w-[300px] rounded-[2.5rem] border border-white/15 bg-[#0b0b0b] p-3 shadow-2xl shadow-blue-950/40"
  >
    <div className="overflow-hidden rounded-[2rem] border border-white/6 bg-black">
      <div className="flex items-center gap-2 border-b border-white/6 px-4 py-3">
        <LogoWhite className="h-5 w-5" aria-hidden />
        <span className="text-xs text-white/60">Squeal when braking</span>
      </div>

      <div className="flex flex-col gap-3 px-4 py-4 text-[13px] leading-snug">
        <p className="ml-8 rounded-2xl rounded-tr-sm bg-white/10 px-3 py-2 text-white">
          Squealing from the front wheels when I brake.
        </p>
        <p className="mr-8 rounded-2xl rounded-tl-sm border border-white/6 bg-white/[0.03] px-3 py-2 text-white/80">
          Does it squeal only when you brake, or also while driving?
        </p>
        <p className="ml-8 rounded-2xl rounded-tr-sm bg-white/10 px-3 py-2 text-white">
          Only when braking, mostly in the morning.
        </p>
        <p className="mr-8 rounded-2xl rounded-tl-sm border border-white/6 bg-white/[0.03] px-3 py-2 text-white/80">
          Got it. Is the noise high-pitched, or more of a grinding sound?
        </p>
        <div className="mr-8 flex w-fit gap-1 rounded-2xl rounded-tl-sm border border-white/6 bg-white/[0.03] px-3 py-3">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/40 motion-reduce:animate-none" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/40 [animation-delay:150ms] motion-reduce:animate-none" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/40 [animation-delay:300ms] motion-reduce:animate-none" />
        </div>
      </div>

      <div className="mx-3 mb-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3 text-[13px] text-white/40">
        Reply or ask a follow-up question...
      </div>
    </div>
  </div>
);

export default PhoneMock;
