On ne peut pas séparer le back du front. Il faut distinguer les particularités technique et ne pas omettre la partie base de données
- front : fetch et auth, render event, form et request 
- back : traits, service et controller, entities et models
- db, creation , vues 

je fais le choix de gérer les db avec phpmyadmin mais je considère quand même spark a terme de toute maniere l'administration restera spark

ressources
- [ ] générer un template / domaine
- [ ] lister les domaines
- [ ] compléter les domaines avec le sources disponibles, compiler les notes


# domaine image
image
public/assets/js/features/image/image.properties.js
app/Models/ImageModel.php
app/Controllers/Api/Image.php

# domaine mot
mot
public/assets/js/features/mot/mot.properties.js
app\Controllers\Api\Mot.php

# domaine personne
## personne
### front personne
public/assets/js/features/personne/personne.properties.js

# domaine organisation
## organisation

### front
public/assets/js/features/organisation/organisation.properties.js
public/assets/js/features/organisation/organisation.constants.js
### back
```php 
// routes
```
OVH\app\Controllers\Api\Organisation.php
OVH\app\Controllers\Api\Personne.php
OVH\app\Services\PersonneService.php

OVH\app\Controllers\Api\Organisation.php



<!--
# domaine X

    ## X.X ## X.Y ## X.Z

        ### front X.X

        ### back

            ```php 
            // routes
            ```

    ## Relations
        ### intra domaine
        ### extra domaine
-->
