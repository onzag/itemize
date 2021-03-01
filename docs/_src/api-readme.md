/ [Exports](modules.md)

# API Documentation

This is the API documentation for itemize, it is built from the source using typedoc and contains everything that is accessible within, some features are not as important as others concerning development but they are anyway summarized here.

Server and Client are the most important for development.

## Base

Represents the base core of the itemize application

### Core Elements

- [Root](modules/base_root.md)
    * [gql](modules/base_root_gql.md)
    * [schema](modules/base_root_schema.md)
    * [sql](modules/base_root_sql.md)
- [Module](modules/base_root_module.md)
    * [gql](modules/base_root_module_gql.md)
    * [schema](modules/base_root_module_schema.md)
    * [search-mode](modules/base_root_module_search_mode.md)
    * [sql](modules/base_root_module_sql.md)
- [ItemDefinition](modules/base_root_module_itemdefinition.md)
    * [gql](modules/base_root_module_itemdefinition_gql.md)
    * [schema](modules/base_root_module_itemdefinition_schema.md)
    * [search-mode](modules/base_root_module_itemdefinition_search_mode.md)
    * [sql](modules/base_root_module_itemdefinition_sql.md)
- [PropertyDefinition](modules/base_root_module_itemdefinition_propertydefinition.md)
    * [gql](modules/base_root_module_itemdefinition_propertydefinition_gql.md)
    * [local-search](modules/base_root_module_itemdefinition_propertydefinition_local_search.md)
    * [local-sql](modules/base_root_module_itemdefinition_propertydefinition_local_sql.md)
    * [schema](modules/base_root_module_itemdefinition_propertydefinition_schema.md)
    * [search-interfaces](modules/base_root_module_itemdefinition_propertydefinition_search_interfaces.md)
    * [search-mode](modules/base_root_module_itemdefinition_propertydefinition_search_mode.md)
    * [server-checkers](modules/base_root_module_itemdefinition_propertydefinition_server_checkers.md)
    * [sql](modules/base_root_module_itemdefinition_propertydefinition_sql.md)
        * [currency](modules/base_root_module_itemdefinition_propertydefinition_sql_currency.md)
        * [file-management](modules/base_root_module_itemdefinition_propertydefinition_sql_file_management.md)
        * [image-conversions](modules/base_root_module_itemdefinition_propertydefinition_sql_image_conversions.md)
        * [location](modules/base_root_module_itemdefinition_propertydefinition_sql_location.md)
        * [password](modules/base_root_module_itemdefinition_propertydefinition_sql_password.md)
        * [string](modules/base_root_module_itemdefinition_propertydefinition_sql_string.md)
        * [text](modules/base_root_module_itemdefinition_propertydefinition_sql_text.md)
        * [unit](modules/base_root_module_itemdefinition_propertydefinition_sql_unit.md)
    * [types](modules/base_root_module_itemdefinition_propertydefinition_types.md)
        * [boolean](modules/base_root_module_itemdefinition_propertydefinition_types_boolean.md)
        * [currency](modules/base_root_module_itemdefinition_propertydefinition_types_currency.md)
        * [date](modules/base_root_module_itemdefinition_propertydefinition_types_date.md)
        * [datetime](modules/base_root_module_itemdefinition_propertydefinition_types_datetime.md)
        * [file](modules/base_root_module_itemdefinition_propertydefinition_types_file.md)
        * [files](modules/base_root_module_itemdefinition_propertydefinition_types_files.md)
        * [integer](modules/base_root_module_itemdefinition_propertydefinition_types_integer.md)
        * [location](modules/base_root_module_itemdefinition_propertydefinition_types_location.md)
        * [number](modules/base_root_module_itemdefinition_propertydefinition_types_number.md)
        * [password](modules/base_root_module_itemdefinition_propertydefinition_types_password.md)
        * [string](modules/base_root_module_itemdefinition_propertydefinition_types_string.md)
        * [text](modules/base_root_module_itemdefinition_propertydefinition_types_text.md)
        * [time](modules/base_root_module_itemdefinition_propertydefinition_types_time.md)
        * [unit](modules/base_root_module_itemdefinition_propertydefinition_types_unit.md)
        * [year](modules/base_root_module_itemdefinition_propertydefinition_types_year.md)
- [Include](modules/base_root_module_itemdefinition_include.md)
    * [gql](modules/base_root_module_itemdefinition_include_gql.md)
    * [schema](modules/base_root_module_itemdefinition_include_schema.md)
    * [sql](modules/base_root_module_itemdefinition_include_sql.md)

