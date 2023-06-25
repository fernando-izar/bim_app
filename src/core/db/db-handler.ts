import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { Action } from "../../middleware/actions";
import { Building } from "../../types";
import { getApp } from "@firebase/app";
import { deleteDoc, doc, getFirestore, updateDoc } from "@firebase/firestore";
import { Events } from "../../middleware/event-handler";

export const databaseHandler = {
  login: (action: Action) => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  },

  logout: () => {
    const auth = getAuth();
    signOut(auth);
  },

  deleteBuilding: async (building: Building, events: Events) => {
    const dbInstance = getFirestore(getApp());
    await deleteDoc(doc(dbInstance, "buildings", building.uid));
    events.trigger({ type: "CLOSE_BUILDING" });
  },

  updateBuilding: async (building: Building) => {
    const dbInstance = getFirestore(getApp());
    await updateDoc(doc(dbInstance, "buildings", building.uid), {
      ...building,
    });
  },
};
