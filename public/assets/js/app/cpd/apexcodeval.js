// /assets/js/app/cpd/apexcodeval.js -------- git     public/assets/js/app/cpd/apexcodeval.js
/*
2026-10-18 : 
- on recopie le script /public\assets\js\app-index.js ou /assets\js\app\app-idxdev.js
- on epure

*/

"use strict"

import { UiBase } from '/assets/js/uibase.js'
//import { initApex } from '/assets/js/components/apex.js'
import { initCodeVal } from '/assets/js/components/codeval.js'
import { initApex } from '/assets/js/components/apex.js'

// import { bus } from '/assets/js/core/eventBus.js'

const PAGE_CONFIG = { 
    //menu
    classNavArticle         : "nav-article", // ligne 162 et 709 ui.css
    classNavHeader          : "nav-header-row primary-button",
    classNavItem            : "",
    classNavIcon            : "fa fa-fw fa-cogs",
    classNavList            : "nav-toc",
    classNavToggle          : "nav-toggle",

    classPaginationButton   : "primary-button switch-tab-btn",
    classPanelHeaderButton  : "tab-btn",    
    classPanelHidden        : "hidden",

    offsetPanel             : 2 , //PANEL_OFFSET  due a admin et user

    selectorPagination      : "div.pagination-buttons" ,
    selectorPanel           : "article.panel-card" ,
    selectorPanelHeader     : "div.section-tab > div.tab-headers",
    selectorPanelTitle      : "h2.panel-title",
    selectorSectionTitle    : "div.section-tab  > section.tab-content > h3",
}

let APP

class AppIndex extends UiBase {

    constructor() {
        super(PAGE_CONFIG)
        this.setPageRef() 
        this.readPage() 
        //this.renderNavigation()
        this.renderMenu()
    }

    boot() {
        // Guard against multiple boots (uses UiBase.ensureBooted)
        if (!this.ensureBooted()) return
    
        initApex()
        initCodeVal()

    }
    onPanelShown(artIdx) { console.info("app/cmp/uicmp-codeval.js :: onPanelShown() = artIdx " + artIdx) }

    onSectionShown(artIdx , secIdx){ console.info("app/cmp/uicmp-codeval.js :: onSectionShown() = artIdx " + artIdx + " secIdx " + secIdx ) }     
    

    // ============================================================
    // 2026-10-12
    // Montage applicatif après authentification

    async mountApplication() {
        console.log('Auth success; app can run')
        
    }

}

// ============================================================

document.addEventListener("DOMContentLoaded", () => { APP = new AppIndex() }) 

// ============================================================
window.onload = (event) => { APP.boot() } 
