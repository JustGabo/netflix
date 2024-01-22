"use client";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import useProfileStore from "@/stores/profile";
import useUserStore from "@/stores/user";
import { Logos, Profile } from "@/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Pencil } from "lucide-react";
import React, { useEffect, useState } from "react";

interface Props {
  logos: Logos[];
  profile: Profile
}

const UpdateProfileForm: React.FC<Props> = ({ logos,profile }) => {
  const {user} = useUserStore()
  const { selectedProfile } = useProfileStore();
  const [newUser, setNewUser] = useState({
    name: selectedProfile?.profileName,
    logo: "",
  });
  const [name, setName] = useState(profile?.profileName);
  const [logoUrl, setLogoUrl] = useState(profile?.profileImg);
  const supabase = createClientComponentClient();

  const handleUpdate = async () => {
    const result = await supabase.from("profiles").update({
      profileName: name,
      profileImg: logoUrl
    }).eq('ownerId', user?.id).eq('id', selectedProfile?.id)
    console.log(result)
  };

  const handleLogo = (logoUrl: string) => {
    setLogoUrl(logoUrl);
  };

  useEffect(() => {}, []);

  return (
    <main className="flex flex-col gap-5 w-full">
      <Dialog>
        <DialogTrigger asChild>
          <div className="md:mt-1 flex cursor-pointer justify-center items-center gap-1  mt-2 text-base  md:text-base lg:text-lg text-center text-gray-400 group-hover:text-white group-hover:transition">
            {profile.profileName}
            <Pencil className="w-3 h-3 lg:h-4 lg:w-4" />
          </div>
        </DialogTrigger>
        <DialogContent className="bg-zinc-900 w-[85%] rounded-md text-white  m-auto">
        <section className="flex flex-col gap-5">
        <DialogHeader className="pt-5">
          <h2 className="text-xl text-white">Edit</h2>
          </DialogHeader>
          <form action="">
            <input
            onChange={(e)=> setName(e.target.value)}
              className="p-2 bg-zinc-800 border-none outline-none w-full rounded-md placeholder:text-sm text-white"
              type="text"
              value={name}
            />
          </form>
        </section>
        <section className="flex flex-col gap-5">
          <h2 className="text-xl text-white">Choose a new avatar</h2>
          <article className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-2">
            {logos.map((logo) => {
              return (
                <div
                onClick={()=> setLogoUrl(logo.logoUrl)}
                  key={logo.id}
                  className={`flex items-center ${logo.logoUrl === logoUrl ? 'border-5 p-1 border-white' : 'border-none'}  justify-center text-white  md:w-28 md:h-28 lg:h-28 w-full h-full lg:w-full overflow-hidden border-2 border-transparent rounded-md group-hover:cursor-pointer group-hover:border-white group-hover:transition`}
                >
                  <img src={logo.logoUrl} alt="" />
                </div>
              );
            })}
          </article>
          <button onClick={()=> handleUpdate()} className="p-2 w-full bg-zinc-300 text-zinc-900 rounded-md">
            Update
          </button>
        </section>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default UpdateProfileForm;
