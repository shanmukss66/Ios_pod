import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabletModePage } from './tablet-mode.page';

describe('TabletModePage', () => {
  let component: TabletModePage;
  let fixture: ComponentFixture<TabletModePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabletModePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabletModePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
