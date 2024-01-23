"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useCallback, useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import Input from "@/components/Input";
import useUserStore from "@/stores/user";
import Image from "next/image";

const Auth = () => {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [defaultImg, setDefaultImg] = useState("");
  const [waitingConfirmation, setWaitingConfirmation] = useState(false);
  const { setUser } = useUserStore((set) => set);
  const [error, setError] = useState<string | null>(null);

  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const getDefaultImg = () => {
    const { data } = supabase.storage
      .from("images/logos")
      .getPublicUrl("default-red.png");
    setDefaultImg(data.publicUrl);
  };

  const creatingUser = async () => {
    const { data, error } = await supabase.from("users").insert({
      name: name,
      email: email,
    });
    if (error) {
      console.log(error);
    }
  };

  const login = async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError("Invalid credentials");
    }
    if (user) {
      setUser(user);
    }
    router.refresh();
  };

  const register = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
        data: {
          name: name,
        },
      },
    });

    if (data.user !== null) {
      const result = await supabase.from("profiles").insert({
        ownerId: data.user.id,
        profileName: name,
        profileImg: defaultImg,
        ownerEmail: email,
      });
      if (result.error) {
        return result.error;
      }
      creatingUser();
    } else {
      return error;
    }

    setWaitingConfirmation(true);
    setUser(data.user);
    router.refresh();
  };

  const GithubSign = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });

    if (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDefaultImg();
  }, []);

  return (
    <main className="relative h-screen w-full  bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <section className="w-full h-full bg-opacity-20 md:bg-opacity-50">
        <nav className="lg:px-12 px-6 bg-black/70 md:bg-transparent lg:py-5 py-8">
          <Image
            width={150}
            height={150}
            src="/images/logo.png"
            className="h-6 md:h-12"
            alt="Logo"
          />
        </nav>
        <article className="flex flex-col justify-center relative">
          <div className="self-center md:w-[90%] md:h-auto h-[calc(100vh-80px)] w-full px-6 lg:px-12 py-5 lg:py-10 md:py-8 md:mt-2 bg-black md:rounded-md bg-opacity-70 lg:w-2/5 lg:max-w-lg">
            <h2 className="mb-8 text-2xl md:text-4xl  font-semibold text-white">
              {variant === "login" ? "Sign in" : "Register"}
            </h2>
            <form className="flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  id="name"
                  type="text"
                  label="Username"
                  value={name}
                  onChange={(e: any) => setName(e.target.value)}
                />
              )}
              <Input
                id="email"
                type="email"
                label="Email address or phone number"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                id="password"
                label="Password"
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
              />
            </form>
            <button
              onClick={variant === "login" ? login : register}
              className="w-full font-semibold py-3 mt-4 text-white transition bg-red-600 rounded-md hover:bg-red-700"
            >
              {variant === "login" ? "Login" : "Sign up"}
            </button>
            {/* <div className="flex flex-row items-center justify-center gap-4 mt-6">
              <div
                onClick={() => signIn("google", { callbackUrl: "/profiles" })}
                className="flex items-center justify-center w-10 h-10 transition bg-white rounded-full cursor-pointer hover:opacity-80"
              >
                <FcGoogle size={32} />
              </div>
              <div className="flex items-center justify-center w-10 h-10 transition bg-white rounded-full cursor-pointer hover:opacity-80">
                <button onClick={GithubSign}>
                  <FaGithub size={32} />
                </button>
              </div>
            </div> */}

            <p className="mt-6 text-sm md:text-base text-neutral-400">
              {variant === "login"
                ? "First time using Netflix?"
                : "Already have an account?"}
              <span
                onClick={toggleVariant}
                className="ml-1 text-white text-sm md:text-base cursor-pointer hover:underline"
              >
                {variant === "login" ? "Create an account" : "Login"}
              </span>
            </p>
            {error && (
              <div className="lg:w-full w-[100%]  flex lg:hidden bottom-0 md:w-[90%] m-auto md:mt-2 p-5 mt-5 bg-zinc-900/70 md:bg-black/70  rounded-md md:p-7  text-xs md:text-base   lg:max-w-lg">
                <span className="text-red-500">{error}</span>
              </div>
            )}
            {waitingConfirmation && (
              <div className="lg:w-full w-[100%] md:w-[80%] flex lg:hidden   m-auto md:mt-2 p-5 mt-5 bg-zinc-900/70 md:bg-black/70  rounded-md md:p-7  text-xs md:text-base   lg:max-w-lg">
                <span className="text-green-500">
                  Please confirm your email address to continue
                </span>
              </div>
            )}
          </div>
        </article>
        {error && (
          <div className="lg:w-full w-[80%]  hidden lg:flex bottom-0 md:w-[90%] m-auto md:mt-2 p-5 mt-0 bg-zinc-900/70 md:bg-black/70  rounded-md md:p-7  text-xs md:text-base   lg:max-w-lg">
            <span className="text-red-500">{error}</span>
          </div>
        )}
        {waitingConfirmation && (
          <div className="lg:w-full w-[80%] md:w-[80%] hidden lg:flex  m-auto md:mt-2 p-5 mt-0 bg-zinc-900/70 md:bg-black/70  rounded-md md:p-7  text-xs md:text-base   lg:max-w-lg">
            <span className="text-green-500">
              Please confirm your email address to continue
            </span>
          </div>
        )}
      </section>
    </main>
  );
};

export default Auth;
