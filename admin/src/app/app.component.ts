import {Component, AfterViewInit, ElementRef, Renderer, ViewChild, OnDestroy, OnInit} from '@angular/core';
import {ScrollPanel} from 'primeng/primeng';
import { GenericUtil } from './util/GenericUtil';
import { Router } from '@angular/router';
import { routes } from './app.routes';


enum MenuOrientation {
    STATIC,
    OVERLAY,
    HORIZONTAL
};

declare var jQuery: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends GenericUtil implements AfterViewInit, OnDestroy, OnInit {

    layoutMode: MenuOrientation = MenuOrientation.STATIC;

    rotateMenuButton: boolean;

    topbarMenuActive: boolean;

    overlayMenuActive: boolean;

    staticMenuDesktopInactive: boolean;

    staticMenuMobileActive: boolean;

    layoutContainer: HTMLDivElement;

    menuClick: boolean;

    topbarItemClick: boolean;

    activeTopbarItem: any;

    documentClickListener: Function;

    resetMenu: boolean;

    @ViewChild('layoutWrapper') layourContainerViewChild: ElementRef;

    @ViewChild('layoutMenuScroller') layoutMenuScrollerViewChild: ScrollPanel;

    constructor(public renderer: Renderer, public router:Router) {
        super();
        
        this.router.events.subscribe((url:any) =>{

            let rotaExistente = routes.some(rota => `/${rota.path}` === url.url)
            if(!rotaExistente){
                this.logado = false;
                return; 
            }

            if(
                (url.url === '/404') || 
                (url.url === '/login') || 
                (url.url === '/evento') || 
                (url.url === '/')){
                    this.logado = false;
                    return;
            }

            this.logado = this.verifyLogado();
        })
       
    }

    ngOnInit(): void {
        this.onMenuButtonClick(false);
    }

    ngAfterViewInit() {
        // if(this.logado){
            this.layoutContainer = <HTMLDivElement> this.layourContainerViewChild.nativeElement;
            if (this.layoutMenuScrollerViewChild && this.layoutMenuScrollerViewChild.moveBar()) {
                setTimeout(() => {this.layoutMenuScrollerViewChild.moveBar(); }, 100); 
            }

            // hides the horizontal submenus or top menu if outside is clicked
            this.documentClickListener = this.renderer.listenGlobal('body', 'click', (event) => {
                if (!this.topbarItemClick) {
                    this.activeTopbarItem = null;
                    this.topbarMenuActive = false;
                }

                if (!this.menuClick && this.isHorizontal()) {
                    this.resetMenu = true;
                }

                this.topbarItemClick = false;
                this.menuClick = false;
            });
        // }
    }

    onMenuButtonClick(event) {
        this.rotateMenuButton = !this.rotateMenuButton;
        this.topbarMenuActive = false;

        if (this.layoutMode === MenuOrientation.OVERLAY) {
            this.overlayMenuActive = !this.overlayMenuActive;
        } else {
            if (this.isDesktop()) {
                this.staticMenuDesktopInactive = !this.staticMenuDesktopInactive;
            } else {
                if (this.staticMenuMobileActive) {
                    this.staticMenuMobileActive = false;
                } else {
                    this.staticMenuMobileActive = true;
                }
            }
        }

        if (event) {
            event.preventDefault();
        }
    }

    onMenuClick($event) {
        this.menuClick = true;
        this.resetMenu = false;

        if (!this.isHorizontal()) {
            setTimeout(() => {this.layoutMenuScrollerViewChild.moveBar(); }, 450);
        }
    }

    onTopbarMenuButtonClick(event) {
        this.topbarItemClick = true;
        this.topbarMenuActive = !this.topbarMenuActive;

        if (this.overlayMenuActive || this.staticMenuMobileActive) {
            this.rotateMenuButton = false;
            this.overlayMenuActive = false;
            this.staticMenuMobileActive = false;
        }

        event.preventDefault();
    }

    onTopbarItemClick(event, item) {
        this.topbarItemClick = true;

        if (this.activeTopbarItem === item) {
            this.activeTopbarItem = null;
        } else {
            this.activeTopbarItem = item; }

        event.preventDefault();
    }

    isTablet() {
        const width = window.innerWidth;
        return width <= 1024 && width > 640;
    }

    isDesktop() {
        return window.innerWidth > 1024;
    }

    isMobile() {
        return window.innerWidth <= 640;
    }

    isOverlay() {
        return this.layoutMode === MenuOrientation.OVERLAY;
    }

    isHorizontal() {
        return this.layoutMode === MenuOrientation.HORIZONTAL;
    }

    changeToStaticMenu() {
        this.layoutMode = MenuOrientation.STATIC;
    }

    changeToOverlayMenu() {
        this.layoutMode = MenuOrientation.OVERLAY;
    }

    changeToHorizontalMenu() {
        this.layoutMode = MenuOrientation.HORIZONTAL;
    }

    ngOnDestroy() {
        if (this.documentClickListener) {
            this.documentClickListener();
        }
    }


}