### Misc

- [ConditionalRuleSet](modules/base_root_module_itemdefinition_conditionalruleset.md)
    * [schema](modules/base_root_module_itemdefinition_conditionalruleset_schema.md)
    * [search-mode](modules/base_root_module_itemdefinition_conditionalruleset_search_mode.md)
- [PropertiesValueMappingDefiniton](modules/base_root_module_itemdefinition_propertiesvaluemappingdefiniton.md)
    * [schema](modules/base_root_module_itemdefinition_propertiesvaluemappingdefiniton_schema.md)
- [errors](modules/base_errors.md)
- [remote-protocol](modules/base_remote_protocol.md)

## Server

The server section contains utilities and the core code that is used to generate the extended instance, the cluster manager, and the global manager; they all come from the source code that belongs to this section.

Any action related to modifying the server behaviour, custom rest endpoints, creating and defining custom services to be executed in our server is specified in these parts of the API.

### Core Files

- [server](modules/server.md)
- [global-manager](modules/server_global_manager.md)
- [initialize](modules/server_initialize.md)
- [redis](modules/server_redis.md)
- [listener](modules/server_listener.md)
- [rest](modules/server_rest.md)
- [rootpool](modules/server_rootpool.md)
- [resolvers](modules/server_resolvers.md)
    * [add](modules/server_resolvers_actions_add.md)
    * [delete](modules/server_resolvers_actions_delete.md)
    * [edit](modules/server_resolvers_actions_edit.md)
    * [get](modules/server_resolvers_actions_get.md)
    * [search](modules/server_resolvers_actions_search.md)
    * [basic](modules/server_resolvers_basic.md)
    * [roles](modules/server_resolvers_roles.md)
    * [triggers](modules/server_resolvers_triggers.md)

### Retrieve/Modify Information from Database/Cache.

- [cache](modules/server_cache.md)
- [raw-db](modules/server_raw_db.md)

### Services

- [services](modules/server_services.md)
    * [CurrencyFactorsProvider](modules/server_services_base_currencyfactorsprovider.md)
    * [LocationSearchProvider](modules/server_services_base_locationsearchprovider.md)
    * [MailProvider](modules/server_services_base_mailprovider.md)
    * [StorageProvider](modules/server_services_base_storageprovider.md)
    * [UserLocalizationProvider](modules/server_services_base_userlocalizationprovider.md)
    * [currency-layer](modules/server_services_currency_layer.md)
    * [fake-mail](modules/server_services_fake_mail.md)
    * [here](modules/server_services_here.md)
    * [ipstack](modules/server_services_ipstack.md)
    * [local-storage](modules/server_services_local_storage.md)
    * [mailgun](modules/server_services_mailgun.md)
    * [openstack](modules/server_services_openstack.md)
    * [registry](modules/server_services_registry.md)

### Custom Graphql

- [custom-graphql](modules/server_custom_graphql.md)
    * [graphql-standard-reply-object](modules/server_custom_graphql_graphql_standard_reply_object.md)
    * [custom-graphql/graphql-token-object](modules/server_custom_graphql_graphql_token_object.md)

### SEO

- [seo](modules/server_seo.md)
    * [generator](modules/server_seo_generator.md)
    * [sitemaps](modules/server_seo_sitemaps.md)

### SSR

- [ssr](modules/server_ssr.md)
    * [collect](modules/server_ssr_collect.md)
    * [generator](modules/server_ssr_generator.md)
    * [token](modules/server_token.md)

### Misc

- [mode](modules/server_mode.md)
- [user mutations](modules/server_user_mutations.md)
- [user queries](modules/server_user_queries.md)
- [user rest](modules/server_user_rest.md)
- [user triggers](modules/server_user_triggers.md)
- [version-null-value](modules/server_version_null_value.md)

## Client

Represents the code that is used primarily in the client side.

### Core Elements

- [client](modules/client.md)

### React Components

#### Item

- [DeleteActioner](modules/client_components_item_deleteactioner.md)
- [DifferingIncludesRetriever](modules/client_components_item_differingincludesretriever.md)
- [DifferingPropertiesRetriever](modules/client_components_item_differingpropertiesretriever.md)
- [IdVersionRetriever](modules/client_components_item_idversionretriever.md)
- [ItemLoader](modules/client_components_item_itemloader.md)
- [PokeActioner](modules/client_components_item_pokeactioner.md)
- [PokeButtonActioner](modules/client_components_item_pokebuttonactioner.md)
- [SubmitActioner](modules/client_components_item_submitactioner.md)

#### Localization

