import { Component } from "@angular/core";

@Component({
  selector: "app-all-trips",
  templateUrl: "all-trips-page.component.html",
  styleUrls: ["all-trips-page.component.scss"],
})
export class AllTripsPage {
  constructor() {
    console.log("AllTripsPage.constructor");
  }
}
