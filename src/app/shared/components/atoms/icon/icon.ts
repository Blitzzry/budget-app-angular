import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  imports: [],
  templateUrl: './icon.html',
  styleUrl: './icon.css',
})
export class Icon {
  constructor() {}
  @Input() name!: 'personal' | 'unlock' | 'house' | 'health' | 'heart' | 'savings' | 'pencil-square' | 'lock' | 'arrow-up-circle' | 'arrow-down-circle' | 'plus' | 'shopping-cart' | 'food' | 'transport' | 'entertainment' | 'pencil' | 'trash';
  @Input() size: string = 'xxs';
  get sizeClasses(): string {
    return this.sizeClassesBuffer[this.size as keyof typeof this.sizeClassesBuffer] ?? this.sizeClassesBuffer['base'];
  }  readonly sizeClassesBuffer = {
    xxs: '!w-4 !h-4 !text-sm',
    xs: '!w-6 !h-6 !text-base',
    sm: '!w-10 !h-10 !text-xl',
    base: '!w-12 !h-12 !text-2xl',
    lg: '!w-16 !h-16 !text-4xl',
    xl: '!w-24 !h-24 !text-6xl',
    '2xl': '!w-36 !h-36 !text-7xl',
    '3xl': '!w-56 !h-44 !text-8xl',
    '4xl': '!w-60 !h-60 !text-9xl',
  };
}
