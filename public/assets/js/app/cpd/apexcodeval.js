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



let APP

class AppIndex extends UiBase {

    constructor() {
        super()
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
