# domaine personne

## personne

### front
- [public/assets/js/features/personne](../../public/assets/js/features/personne)
- [public/assets/js/features/personne/personne.service.js](../../public/assets/js/features/personne/personne.service.js)
- [public/assets/js/features/personne/personne-parcours.service.js](../../public/assets/js/features/personne/personne-parcours.service.js)
- [public/assets/js/features/personne/personne-alias.service.js](../../public/assets/js/features/personne/personne-alias.service.js)

### back
- [app/Controllers/Api/Personne.php](../../app/Controllers/Api/Personne.php)
- [app/Controllers/Api/PersonneParcours.php](../../app/Controllers/Api/PersonneParcours.php)
- [app/Controllers/Api/PersonneAlias.php](../../app/Controllers/Api/PersonneAlias.php)
- [app/Services/PersonneService.php](../../app/Services/PersonneService.php) (si présent)
- routes : `/api/personnes`, `/api/personne-parcours`, `/api/personne-aliases`

```php
// Exemple de routes dans app/Config/Routes.php
$routes->post('personnes/(:num)/merge/(:num)', 'Personne::merge/$1/$2');
$routes->resource('personnes', [ 'controller' => 'Personne', 'only' => ['index','show','create','update','delete'] ] );
```

### Relations
- intra domaine
  - personne → alias, parcours, relations
- extra domaine
  - organisation
  - image
  - relation

## Base de données

### Tables
- personnes
- personne_alias
- personne_parcours

### personnes

#### Structure
- id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY
- firstname VARCHAR(128) NULL
- lastname VARCHAR(128) NULL
- email VARCHAR(128) NULL
- phone VARCHAR(32) NULL
- created_at DATETIME NULL
- updated_at DATETIME NULL

#### Index
- PRIMARY KEY (id)
- INDEX idx_personnes_lastname (lastname)
- INDEX idx_personnes_email (email)

### personne_alias

#### Structure
- id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY
- personne_id INT UNSIGNED NOT NULL
- alias VARCHAR(128) NOT NULL
- created_at DATETIME NULL

#### Index
- PRIMARY KEY (id)
- INDEX idx_personne_alias_personne_id (personne_id)

### personne_parcours

#### Structure
- id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY
- personne_id INT UNSIGNED NOT NULL
- libelle VARCHAR(255) NOT NULL
- description TEXT NULL
- created_at DATETIME NULL
- updated_at DATETIME NULL

#### Index
- PRIMARY KEY (id)
- INDEX idx_personne_parcours_personne_id (personne_id)

---

Notes / tâches à faire
- vérifier si `PersonneService.php` existe et intégrer son mapping
- compléter les payloads et réponses JSON pour chaque endpoint
- ajouter migration SQL / seed pour les tables ci-dessus
