# domaine mot

## mot

### front
- [public/assets/js/features/mot](../../public/assets/js/features/mot)
- [public/assets/js/features/mot/mot.service.js](../../public/assets/js/features/mot/mot.service.js)
- [public/assets/js/features/mot/mot.properties.js](../../public/assets/js/features/mot/mot.properties.js)

### back
- [app/Controllers/Api/Mot.php](../../app/Controllers/Api/Mot.php)
- [app/Controllers/Api/MotImage.php](../../app/Controllers/Api/MotImage.php)
- [app/Models/MotModel.php](../../app/Models/MotModel.php) (à confirmer)
- routes attendues : `/api/mot`, `/api/mot/like`, `/api/mot/batch`

```php
// Exemple de routes API compatibles
$routes->group('api', function ($routes) {
    $routes->get('mot', 'Mot::index');
    $routes->get('mot/like', 'Mot::like');
    $routes->get('mot/batch', 'Mot::batch');
    $routes->post('mot', 'Mot::create');
    $routes->put('mot/(:num)', 'Mot::update/$1');
    $routes->delete('mot/(:num)', 'Mot::delete/$1');
});
```

### Relations
- intra domaine
  - mot → mot_image
- extra domaine
  - image
  - personne
  - organisation

## Base de données

### Tables
- mots
- mot_image

### mots

#### Structure
- id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY
- mot_lbl VARCHAR(255) NOT NULL
- mot_slug VARCHAR(255) NOT NULL
- created_at DATETIME NULL
- updated_at DATETIME NULL

#### Index
- PRIMARY KEY (id)
- UNIQUE INDEX uq_mots_slug (mot_slug)
- INDEX idx_mots_lbl (mot_lbl)

### mot_image

#### Structure
- id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY
- mot_id INT UNSIGNED NOT NULL
- image_id INT UNSIGNED NOT NULL
- created_at DATETIME NULL

#### Index
- PRIMARY KEY (id)
- INDEX idx_mot_image_mot_id (mot_id)
- INDEX idx_mot_image_image_id (image_id)

---

Notes / tâches à faire
- valider les noms de champs (`mot_lbl`, `mot_slug`) et la présence de `MotModel.php`
- compléter avec exemples de payloads (POST /api/mot) et réponses JSON
- ajouter migration SQL / seed si structure validée
