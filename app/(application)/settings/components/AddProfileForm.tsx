"use client";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import useProfileStore from "@/stores/profile";
import useUserStore from "@/stores/user";
import { Logos } from "@/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
interface Props {
  logos: Logos[];
}

const AddProfileForm: React.FC<Props> = ({ logos }) => {
  const router = useRouter();
  const { user } = useUserStore();
  const [name, setName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const supabase = createClientComponentClient();

  const handleCreateProfile = async () => {
    if (name == "") {
      return console.log("Need to add a name");
    } else if (logoUrl == "") {
      return console.log("need to add a logo");
    }

    const { error, status } = await supabase.from("profiles").insert({
      profileName: name,
      profileImg: logoUrl,
      ownerEmail: user?.email,
      ownerId: user?.id,
    });

    if (status == 201) {
      router.refresh();
    }
  };

  return (
    <main className="flex flex-col gap-5 w-full">
      <Dialog>
        <DialogTrigger asChild>
        <button
          // onClick={() => setVariant("create")}
          className={` transition duration-200 text-center rounded-md border-2 cursor-pointer lg:w-32 lg:h-32 w-full h-24 flex items-center justify-center flex-col text-white`}
        >
          <PlusIcon className="" />
          New
        </button>
        </DialogTrigger>
        <DialogContent className="bg-zinc-900 w-[85%] rounded-md text-white  m-auto">
        <section className="flex flex-col gap-5">
          <DialogHeader className="pt-5">
          <h2 className="text-xl text-white">Create</h2>
          </DialogHeader>
          <form action="">
            <input
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="p-2 bg-zinc-800 border-none outline-none w-full rounded-md placeholder:text-sm text-white"
              type="text"
              placeholder="Write your new profile name"
            />
          </form>
        </section>
        <section className="flex flex-col gap-5">
          <h2 className="text-xl text-white">Choose your avatar</h2>
          <article className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-2">
            {logos.map((logo) => {
              return (
                <button
                  onClick={() => setLogoUrl(logo.logoUrl)}
                  key={logo.id}
                  className={`flex items-center ${logoUrl == logo.logoUrl ? 'border-5 p-1 border-white' : 'border-none'} justify-center text-white  md:w-28 md:h-28 lg:h-28 w-full h-full lg:w-full overflow-hidden border-2 border-transparent rounded-md group-hover:cursor-pointer group-hover:border-white group-hover:transition`}
                >
                  <img src={logo.logoUrl} alt="" />
                </button>
              );
            })}
          </article>
          <button
            onClick={() => handleCreateProfile()}
            className="p-2 w-full bg-white font-semibold text-zinc-900 rounded-md"
          >
            Create
          </button>
        </section>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default AddProfileForm;
