# codeIgniter

## UI
2026-10-14 : refonte application
2026-10-16 : réintégration menu

## Taches

- [ ] Headers / js : Faire un choix affectation event ui dans html ou dans le code js
- [X] Revoir nécessité des id sur les éléments de structure main, header, nav ; but simplifier les selectors et le code css
- [X] Panels - Onglets / Structure : panel-card a faire évoluer en article et div.section-tab en sections
- [X] auth : Valider register et register-pending
- [ ] auth : bouton resend et essai voir [notes/2026-10-14-001](/doc/notes/2026-10-14-001.md)
- [ ] admin regrouper les notes :
  - [TODO.md](/TODO.md)
- [ ] admin : intégration V1, ok documenter , style 
  - [doc/ADMIN#-intégration-version-1](/doc/ADMIN#-intégration-version-1)
  - [/doc/BACKEND](//doc/BACKEND) - a ajouter au Controller
  - documenter vendor /shield,  : group permissions
  - documenter services a ajouter dans app config services
- [X] [`/index.html`](/public/index.html)  : Modifier structure article/section
- [ ] [`/index.html`](/public/index.html)  : Modifier renderMenu selon   [doc/notes/2026-10-17.md](/doc/notes/2026-10-17.md)
- [`/assets/js/app-index.js`](/public/assets/js/app-index.js) : Gestion PAGE_CONFIG, à améliorer -> ajouter style du menu
- [`/assets/js/uibase.js`](/public/assets/js/uibase.js) :
  - [ ] Gestion PAGE_CONFIG, à conserver dans le constructeur
  - [ ] déplacer les fonctions badge dans une librairie template
  - [ ] déplacer renderUserCard dans un features et utiliser domhelper::create
  - [ ] que faire de renderPagination
  - [ ] déplacer les fonctions themeSwitch, fullscreenSwitch dans une librairie template
  - [ ] ajouter une fonction elm_WriteText dans domhelper, ecrit dans un element.textContent
- Ajout dynamique script et link dans domcontentloaded : test
- Nav a gérer comme Toolbar ?
- [`/public/assets/js/features/admin/renderer.js`](/public/assets/js/features/admin/renderer.js) :
  - [ ] Séparer les parties services, et renderers, éviter controller  et bus
- [`app/Services/Users/UserService.php`](/app/Services/Users/UserService.php)
  - [ ] Ventiler notes papier
- [`app/Controllers/Api/Admin/UsersController.php`](/app/Controllers/Api/Admin/UsersController.php)
  - [ ] Ventiler notes papier

## application

3 pages associées à leur script , chaque script hérite de [`/assets/js/uibase.js`](/public/assets/js/uibase.js)

| Fichier | Script Application | url | Notes |
| --- | --- | --- |  --- |
| [`/index.html`](/public/index.html) | [`/assets/js/app-index.js`](/public/assets/js/app-index.js) | https://zealot.fr/index.html | A modifier en 1 page  |
| [`/idx-dev.html`](/public/idx-dev.html) | [`/assets/js/app/app-idxdev.js`](/public/assets/js/app/app-idxdev.js) | https://zealot.fr/idx-dev.html | A modifier régulièrement  |
| [`/ui-components/apex.html`](/public/ui-components/apex.html) | [`/assets/js/app/cmp/uicmp-apex.js`](/public/assets/js/app/cmp/uicmp-apex.js) | https://zealot.fr//ui-components/apex.html | A modifier régulièrement  |

chaque section comporte un div pour monter les composants futurs




## css
  - [`/assets/css/ui.css`](/public/assets/css/ui.css)
    - 2026-10-18 : ajout de classe pour les titres
  - [`/assets/css/ui.css`](/public/assets/css/ui-nav.css)

## js
  - [`/assets/js/uibase.js`](/public/assets/js/uibase.js) : contrat application, fournit des méthodes standard, event en callback pour application , impose l'implémentation des méthodes boot 

### [`/assets/js/uibase.js`](/public/assets/js/uibase.js)
Définit le contrat application, fournit
- des méthodes standard
- events en callback pour application
- impose l'implémentation des méthodes boot 




### components
- [`/assets/js/components/apex.js`](/public/assets/js/components/apex.js)
- [`/assets/js/components/codeval.js`](/public/assets/js/components/codeval.js)
- [`/assets/js/components/callout.js`](/public/assets/js/components/callout.js)

### core
- [`/assets/js/core/domhelper.js`](/public/assets/js/core/domhelper.js)
- [`/assets/js/core/eventBus.js`](/public//assets/js/core/eventBus.js)

### features
- [`/assets/js/features/auth/auth.controller.js`](/public/assets/js/features/auth/auth.controller.js)
- [`/assets/js/features/auth/auth.store.js`](/public/assets/js/features/auth/auth.store.js)
- [`/assets/js/features/auth/auth.service.js`](/public/assets/js/features/auth/auth.service.js)
- 2026-10-16 : [`/public/assets/js/features/admin/renderer.js`](/public/assets/js/features/admin/renderer.js)
  - voir [`app/Controllers/Api/Admin/UsersController.php`](/app/Controllers/Api/Admin/UsersController.php)
### workbench (partie a revoir)
- [`/assets/js/ui/workbench/auth/ToolbarAuthPanel.js`](/public/assets/js/ui/workbench/auth/ToolbarAuthPanel.js)
- [`/assets/js/ui/workbench/core/AuthPanelBase.js`](/public/assets/js/ui/workbench/core/AuthPanelBase.js)

## Backend
- [`app/Config/Filters.php`](/app/Config/Filters.php)
- [`app/Config/Routes.php`](/app/Config/Routes.php)
- [`app/Controllers/Api/AuthController.php`](/app/Controllers/Api/AuthController.php)
- [`app/Controllers/Api/Admin/UsersController.php`](/app/Controllers/Api/Admin/UsersController.php)
- [`app/Services/Users/UserService.php`](/app/Services/Users/UserService.php)
- 2026-10-18 : [`/doc/DOMAINS`](/doc/DOMAINS)



# Documentation
## fichiers
- [Front](https://github.com/arbph-dev/codeIgniter/blob/master/doc/FRONTEND/JS/index.md) 



template


<!-- 
- [``]()
- [``](/)
import { initAuthController } from '/assets/js/features/auth/auth.controller.js'
import { authStore } from '/assets/js/features/auth/auth.store.js'
import ToolbarAuthPanel       from '/assets/js/ui/workbench/auth/ToolbarAuthPanel.js'
import { UiBase } from '/assets/js/uibase.js'
import { initApex } from '/assets/js/components/apex.js'
import { initCodeVal } from '/assets/js/components/codeval.js'
import { initCallout} from '/assets/js/components/callout.js'
import { bus } from '/assets/js/core/eventBus.js'
--> 






<!-- 


## UI
- [2026-10-01 : Remise a plat uiapp.js](/doc/notes/2026-10-01.md#cUI)

## Gestion Authentification
- backend
  - [2026-09-30](/doc/notes/2026-09-30.md)
  - [2026-10-01 : codeigniter / shield / users](/doc/notes/2026-10-01.md#codeigniter--shield--users)
- frontend
  - [2026-10-02](/doc/notes/2026-10-02.md)
  - [2026-10-03](doc/notes/2026-10-03.md) : register
    - [2026-10-03-001](/doc/notes/2026-10-03-001.md) : Détail de l'interaction : ToolbarAuthPanel ↔ Bus ↔ uiapp.js
    - https://github.com/arbph-dev/codeIgniter/blob/master/doc/notes/2026-10-03-001.md#-r%C3%A9sum%C3%A9-des-responsabilit%C3%A9s
    - https://github.com/arbph-dev/codeIgniter/blob/master/doc/notes/2026-10-03-001.md#2-ce-que-le-bus-doit-exposer
    - https://github.com/arbph-dev/codeIgniter/blob/master/doc/notes/2026-10-03-001.md#3-%C3%A9dition-de-authcontrollerjs
    - https://github.com/arbph-dev/codeIgniter/blob/master/doc/notes/2026-10-03-001.md#4-impl%C3%A9mentation-de-fetchactivate-dans-authservicejs
    - https://github.com/arbph-dev/codeIgniter/blob/master/doc/notes/2026-10-03-001.md#5-la-vraie-modification-dans-authpanelbase
    - [2026-10-03-001-05](/doc/notes/2026-10-03-001-05.md)
    - [2026-10-04](/doc/notes/2026-10-04.md) : amélioration  AuthPanelBase / ToolbarAuthPanel
    - [2026-10-04-001](/doc/notes/2026-10-04-001.md) auth/register/inscription en attente 
      - js/features/auth/auth.service.js - fetchLogin - ligne 13 :  - conserver les détails de l'erreur
      - js/features/auth/auth.controller.js - bus.subscribe 'auth:login' - ligne 71  - aiguiller dans auth:login
    - [solution-retenue](/doc/notes/2026-10-04-001.md#solution-retenue) auth/register/inscription en attente nécessite un endpoint
    - [2026-10-04-002](/doc/notes/2026-10-04-002.md) register / inscription en attente et magik link





## Envrionnement
```
composer show codeigniter4/shield
```
name     : codeigniter4/shield
descrip. : Authentication and Authorization for CodeIgniter 4
keywords : Authentication, authorization, codeigniter, codeigniter4
versions : * v1.3.0
released : 2026-03-16, 6 months ago
type     : library

```
use CodeIgniter\Database\RawSql;  
use CodeIgniter\I18n\Time;  
use CodeIgniter\Shield\Authentication\Authenticators\AccessTokens;  
use CodeIgniter\Shield\Authentication\Authenticators\HmacSha256;  
use CodeIgniter\Shield\Authentication\Authenticators\Session;  
use CodeIgniter\Shield\Authentication\HMAC\HmacEncrypter;  
use CodeIgniter\Shield\Authentication\Passwords;  
use CodeIgniter\Shield\Entities\AccessToken;  
use CodeIgniter\Shield\Entities\User;  
use CodeIgniter\Shield\Entities\UserIdentity;  
use CodeIgniter\Shield\Exceptions\LogicException;  
use CodeIgniter\Shield\Exceptions\ValidationException;  
use Exception;  
use Faker\Generator;  
use InvalidArgumentException;  
use ReflectionException;
```

### CodeIgniter\Shield\Entities\AccessToken
/vendor/codeigniter4/shield/src/Authentication/Authenticators/AccessTokens.php

**Ce que fait `AccessTokens`**
Le chemin réel est :
```
Authorization: Bearer <token>
        ▼
AccessTokens::loggedIn()
        ▼
AccessTokens::attempt()
        ▼
AccessTokens::check()
        ├── récupère le header
        ├── retire "Bearer"
        ├── SHA-256 du token
        ├── recherche dans identities
        ├── vérifie expiration
        ├── vérifie unusedTokenLifetime
        ├── met à jour last_used_at
        ▼
UserIdentityModel::getAccessTokenByRawToken()
        ▼
User + AccessToken
        ▼
$user->setAccessToken($token)
```


# ressources 

**path relatif github** : depuis https://github.com/arbph-dev/codeIgniter/blob/master

| Nom | path relatif github  | path js/ php  | path absolu |
| --- | ------------  | ---------  | --------------------------------- |
| AuthPanelBase.js| /public/assets/js/ui/workbench/core/AuthPanelBase.js  | /assets/js/ui/workbench/core/AuthPanelBase.js  | https://github.com/arbph-dev/codeIgniter/blob/master/public/assets/js/ui/workbench/core/AuthPanelBase.js |
| Config/Filters.php | /app/Config/Filters.php  | app/Config/Filters.php  | https://github.com/arbph-dev/codeIgniter/blob/master/app/Config/Filters.php |
| Config/Routes.php | /app/Config/Routes.php | app/Config/Routes.php  | https://github.com/arbph-dev/codeIgniter/blob/master/app/Config/Routes.php |
| Api/AuthController.php | /app/Controllers/Api/AuthController.php | app/Controllers/Api/AuthController.php | https://github.com/arbph-dev/codeIgniter/blob/master/app/Controllers/Api/AuthController.php |
| js/uiapp.js | /public/assets/js/uiapp.js | /assets/js/uiapp.js | https://github.com/arbph-dev/codeIgniter/blob/master/public/assets/js/uiapp.js |
| auth.controller.js | /public/assets/js/features/auth/auth.controller.js | /assets/js/features/auth/auth.controller.js | https://github.com/arbph-dev/codeIgniter/blob/master/public/assets/js/features/auth/auth.controller.js |
| auth.service.js | /public/assets/js/features/auth/auth.service.js | /assets/js/features/auth/auth.service.js | https://github.com/arbph-dev/codeIgniter/blob/master/public/assets/js/features/auth/auth.service.js |
| ToolbarAuthPanel.js | /public/assets/js/ui/workbench/auth/ToolbarAuthPanel.js | /assets/js/ui/workbench/auth/ToolbarAuthPanel.js | https://github.com/arbph-dev/codeIgniter/blob/master/public/assets/js/ui/workbench/auth/ToolbarAuthPanel.js |
|  |  |  |  |





https://www.w3schools.com/howto/default.asp




--> 




