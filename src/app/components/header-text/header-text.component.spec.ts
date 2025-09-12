import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';

import { HeaderTextComponent } from './header-text.component';
import { inputBinding } from '@angular/core';

describe('HeaderTextComponent', () => {
  let component: HeaderTextComponent;
  let fixture: ComponentFixture<HeaderTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderTextComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderTextComponent, {
      bindings: [
        inputBinding('mainHeaderText', () => 'Welcome to GameZone'),
        inputBinding('subHeaderText', () => 'Subtitle here'),
        inputBinding('promoText', () => 'Promotion Text'),
      ],
    });
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create and show texts', () => {
    expect(component).toBeTruthy();
    expect(component.mainHeaderText()).toBe('Welcome to GameZone');
    expect(component.subHeaderText()).toBe('Subtitle here');
    expect(component.promoText()).toBe('Promotion Text');
  });

  it('should hide promo text when onHidePromo is called', fakeAsync(() => {
    fixture.nativeElement.querySelector('.promo-close-button').click();
    fixture.detectChanges();
    flush();
    const promoBar = fixture.nativeElement.querySelector('.header-promo-section');

    expect(promoBar).toBeNull();
    expect(component.hidePromo()).toBeTrue();
  }));
});
