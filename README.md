Documentation:

libraries required:

"react": "15.5.4",
"moment": "2.18.0",

-*-*****************************************************-*-

PROPS NAME: options
FIELD: columns
-----------------------------------------------
@name: attr.resolveIdToText
@type: Object
@example:
    {
        '1' : {
            label: 'energi',
            value: '1'
        },
        ...
}
-----------------------------------------------
@name: attr.mapChildren
@type: Object
@example:
    {
        ernc_factor: {
            name: 'ernc factor',
            type: 'danger',
        },
        ...
    },
-----------------------------------------------
@name: attr.replaceBooleanValue
@type: Object
@example:
    {
        isTrue: 'OK',
        isFalse: 'Fail',
    },
----------------------------------------------
@name: attr.title:
@type: String
@example: 'The Title'
----------------------------------------------
@name: attr.name
@type: String
@example: 'name_column_service'
----------------------------------------------
@name: attr.textIsEmpty
@type: String
@example: 'The field is Empty, Sorry!!!'
----------------------------------------------
@name: attr.childrenTooltip: true TODO
----------------------------------------------
@name: attr.css
@type: Object
@example:
    {
        whiteSpace: 'nowrap',
        color: 'red',
        font-size: '15px',
        ...
    },
----------------------------------------------
@name: attr.cssClass
@type: String
@example: 'btn btn-primary bg-color-active'
