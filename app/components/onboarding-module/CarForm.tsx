"use client";

import { Dispatch, SetStateAction } from "react";
import Field from "../ui/field";

interface CarFormProps {
  data: {
    profile: {
      firstName: string;
      lastName: string;
      avatar: string;
    };
    car: {
      make: string;
      model: string;
      year: string;
      size: string;
      power: string;
    };
  };
  setData: Dispatch<
    SetStateAction<{
      profile: {
        firstName: string;
        lastName: string;
        avatar: string;
      };
      car: {
        make: string;
        model: string;
        year: string;
        size: string;
        power: string;
      };
    }>
  >;
}

const CarForm = ({ data, setData }: CarFormProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      car: { ...prev.car, [name]: value },
    }));
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
      {/* Header */}
      <div className="flex flex-col items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-6">
        <div className="relative">
          <div className="absolute -inset-1 rounded-full bg-linear-to-br from-white/20 to-white/0 blur-sm" />
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-white/15 bg-white/5 text-4xl">
            🚗
          </div>
        </div>
        <p className="text-xs text-white/30">Your vehicle</p>
      </div>

      {/* Make + Model */}
      <div className="grid grid-cols-2 gap-3">
        <Field
          name="make"
          type="text"
          label="Make"
          placeholder="Toyota"
          value={data.car.make}
          onChange={handleChange}
        />
        <Field
          name="model"
          type="text"
          label="Model"
          placeholder="Corolla"
          value={data.car.model}
          onChange={handleChange}
        />
      </div>

      {/* Year */}
      <Field
        name="year"
        type="number"
        label="Year"
        placeholder="2018"
        value={data.car.year}
        onChange={handleChange}
        min="1900"
        max={new Date().getFullYear()}
      />

      {/* Size + Power */}
      <div className="grid grid-cols-2 gap-3">
        <Field
          name="size"
          type="number"
          label="Engine size (cc)"
          placeholder="1998"
          value={data.car.size}
          onChange={handleChange}
          min="0"
        />
        <Field
          name="power"
          type="number"
          label="Power (hp)"
          placeholder="150"
          value={data.car.power}
          onChange={handleChange}
          min="0"
        />
      </div>
    </form>
  );
};

export default CarForm;
