/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserblogComponent } from './userblog.component';

describe('UserblogComponent', () => {
  let component: UserblogComponent;
  let fixture: ComponentFixture<UserblogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserblogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserblogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