- [localization](modules/client_components_localization.md)
- [AppCountryRetriever](modules/client_components_localization_appcountryretriever.md)
- [AppCurrencyRetriever](modules/client_components_localization_appcurrencyretriever.md)
- [AppLanguageRetriever](modules/client_components_localization_applanguageretriever.md)
- [I18nRead](modules/client_components_localization_i18nread.md)
- [I18nReadError](modules/client_components_localization_i18nreaderror.md)
- [I18nReadMany](modules/client_components_localization_i18nreadmany.md)

#### Login

- [IfLogStatus](modules/client_components_login_iflogstatus.md)
- [LogActioner](modules/client_components_login_logactioner.md)

#### Navigation

- [navigation](modules/client_components_navigation.md)
- [Link](modules/client_components_navigation_link.md)
- [LocationReader](modules/client_components_navigation_locationreader.md)
- [LocationRetriever](modules/client_components_navigation_locationretriever.md)
- [LocationStateReader](modules/client_components_navigation_locationstatereader.md)
- [NeedsSubmitPrompt](modules/client_components_navigation_needssubmitprompt.md)
- [Prompt](modules/client_components_navigation_prompt.md)
- [Redirect](modules/client_components_navigation_redirect.md)
- [Route](modules/client_components_navigation_route.md)

#### Offline Status Information

- [OfflineStatusRetriever](modules/client_components_offline_offlinestatusretriever.md)

#### Outdated Status Information

- [AppIsBlockedFromUpdate](modules/client_components_outdated_appisblockedfromupdate.md)
- [AppIsOutdatedChecker](modules/client_components_outdated_appisoutdatedchecker.md)

#### Property IO

- [Entry](modules/client_components_property_entry.md)
- [Reader](modules/client_components_property_reader.md)
- [Setter](modules/client_components_property_setter.md)
- [View](modules/client_components_property_view.md)
- [base](modules/client_components_property_base.md)

#### Resource Management

- [HTMLResourceLoader](modules/client_components_resources_htmlresourceloader.md)

#### Root Information

- [RootRetriever](modules/client_components_root_rootretriever.md)

#### Search

- [PagedSearchLoader](modules/client_components_search_pagedsearchloader.md)
- [SearchActioner](modules/client_components_search_searchactioner.md)
- [SearchLoader](modules/client_components_search_searchloader.md)

#### User Information

- [CustomUser](modules/client_components_user_customuser.md)
- [UserActioner](modules/client_components_user_useractioner.md)
- [UserDataRetriever](modules/client_components_user_userdataretriever.md)

#### Util

- [util](modules/client_components_util.md)
- [DescriptionSetter](modules/client_components_util_descriptionsetter.md)
- [NoSSR](modules/client_components_util_nossr.md)
- [OgImageSetter](modules/client_components_util_ogimagesetter.md)
- [ReadManyVar](modules/client_components_util_readmanyvar.md)
- [ReadVar](modules/client_components_util_readvar.md)
- [ScrollKeeper](modules/client_components_util_scrollkeeper.md)
- [SetVar](modules/client_components_util_setvar.md)
- [TitleReader](modules/client_components_util_titlereader.md)
- [TitleSetter](modules/client_components_util_titlesetter.md)

### Fast Prototyping

#### Misc

- [collectors](modules/client_fast_prototyping_collectors.md)

#### Fast Prototyping React Components

- [avatar](modules/client_fast_prototyping_components_avatar.md)
- [buttons](modules/client_fast_prototyping_components_buttons.md)
- [country-picker](modules/client_fast_prototyping_components_country_picker.md)
- [currency-picker](modules/client_fast_prototyping_components_currency_picker.md)
- [dialog](modules/client_fast_prototyping_components_dialog.md)
- [fragment-loader](modules/client_fast_prototyping_components_fragment_loader.md)
- [item-loader](modules/client_fast_prototyping_components_item_loader.md)
- [language-picker](modules/client_fast_prototyping_components_language_picker.md)
- [navbar](modules/client_fast_prototyping_components_navbar.md)
    * [blocking-backdrop](modules/client_fast_prototyping_components_navbar_blocking_backdrop.md)
    * [buttons](modules/client_fast_prototyping_components_navbar_buttons.md)
    * [external-dialogs](modules/client_fast_prototyping_components_navbar_external_dialogs.md)
    * [menu](modules/client_fast_prototyping_components_navbar_menu.md)
    * [outdated-dialog](modules/client_fast_prototyping_components_navbar_outdated_dialog.md)
    * [outdated-text](modules/client_fast_prototyping_components_navbar_outdated_text.md)
