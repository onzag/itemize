[Prev](./start.md)

# Schemas

The itemize default template project comes with JSON schemas that define the kind of data we can hold, by default they are found in the `schema` folder, this folder also contains all the language information as the schemas are meant to contain multilingual information.

The only necessary files in the schemas folder are `main-i18n.properties`, `root.json`, `root.properties`, and the ones contained in the `users` folder as itemize will complain if these are missing.

 - `main-i18n.properties` contains main language properties to be used in the UI, anything included here is required.
 - `root.json` is the base of the schema and specifies the children modules
 - `root.properties` specifies root i18n information, of which only `app_name`, `app_short_name` and `app_description` are required, the rest are simply custom properties to use accross your app that fit your specific app needs.
 - `users/index.json` is the module entry for the users module
 - `users/user.json` specify the shape of the user, and this can be changed, there are however obligated properties, like username, app_language, app_country, app_currency, role, password and session_id; but you can add other properties like real name, address, about me, profile picture, etc...
 - `users/index.properties` the i18n data for the users module
 - `users/user.properties` the i18n data for the user item definition

Whenever you make a change in the schema you need to run `npm run build-data` and likely rebuild the database.

## Hosting schema

Now we will create a new folder named `hosting` inside at `schema/hosting` and add a new `index.json` file that will be the entry point for our module:

```json
{
    "type": "module",
    "children": [
        "unit"
    ],
    "searchable": true
}
```

Pretty self explanatory, now we want to add an `unit.json` file which will define what a hosting unit is about

```json
{
    "type": "item",
    "properties": [
        {
            "id": "title",
            "type": "text"
        },
        {
            "id": "description",
            "type": "text",
            "subtype": "html",
            "specialProperties": {
                "mediaProperty": "attachments",
                "supportsImages": true,
                "supportsVideos": true,
                "supportsFiles": false,
                "supportsContainers": false,
                "supportsCustom": false,
                "supportsExternalLinks": false,
                "supportsLinks": false,
                "supportsQuote": false,
                "supportsRichClasses": false,
                "supportsTitle": true,
                "supportsCustomStyles": false,
                "supportsTemplating": false,
                "supportsLists": false
            }
        },
        {
            "id": "attachments",
            "type": "files",
            "specialProperties": {
                "smallDimension": "320x",
                "mediumDimension": "640x",
                "largeDimension": "1024x"
            },
            "hidden": true,
            "nullable": true
        },
        {
            "id": "image",
            "type": "file",
            "specialProperties": {
                "imageUploader": true,
                "smallDimension": "128x",
                "mediumDimension": "256x",
                "largeDimension": "512x"
            }
        },
        {
            "id": "address",
            "type": "location",
            "specialProperties": {
                "maxSearchRadius": 100,
                "searchRadiusInitialPrefill": 50,
                "searchRadiusUnit": "km",
                "searchRadiusImperialUnit": "mi"
            }
        },
        {
            "id": "type",
            "type": "string",
            "subtype": "exact-value",
            "values": [
                "room",
                "apartment",
                "house",
            ]
        },
        {
            "id": "booked",
            "type": "boolean"
        },
        {
            "id": "booked_by",
            "type": "string",
            "subtype": "reference",
            "nullable": true,
            "specialProperties": {
                "referencedModule": "users",
                "referencedItemDefinition": "user",
                "referencedSearchProperty": "username",
                "referencedDisplayProperty": "username",
                "referencedFilteringPropertySet": {
                    "role": {
                        "exactValue": "USER"
                    }
                }
            },
            "readRoleAccess": ["&OWNER"],
            "editRoleAccess": []
        }
    ]
}
```

Here we are giving all our units a title, description (and the attachments property has been linked to) an image, and an address; also utility properties.