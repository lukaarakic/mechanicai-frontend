import Button from "@/app/components/ui/button";
import Field from "@/app/components/ui/field";
import { getUser } from "@/app/lib/getUser";
import Image from "next/image";
import Section from "../../../components/ui/Section";

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
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <Field
              name="first_name"
              label="First Name"
              defaultValue={user?.first_name}
              type="text"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Field
              name="last_name"
              label="Last Name"
              defaultValue={user?.last_name}
              type="text"
            />
          </div>
        </div>
        <Button className="w-fit">Save changes</Button>
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
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <Field
              name="password"
              label="Current password"
              placeholder="••••••••"
              type="password"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Field
                name="new_password"
                label="New password"
                placeholder="••••••••"
                type="password"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Field
                name="confirm_password"
                label="Confirm password"
                placeholder="••••••••"
                type="password"
              />
            </div>
          </div>
        </div>
        <Button className="w-fit" variant="outline">
          Update password
        </Button>
      </Section>

      <Section title="Danger zone">
        <div className="rounded-xl border border-red-500/15 bg-red-500/4 p-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-red-400">Delete account</p>
            <p className="text-xs text-white/30 mt-0.5">
              Permanently delete your account and all data. This cannot be
              undone.
            </p>
          </div>
          <Button variant="destructive">Delete</Button>
        </div>
      </Section>
    </div>
  );
};

export default AccountSettings;
