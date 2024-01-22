import { Profile } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProfileState {
  selectedProfile: Profile | null;
  userProfiles: Profile[];

  setSelectedProfile: (profile: Profile) => void;
  setUserProfiles: (profiles: Profile[]) => void;
}

const useProfileStore = create(
  persist<ProfileState>(
    (set) => ({
      selectedProfile: null,
      userProfiles: [],

      setSelectedProfile: (profile) => {
        set({ selectedProfile: profile });
      },

      setUserProfiles: (profiles) => {
        set({ userProfiles: profiles });
      },
    }),
    {
      name: "profile-storage",
      getStorage: () => localStorage,
    }
  )
);


export default useProfileStore;
