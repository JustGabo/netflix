import { ChevronLeft } from "lucide-react";
import SettingsPageContent from "./components/SettingsPageContent";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const SettingsPage = async () => {

  const supabase = createClientComponentClient();

  const {data} = await supabase.from('logos').select()


  return (
    <div className="h-screen w-full lg:p-10 p-6  flex flex-col gap-10 justify-center">
      <SettingsPageContent logosProps={data!} />
    </div>
  );
};

export default SettingsPage;
