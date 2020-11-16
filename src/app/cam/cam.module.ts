import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CamRoutingModule } from './cam-routing.module';
import { CamComponent } from './cam.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CarouselModule, WavesModule } from 'angular-bootstrap-md';


@NgModule({
  declarations: [CamComponent],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    CamRoutingModule, MatIconModule,
    MatCardModule,MatFormFieldModule,
    CarouselModule,
    WavesModule,MatButtonModule,MatIconModule,MatCardModule,MatFormFieldModule,CarouselModule,FormsModule
  ],exports:[MatButtonModule,MatIconModule,MatCardModule,MatFormFieldModule,CarouselModule,
    WavesModule],
})
export class CamModule { }
