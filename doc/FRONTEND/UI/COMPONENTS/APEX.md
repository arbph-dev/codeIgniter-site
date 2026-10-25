# APEX

**src composant apex**: [/assets/js/components/apex.js](/public/assets/js/components/apex.js)


## exemple 1 : 

**url**: https://zealot.fr/ui-components/apex.html

**src**: 
- [/ui-components/apex.html](/public/ui-components/apex.html)
- composants :
  - [/assets/js/components/apex.js](/public/assets/js/components/apex.js)

On présente les graphiques de type : 
- data-chart="moteurCouple"
- data-chart="LDCH"

ces types de graphique sont des "presets" définis dans le code source du composant [/assets/js/components/apex.js](/public/assets/js/components/apex.js)

```html
  <section id="art1-s0" class="tab-content active">
      <h3>moteurCouple</h3>
      <div id="art1-s0-body">
          <div id="APEX_LIGNE_2" class="cp_apex" data-chart="moteurCouple"></div>
          <p>Revoir les graphiques disponible</p>
      </div>
  </section>
```

```html
<section id="art1-s1" class="tab-content">
    <h3>Loi de chauffe</h3>
    <div id="art1-s1-body">
        <div id="APEX_LDCH" class="cp_apex" data-chart="LDCH"></div>
    </div>
</section>
```

## exemple 2 : 

**url**: https://zealot.fr/ui-components/apex-codeval.html 

**src**:
- [/ui-components/apex-codeval.html](/public/ui-components/apex-codeval.html) 
- composants :
  - [/assets/js/components/apex.js](/public/assets/js/components/apex.js)
  - [/assets/js/components/codeval.js](/public/assets/js/components/codeval.js)
  

## Todo
- Détailler intéraction
- revoir api plot codeval
