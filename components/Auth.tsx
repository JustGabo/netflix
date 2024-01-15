"use client";
import {createClientComponentClient} from '@supabase/auth-helpers-nextjs'
import { useCallback, useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import Input from "@/components/Input";

const Auth = () => {
  const router = useRouter();
  const supabase = createClientComponentClient()

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [defaultImg, setDefaultImg] = useState("");
  const [waitingConfirmation, setWaitingConfirmation] = useState(false);

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
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.log(error);
    }
    router.refresh()
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
        return console.log(result.error);
      }
      creatingUser();
    } else {
      return console.log(error);
    }

    setWaitingConfirmation(true);
    router.refresh()
  };

  const GithubSign = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });

    if (error) {
      console.log(error);
    } else {
      console.log(data);
    }
  };

  useEffect(() => {
    getDefaultImg();
  }, []);

  return (
    <div className="relative h-screen w-full  bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="w-full h-full bg-black lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" className="h-12" alt="Logo" />
        </nav>
        <div className="flex justify-center">
          <div className="self-center w-full px-12 py-10 mt-2 bg-black rounded-md bg-opacity-70 lg:w-2/5 lg:max-w-ld">
            <h2 className="mb-8 text-4xl font-semibold text-white">
              {variant === "login" ? "Sign in" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
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
            </div>
            <button
              onClick={variant === "login" ? login : register}
              className="w-full py-3 mt-4 text-white transition bg-red-600 rounded-md hover:bg-red-700"
            >
              {variant === "login" ? "Login" : "Sign up"}
            </button>
            <div className="flex flex-row items-center justify-center gap-4 mt-6">
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
            </div>

            <p className="mt-6 text-neutral-500">
              {variant === "login"
                ? "First time using Netflix?"
                : "Already have an account?"}
              <span
                onClick={toggleVariant}
                className="ml-1 text-white cursor-pointer hover:underline"
              >
                {variant === "login" ? "Create an account" : "Login"}
              </span>
            </p>
          </div>
        </div>
        {waitingConfirmation && (
          <div className="w-full m-auto mt-2 bg-black rounded-md p-7 bg-opacity-70 lg:w-2/5 lg:max-w-lg">
            <span className="text-gray-300">
              Please confirm your email address to continue
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
