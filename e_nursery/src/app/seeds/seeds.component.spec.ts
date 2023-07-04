/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SeedsComponent } from './seeds.component';

describe('SeedsComponent', () => {
  let component: SeedsComponent;
  let fixture: ComponentFixture<SeedsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeedsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