- [needs-submit-prompt](modules/client_fast_prototyping_components_needs_submit_prompt.md)
- [search-loader-with-pagination](modules/client_fast_prototyping_components_search_loader_with_pagination.md)
- [slate](modules/client_fast_prototyping_components_slate.md)
    * [file dialog](modules/client_fast_prototyping_components_slate_dialogs_file.md)
    * [link dialog](modules/client_fast_prototyping_components_slate_dialogs_link.md)
    * [template element dialog](modules/client_fast_prototyping_components_slate_dialogs_template_element.md)
    * [video dialog](modules/client_fast_prototyping_components_slate_dialogs_video.md)
    * [drawer](modules/client_fast_prototyping_components_slate_drawer.md)
        * [actions](modules/client_fast_prototyping_components_slate_drawer_actions.md)
        * [general](modules/client_fast_prototyping_components_slate_drawer_general.md)
        * [styles](modules/client_fast_prototyping_components_slate_drawer_styles.md)
        * [templating](modules/client_fast_prototyping_components_slate_drawer_templating.md)
        * [tree](modules/client_fast_prototyping_components_slate_drawer_tree.md)
    * [wrapper](modules/client_fast_prototyping_components_slate_wrapper.md)
- [snackbar](modules/client_fast_prototyping_components_snackbar.md)
- [util](modules/client_fast_prototyping_components_util.md)

#### Material UI Core

- [mui-core](modules/client_fast_prototyping_mui_core.md)
    * [social-icons](modules/client_fast_prototyping_mui_core_social_icons.md)

#### Fast Prototyping Renderers

- [renderers](modules/client_fast_prototyping_renderers.md)
    * [PropertyEntryBoolean](modules/client_fast_prototyping_renderers_propertyentry_propertyentryboolean.md)
    * [PropertyEntryDateTime](modules/client_fast_prototyping_renderers_propertyentry_propertyentrydatetime.md)
    * [PropertyEntryField](modules/client_fast_prototyping_renderers_propertyentry_propertyentryfield.md)
    * [PropertyEntryFile](modules/client_fast_prototyping_renderers_propertyentry_propertyentryfile.md)
    * [PropertyEntryFiles](modules/client_fast_prototyping_renderers_propertyentry_propertyentryfiles.md)
    * [PropertyEntryLocation](modules/client_fast_prototyping_renderers_propertyentry_propertyentrylocation.md)
    * [PropertyEntryReference](modules/client_fast_prototyping_renderers_propertyentry_propertyentryreference.md)
    * [PropertyEntrySelect](modules/client_fast_prototyping_renderers_propertyentry_propertyentryselect.md)
    * [PropertyEntryText](modules/client_fast_prototyping_renderers_propertyentry_propertyentrytext.md)
    * [PropertyViewBoolean](modules/client_fast_prototyping_renderers_propertyview_propertyviewboolean.md)
    * [PropertyViewCurrency](modules/client_fast_prototyping_renderers_propertyview_propertyviewcurrency.md)
    * [PropertyViewDateTime](modules/client_fast_prototyping_renderers_propertyview_propertyviewdatetime.md)
    * [PropertyViewFile](modules/client_fast_prototyping_renderers_propertyview_propertyviewfile.md)
    * [PropertyViewLocation](modules/client_fast_prototyping_renderers_propertyview_propertyviewlocation.md)
    * [PropertyViewSimple](modules/client_fast_prototyping_renderers_propertyview_propertyviewsimple.md)
    * [PropertyViewText](modules/client_fast_prototyping_renderers_propertyview_propertyviewtext.md)
- [wrappers](modules/client_fast_prototyping_wrappers.md)

### Internal

- [app](modules/client_internal_app.md)
- [remote-listener](modules/client_internal_app_remote_listener.md)
- [PropertyEntry](modules/client_internal_components_propertyentry.md)
    * [PropertyEntryBoolean](modules/client_internal_components_propertyentry_propertyentryboolean.md)
    * [PropertyEntryDateTime](modules/client_internal_components_propertyentry_propertyentrydatetime.md)
    * [PropertyEntryField](modules/client_internal_components_propertyentry_propertyentryfield.md)
    * [PropertyEntryFile](modules/client_internal_components_propertyentry_propertyentryfile.md)
    * [PropertyEntryFiles](modules/client_internal_components_propertyentry_propertyentryfiles.md)
    * [PropertyEntryLocation](modules/client_internal_components_propertyentry_propertyentrylocation.md)
    * [PropertyEntryReference](modules/client_internal_components_propertyentry_propertyentryreference.md)
    * [PropertyEntrySelect](modules/client_internal_components_propertyentry_propertyentryselect.md)
    * [PropertyEntryText](modules/client_internal_components_propertyentry_propertyentrytext.md)
