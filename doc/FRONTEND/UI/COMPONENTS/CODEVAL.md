# CODEVAL
mis en œuvre dans
- **url**: https://zealot.fr/ui-components/codeval.html - **src**: [/ui-components/apex.html](/public/ui-components/codeval.html)

## dépendances :
- [/assets/js/components/apex.js](/public/assets/js/components/codeval.js)
- [/assets/js/libs/physics.js](/public/assets/js/libs/physics.js)
	- import * as PHYS from '/assets/js/libs/physics.js'
- [eventBus.js](/public/assets/js/core/eventBus.js)
	- import { bus }       from '/assets/js/core/eventBus.js'
- [domhelper.js](/public/assets/js/core/domhelper.js)
	- import { byId, qs } from '/assets/js/core/domhelper.js'



### API
Dans [/assets/js/components/codeval.js](/public/assets/js/components/codeval.js) on définit les API. On utilise les API dans [apex-codeval.html](/public/ui-components/apex-codeval.html)

Initialise une instance moteurExemple de classe MoteurAsynchrone
```js
const moteurExemple = new api.PHYS.MoteurAsynchrone(
```

Trace un graphique en utilisant apex
```js
api.plot('APEX_LIGNE_3', { data: donneesCouple });
```



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
