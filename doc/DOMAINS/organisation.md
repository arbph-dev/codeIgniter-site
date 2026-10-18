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
    $routes->resource('organisation', ['controller' => 'App\Controllers\Api\Organisation']);
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

Notes / tâches à faire
- vérifier les contrôleurs mentionnés (OVH paths dans notes → confirmer)
- documenter les endpoints et les modèles de données
- ajouter un diagramme des relations entre personnes / organisations / images
