**autorisation**
```
if (! auth()->user()?->can('admin.access'))
```

dans chaque méthode.

L'accès `/api/admin/*` doit idéalement être protégé par le **filtre Shield / groupe / permission**, comme le reste de l' API.

 Le contrôleur ne doit pas dupliquer cette politique à chaque endpoint.

```
$routes->group('api/admin', [
    'filter' => 'permission:admin.access',
], static function ($routes) {
    ...
});
```


Point à documenter 

Shield utilise une configuration de noms de tables pour identities, groups_users et permissions_user
config('Auth')->tables doit être accessible dans App\Config\Auth. 


/vendor/codeigniter4/shield/src/Models/UserModel.php
/vendor/codeigniter4/shield/src/Entities/User.php
/vendor/codeigniter4/shield/src/Entities/UserIdentity.php
