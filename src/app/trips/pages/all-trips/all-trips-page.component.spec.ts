import { ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { ExploreContainerComponentModule } from "../../components/trips-card/explore-container.module";

import { AllTripsPage } from "./all-trips-page.component";

describe("Tab1Page", () => {
  let component: AllTripsPage;
  let fixture: ComponentFixture<AllTripsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllTripsPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AllTripsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
