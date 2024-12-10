import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Injector
} from "@angular/core";
import { createEditor } from "./components/editor";

@Component({
  selector: "app-root",
  standalone: true,
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements AfterViewInit {
  title = "CodeSandbox";

  constructor(private injector: Injector) { }

  @ViewChild("rete") container!: ElementRef;

  ngAfterViewInit(): void {
    const el = this.container.nativeElement;

    if (el) {
      createEditor(el, this.injector);
    }
  }
}
