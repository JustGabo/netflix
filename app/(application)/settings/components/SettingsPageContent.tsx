"use client";
import useProfileStore from "@/stores/profile";
import { ChevronLeft, Pencil, PlusIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import AddProfileForm from "./AddProfileForm";
import UpdateProfileForm from "./UpdateProfileForm";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Logos } from "@/types";
import { useRouter } from "next/navigation";

type Variants = {
  create: JSX.Element;
  update: JSX.Element;
  waiting: JSX.Element;
};

interface Props {
  logosProps: Logos[];
}

const SettingsPageContent: React.FC<Props> = ({ logosProps }) => {
  const router = useRouter();
  const { setSelectedProfile, userProfiles, selectedProfile } = useProfileStore(
    (state) => state
  );

  // const variants: Variants = {
  //   create: <AddProfileForm logos={logosProps} />,
  //   update: <UpdateProfileForm logos={logosProps} profile={selectedProfile}/>,
  //   waiting: <div className="w-full h-full border flex-1 ">div</div>,
  // };
  const [variant, setVariant] = useState<keyof Variants>("waiting");

  return (
    <section className="flex flex-col gap-10 h-full">
      <ChevronLeft
        onClick={() => router.back()}
        className="text-white w-10 h-10 cursor-pointer"
      />

      <article className="flex gap-10 lg:gap-2 h-full flex-col lg:flex-row lg:w-full lg:justify-center  lg:items-center items-start w-full">
        <div className="  w-full lg:h-full justify-start lg:justify-center  flex flex-col  gap-10 items-center">
          <h1 className="lg:text-3xl md:text-3xl text-2xl text-white">
            Profiles
          </h1>
          <div className="grid grid-cols-2 lg:grid-cols-4 lg:gap-10   gap-5">
            {userProfiles?.map((profile) => {
              return (
                <div
                  key={profile.id}
                  onClick={() => {
                    setSelectedProfile(profile);
                    setVariant("update");
                  }}
                >
                  <div
                    className={`flex flex-col items-center  w-24 md:w-32 lg:w-32 mx-auto group `}
                  >
                    <div
                      className={`flex items-center justify-center ${
                        profile.profileName == selectedProfile?.profileName
                          ? "border-[4px] border-white "
                          : "border-none"
                      } md:w-16 md:h-16 lg:h-32 w-full h-full lg:w-32 overflow-hidden  rounded-md group-hover:cursor-pointer group-hover:border-white group-hover:transition`}
                    >
                      <img src={profile.profileImg} alt="" />
                    </div>
                    <UpdateProfileForm logos={logosProps} profile={profile} />
                  </div>
                </div>
              );
            })}
            <AddProfileForm logos={logosProps} />
          </div>
        </div>
      </article>
      {/* {variants[variant]} */}
    </section>
  );
};

export default SettingsPageContent;
