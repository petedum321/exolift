import { Routes } from "@angular/router";
//import { HomeComponent } from "./pages/home/home.component";
import { TrackingComponent } from "./pages/tracking/tracking.component";

export const routes: Routes = [
  { path: "", component: TrackingComponent },
  { path: "tracking", component: TrackingComponent },
  { path: "**", redirectTo: "" },
];
//oi
