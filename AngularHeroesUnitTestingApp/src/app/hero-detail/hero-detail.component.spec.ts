import { ComponentFixture, fakeAsync, flush, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { HeroService } from "../hero.service";
import { HeroDetailComponent } from "./hero-detail.component";
import { of } from "rxjs";
import { FormsModule } from "@angular/forms";
import { Location } from "@angular/common";


describe('HeroDetailComponent', () => {
    let mockHeroService, mockActivatedRoute, mockLocation;
    let fixture: ComponentFixture<HeroDetailComponent>;

    beforeEach(() => {
        
        mockActivatedRoute = {
            snapshot: {paramMap: {get: () => {return '3'}}}
        }
        mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
        mockLocation = jasmine.createSpyObj(['back']);

        TestBed.configureTestingModule({
            declarations: [
                HeroDetailComponent
            ],
            imports: [FormsModule],
            providers: [
                {provide: HeroService, useValue: mockHeroService},
                {provide: ActivatedRoute, useValue: mockActivatedRoute},
                {provide: Location, useValue: mockLocation}
            ]
        });

        fixture = TestBed.createComponent(HeroDetailComponent);

        mockHeroService.getHero.and.returnValue(of({id:3, name: 'superdude', strength: 100}));

    });

    it('should render hero name in an h2 tag', () => {
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('h2').textContent).toContain('SUPERDUDE');
    });
    
    it('should call updateHero when save function is called', (done) => {
        mockHeroService.updateHero.and.returnValue(of({}))
        fixture.detectChanges();

        fixture.componentInstance.save();

        setTimeout(() => {
            expect(mockHeroService.updateHero).toHaveBeenCalled();
            done();    
        }, 250);
        
    });

    it('should call updateHero when save function is called via fakeasync', fakeAsync(() => {
        mockHeroService.updateHero.and.returnValue(of({}))
        fixture.detectChanges();

        fixture.componentInstance.save();
        flush();

        expect(mockHeroService.updateHero).toHaveBeenCalled();
        
    }));
    
})