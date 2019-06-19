import { NgModule } from '@angular/core';

import { FeatherModule } from 'angular-feather';
import {
  ArrowRight,
  ChevronLeft,
  Menu,
  Search,
  X,
  Heart,
  LogOut,
  PlayCircle
} from 'angular-feather/icons';

// Select some icons (use an object, not an array)
const icons = {
  ArrowRight,
  ChevronLeft,
  Menu,
  Search,
  X,
  Heart,
  LogOut,
  PlayCircle
};

@NgModule({
  imports: [FeatherModule.pick(icons)],
  exports: [FeatherModule]
})
export class IconsModule {}
