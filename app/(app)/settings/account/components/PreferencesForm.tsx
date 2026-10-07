"use client";

import { useActionState } from "react";
import Button from "@/app/components/ui/Button";
import FormMessage from "@/app/components/ui/FormMessage";
import { updatePreferencesAction } from "@/app/lib/actions/settings/account/update-preferences";
import { DistanceUnit } from "@/app/types/user";
import { cn } from "@/app/lib/cn";

const UNITS: { value: DistanceUnit; label: string }[] = [
  { value: "km", label: "Kilometers (km)" },
  { value: "mi", label: "Miles (mi)" },
];

const PreferencesForm = ({ distanceUnit }: { distanceUnit: DistanceUnit }) => {
  const [state, action, isPending] = useActionState(updatePreferencesAction, {
    error: null,
    success: false,
  });

  return (
    <form action={action} className="flex flex-col gap-3">
      <fieldset className="flex flex-col gap-2">
        <legend className="mb-1.5 text-xs font-medium tracking-wide text-white/40">
          Distance unit
        </legend>
        <div className="flex flex-wrap gap-2">
          {UNITS.map((unit) => (
            <label
              key={unit.value}
              className={cn(
                "flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white/70",
                "has-[:checked]:border-white/30 has-[:checked]:bg-white/10 has-[:checked]:text-white",
                "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-white/30",
              )}
            >
              <input
                type="radio"
                name="distance_unit"
                value={unit.value}
                defaultChecked={distanceUnit === unit.value}
                className="sr-only"
              />
              {unit.label}
            </label>
          ))}
        </div>
      </fieldset>

      <FormMessage error={state.error} />
      <FormMessage success={state.success ? "Preferences saved." : null} />

      <Button className="w-fit" variant="outline" disabled={isPending}>
        {isPending ? "Saving..." : "Save preferences"}
      </Button>
    </form>
  );
};

export default PreferencesForm;
