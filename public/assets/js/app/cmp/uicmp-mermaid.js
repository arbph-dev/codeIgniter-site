// /assets/js/app/cmp/uicmp-mermaid.js -------- git     public/assets/js/app/cmp/uicmp-mermaid.js
/*


*/

"use strict"

import { UiBase } from '/assets/js/uibase.js'
// import { initApex } from '/assets/js/components/apex.js'
// import { initCodeVal } from '/assets/js/components/codeval.js'
// import { initCallout} from '/assets/js/components/callout.js'
import { initMermaid } from '/assets/js/components/mermaid.js'

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
    
        initMermaid()

    }
    onPanelShown(artIdx) { console.info("AppIndex :: onPanelShown() = artIdx " + artIdx) }

    onSectionShown(artIdx , secIdx){ console.info("AppIndex :: onSectionShown() = artIdx " + artIdx + " secIdx " + secIdx ) }     
    

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