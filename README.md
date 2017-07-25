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

- atributo `data`: aquí se debe pasar el objeto que retorna el servicio (este objeto es el que genera Django REST Framework cuando se utiliza la clase `PaginationDjangoRestTable` incluida en este repositorio)

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

nombre                 | valor                              | descripción
---------------------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
className              | 'table table-hover table-bordered' | un `string` con las clases que se quiera agregar a la tabla
actions                | object                             | objeto con la definición de las acciones que mostrara en la columna acciones
actions.view           | object                             | espera un `Component` para ser renderizado en cada `row` y clases css
actions.view.Component | `React.Component`                  | espera un componente `React`, en el componente es accesible como propiedad el objeto de la `row` donde este se creara y las clases css. `(ver código de ejemplo 01)`
actions.view.cssClass  | string                             | clases css dentro de un string
actions.css            | object                             | css que se desee pasar al `<td>`
hiddenActions          | boolean                            | posibilita ocultar o mostrar las acciones, por defecto es `true`
columns                | array                              | esta sección es donde se mapea los atributos de los objetos que retorna el servicio, el orden de las columnas tiene directa relación con el orden de los objetos en este `array`

### array columns

nombre                 | valor                                                 | descripción
---------------------- | ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
title                  | string                                                | titulo de la columna que se ve en el header
name                   | string                                                | nombre del atributo del objeto que se desea mostrar, existe la posibilidad de motrar atributos anidados de la siguiente manera `roles.admin.id`
textIsEmpty            | string                                                | texto que se mostrará si el valor del atributo esta vacío
templateWithInstance   | function: params instance, definitionCol              | por defecto cada columna muestra el valor mapeado dentro del `<td>`, pero si se desea un comportamiento específico, se puede pasar una función con ese contenido `(ver código de ejemplo 02)`, la función utilizada siempre tendrá dos parámetros que le pasa `Table2`: `instance`(la instancia del objeto actual), `definitionCol`(el array columns), por defecto no es necesario utilizar este atributo
inputSeach             | string                                                | tipo de búsqueda que se desea hacer, se puede utilizar: `exact` lo que genera el parámetro en query `&name_atribute=input_value`, cualquier otro texto, se concatena al nombre del atributo: `blah` => `$name_atribute__blah=input_value`. Este parámetro es opcional, solo si se requiere un input para filtro por campo
inputSeachComponet     | function: params object.handlerChange, object.element | función para sobrescribir el input por defecto para los filtros, se pasa desde `Table2`: `object.handlerChange`(callback para ejecutar el onChange y enviar el value del input al servicio), `object.element`(objeto actual de la columna que se define en el array columns), `(ver código de ejemplo 03)`, por defecto este campo no es necesario, por norma este atributo debe ir acompañado del atributo `inputSeach`, `object.handlerChange` espera un único atributo que puede ser directamente el valor a buscar o el evento de tipo `Event`
inputSearchPlaceholder | string                                                | texto a mostrar como placeholder en el input search, por defecto si se omite, `Table2` crea uno con formato `Ingrese atribute_name`
noSorting              | boolean                                               | sirve para quitar la capacidad de hacer `sorting` en una columna, por defecto es true
css                    | object                                                | css ue se desee pasar al `<td>`

## Códigos de Ejemplo

- 01 `Componente React para actions.view.Component`

```javascript
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ComponentActionsView extends Component {
    render() {
        return (
          <div className="btn-group">
            <Link
              to={`/url-01/${this.props.object.id}`}
              className="btn btn-danger btn-sm"
            >Delete</Link>
            <Lin
              to={`/url-02/${this.props.object.id}`}
              className={this.props.cssClass}
            >Edit</Link>
          </div>
        );
    }
}
ComponentActionsView.propTypes = {
    cssClass: PropTypes.string.isRequired,
    object: PropTypes.object.isRequired,
};

export default ComponentActionsView;
```

- 02 `functions` para cambiar el componente por defecto que se reenderiza en las columnas

```javascript
function RUT(instance) {
    return ( <p>{rutFormat(rutAddDv(instance.rut))}</p>);
}
function User(instance) {
    return (<p>{instance.user.is_active ? 'active' : 'inactive'</p>);
}
function Phone(instance) {
    return (<p>{formatPhone(instance.phone)}</p>);
}
```

- 03 `functions` para cambiar el comportamiento de los `input` que aparecen en los header de las columnas para filtrar contenido

```javascript

function JobInputSearch(options) {
    const className = options.element.className;
    return (
        <input
          onChange={(e) => options.handlerChange(e)}
          placeholder={options.element.inputSearchPlaceholder}
          className={ className ? className : 'form-control'}/>
    );
}

function RUTInputSearch(options) {
    const className = options.element.className;
    const changeFunc = function changeFunc(e) {
        let val = e.target.value;
        e.target.value = rutFormat(val);
        options.handlerChange(rutClean(val));
    };
    return (
        <input
          onChange={(e) => changeFunc(e)}
          placeholder={options.element.inputSearchPlaceholder}
          className={ className ? className : 'form-control'}
        />
    );
}
```
