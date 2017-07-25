# Documentation:

## libraries required:

- "react": "15.5.4",
- "moment": "2.18.0" <https://momentjs.com/>,

## Iniciar Tabla2

```javascript

const service = 'https://host.com/api/';
const query = '&organization_id=1';

function getService() {
    const params = '';
    return {
        api: service + '?',
        query: query,
    };
}

<table2
    service={getService()}
    data={data}
    options={options}>
</table2>
```

- atributo `service`: Si se utiliza un filtro desde afuera de `Table2` se debe pasar al atributo del componente `service` un objeto con la base de la `api` y el `query` inicial.

  - Ejemplo:

    - `service` = <https://host.com/api/>
    - `query` = `&organization_id=1`

- atributo `data`: aqui se debe pasar el objeto que retorna el servicio (este objeto es el que genera Django REST Framework cuando se utiliza la clase `PaginationDjangoRestTable` incluida en este repositorio)

  - Ejemplo:

```json

{
    "next": null,
    "previous": null,
    "count": 8,
    "limit": 10,
    "current": 1,
    "final": 1,
    "results": [
        {
            "id": 55,
            "organization_id": 1,
            "rut": 116354756,
            "name": "Jhon",
            "last_names": "Carpenter",
            "phone": "+56954900747",
            "emergency_phone": "+56954900747",
            "job_title": "Dev",
        },
    ]
}
```

- atributo `options`: este el el objeto principal desde donde se define la tabla

```javascript
const options = {
    className: 'table table-bordered',
    actions: {
        view: { Component: EditPerson, cssClass: 'btn btn-primary' },
        css: { whiteSpace: 'nowrap', minWidth: '182px' },
    },
    hiddenActions: !isCoordinator(),
    columns: [
        {
            title: 'RUT',
            name: 'rut',
            textIsEmpty: 'rut',
            templateWithInstance: ComponentColumn,
            inputSeachComponet: ComponentInputSearch,
            inputSearchPlaceholder: 'Ingrese Teléfono',
            inputSeach: 'icontains',
            noSorting: true,
            css: { minWidth: '50px' },
        },
    ],
};
```

nombre | valor
------ | -----
asda   | sdas

PROPS NAME: options

# FIELD: columns

@name: attr.resolveIdToText @type: Object @example: { '1' : { label: 'energi', value: '1' }, ...

# }

@name: attr.mapChildren @type: Object @example: { ernc_factor: { name: 'ernc factor', type: 'danger', }, ...

```

},
```

--------------------------------------------------------------------------------

@name: attr.replaceBooleanValue @type: Object @example: { isTrue: 'OK', isFalse: 'Fail',

```

},
```

--------------------------------------------------------------------------------

@name: attr.title: @type: String

# @example: 'The Title'

@name: attr.name @type: String

# @example: 'name_column_service'

@name: attr.textIsEmpty @type: String

# @example: 'The field is Empty, Sorry!!!'

# @name: attr.childrenTooltip: true TODO

@name: attr.css @type: Object @example: { whiteSpace: 'nowrap', color: 'red', font-size: '15px', ...

```

},
```

--------------------------------------------------------------------------------

@name: attr.cssClass @type: String @example: 'btn btn-primary bg-color-active'
