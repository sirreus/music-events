import angular from "angular";
import { AngularJSButtonComponent } from "./angularjs-button-component";

const myAppModule = angular.module("myAppModule", []);
myAppModule.component("angularjsButton", AngularJSButtonComponent);
