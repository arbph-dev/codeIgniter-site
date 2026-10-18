# domaine organisation

## organisation

### front
- public/assets/js/features/organisation/organisation.properties.js
- public/assets/js/features/organisation/organisation.constants.js
- public/assets/js/features/organisation/ (composants d'édition / listing)

### back
- app/Controllers/Api/Organisation.php (vérifier chemin exact)
- app/Services/OrganisationService.php (si présent)
- app/Models/OrganisationModel.php (à confirmer)
- routes recommandées : `/api/organisation`, `/api/organisation/:id`

```php
// routes (exemple)
$routes->group('api', function($routes){
    $routes->resource('organisation', ['controller' => 'App\\Controllers\\Api\\Organisation']);
});
```

### Relations
- intra domaine
  - organisation → établissements, adresses
- extra domaine
  - personne (contacts, employés)
  - image (logo, documents)
  - mot (tags / secteurs d'activité)

---

## Base de données

### Tables

- organisations
- etablissements
- addresses

### organisations

#### Structure
- id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY
- name VARCHAR(255) NOT NULL
- siret VARCHAR(14) NULL
- vat_number VARCHAR(32) NULL
- website VARCHAR(255) NULL
- phone VARCHAR(32) NULL
- email VARCHAR(128) NULL
- address_id INT UNSIGNED NULL   -- FK vers addresses.id
- status ENUM('active','inactive','archived') DEFAULT 'active'
- created_at DATETIME NULL
- updated_at DATETIME NULL

#### Index
- PRIMARY KEY (id)
- INDEX idx_organisations_name (name)
- UNIQUE INDEX uq_organisations_siret (siret)
- INDEX idx_organisations_address_id (address_id)

### etablissements

#### Structure
- id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY
- organisation_id INT UNSIGNED NOT NULL  -- FK vers organisations.id
- name VARCHAR(255) NULL
- number VARCHAR(32) NULL
- address_id INT UNSIGNED NULL  -- FK vers addresses.id
- phone VARCHAR(32) NULL
- status ENUM('open','closed') DEFAULT 'open'
- created_at DATETIME NULL
- updated_at DATETIME NULL

#### Index
- PRIMARY KEY (id)
- INDEX idx_etablissements_org_id (organisation_id)
- INDEX idx_etablissements_address_id (address_id)

### addresses

#### Structure
- id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY
- street VARCHAR(255) NULL
- postal_code VARCHAR(20) NULL
- city VARCHAR(128) NULL
- region VARCHAR(128) NULL
- country VARCHAR(64) NULL
- latitude DECIMAL(10,7) NULL
- longitude DECIMAL(10,7) NULL
- created_at DATETIME NULL
- updated_at DATETIME NULL

#### Index
- PRIMARY KEY (id)
- INDEX idx_addresses_postal_city (postal_code, city)

---

Notes / tâches à faire
- vérifier les contrôleurs mentionnés (OVH paths dans notes → confirmer)
- documenter les endpoints et les modèles de données
- ajouter un diagramme des relations entre personnes / organisations / images
- ajouter migrations SQL / examples de seed pour les tables ci-dessus
