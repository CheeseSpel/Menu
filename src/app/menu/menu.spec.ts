import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Menu } from './menu';

describe('Menu', () => {
  let component: Menu;
  let fixture: ComponentFixture<Menu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Menu],
    }).compileComponents();

    fixture = TestBed.createComponent(Menu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render menu items from assets', () => {
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent;

    expect(text).toContain('Классический бургер');
    expect(text).toContain('Картофель фри');
    expect(text).toContain('Наггетсы');
  });
});
