import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardYielpComponent } from './card-yielp.component';

describe('CardYielpComponent', () => {
  let component: CardYielpComponent;
  let fixture: ComponentFixture<CardYielpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardYielpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardYielpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
