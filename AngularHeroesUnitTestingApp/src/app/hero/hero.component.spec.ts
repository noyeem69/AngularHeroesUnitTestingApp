import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { By } from "@angular/platform-browser";
import { HeroComponent } from "./hero.component"

describe('Hero Component Shallow Test', () => {

    let fixture: ComponentFixture<HeroComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HeroComponent],
            schemas: [NO_ERRORS_SCHEMA]
        });

        fixture = TestBed.createComponent(HeroComponent);
    })

    it('should have the correct hero', () => {
        fixture.componentInstance.hero = {id:1, name:'SuperDude', strength:24};

        expect(fixture.componentInstance.hero.name).toEqual('SuperDude');
    })

    
    it('should contain the hero name in anchor tag', () => {
        fixture.componentInstance.hero = {id:1, name:'SuperDude', strength:24};

        fixture.detectChanges();

        let deA = fixture.debugElement.query(By.css('a'));
        expect(deA.nativeElement.textContent).toContain('SuperDude');

        //expect(fixture.nativeElement.querySelector('a').textContent).toContain('SuperDude');
    })
})