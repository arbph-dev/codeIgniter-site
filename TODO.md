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
