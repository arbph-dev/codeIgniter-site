
# 2026-10-25

Reprise des travaux on doit géré l'évolution de la partie Frontend

On a des 
- workbench
- features
- sectionpanel



les fichiers actuels



- **/**
- [index.html](/public/index.html)
- [idx-dev.html](/public/idx-dev.html)

- **/ui-components/**
- [apex-codeval.html](/public/ui-components/apex-codeval.html)
- [apex.html](/public/ui-components/apex.html)
- [callout.html](/public/ui-components/callout.html)
- [codeval.html](/public/ui-components/codeval.html)
- [leaflet.html](/public/ui-components/leaflet.html)
- [mermaid.html](/public/ui-components/mermaid.html)

- **/assets/js/**
- [app-index.js](/public/assets/js/app-index.js)
- [uibase.js](/public/assets/js/uibase.js)
  - **/assets/js/app/**
    - **/assets/js/app/cmp/**
      - [uicmp-apex.js](/public/assets/js/app/cmp/uicmp-apex.js)
      - [uicmp-callout.js](/public/assets/js/app/cmp/uicmp-callout.js)
      - [uicmp-codeval.js](/public/assets/js/app/cmp/uicmp-codeval.js)
      - [uicmp-leaflet.js](/public/assets/js/app/cmp/uicmp-leaflet.js)
      - [uicmp-mermaid.js](/public/assets/js/app/cmp/uicmp-mermaid.js)
    - **/assets/js/app/cpd/**
      - [apexcodeval.js](/public/assets/js/app/cpd/apexcodeval.js)  

  - **/assets/js/core/**
    - [eventBus.js](/public/assets/js/core/eventBus.js)
    - [domhelper.js](/public/assets/js/core/domhelper.js)
        import { byId, byName , qs , qsa , create , notice } from '/assets/js/core/domhelper.js'

  - **/assets/js/features/**
    - **/assets/js/features/admin/**
      - [renderer.js](/assets/js/features/admin/renderer.js)
        import { initUsersRenderer } from '/assets/js/features/admin/renderer.js'
    - **/assets/js/features/auth/**
      - [auth.controller.js](/public/assets/js/features/auth/auth.controller.js)
        import { initAuthController } from '/assets/js/features/auth/auth.controller.js'
      - [auth.store.js](/public/assets/js/features/auth/auth.store.js)
        import { authStore } from '/assets/js/features/auth/auth.store.js'
  - **/assets/js/ui/**
    - **/assets/js/ui/workbench/**
      - **/assets/js/ui/workbench/auth/**
        - [ToolbarAuthPanel.js](/public/assets/js/ui/workbench/auth/ToolbarAuthPanel.js)
          import ToolbarAuthPanel from '/assets/js/ui/workbench/auth/ToolbarAuthPanel.js'


---

# Points importants

comment devenir superadmin car distinction existante : admin, superadmin


donner des ressources contexte
	liste des champs des models cast / validate

différence `_pages` et `_main_panels` 
    `_pages` stocke les panels générique pour le contenu
    `_main_panels` stocke tous les panels, dont board admin et user

**a retenir** : _main_panels[index+PANEL_OFFSET] equivaut à _pages[index]

ce que cela induit
- switchPanel(PANEL_ADMIN) fonctionne avec `_main_panels` , PANEL_ADMIN = 0
- pour les _pages switchPanel(index+PANEL_OFFSET)  => 2 premier panel générique de contenu


- ToolbarAuthPanel extends AuthPanelBase 
    /assets/js/ui/workbench/auth/ToolbarAuthPanel.js - implémentation du contrat
    /assets/js/ui/workbench/core/AuthPanelBase.js - contrat ,event binding
https://github.com/arbph-dev/codeIgniter/blob/master/doc/notes/2026-10-03-001.md#-qui-fait-quoi--toolbarauthpanel-vs-authpanelbase




**throttle** - https://github.com/arbph-dev/codeIgniter/blob/master/doc/notes/2026-10-04-001.md#%C3%A0-ne-pas-oublier--le-throttle





ui panels / gestion affichage / active


      if (sindex === 0 ){ //par defaut le bouton 0 est actif 
        buttonTemp = create( 'button', { type: 'button', class: 'tab-btn active', text: section } )
      }
      else{
        buttonTemp = create( 'button', { type: 'button', class: 'tab-btn', text: section } )
      }
