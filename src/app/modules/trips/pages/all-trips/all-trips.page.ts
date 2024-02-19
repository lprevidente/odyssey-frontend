import { Component } from "@angular/core";

@Component({
  selector: "app-all-trips",
  templateUrl: "all-trips.page.html",
  styleUrls: ["all-trips.page.scss"],
})
export class AllTripsPage {
  public constructor() {
    console.log("AllTripsPage.constructor");
  }
}
