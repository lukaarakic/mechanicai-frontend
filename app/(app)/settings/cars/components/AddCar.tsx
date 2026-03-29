"use client";

import Button from "@/app/components/ui/Button";
import Field from "@/app/components/ui/Field";
import FormMessage from "@/app/components/ui/FormMessage";
import {
  addCarAction,
  AddCarState,
} from "@/app/lib/actions/settings/cars/add-car";
import { useActionState } from "react";

const AddCar = () => {
  const [state, action, isPending] = useActionState<AddCarState, FormData>(
    addCarAction,
    { errors: {}, success: false },
  );

  return (
    <form action={action} className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <Field name="make" label="Make" placeholder="Toyota" type="text" />
          <FormMessage error={state.errors.make} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Field name="model" label="Model" placeholder="Corolla" type="text" />
          <FormMessage error={state.errors.model} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="flex flex-col gap-1.5">
          <Field
            name="year"
            label="Year"
            placeholder="2018"
            type="number"
            min="1900"
            max={new Date().getFullYear().toString()}
          />
          <FormMessage error={state.errors.year} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Field
            name="size"
            label="Engine (cc)"
            placeholder="1998"
            type="number"
            min="50"
          />
          <FormMessage error={state.errors.size} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Field
            name="power"
            label="Power (hp)"
            placeholder="150"
            type="number"
            min="1"
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
