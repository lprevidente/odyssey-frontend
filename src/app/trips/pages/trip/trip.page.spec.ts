import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { TripPage } from "./trip.page";

describe("TripPage", () => {
  let component: TripPage;
  let fixture: ComponentFixture<TripPage>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(TripPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
