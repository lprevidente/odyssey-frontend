import { Component } from "@angular/core";
import { Activity, trackByActivityId } from "@modules/trips/models/activity";

@Component({
  selector: "app-timeline",
  templateUrl: "./timeline.component.html",
  styleUrls: ["./timeline.component.scss"],
})
export class TimelineComponent {
  public activities: Activity[] = [
    {
      id: "2",
      name: "Flight to Amsterdam",
      notes: "Description for event 1",
      link: null,
      type: "transportation",
      attachments: [],
      from: {
        id: "1",
        title: "San Francisco",
        resultType: "poi",
        address: {
          city: "San Francisco",
          label: "San Francisco",
        },
        position: {
          lat: 52.3364,
          lng: 4.8769,
        },
      },
      to: {
        id: "1",
        title: "Amsterdam",
        resultType: "poi",
        address: {
          label: "Amsterdam, Holland",
        },
        position: {
          lat: 52.3364,
          lng: 4.8769,
        },
      },
      departureTime: "09:00",
      arrivalTime: "11:00",
      mode: "car",
      number: "FR 1345",
    },
    {
      id: "1",
      name: "Lunch at Restaurant Le pain quotidien",
      notes: "Description for event 1",
      link: null,
      type: "eatery",
      attachments: [],
      place: {
        id: "1",
        title: "Restaurant Le pain quotidien",
        resultType: "poi",
        address: {
          label: "Gustav Mahlerplein 114",
        },
        position: {
          lat: 52.3364,
          lng: 4.8769,
        },
      },
      reservation: false,
      time: null,
    },
    {
      id: "3",
      name: "Stay at B&B Hotel",
      notes:
        "To check in, show your passport and reservation number at the front desk.",
      link: null,
      type: "accommodation",
      attachments: [],
      place: {
        id: "1",
        title: "B&B Hotel",
        resultType: "poi",
        address: {
          label: "Strawinskylaan 241",
        },
        position: {
          lat: 52.3364,
          lng: 4.8769,
        },
      },
      checkIn: "14:00",
      checkOut: "12:00",
    },
    {
      id: "4",
      name: "Visit Rijksmuseum",
      notes: "Description for event 1",
      link: null,
      type: "entertainment",
      attachments: [],
      place: {
        id: "1",
        title: "Rijksmuseum",
        resultType: "poi",
        address: {
          label: "Museumstraat 1",
        },
        position: {
          lat: 52.3364,
          lng: 4.8769,
        },
      },
      reservation: true,
      time: "",
    },
  ];

  public constructor() {}

  protected readonly trackByActivityId = trackByActivityId;
}
