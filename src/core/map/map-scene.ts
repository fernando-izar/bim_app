import { Building, GisParameters, LngLat } from "../../types";
import * as MAPBOX from "mapbox-gl";
import * as THREE from "three";
import * as OBC from "openbim-components";
import { MAPBOX_KEY } from "../../config";
import { User } from "firebase/auth";
import { MapDatabase } from "./map-database";
import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer";

export class MapScene {
  private components = new OBC.Components();
  private readonly style = "mapbox://styles/mapbox/light-v10";
  private map: MAPBOX.Map;
  private center: LngLat = { lat: 0, lng: 0 };
  private clickedCoordinates: LngLat = { lat: 0, lng: 0 };
  private labels: { [id: string]: CSS2DObject } = {};
  private database = new MapDatabase();

  constructor(container: HTMLDivElement) {
    const configuration = this.getConfig(container);
    this.map = this.createMap(configuration);
    this.initializeComponents(configuration);
    this.setupScene();
  }

  dispose() {
    this.components.dispose();
    (this.map as any) = null;
    (this.components as any) = null;
    for (const id in this.labels) {
      const label = this.labels[id];
      label.removeFromParent();
      label.element.remove();
    }
    this.labels = {};
  }

  async getAllBuildings(user: User) {
    const building = await this.database.getBuildings(user);
    if (this.components) {
      this.addToScene(building);
    }
  }

  async addBuilding(user: User) {
    const { lat, lng } = this.clickedCoordinates;
    const userID = user.uid;
    const building = { userID, lat, lng, uid: "" };
    building.uid = await this.database.add(building);
    this.addToScene([building]);
  }

  private addToScene(buildings: Building[]) {
    for (const building of buildings) {
      const { uid, lng, lat } = building;

      const htmlElement = this.createHtmlElement();
      const label = new CSS2DObject(htmlElement);

      const center = MAPBOX.MercatorCoordinate.fromLngLat(
        { ...this.center },
        0
      );

      const units = center.meterInMercatorCoordinateUnits();

      const model = MAPBOX.MercatorCoordinate.fromLngLat({ lng, lat }, 0);
      model.x /= units;
      model.y /= units;
      center.x /= units;
      center.y /= units;

      label.position.set(model.x - center.x, 0, model.y - center.y);

      this.components.scene.get().add(label);
      this.labels[uid] = label;
    }
  }

  private createHtmlElement() {
    const div = document.createElement("div");
    div.textContent = "🏢";
    div.classList.add("thumbnail");
    return div;
  }

  private setupScene() {
    const scene = this.components.scene.get();
    scene.background = null;
    const dirLight1 = new THREE.DirectionalLight(0xffffff);
    dirLight1.position.set(0, -70, 100).normalize();
    scene.add(dirLight1);
    const dirLight2 = new THREE.DirectionalLight(0xffffff);
    dirLight2.position.set(0, 70, 100).normalize();
    scene.add(dirLight2);
  }

  private initializeComponents(config: GisParameters) {
    this.components.scene = new OBC.SimpleScene(this.components);
    this.components.camera = new OBC.MapboxCamera();
    this.components.renderer = this.createRenderer(config);
    this.components.init();
  }

  private createRenderer(config: GisParameters) {
    const coords = this.getCoordinates(config);
    return new OBC.MapboxRenderer(this.components, this.map, coords);
  }

  private getCoordinates(config: GisParameters) {
    const merc = MAPBOX.MercatorCoordinate;
    return merc.fromLngLat(config.center, 0);
  }

  private createMap(config: GisParameters) {
    const map = new MAPBOX.Map({
      ...config,
      style: this.style,
      antialias: true,
    });
    map.on("contextmenu", this.storeMousePosition);
    return map;
  }

  private storeMousePosition = (event: MAPBOX.MapMouseEvent) => {
    this.clickedCoordinates = { ...event.lngLat };
  };

  private getConfig(container: HTMLDivElement): GisParameters {
    const center = [-49.38708624627419, -20.8145532673887] as [number, number];
    this.center = { lat: center[1], lng: center[0] };
    return {
      container,
      accessToken: MAPBOX_KEY,
      zoom: 17,
      pitch: 60,
      bearing: -40,
      center: center,
      buildings: [],
    };
  }
}
