import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-timeline",
  templateUrl: "./timeline.component.html",
  styleUrls: ["./timeline.component.scss"],
})
export class TimelineComponent implements OnInit {
  timelineEvents: any[] = [
    {
      time: "09:00 AM",
      title: "Flight to Amsterdam",
      description: "Description for event 1",
      icon: "airplane-outline",
      flightNumber: "RY 1234",
      startPointTime: "9:00 AM",
      startPointPlace: "San Francisco",
      endPointTime: "11:00 AM",
      endPointPlace: "Amsterdam",
      type: "transportation",
    },
    {
      time: "14:00 AM",
      title: "Stay at B&B Hotel",
      description:
        "To check in, show your passport and reservation number at the front desk.",
      icon: "bed-outline",
      type: "accommodation",
      expense: 120,
      place: "Strawinskylaan 241",
    },
    {
      time: "10:30 AM",
      title: "Restaurant Le pain quotidien",
      description: "Booked for 2 people",
      icon: "restaurant-outline",
      type: "eatery",
      place: "Gustav Mahlerplein 114",
    },

    {
      time: "04:30 AM",
      title: "Visit Rijksmuseum",
      icon: "walk",
      type: "entertainment",
      place: "Museumstraat 1",
    },
  ];

  constructor() {}

  ngOnInit() {}
}
