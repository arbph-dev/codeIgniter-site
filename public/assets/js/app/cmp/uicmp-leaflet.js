// assets/js/app/cmp/uicmp-leaflet.js

/* /assets/js/app/cmp/uicmp-leaflet.js -------- git     public/assets/js/app/cmp/uicmp-leaflet.js

2026-10-21 : ligne 68 identique à ligne 56 boot => a factoriser
voir pour chercher div classe cp_leaflet

section.tab-content > div > div.cp_leaflet

<section id="art0-s0" class="tab-content active">
<h3>Carte</h3>

<div id="art0-s0-body">

    <h4>carte 1</h4>
    <div id="MAP_1" class="cp_leaflet" data-lat="47.82" data-lng="-4.3" data-zoom="14"></div>


*/


"use strict"

import { UiBase } from '/assets/js/uibase.js'
// import { initApex } from '/assets/js/components/apex.js'
// import { initCodeVal } from '/assets/js/components/codeval.js'
//import { initCallout} from '/assets/js/components/callout.js'
import { initLeaflet }  from '/assets/js/components/leaflet.js'

import { qsa } from '/assets/js/core/domhelper.js'
// import { bus } from '/assets/js/core/eventBus.js'


let APP

class AppIndex extends UiBase {

    constructor() {
        super()
        this.setPageRef() 
        this.readPage() 
        this.renderNavigation()
        this.renderMenu()
    }

    boot() {
        // Guard against multiple boots (uses UiBase.ensureBooted)
        if (!this.ensureBooted()) return
    
        //initCallout()
        
        const sections = qsa( "div.section-tab > section.tab-content" , this.articles[2] )
        const section = sections[0];
        console.info( "Article " + this.currentPanel + "get current section : " + section )
        initLeaflet(section) // solution temporaire panel 2 section 0 contient map

    }
    onPanelShown(artIdx) { console.info("AppIndex :: onPanelShown() = artIdx " + artIdx) }

    onSectionShown(artIdx , secIdx){ 
        console.info("AppIndex :: onSectionShown() = artIdx " + artIdx + " secIdx " + secIdx )

        console.info( "get current panel : " + this.articles[artIdx] )
        // identique à ligne 56 boot => a factoriser
        const sections = qsa( "div.section-tab > section.tab-content" , this.articles[artIdx] )
        const section = sections[secIdx];
        console.info( "get current section : " + section )

        initLeaflet(section)

    }     
    

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