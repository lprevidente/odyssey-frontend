import { Component } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-error",
  standalone: true,
  templateUrl: "./error.page.html",
  styleUrls: ["./error.page.scss"],
  imports: [CommonModule, FormsModule, IonicModule],
})
export class ErrorPage {}
