import { Component, Input, input } from '@angular/core';

import { ClassicPreset } from 'rete';
@Component({
  selector: 'app-custom-connection',
  standalone: true,
  imports: [],
  templateUrl: './custom-connection.component.html',
  styleUrl: './custom-connection.component.scss'
})
export class CustomConnectionComponent {
  @Input() data!: ClassicPreset.Connection<
    ClassicPreset.Node,
    ClassicPreset.Node
  >;
  @Input() start: any;
  @Input() end: any;
  @Input() path!: string;
}
