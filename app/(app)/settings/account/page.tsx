import type { Metadata } from "next";
import Field from "@/app/components/ui/Field";
import { getUser } from "@/app/lib/get-user";
import Avatar from "@/app/components/ui/Avatar";
import Section from "../../../components/ui/Section";
import ProfileForm from "./components/ProfileForm";
import ChangePasswordForm from "./components/ChangePasswordForm";
import DeleteAccount from "./components/DeleteAccount";
import PreferencesForm from "./components/PreferencesForm";

export const metadata: Metadata = {
  title: "Account Settings",
  description: "Update your profile, password, and account preferences.",
};

const AccountSettings = async () => {
  const user = await getUser();

  return (
    <div className="flex flex-col">
      <div className="mb-8 pb-6 border-b border-white/[0.06]">
        <div className="flex items-center gap-4">
          <Avatar
            src={user.avatar}
            name={user.first_name}
            size={56}
            className="rounded-2xl border border-white/10"
          />
          <div>
            <p className="text-base font-medium text-white">
              {user?.first_name} {user?.last_name}
            </p>
            <p className="text-sm text-white/40">{user?.email}</p>
          </div>
        </div>
      </div>

      <Section title="Profile" description="Update your display name.">
        <ProfileForm user={user} />
      </Section>

      <Section title="Email address" description="Your login email address.">
        <div className="flex items-center gap-3">
          <Field
            type="email"
            name="email"
            defaultValue={user.email}
            aria-label="Email address"
            disabled
          />
          <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/30">
            Verified
          </span>
        </div>
        <p className="text-xs text-white/20">
          Email changes require contacting support.
        </p>
      </Section>

      <Section
        title="Preferences"
        description="Diagnoses show distances in this unit. Repair costs are in US dollars."
      >
        <PreferencesForm distanceUnit={user.distance_unit} />
      </Section>

      <Section title="Password" description="Change your account password.">
        <ChangePasswordForm />
      </Section>

      <Section title="Danger zone">
        <DeleteAccount />
      </Section>
    </div>
  );
};

export default AccountSettings;
