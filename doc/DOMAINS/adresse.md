# domaine adresse

## adresse

### front
- [public/assets/js/features/adresse](../../public/assets/js/features/adresse)
- [public/assets/js/features/adresse/adresse.service.js](../../public/assets/js/features/adresse/adresse.service.js)

### back
- [app/Controllers/Api/Adresse.php](../../app/Controllers/Api/Adresse.php)
- [app/Models/AdresseModel.php](../../app/Models/AdresseModel.php) (à confirmer selon le dépôt)
- routes attendues : `/api/adresse`, `/api/adresse/:id`, `/api/adresse/like`

```php
// Exemple de routes API compatibles
$routes->group('api', function ($routes) {
    $routes->get('adresse', 'Adresse::index');
    $routes->get('adresse/like', 'Adresse::like');
    $routes->get('adresse/(:num)', 'Adresse::show/$1');
    $routes->post('adresse', 'Adresse::create');
    $routes->put('adresse/(:num)', 'Adresse::update/$1');
    $routes->delete('adresse/(:num)', 'Adresse::delete/$1');
});
```

### Relations
- intra domaine
  - adresse → organisation / établissement / personne
- extra domaine
  - organisation
  - personne
  - typevoie

## Base de données

### Tables
- adresses
- typevoie

### adresses

#### Structure
- id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY
- voienom VARCHAR(255) NULL
- voienumero VARCHAR(32) NULL
- voierpt VARCHAR(255) NULL
- voietype_id INT UNSIGNED NULL
- voiecharniere VARCHAR(255) NULL
- complement VARCHAR(255) NULL
- infodistribution VARCHAR(255) NULL
- codepostal_id INT UNSIGNED NULL
- acheminement VARCHAR(255) NULL
- latitude DECIMAL(10,7) NULL
- longitude DECIMAL(10,7) NULL
- created_at DATETIME NULL
- updated_at DATETIME NULL

#### Index
- PRIMARY KEY (id)
- INDEX idx_adresses_voienom (voienom)
- INDEX idx_adresses_codepostal_id (codepostal_id)
- INDEX idx_adresses_voietype_id (voietype_id)

### typevoie

#### Structure
- id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY
- libelle VARCHAR(128) NOT NULL
- code VARCHAR(32) NULL
- created_at DATETIME NULL
- updated_at DATETIME NULL

#### Index
- PRIMARY KEY (id)
- UNIQUE INDEX uq_typevoie_code (code)

---

Notes / tâches à faire
- confirmer les modèles exacts de `AdresseModel`, `TypeVoieModel` et `CodePostalModel`
- valider les noms de champs et la table effective côté base de données
- compléter avec les réponses de l’API et les événements front associés
