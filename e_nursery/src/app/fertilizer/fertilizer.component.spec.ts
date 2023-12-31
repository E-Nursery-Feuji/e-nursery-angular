/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FertilizerComponent } from './fertilizer.component';

describe('FertilizerComponent', () => {
  let component: FertilizerComponent;
  let fixture: ComponentFixture<FertilizerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FertilizerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FertilizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
