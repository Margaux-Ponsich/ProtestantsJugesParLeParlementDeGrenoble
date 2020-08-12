import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffairePageComponent } from './affaire-page.component';

describe('AffairePageComponent', () => {
  let component: AffairePageComponent;
  let fixture: ComponentFixture<AffairePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffairePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffairePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
