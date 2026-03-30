import type { Metadata } from "next";
import Section from "../../../components/ui/Section";
import { getCars } from "@/app/lib/get-cars";
import { Car } from "@/app/types/car";
import RemoveCarForm from "./components/RemoveCarForm";
import AddCar from "./components/AddCar";

export const metadata: Metadata = {
  title: "Car Settings | MechanicAI",
  description: "Add, edit, and remove vehicles linked to your account.",
};

const CarSettings = async () => {
  const cars = await getCars();

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
        description="Edit or remove your saved cars."
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
        description="Add a new car to your account."
      >
        <AddCar />
      </Section>
    </div>
  );
};

export default CarSettings;
