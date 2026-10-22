// /assets/js/uibase.js
/**
 * Contrat commun de l'interface utilisateur.
 *
 * Responsabilités :
 * - références communes au DOM ;
 * - état de navigation ;
 * - affichage des articles et sections ;
 * - thème, plein écran et barre de statut ;
 * - points d'extension pour les applications concrètes.
 *
 * Hors périmètre :
 * - lecture détaillée de la structure HTML : domelements.js ;
 * - construction de composants DOM : domfactory.js ;
 * - authentification : contrôleur dédié ;
 * - initialisation des bibliothèques : app-index.js ou composants.
 * 
 * 2026-10-12 voir ligne 204 /assets/js/uibase.js + ligne 90 /assets/js/app-index.js.js
 * 2026-10-15 : 
 * - modifier renderNavigation pour ajout de navigation de niveau article, menu des sections en haut
* TODO 
* 2026-10-18 : 
 * - gestion PAGE_CONFIG, stockage dans le constructeur
 * => a remplacer _pc 31 occurences -> this.pgc -/- Reste 1 ici => DONE 
 * 
 * - renderMenu pas de sous item si un seul arrticle
 
 2026-10-21 : TODO
    remplacer les  variables ,  les noms doivent coller a la strucutre
        this.currentArticle = null au lieu de  this.currentArticle = null 

    initialisation avec null , permet de savoir si affecté par utilisateur ou pas
        this.currentSection = null doit ramplacer this.currentSection = 0

modifier les article classes hidden en active
        <article id="art0" class="panel-card">
        <article id="art-user" class="panel-card hidden">
    deviendrait 
        <article id="art0" class="panel-card active">
        <article id="art-user" class="panel-card">

    implique 
        modif css 
            panel-card + hidden
            panel-card active a ajouter

        modif html
            dans tous les docs ? supprimer hidden, ajouter active sur un article
            voir stratégie

        modif js
            pageconfig => classPanelActive :"active"  doit remplacer classPanelHidden : "hidden",
            readPage
            switchPanel

ajouter les sections active a pages ??
    lors de init du doc on affecte 
    lors du switch paenl retour par défaut ?

ajouter les id a pages ??

stratégie 
    laisser gerer dans html , risque d'erreur
    
    config par defaut article 2,section 0

    config app dans constructeur 
        this.currentArticle = null
        this.currentSection 
 * 
 */

"use strict";

import { byId, byName , qs , qsa , create } from '/assets/js/core/domhelper.js'
//import { readPage } from "/assets/js/core/domelements.js";//this.main


const PAGE_CFG1 = { 
    //menu
    classMenuActive         : "active" , // puis "active"
    classNavArticle         : "nav-article", // ligne 162 et 709 ui.css
    classNavHeader          : "nav-header-row primary-button",
    classNavItem            : "",
    classNavIcon            : "fa fa-fw fa-cogs",
    classNavList            : "nav-toc",
    classNavToggle          : "nav-toggle",
    classPaginationButton   : "primary-button switch-tab-btn",
    classPanelHeaderButton  : "tab-btn",    
    classPanelActive        : "active",
    offsetPanel             : 2 , //PANEL_OFFSET  due a admin et user
    selectorPagination      : "div.pagination-buttons" ,
    selectorPanel           : "article.panel-card" ,
    selectorPanelHeader     : "div.section-tab > div.tab-headers",
    selectorPanelTitle      : "h2.panel-title",
    selectorSectionTitle    : "div.section-tab  > section.tab-content > h3",
}

export class UiBase {

    //constructor() {
/*
    constructor(pageConfig = {}) {
        this.pgc = { ...DEFAULT_PAGE_CFG, ...pageConfig };
*/

    constructor(pageConfig = PAGE_CFG1 ) {    
        this.pgc = null //2026-10-18 - stocke la configuration de la page    
        // Références DOM communes
        this.main = null
        this.menu = null
        this.footer = null
        this.footerStatus = null
        this.themeButton = null
        this.fullscreenButton = null
        
        this.articles = [] // ref aux elements de structure necessaire ??
        this.pages = [] //  pour menu  <> this.articles 

        this.currentArticle = null 
        // this.currentSection = null // null si not se <> valeur numérique
        this.currentSection = 0
        this.lastContentPanel = null // doit servir pour retourner au panneau de contenu apres admin / user board

   
        this.paginationMain = false // pour switchSection
        this.currentTheme = "marine";
        this._booted = false;           // boot guard: prevent multiple boots across subclasses

        if (pageConfig) { this.pgc = pageConfig }
        else{
            throw new Error("UiBase.constructor() - pageConfig doit être fournie.")
        }
        

    }

    // ============================================================
    // Cycle de vie
    // ============================================================
    
    /* Point d'entrée obligatoire de l'application concrète. DOIT  être implémenté dans app-index.js.     */
    boot() { throw new Error("UiBase.boot() doit être implémentée.") }
    
    // ---------------------------
    // Boot guard helpers
    /** Ensure boot is executed only once for this instance. Returns true the first time it is called, false afterwards.     */
    ensureBooted() {
        if (this._booted) return false;
        this._booted = true;
        return true;
    }
    
    /** Read-only check whether instance has been booted. */
    isBooted() { return !!this._booted; }
    
    /**
     * Test helper to reset boot state (useful in unit tests).
     */
    _resetBootForTests() { this._booted = false; }
    
    
    /**
     * Initialise les références communes au DOM.
     * La lecture de la structure des pages reste à domelements.js.
     */
    setPageRef() {
        /* utiliser byName
        this.main = qs("main"); this.menu = qs("nav#sidebar"); this.footer = qs("footer");
        */
        this.main = byName("main")[0]
        this.menu = byName( "nav", document )[0]
        this.footer = byName("footer" , document )[0]        
        this.footerStatus = qs("#statusBar", this.footer)

        this.themeButton = qs("#themeBtn")
        this.themeButton?.addEventListener("click", () => this.themeSwitch() )
        
        this.fullscreenButton = qs("#fullscreenBtn")
        this.fullscreenButton?.addEventListener( "click", () => this.fullscreenSwitch() )

        // Compatibilité avec les gestionnaires inline de index.html.
        window.openNav = () => this.openNav()
        window.closeNav = () => this.closeNav()
    }

    /** --------------------------------------------------------------------------------------------------------------------------------------------
     * List la structure de la page pricnipalement depuis les titres
     * @param {*} _main reference a `body > main`
     * @param {*} _pc objet PAGE_CONFIG 
     * @returns 
        const PAGE_CONFIG => 
            _pc.selectorPanel           : "article.panel-card" ,
            _pc.offsetPanel             : 2 , //PANEL_OFFSET  due a admin et user
            _pc.classPanelHidden        : "hidden",
            _pc.selectorPanelTitle      : "h2.panel-title",
            _pc.selectorSectionTitle    : "div.section-tab  > section.tab-content > h3",
        }
        2026-10-18 : modifier classe UiBase this.pgc stocke PAGE_CONFIG        
    */
    

    readPage(){
        if (!this.main || !this.pgc) return;

        this.pages = [];
        this.articles = qsa(this.pgc.selectorPanel, this.main);
    
        this.articles.forEach((article, index) => {
          if (index < this.pgc.offsetPanel) return;
    
          const title = qs(this.pgc.selectorPanelTitle, article)?.innerText?.trim() ?? "";
          const sectionNodes = qsa(this.pgc.selectorSectionTitle, article);
          const sections = sectionNodes.map(node => node.innerText.trim());
    
          const page = {
            offIndex: index - this.pgc.offsetPanel,
            title,
            sections,
            element: article,
          };
    
          this.pages.push(page);
    
          if (article.classList.contains(this.pgc.classPanelActive)) {
            this.currentArticle = index;
            this.lastContentPanel = index;
          }
        });
    
        if (this.currentArticle === null && this.pages.length > 0) {
          this.currentArticle = this.pgc.offsetPanel;
          this.lastContentPanel = this.currentArticle;
        }
    }


    /** ------------------------------------------------------------------------------------------------------------------
     * @param {*} _pc objet PAGE_CONFIG
     * 2026-10-18 : modifier classe UiBase this.pgc stocke PAGE_CONFIG 
     */
    renderPagination() {
        let buttonTemp = null
        let pagination_buttons = null

        pagination_buttons = qs( this.pgc.selectorPagination  , document )
  
        this.pages.forEach((  panel , index ) => { 

            buttonTemp = create( 'button', { type: 'button', class: this.pgc.classPaginationButton , text: panel.title })
            buttonTemp.addEventListener('click', () => this.switchPanel(index + this.pgc.offsetPanel ) ) 
            pagination_buttons.appendChild( buttonTemp )
        })
        this.paginationMain = true        
    }
    
    /** ------------------------------------------------------------------------------------------------------------------
     * ajoute dans chaque panel la barrre de navigations panel
     * ajoute les buttons pour naviguer entre les sections d'un article, dans chaque articles de main
     * @param {*} _pc objet PAGE_CONFIG
     
    * 2026-10-15 :
     * - on a structurer les board user et admin comme les autres on peut donc employer this.articles ici 
     * mais pas pour les menus a ajouter
     
    * 2026-10-18 : modifier classe UiBase this.pgc stocke PAGE_CONFIG 

    * 2026-10-21 : la section 0 de l'article est active par défaut
    renderNavigation construit la barre de navigation de chaque article
    elle ajoute un bouton par sections , le bouton 0 est mis en évidence mais on ne tient pas compte de la structure html
    console.log( "uibase.js (234) :: renderNavigation =>  article " + index  + " section " + sindex + " active "+   section.classList.contains("active") );
    le test echoue car panelSections et section sont en fait des div.section-tab  > div.tab-content > h3 du panel 
    la lecture de la structure doit etre fait dans readPage

    */
    renderNavigation() {
    
        let buttonTemp = null
        if (!this.articles) { return }
        
        this.articles.forEach((  panel , index ) => {
            let panel_header = qs( this.pgc.selectorPanelHeader , this.articles[index] )   // reference sur element article
            // on recherche les div.section-tab  > div.tab-content > h3 du panel p
            let panelSections = qsa( this.pgc.selectorSectionTitle , panel )
            //  on parcours les sections de  l'article

            panelSections.forEach((  section , sindex ) => { 


                if (sindex === 0 ){ //par defaut le bouton 0 est actif 
                    buttonTemp = create( 'button', { type: 'button', class: this.pgc.classPanelHeaderButton + ' active', text: section.innerText } )
                }
                else{
                    buttonTemp = create( 'button', { type: 'button', class: this.pgc.classPanelHeaderButton , text: section.innerText } )
                }
                //switchSection a revoir 
                panel_header.appendChild( buttonTemp )
                buttonTemp.addEventListener('click', () => { this.switchSection(sindex) })

            })  

        })

    }

    //-------------------------------------------------------------------------------------------------------------------------------------------------------
    /*
    initMenu devient renderMenu, on passe _pc en parametre il sera stocké par le consructeur
    this.pages et this.menu initilaisé par readPage( _pc )
    on utilse this.pages donc + PANEL_OFFSET qui devient _pc.offsetPanel

    style : 
    - nav
    - nav-article , nav-article open
    - nav-header-row  primary-button
    - nav-toggle
    - ul.nav-toc

    structure 
    
    nav
    nav > div.nav-article
    nav > div.nav-article> div.nav-header-row primary-button
    nav > div.nav-article> div.nav-header-row primary-button > button.nav-toggle
    nav > div.nav-article> div.nav-header-row primary-button > button.nav-toggle > i
    nav > div.nav-article> ul.nav-toc
    nav > div.nav-article> ul.nav-toc > li

    <div class="nav-article">
        <div class="nav-header-row primary-button">
            Composants APEX
            <button class="nav-toggle" type="button">
                <i class="fa fa-fw fa-cogs"></i>
            </button>
        </div>
        <ul class="nav-toc">
            <li>moteurCouple</li>
        </ul>
    </div>


    a ajouter dans PAGE_CONFIG
    - classNavArticle nav-article
    
    2026-10-18 : modifier classe UiBase this.pgc stocke PAGE_CONFIG 
    2026-10-18 : gestion un seul article + 2  article usr et adm ou >= 2 articles + + 2  article usr et adm
    
    */

    //selectionne le mode de rendu du menu
    renderMenu( cmd = false , struct = null ){

        //2026-10-22.5 : 
        this.menu.innerHTML = "";

        if (cmd != true ){
            
            if (this.pages.length < 1) { 
                console.error( '/assets/js/uibase.js :: renderMenu = struct is null'); return 
            }
            else{
                if (this.pages.length === 1) { 
                    this.renderPageMenu()
                    //console.warn('/assets/js/uibase.js :: renderMenu = mode page non implémenté')                     
                }
                else{
                    this.renderArticleMenu() // articles multiples >= 2 
                }
            }
        }
        else{
            // mode commande non implémenté
            //  on crera une strucutre sur le modele de page => /article/section pour menu / sous menu
            // peut etre un callback a prevoir dans la strucutre de struct ( event bus ?)
            if (!struct){ console.error( '/assets/js/uibase.js :: renderMenu = struct is null') ; return }
            else{
                console.warn('/assets/js/uibase.js :: renderMenu = mode commande non implémenté')
                return
            }
        }

    }
    //-------------------------------------------------------------------------------------------------------------------------------------------------------
    // pour menu un seul article + 2  article usr et adm
    renderPageMenu(){
        // pour seul article de main (hors admin et user)
        // this.pages.forEach((  panel , index )  index = 0 => panel = this.pages[0]
        

        // pour chaque section on cree un menu sans sous menu , section contient le texte du titre h3
        this.pages[0].sections.forEach(( section , sindex) => {

            //ajouter nav > div.nav-article -> container /article
            const menu_panel = create('div', { class: this.pgc.classNavArticle })
    
            //ajouter - texte  => nav > div.nav-article> div.nav-header-row primary-button
            const menu_panel_item = create('div', { class: this.pgc.classNavHeader  , text: section  })


            // ajoute texte au container /section
            menu_panel.appendChild( menu_panel_item )
            // ajoute container /article au menu (nav)
            this.menu.appendChild( menu_panel )
            
            // affecte un event au container /article
            menu_panel.addEventListener('click', (e) => { 
                e.preventDefault() ; e.stopPropagation()
                console.log(`menu clic section : ${sindex}`)
                this.switchPanel( this.pgc.offsetPanel ) // on affiche article 0 en tenant compte de s2 panels admin et users
                // affiche les sections de article , ecrit dans la barre de statut
                this.statusWrite( `Onglet actif : ${ this.pages[0].title }` )
                this.switchSection( sindex )
                // selon client SI PC on ferme le div.nav-article SINON on ferme nav  
                if (window.innerWidth > 768){ menu_panel.classList.remove( this.pgc.classMenuActive ) } else{ closeNav() }   
            })
            
            // sur pc si souris sort du container /section on le cache
            menu_panel.addEventListener('mouseleave', () => {
              console.log(`leave menu : ${sindex}`)
              if (window.innerWidth > 768){ menu_panel.classList.remove( this.pgc.classMenuActive ) }
            })     

        })

    }
    
    //-------------------------------------------------------------------------------------------------------------------------------------------------------
    // pour menu page avec >= 2 articles + + 2  article usr et adm
    renderArticleMenu(){

        // pour chaque article de main (hors admin et user)
        this.pages.forEach((  panel , index ) => {

            //ajouter nav > div.nav-article -> container /article
            const menu_panel = create('div', { class: this.pgc.classNavArticle })

            //ajouter - texte  => nav > div.nav-article> div.nav-header-row primary-button
            const menu_panel_item = create('div', { class: this.pgc.classNavHeader  , text: panel.title  })
            
            //ajouter - button apres texte  => nav > div.nav-article> div.nav-header-row primary-button > button.nav-toggle
            const menu_panel_item_button = create('button', { class: this.pgc.classNavToggle, type: 'button' })
                   
            // SUPPRESSION a valider            
            //menu_panel_item_button.setAttribute( 'aria-expanded', false) ??
            
            //ajouter icone dans bouton  => nav > div.nav-article> div.nav-header-row primary-button > button.nav-toggle > i
            const menu_panel_item_i = create('i', { class: this.pgc.classNavIcon })
            
            //ajouter liste sous menu => nav > div.nav-article> ul.nav-toc
            
            const sub_menu = create( 'ul', { class: this.pgc.classNavList }) // ****            
            
            //ajouter item à sous menu nav > div.nav-article> ul.nav-toc > li    
            panel.sections.forEach(( section , sindex) => {
                let subitem = null // item 
                // test si classe définit
                if ( this.pgc.classNavItem && this.pgc.classNavItem != "" ) {
                    subitem  = create( 'li', { text: section , class: this.pgc.classNavItem } )
                }
                else{ subitem  = create( 'li', { text: section } ) }
                //ajouter item
                sub_menu.appendChild(subitem)
                //ajouter event
                subitem.addEventListener('click', (e) => {
                    e.preventDefault() ; e.stopPropagation()
                    // affiche l'article panel , ecrit dans la barre de statut  , affiche la section de l'article   
                    this.switchPanel( index + this.pgc.offsetPanel ) // on utilse _pages donc + this.pgc.offsetPanel
                    this.statusWrite( `Onglet actif : ${ this.pages[index].title }` )
                    this.switchSection( sindex )
                    // selon client SI PC on ferme le div.nav-article SINON on ferme nav  
                    if (window.innerWidth > 768){ menu_panel.classList.remove( this.pgc.classMenuActive ) } else{ closeNav() }           
                })

            })
            // ajoute icone au bouton
            menu_panel_item_button.appendChild( menu_panel_item_i ) 
            
            // ajoute le bouton + icone  au texte (titre article)
            menu_panel_item.appendChild( menu_panel_item_button ) 
            
            // ajoute texte + bouton+icone au container /article
            menu_panel.appendChild( menu_panel_item )
            
            // ajoute liste sous menu  au container /article
            menu_panel.appendChild( sub_menu )
            
            // ajoute container /article au menu (nav)
            this.menu.appendChild( menu_panel )
            // affecte un event au container /article
            menu_panel.addEventListener('click', () => { console.log(`menu clic panel : ${index}`) ; this.openMenuPanel(index) })
            
            // sur pc si souris sort du container /article on le cache
            menu_panel.addEventListener('mouseleave', () => {
              console.log(`leave menu : ${index}`)
              if (window.innerWidth > 768){ menu_panel.classList.remove( this.pgc.classMenuActive ) }
            })            

        })

    }

    //-------------------------------------------------------------------------------------------------------------------------------------------------------
    /*
    // Navigation entre articles
    // Affiche un article identifié par son index dans this.articles. L'index est celui de la liste complète, boards compris.
    Le problème restant est que switchPanel() remet currentSection à 0, mais ne garantit pas que la première section soit effectivement visible.
    CORRIGE 
        this.currentSection = 0;
    *** this.switchSection(0)
        this.onPanelShown(index)
    return true
    */


    switchPanel(index) {
        const article = this.articles[index]

        if (!article) { console.warn(`Article introuvable pour l'index ${index}.`); return false }

        //this.articles.forEach( (item , i)  => { item.classList.toggle("hidden", i !== index ) })
        
        /* 2026-10-22
        this.articles.forEach( (item , i)  => { item.classList.toggle( this.pgc.classPanelActive , i === index ) })
        */          
        this.articles.forEach((item, i) => {
            const isActive = i === index;
            item.classList.toggle(this.pgc.classPanelActive, isActive);
        });
          
          


        this.currentArticle = index
        this.currentSection = 0
        this.switchSection(0)

        if (!["art-admin", "art-user"].includes(article.id)) { this.lastContentPanel = index }

        this.onPanelShown(index);// Le comportement spécifique est délégué à l'application.
        return true;
    }

    /**
     * Point d'extension appelé après l'affichage d'un article.
     */
    onPanelShown(article) {
        // Implémentation facultative dans app-index.js.
    }

    switchAdmin() { return this.switchPanel(0) }//return this.switchPanelById("art-admin");

    switchUser() { return this.switchPanel(1) } // return this.switchPanelById("art-user");
    
    // ============================================================
    // Navigation entre sections
    // 
    // Affiche une section de l'article courant. Les sections sont des éléments section.tab-content.
    
    switchSection(index) {
        
        if (this.currentArticle === null) return false;

        const sections = qsa( "div.section-tab > section.tab-content" , this.articles[this.currentArticle] )
                
        const section = sections[index];

        if (!section) { console.warn(`Section introuvable pour l'index ${index}.`); return false}

        sections.forEach( el => el.classList.remove("active") )
        sections[index].classList.add("active")

        const buttons = qsa( "div.section-tab > div.tab-headers > button.tab-btn" , this.articles[this.currentArticle] )
        buttons.forEach( btn => btn.classList.remove("active") )
        buttons[index].classList.add("active")

        this.currentSection = index;
        this.onSectionShown(this.currentArticle , this.currentSection );
        return true;
    }

    /**
     * Point d'extension : Leaflet, graphiques ou autres composants.
     */
    onSectionShown(art , sec) {
        // Aucun composant spécifique dans le contrat commun.
    }

    // ============================================================
    // Thème et affichage
    // ============================================================

    themeSwitch() {
        this.currentTheme =
            this.currentTheme === "marine" ? "nature" : "marine";

        document.documentElement.dataset.theme = this.currentTheme;

        if (this.themeButton) {
            this.themeButton.textContent =
                this.currentTheme === "marine"
                    ? "Thème nature"
                    : "Thème marine";
        }
    }

    async fullscreenSwitch() {
        try {
            if (!document.fullscreenElement) {
                await document.documentElement.requestFullscreen()
            } else {
                await document.exitFullscreen()
            }
        } catch (error) {
            console.warn("Plein écran indisponible :", error)
        }
    }

    statusWrite(message) {
        if (this.footerStatus) {
            this.footerStatus.textContent = message
        }
        else{
            console.log(message)
        }
    }

    // ============================================================
    // Menu responsive
    // ============================================================

    openNav() { this.menu?.classList.add( this.pgc.classMenuActive ) }

    closeNav() { this.menu?.classList.remove( this.pgc.classMenuActive ) }

    openMenuPanel(index) {
        const menuPanels = qsa('.nav-article', this.menu )
        menuPanels.forEach((menupanel, i) => { menupanel.classList.toggle( this.pgc.classMenuActive , i === index) })
    }

    // ============================================================
    // Authentification et montage applicatif
    // ============================================================
    mountApplication() {
        // Point d'extension après authentification.
    }

    noAuth() {
        this.statusWrite("Authentification requise.");
    }
}
