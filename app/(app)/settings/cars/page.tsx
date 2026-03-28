import Button from "@/app/components/ui/button";
import Field from "@/app/components/ui/field";
import Section from "../../../components/ui/Section";
import { getCars } from "@/app/lib/getCars";

const CarSettings = async () => {
  const cars = await getCars();

  return (
    <div className="flex flex-col">
      <div className="mb-8 pb-6 border-b border-white/[0.06]">
        <p className="text-base font-medium text-white">My Cars</p>
        <p className="text-sm text-white/40 mt-0.5">
          Manage the vehicles linked to your account.
        </p>
      </div>

      <Section
        title="Your vehicles"
        description="Edit or remove your saved cars."
      >
        {cars.length === 0 ? (
          <p className="text-sm text-white/20">No cars added yet.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {cars.map((car: any) => (
              <div
                key={car.id}
                className="flex items-center justify-between gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-base">
                    🚗
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {car.make} {car.model}
                    </p>
                    <p className="text-xs text-white/35">
                      {car.year} · {car.size}cc · {car.power}hp
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {car.default_car && (
                    <span className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-400">
                      Default
                    </span>
                  )}
                  <Button variant="destructive" className="h-8 px-3 text-xs">
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>

      <Section
        title="Add a vehicle"
        description="Add a new car to your account."
      >
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <Field name="make" label="Make" placeholder="Toyota" type="text" />
            <Field
              name="model"
              label="Model"
              placeholder="Corolla"
              type="text"
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <Field
              name="year"
              label="Year"
              placeholder="2018"
              type="number"
              min="1900"
              max={new Date().getFullYear().toString()}
            />
            <Field
              name="size"
              label="Engine (cc)"
              placeholder="1998"
              type="number"
              min="0"
            />
            <Field
              name="power"
              label="Power (hp)"
              placeholder="150"
              type="number"
              min="0"
            />
          </div>
        </div>
        <Button className="w-fit">Add car</Button>
      </Section>

      <Section title="Danger zone">
        <div className="rounded-xl border border-red-500/15 bg-red-500/[0.04] p-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-red-400">
              Remove all vehicles
            </p>
            <p className="text-xs text-white/30 mt-0.5">
              This will remove all cars and their associated diagnostic history.
            </p>
          </div>
          <Button variant="destructive">Remove all</Button>
        </div>
      </Section>
    </div>
  );
};

export default CarSettings;
