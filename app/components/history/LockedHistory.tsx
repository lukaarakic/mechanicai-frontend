import { ButtonLink } from "../ui/Button";

const LockedHistory = () => (
  <div className="flex flex-col items-center justify-center rounded-2xl border border-white/8 bg-white/[0.02] px-6 py-16 text-center">
    <p className="font-medium text-white/50">Your history is locked</p>
    <p className="mt-1 mb-6 text-sm text-white/30">
      Upgrade to Pro to keep every diagnostic in one place.
    </p>
    <ButtonLink href="/settings/subscription">Unlock history</ButtonLink>
  </div>
);

export default LockedHistory;
