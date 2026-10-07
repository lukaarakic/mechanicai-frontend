"use client";

import Button from "@/app/components/ui/Button";
import Field from "@/app/components/ui/Field";
import FormMessage from "@/app/components/ui/FormMessage";
import {
  addCarAction,
  AddCarState,
} from "@/app/lib/actions/settings/cars/add-car";
import { useActionState } from "react";
import {
  CAR_MAX_YEAR,
  CAR_MIN_YEAR,
} from "@/app/lib/validations/car-validation";

const AddCar = () => {
  const [state, action, isPending] = useActionState<AddCarState, FormData>(
    addCarAction,
    { errors: {}, success: false },
  );

  return (
    <form action={action} className="flex flex-col gap-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Field
            name="make"
            defaultValue={state.values?.make}
            label="Make"
            placeholder="Toyota"
            type="text"
          />
          <FormMessage error={state.errors.make} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Field
            name="model"
            defaultValue={state.values?.model}
            label="Model"
            placeholder="Corolla"
            type="text"
          />
          <FormMessage error={state.errors.model} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="flex flex-col gap-1.5">
          <Field
            name="year"
            defaultValue={state.values?.year}
            label="Year"
            placeholder="2018"
            type="number"
            min={CAR_MIN_YEAR}
            max={CAR_MAX_YEAR}
          />
          <FormMessage error={state.errors.year} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Field
            name="size"
            defaultValue={state.values?.size}
            label="Engine (cc)"
            placeholder="1998"
            type="number"
            min="50"
            max="10000"
          />
          <FormMessage error={state.errors.size} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Field
            name="power"
            defaultValue={state.values?.power}
            label="Power (hp)"
            placeholder="150"
            type="number"
            min="1"
            max="2000"
          />
          <FormMessage error={state.errors.power} />
        </div>
      </div>

      <FormMessage error={state.errors.general} />
      <FormMessage
        success={state.success ? "Car added successfully!" : undefined}
      />

      <Button className="w-fit" disabled={isPending}>
        {isPending ? "Adding..." : "Add car"}
      </Button>
    </form>
  );
};

export default AddCar;
