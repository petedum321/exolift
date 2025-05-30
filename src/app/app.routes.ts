import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { TrackingComponent } from "./pages/tracking/tracking.component";

 export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tracking', component: TrackingComponent },
  { path: '**', redirectTo: '' }
];
