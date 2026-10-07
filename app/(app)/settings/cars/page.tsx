import type { Metadata } from "next";
import Section from "../../../components/ui/Section";
import { getCars } from "@/app/lib/get-cars";
import { getUser } from "@/app/lib/get-user";
import { Car } from "@/app/types/car";
import RemoveCarForm from "./components/RemoveCarForm";
import AddCar from "./components/AddCar";
import { ButtonLink } from "@/app/components/ui/Button";

export const metadata: Metadata = {
  title: "Car Settings",
  description: "Add, edit, and remove vehicles linked to your account.",
};

const CarSettings = async () => {
  const [cars, user] = await Promise.all([getCars(), getUser()]);
  const canAddCar = user.subscribed || cars.length === 0;

  return (
    <div className="flex flex-col">
      <div className="mb-8 pb-6 border-b border-white/6">
        <p className="text-base font-medium text-white">My Cars</p>
        <p className="text-sm text-white/40 mt-0.5">
          Manage the vehicles linked to your account.
        </p>
      </div>

      <Section
        title="Your vehicles"
        description="Remove cars you no longer drive."
      >
        {cars.length === 0 ? (
          <p className="text-sm text-white/20">No cars added yet.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {cars.map((car: Car) => (
              <RemoveCarForm key={car.id} car={car} />
            ))}
          </div>
        )}
      </Section>

      <Section
        title="Add a vehicle"
        description={
          canAddCar
            ? "Add a new car to your account."
            : "The free plan includes one car. Upgrade to Pro to add more."
        }
      >
        {canAddCar ? (
          <AddCar />
        ) : (
          <ButtonLink href="/settings/subscription" className="w-fit">
            Upgrade to Pro
          </ButtonLink>
        )}
      </Section>
    </div>
  );
};

export default CarSettings;
