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

Pretty self explanatory, now we want to add an `unit.json` file which will define what a hosting unit is about, first let's define an empty schema for the unit we plan to give hosting

```json
{
    "type": "item",
    "properties": [
    ]
}
```

Now lets start adding properties, one of the things we need is a title so we add such, we will define it as a simple text entry, without any other special properties


```json
{
    "type": "item",
    "properties": [
        {
            "id": "title",
            "type": "text"
        }
    ]
}
```

The next step is to add a description that we can add to the property

```json
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
}
```

Note how we define such as rich text, and define what capabilities the description will have, however, we are also supporting media, images in this case can be attached, but there's no media property currently, so we need to add such as it is where images will be attached for the rich text property

```json
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
}
```

The special required properties, small/medium/large dimension are used to define image conversion values; images are resized (if they are larger than) and converted into jpg for the given values; 1024x represents for example the width of the image, as it will be resized based on width, x768 is also valid, as well as 1024x768; they are all valid sizes, but in order to keep aspect ratio, only one is given

However a single specific image is also required, notice how the type of the attachments is plural "files" but the type of a single image is "file" singular.

```json
{
    "id": "image",
    "type": "file",
    "specialProperties": {
        "imageUploader": true,
        "smallDimension": "128x",
        "mediumDimension": "256x",
        "largeDimension": "512x"
    }
}
```

In this case it is explicitly specified to expect an image uploader, as in images as the content type.

The next thing we need is a way for define address, luckily itemize comes with support for geographical attributes which uses postgis under the hood, the type in question is named "location"

```json
{
    "id": "address",
    "type": "location",
    "specialProperties": {
        "maxSearchRadius": 100,
        "searchRadiusInitialPrefill": 50,
        "searchRadiusUnit": "km",
        "searchRadiusImperialUnit": "mi"
    }
}
```

The special properties in these scenario are the maximum search radius, which is going to be 100km as the radius unit is km; an alternate unit is used which in this case is miles; which will be used when itemize detects a country that uses miles (basically just USA), the max limit will still be the 100km or 62.13mi.

Now we want to be able to define the type of our unit, for such will use a simple string, the difference between string and text is that text is made with full text search support in mind, whereas string are made for short simple values, that are searched either partially or by exact values, in this case, exact value is used.

```json
{
    "id": "type",
    "type": "string",
    "subtype": "exact-value",
    "values": [
        "room",
        "apartment",
        "house"
    ]
}
```

Now we need some special properties to define our booking status first we add a booked property

```json
{
    "id": "booked",
    "type": "boolean"
}
```

It's a simple boolean that specifies whether the current unit is booked however having the unit booked is not enough, we want to also be able to tell whom has it booked, for that we use the very powerful reference.

```json
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
```

This last one we will use for this and it's special, for once it's a string but the subtype is reference, reference is one of the most powerful subtypes in itemize, given ids are strings, a reference subtype means that 'this is the id of another item'; and with the special properties we define that the module is going to be users, item is going to be a user, and we want to search and display by username; also we are filtering and only enabling users with the role of USER.

Note that references are not checked, and it's possible to put an arbitrary string value in the booked_by value if the permissions are valid.

Because we don't want our unit owner to be able to put any user they want here, we will make the field readOnly by the owner of the unit, and none else will be able to read it (by default everything is public), also we will disable editing, none can edit this field (we will take care of bookings later).

## Building the Schema

After adding the module to our root tree as such

```json
{
  "type": "root",
  "children": [
    "users",
    "cms",
    "hosting"
  ],
  "i18n": "main-i18n.properties"
}
```

You should then rebuild using `npm run build-data` however, it will fail, that's because we have missing our schema properties in the languages we support.

