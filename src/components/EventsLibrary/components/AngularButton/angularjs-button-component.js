import angular from "angular";
import { Component } from "@angular/core";

@Component({
  selector: "app-angularjs-button",
  template: '<button type="button">Close details</button>',
  styleUrls: ["./app.component.scss"],
})
export class AngularButtonComponent {
  title = "angular-button";
}
