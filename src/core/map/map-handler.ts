import { User } from "firebase/auth";
import { MapScene } from "./map-scene";

export const mapHandler = {
  viewer: null as MapScene | null,

  async start(container: HTMLDivElement, user: User) {
    if (!this.viewer) {
      console.log("Map started");
      this.viewer = new MapScene(container);
      await this.viewer.getAllBuildings(user);
    }
  },

  remove() {
    if (this.viewer) {
      console.log("Map removed");
      this.viewer.dispose();
      this.viewer = null;
    }
  },

  addBuilding(user: User) {
    if (this.viewer) {
      this.viewer.addBuilding(user);
    }
  },
};
