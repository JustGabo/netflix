// "use client";

// import { supabase } from "@/db/supabase";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// export const OnAuthStateChange = async () => {
//   const router = useRouter();

//   const change = supabase.auth.onAuthStateChange((e, session) => {
//     console.log(e, session);

//     if (e === "INITIAL_SESSION") {
//       // handle initial session
//       router.push("/auth");
//     } else if (e === "SIGNED_IN") {
//       // handle sign in event
//       router.push("/");
//     } else if (e === "SIGNED_OUT") {
//       // handle sign out event
//       router.push("/auth");
//     } else if (e === "PASSWORD_RECOVERY") {
//       // handle password recovery event
//     } else if (e === "TOKEN_REFRESHED") {
//       // handle token refreshed event
//     } else if (e === "USER_UPDATED") {
//       // handle user updated event
//     }
//   });

//   useEffect(() => {
//     change;
//   }, []);

//   return;
// };
