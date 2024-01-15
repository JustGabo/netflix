import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

export default async function ApplicationLayout({ children }: Props) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log("CURRENT SESSION", session);

  if (session) {
    return redirect("/");
  }

  return <>{children}</>;
}
