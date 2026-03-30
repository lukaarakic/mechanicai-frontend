import type { Metadata } from "next";
import Button from "@/app/components/ui/Button";
import Field from "@/app/components/ui/Field";
import { getUser } from "@/app/lib/get-user";
import Image from "next/image";
import Section from "../../../components/ui/Section";
import ProfileForm from "./components/ProfileForm";
import ChangePasswordForm from "./components/ChangePasswordForm";
import DeleteAccount from "./components/DeleteAccount";

export const metadata: Metadata = {
  title: "Account Settings | MechanicAI",
  description: "Update your profile, password, and account preferences.",
};

const AccountSettings = async () => {
  const user = await getUser();

  return (
    <div className="flex flex-col">
      <div className="mb-8 pb-6 border-b border-white/[0.06]">
        <div className="flex items-center gap-4">
          {user?.avatar ? (
            <Image
              src={user.avatar}
              unoptimized
              alt="User avatar"
              width={56}
              height={56}
              className="h-14 w-14 rounded-2xl border border-white/10"
            />
          ) : (
            <div className="h-14 w-14 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center text-xl">
              👤
            </div>
          )}
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
            defaultValue={user?.email}
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
