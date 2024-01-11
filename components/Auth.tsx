"use client";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { NextPageContext } from "next";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import Input from "@/components/Input";
import { supabase } from "@/db/supabase";
import { usingContext } from "@/context/UserContext";


const Auth = () => {

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const { user } = usingContext();
    const [defaultImg, setDefaultImg] = useState('')
  
    const [variant, setVariant] = useState("login");
  
    const toggleVariant = useCallback(() => {
      setVariant((currentVariant) =>
        currentVariant === "login" ? "register" : "login"
      );
    }, []);

    const getDefaultImg = async () => {
        const {data} = await supabase.storage
          .from("images")
          .getPublicUrl("default-red.png");    
          setDefaultImg(data.publicUrl)
      };
    
  
    const creatingDefaultProfile = async () => {
      const {data, error} = await supabase.from("profiles").insert({
        ownerId: user?.userId,
        profileName: user?.Name,
        profileImg: defaultImg,
      });
      if(error){
        console.log(error)
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
    };
  
    const register = async () => {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          emailRedirectTo: "http://localhost:3000/profiles",
          data: {
            name: name,
          },
        },
      });
  
      if (error) {
        console.log(error)
      } else {
        if(defaultImg && user){
            creatingDefaultProfile()
        }
      }

      router.push('/confirmEmail')
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

    useEffect(()=>{
        getDefaultImg()
    },[])
  

  return (
    <div className="relative h-screen w-full  bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full  lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" className="h-12" alt="Logo" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70  px-12 py-10 self-center mt-2 lg:w-2/5  lg:max-w-ld rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
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
              className="bg-red-600 py-3 text-white rounded-md w-full mt-4 hover:bg-red-700 transition"
            >
              {variant === "login" ? "Login" : "Sign up"}
            </button>
            <div className="flex flex-row items-center gap-4 mt-6 justify-center">
              <div
                onClick={() => signIn("google", { callbackUrl: "/profiles" })}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FcGoogle size={32} />
              </div>
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                <button onClick={GithubSign}>
                  <FaGithub size={32} />
                </button>
              </div>
            </div>
            <p className="text-neutral-500 mt-6">
              {variant === "login"
                ? "First time using Netflix?"
                : "Already have an account?"}
              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant === "login" ? "Create an account" : "Login"}
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth