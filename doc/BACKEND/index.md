app/Services :
- les services sont enregistrés dans 

## app/Services
```
app/Services
├── CmsService.php
├── EntrepriseService.php
├── ImageMotService.php
├── PersonneService.php
├── RelationService.php
└── Users
    └── UserService.php
```


## app/Controllers
<!-- 
[]()



-->
2026-10-16 : Api/Admin
- [front](/public/assets/js/features/admin/renderer.js) -+- [back](/app/Controllers/Api/Admin/UsersController.php) voir [doc/ADMIN#-intégration-version-1](/doc/ADMIN#-intégration-version-1)


```
app/Controllers
├── Admin
│   ├── CmsPart.php
│   ├── CmsTree.php
│   ├── ComponentTypeController.php
│   └── ModelWorkbench.php
├── Admin.php
├── Api
│   ├── Admin
│   │   └── UsersController.php
│   ├── Adresse.php
│   ├── AuthController.php
│   ├── CodeNaf.php
│   ├── CodePostal.php
│   ├── ComponentCatalogController.php
│   ├── Comptespcg.php
│   ├── Entreprise.php
│   ├── Etablissement.php
│   ├── FormeJuridique.php
│   ├── Image.php
│   ├── ImageMot.php
│   ├── Mot.php
│   ├── MotImage.php
│   ├── Organisation.php
│   ├── ParcoursTypes.php
│   ├── Personne.php
│   ├── PersonneAlias.php
│   ├── PersonneParcours.php
│   ├── Ping.php
│   ├── Ping2.php
│   ├── RelationTypes.php
│   ├── Relations.php
│   ├── Team
│   │   └── UsersController.php
│   └── TypeVoie.php
├── BaseController.php
├── Chimie.php
├── Cms.php
├── CmsController.php
├── ComponentTypeTest.php
├── Dbtest.php
├── Home.php
├── Informatique.php
├── Portal.php
├── Sendtestmail.php
├── Technologies.php
├── TestController.php
├── TestDescriptor.php
├── User.php
└── WorkbenchController.php
```
## app/Entities
```
app/Entities
├── ParcoursType.php
├── Personne.php
├── PersonneAlias.php
├── PersonneParcours.php
├── Relation.php
├── RelationType.php
└── UserProfil.php
```
## app/Enums
```
app/Enums
├── Charniere.php
├── GeocodePrecision.php
└── IndiceRepetition.php
```
## app/Libraries
```
app/Libraries
├── Cms
│   ├── ComponentRegistry.php
│   ├── DescriptorDefinition.php
│   └── DescriptorFactory.php
└── Components
    ├── AdminComponentRegistry.php
    ├── AdminComponentRenderer.php
    ├── AdminRenderers
    │   ├── ApexAdminRenderer.php
    │   ├── CalloutAdminRenderer.php
    │   ├── CodeValAdminRenderer.php
    │   ├── LeafletAdminRenderer.php
    │   ├── MermaidAdminRenderer.php
    │   ├── RawAdminRenderer.php
    │   └── ThreeAdminRenderer.php
    ├── ComponentCatalog.php
    ├── ComponentDefinition.php
    ├── ComponentRegistry.php
    ├── ComponentRenderer.php
    ├── DescriptorDefinition.php
    ├── DescriptorMapper.php
    └── Renderers
        ├── ApexRenderer.php
        ├── CalloutRenderer.php
        ├── CodeValRenderer.php
        ├── ComponentRendererInterface.php
        ├── LeafletRenderer.php
        ├── MermaidRenderer.php
        ├── RawRenderer.php
        └── ThreeRenderer.php
```
## app/Models
```
app/Models
├── AdresseModel.php
├── CmsArticleModel.php
├── CmsCategoryModel.php
├── CmsPartModel.php
├── CmsSectionModel.php
├── CodeNafModel.php
├── CodePostalModel.php
├── ComponentTypeModel.php
├── ComptespcgModel.php
├── EntrepriseModel.php
├── EtablissementModel.php
├── FormeJuridiqueModel.php
├── ImageModel.php
├── ImageMotModel.php
├── MotModel.php
├── OrganisationModel.php
├── ParcoursTypeModel.php
├── PersonneAliasModel.php
├── PersonneModel.php
├── PersonneParcoursModel.php
├── RelationModel.php
├── RelationTypeModel.php
├── TypeVoieModel.php
└── UserProfilModel.php
```
## app/Traits
```
app/Traits
└── ApiResponse.php
```

voir data meta

## app/Views

```
app/Views
├── admin
│   ├── cmspart
│   │   ├── edit.php
│   │   └── index.php
│   ├── cmstree
│   │   ├── index.php
│   │   └── node.php
│   ├── component_types
│   │   ├── create.php
│   │   ├── edit.php
│   │   ├── form.php
│   │   └── index.php
│   ├── modelworkbench.php
│   └── tree.php
├── cms
│   ├── admin.php
│   ├── article.php
│   ├── article2.php
│   ├── category.php
│   ├── components
│   │   ├── cp_base.php
│   │   ├── cp_edit.php
│   │   ├── debug_overlay.php
│   │   ├── user_list.php
│   │   └── user_list2.php
│   ├── index.php
│   ├── index2.php
│   ├── libs.php
│   ├── part.php
│   ├── section.php
│   ├── tree.php
│   └── userboard.php
├── components
│   ├── apex.php
│   ├── codeval.php
│   └── mermaid.php
├── errors
│   ├── cli
│   │   ├── error_404.php
│   │   ├── error_exception.php
│   │   └── production.php
│   └── html
│       ├── debug.css
│       ├── debug.js
│       ├── error_400.php
│       ├── error_404.php
│       ├── error_exception.php
│       └── production.php
├── home_index.php
├── layouts
│   ├── cms.php
│   ├── cms_bs52.php
│   ├── cms_css.php
│   ├── cms_w3c.php
│   ├── footer.php
│   ├── header.php
│   ├── layout_main.php
│   ├── layout_nonav.php
│   └── nav.php
├── pages
│   ├── chimie
│   │   ├── corrosions.php
│   │   ├── equipements.php
│   │   ├── purges.php
│   │   └── unites.php
│   ├── chimie_main.php
│   ├── home.php
│   ├── info_main.php
│   ├── informatique
│   │   ├── apex.php
│   │   ├── callout.php
│   │   ├── carousel.php
│   │   ├── codeval.php
│   │   ├── devlogs.php
│   │   ├── devone.php
│   │   ├── formdialog.php
│   │   ├── formfeatures.php
│   │   ├── forms.php
│   │   ├── langages.php
│   │   ├── leaflet.php
│   │   ├── mermaid.php
│   │   ├── threejs.php
│   │   └── xhr.php
│   ├── phpinfo.php
│   ├── portal
│   │   └── contact.php
│   ├── portal.php
│   ├── technologies
│   │   ├── acp
│   │   │   ├── index.php
│   │   │   └── presentation.php
│   │   ├── aut
│   │   │   └── index.php
│   │   ├── chf
│   │   │   ├── bois.php
│   │   │   ├── index.php
│   │   │   ├── remeha.php
│   │   │   ├── varblok.php
│   │   │   └── varmax.php
│   │   ├── com
│   │   │   ├── ethernet.php
│   │   │   ├── index.php
│   │   │   ├── lora.php
│   │   │   └── rs485.php
│   │   ├── eau
│   │   │   └── index.php
│   │   ├── ecs
│   │   │   └── index.php
│   │   ├── eln
│   │   │   ├── arduino.php
│   │   │   ├── index.php
│   │   │   └── interruptions.php
│   │   ├── gaz
│   │   │   └── index.php
│   │   ├── hyd
│   │   │   └── index.php
│   │   ├── index.php
│   │   ├── sec
│   │   │   └── index.php
│   │   ├── vap
│   │   │   ├── index.php
│   │   │   └── requalification.php
│   │   └── wrk
│   │       └── index.php
│   ├── template_article.php
│   └── template_rubrique.php
├── view_base.php
├── welcome_message.php
└── workbench
    ├── adresse.php
    ├── component_catalog.php
    ├── image.php
    ├── imagetagger.php
    ├── libs.php
    ├── mot.php
    ├── organisation.php
    └── personne.php
```

30 directories, 108 files



