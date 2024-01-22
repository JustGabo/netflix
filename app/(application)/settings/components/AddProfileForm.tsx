"use client";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import useProfileStore from "@/stores/profile";
import useUserStore from "@/stores/user";
import { Logos } from "@/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { PlusIcon } from "lucide-react";
import Image from "next/image";
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
  const [isOpen, setIsOpen] = useState(false)

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
      setIsOpen(false)
    }
  };

  return (
    <main className="flex flex-col w-full gap-5">
      <Dialog defaultOpen={isOpen}>
        <DialogTrigger asChild>
        <button
          onClick={() => setIsOpen(true)}
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
              className="w-full p-2 text-white border-none rounded-md outline-none bg-zinc-800 placeholder:text-sm"
              type="text"
              placeholder="Write your new profile name"
            />
          </form>
        </section>
        <section className="flex flex-col gap-5">
          <h2 className="text-xl text-white">Choose your avatar</h2>
          <article className="grid grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-4">
            {logos.map((logo) => {
              return (
                <button
                  onClick={() => setLogoUrl(logo.logoUrl)}
                  key={logo.id}
                  className={`flex items-center ${logoUrl == logo.logoUrl ? 'border-5 p-1 border-white' : 'border-none'} justify-center text-white  md:w-28 md:h-28 lg:h-28 w-full h-full lg:w-full overflow-hidden border-2 border-transparent rounded-md group-hover:cursor-pointer group-hover:border-white group-hover:transition`}
                >
                  <Image width={200} height={200} src={logo.logoUrl} alt="" />
                </button>
              );
            })}
          </article>
          <button
            onClick={() => handleCreateProfile()}
            className="w-full p-2 font-semibold bg-white rounded-md text-zinc-900"
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