- [PropertySetter](modules/client_internal_components_propertysetter.md)
- [PropertyView](modules/client_internal_components_propertyview.md)
    * [PropertyViewBoolean](modules/client_internal_components_propertyview_propertyviewboolean.md)
    * [PropertyViewCurrency](modules/client_internal_components_propertyview_propertyviewcurrency.md)
    * [PropertyViewDateTime](modules/client_internal_components_propertyview_propertyviewdatetime.md)
    * [PropertyViewFile](modules/client_internal_components_propertyview_propertyviewfile.md)
    * [PropertyViewLocation](modules/client_internal_components_propertyview_propertyviewlocation.md)
    * [PropertyViewReference](modules/client_internal_components_propertyview_propertyviewreference.md)
    * [PropertyViewSimple](modules/client_internal_components_propertyview_propertyviewsimple.md)
    * [PropertyViewText](modules/client_internal_components_propertyview_propertyviewtext.md)
- [gql-client-util](modules/client_internal_gql_client_util.md)
- [polyfills](modules/client_internal_polyfills.md)
- [appdata-provider](modules/client_internal_providers_appdata_provider.md)
- [config-provider](modules/client_internal_providers_config_provider.md)
- [locale-provider](modules/client_internal_providers_locale_provider.md)
- [ssr-provider](modules/client_internal_providers_ssr_provider.md)
- [token-provider](modules/client_internal_providers_token_provider.md)
- [renderer](modules/client_internal_renderer.md)
- [testing](modules/client_internal_testing.md)
- [text](modules/client_internal_text.md)
    * [serializer](modules/client_internal_text_serializer.md)
        * [base](modules/client_internal_text_serializer_base.md)
        * [dynamic-component](modules/client_internal_text_serializer_dynamic_component.md)
        * [template-args](modules/client_internal_text_serializer_template_args.md)
        * [container](modules/client_internal_text_serializer_types_container.md)
        * [custom](modules/client_internal_text_serializer_types_custom.md)
        * [file](modules/client_internal_text_serializer_types_file.md)
        * [image](modules/client_internal_text_serializer_types_image.md)
        * [inline](modules/client_internal_text_serializer_types_inline.md)
        * [link](modules/client_internal_text_serializer_types_link.md)
        * [list](modules/client_internal_text_serializer_types_list.md)
        * [list-item](modules/client_internal_text_serializer_types_list_item.md)
        * [paragraph](modules/client_internal_text_serializer_types_paragraph.md)
        * [quote](modules/client_internal_text_serializer_types_quote.md)
        * [text](modules/client_internal_text_serializer_types_text.md)
        * [title](modules/client_internal_text_serializer_types_title.md)
        * [video](modules/client_internal_text_serializer_types_video.md)
- [cache](modules/client_internal_workers_cache.md)
- [cache.worker](modules/client_internal_workers_cache_cache_worker.md)
- [cache.worker.search](modules/client_internal_workers_cache_cache_worker_search.md)
- [service](modules/client_internal_workers_service.md)
- [service.worker](modules/client_internal_workers_service_service_worker.md)

### Providers

- [include](modules/client_providers_include.md)
- [item](modules/client_providers_item.md)
- [module](modules/client_providers_module.md)
- [renderer](modules/client_providers_renderer.md)

## Database

- [database](modules/database.md)
- [base](modules/database_base.md)
- [AlterTableBuilder](modules/database_altertablebuilder.md)
- [CreateTableBuilder](modules/database_createtablebuilder.md)
- [FromBuilder](modules/database_frombuilder.md)
- [GroupByBuilder](modules/database_groupbybuilder.md)
- [HavingBuilder](modules/database_havingbuilder.md)
- [InsertBuilder](modules/database_insertbuilder.md)
- [JoinBuilder](modules/database_joinbuilder.md)
- [OrderByBuilder](modules/database_orderbybuilder.md)
- [RawBuilder](modules/database_rawbuilder.md)
- [ReturningBuilder](modules/database_returningbuilder.md)
- [SelectBuilder](modules/database_selectbuilder.md)
- [SetBuilder](modules/database_setbuilder.md)
- [UpdateBuilder](modules/database_updatebuilder.md)
- [WhereBuilder](modules/database_wherebuilder.md)
- [WithBuilder](modules/database_withbuilder.md)