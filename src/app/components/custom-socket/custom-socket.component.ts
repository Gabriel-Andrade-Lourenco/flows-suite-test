import {
  Component,
  Input,
  HostBinding,
  ChangeDetectorRef,
  OnChanges,
} from "@angular/core";
import { ReteModule } from "rete-angular-plugin/18";


@Component({
  selector: 'app-custom-socket',
  standalone: true,
  imports: [ReteModule],
  // template: ``,
  templateUrl: './custom-socket.component.html',
  styleUrl: './custom-socket.component.scss'
})
export class CustomSocketComponent implements OnChanges {
  @Input() data!: any;
  @Input() rendered!: any;

  @HostBinding("title") get title() {
    return this.data.name;
  }

  constructor(private cdr: ChangeDetectorRef) {
    this.cdr.detach();
  }

  ngOnChanges(): void {
    this.cdr.detectChanges();
    requestAnimationFrame(() => this.rendered());
  }
}

