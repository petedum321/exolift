import { Routes } from "@angular/router";
import { TrackingComponent } from "./pages/tracking/tracking.component";
import { HomeComponent } from "./pages/home/home.component";

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "tracking", component: TrackingComponent },
  { path: "**", redirectTo: "" },
];
//https://github.com/petedum321/exolift/tree/exolift
