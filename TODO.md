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

  - **/assets/js/libs/**
	- [/assets/js/libs/physics.js](/public/assets/js/libs/physics.js)        
  - **/assets/js/ui/**
    - **/assets/js/ui/workbench/**
      - **/assets/js/ui/workbench/auth/**
        - [ToolbarAuthPanel.js](/public/assets/js/ui/workbench/auth/ToolbarAuthPanel.js)
          import ToolbarAuthPanel from '/assets/js/ui/workbench/auth/ToolbarAuthPanel.js'


---

# Composants

## APEX
mis en œuvre dans
- **url**: https://zealot.fr/ui-components/apex.html - **src**: [/ui-components/apex.html](/public/ui-components/apex.html)
- **url**: https://zealot.fr/ui-components/apex-codeval.html - **src**: [/ui-components/apex.html](/public/ui-components/apex-codeval.html)

dépendances :
- [/assets/js/components/apex.js](/public/assets/js/components/apex.js)
- [/assets/js/components/apex.js](/public/assets/js/components/codeval.js)


## CODEVAL
mis en œuvre dans
- **url**: https://zealot.fr/ui-components/codeval.html - **src**: [/ui-components/apex.html](/public/ui-components/codeval.html)

dépendances :
- [/assets/js/components/apex.js](/public/assets/js/components/codeval.js)
- [/assets/js/libs/physics.js](/public/assets/js/libs/physics.js)
	- import * as PHYS from '/assets/js/libs/physics.js'
- [eventBus.js](/public/assets/js/core/eventBus.js)
	- import { bus }       from '/assets/js/core/eventBus.js'
- [domhelper.js](/public/assets/js/core/domhelper.js)
	- import { byId, qs } from '/assets/js/core/domhelper.js'


Dans [/assets/js/components/apex.js](/public/assets/js/components/codeval.js) on définit les API
On utilise les API dans [apex-codeval.html](/public/ui-components/apex-codeval.html)

```js
api.plot('APEX_LIGNE_3', { data: donneesCouple });
```

[ ] TODO 2026-10-25-001

```js
const availableApi = {
    call  : ()         => call(),
    call2 : (data)     => call2(data),
    PHYS,
    /* plot  : (id, cfg)  => bus.publish('apex:render', { id, ...cfg }) */
    plot: (id, cfg = {}) => {
        const el = byId(id)
        if (!el) {
            console.warn(`[codeval] container #${id} introuvable`)
            return
        }
    
        const type = el.dataset.chart
        if (!type) {
            console.warn(`[codeval] data-chart absent sur #${id}`)
            return
        }
    
        bus.publish('apex:render', {
            id,
            type,
            payload: cfg
        })
    }    
}
```

exemple - [apex-codeval.html](/public/ui-components/apex-codeval.html)

```html
                <div id="apex-hypersynchronisme-0" class="tab-content active">
                    <h3>couple fonction de vistesse</h3>
                    <p>Le couple selon la vistesse est représenté
                        <ul>
                            <li>par le type de graphique : moteurCouple</li>
                            <li>en employant le composant codeval</li>
                        </ul>
                    </p>
                    
                    <div id="CODEVAL_MS1" class="cp_codeval">
                        <div id="CODEVAL_MS1_SCRIPTCODE" class="scriptcode">
                            <textarea rows="32">
    let sTemp = null

    const moteurExemple = new api.PHYS.MoteurAsynchrone(
        1500, // Puissance nominale (W) - Exemple: 1.5 kW
        230, // Tension nominale (V)
        50, // Fréquence (Hz)
        4, // Nombre de pôles (ex: 4 pôles pour 1500 RPM à 50Hz)
        0.5, // Resistance Stator (Ω)
        1.0, // Reactance Stator (Ω)
        0.4, // Resistance Rotor (Ω)
        0.9 // Reactance Rotor (Ω)
    );
    
    // Affichage de la vitesse de synchronisme
    sTemp = `Vitesse de synchronisme: ${moteurExemple.vitesseSynchronisme.toFixed(2)} RPM\n`;

    // Génération des données pour la courbe de couple
    //const donneesCouple = moteurExemple.genererCourbeCouple(20);
    const donneesCouple = moteurExemple.genererCourbeCouple(100, -1.0, 1.0)
    
    api.plot('APEX_LIGNE_3', { data: donneesCouple });    

    // Affichage des premiers points de la courbe
    sTemp += "Premiers points de la courbe Couple-Vitesse:\n";
    donneesCouple.slice(0, 5).forEach(point => {
        sTemp += `Vitesse: ${point.vitesse.toFixed(2)} RPM, Couple: ${point.couple.toFixed(2)} Nm\n`;
    });
    const result = sTemp; 
                            </textarea>
                        </div>
                    
                        <div id="CODEVAL_MS1_RESULT" class="result"></div>
                    
                        <div class="cp_toolbar">
                            <button onclick="window.eventBusPublish(event,'codeval:toggle','MS1')">Show</button>
                            <button onclick="window.eventBusPublish(event,'codeval:eval','MS1')">Run</button>
                        </div>
                    </div>                      

                      <h4>line</h4>
                      <div id="APEX_LIGNE_3" class="cp_apex" data-chart="moteurCouple"></div>

                </div>
```


---

## 2026-10-25-001
Composants / apex





<!--

url : src: [](/)
dépendances :


[](/)
[](/)

on doit codifier les todo

YYYY-MM-DD-XXX
2026-10-25-001


2026-10-25
Codeval et phy


https://github.com/arbph-dev/codeIgniter-appCms/blob/main/documentation/ROADMAP/SectionPanel.js



- /assets/js/libs/
  



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
-->
