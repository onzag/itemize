export default `/**
* This file contains configuration for your itemize build
* that is used both in server and client side, this file's output
* is supposed to be serializable into JSON
* 
* This configuration is itemize specific and gets injected, you
* don't need to specify anything and itemize will use its defaults
*/
module.exports = {
    /**
     * Itemize contains constants that are used to setup how its internals
     * works, this section allows to override some of these constants, some
     * are not exposed as they are of no use for it
     * 
     * Here are the possible fields
     * 
     * MAX_SUPPORTED_YEAR
     *   The maximum supported year for the year field
     *   Defaults to year 3000
     * 
     * MAX_STRING_LENGTH
     *   The maximum size a string type can have
     *   Defaults to 10000 characters
     * 
     * MAX_RAW_TEXT_LENGTH
     *   The maximum size for rich text types, in characters
     *   Defaults to 100000 characters
     *   It's better if you specify a maxLenght for these rich texts as
     *   This acts more as a security check
     * 
     * MAX_FILE_SIZE
     *   The maximum file size in bytes
     *   Defaults to 5000000 bytes or 5MB
     * 
     * MAX_FILES_PER_PROPERTY
     *   How many files a property of type file might have tops
     *   Defaults to 25
     * 
     * MAX_FILES_PER_REQUEST
     *   How many files a request might have maximum total
     *   This is a soft check and is used to build a total maximum
     *   tolerance on byte size of the files that are added, which means
     *   it multiplies the file size by this number and that's the limit
     * 
     * MAX_FIELD_SIZE
     *   The maximum size in bytes of a graphql request, the text portion
     *   only
     * 
     * MAX_SEARCH_RESULTS_DEFAULT
     *   The default amount of search results you are able to retrieve
     *   when performing a search, defaults to 50
     *   Most modules will have an idependent value for this and it's recommended
     *   to do it that way rather than the global config
     * 
     * MAX_SEARCH_RECORDS_DEFAULT
     *   The default amount of records you are able to retrieve when performing
     *   a search, defaults to 200
     *   Most modules will have an idependent value for this and it's recommended
     *   to do it that way rather than the global config
     * 
     * MAX_SEARCH_FIELD_LENGTH
     *   The maximum size in characters of the search field functionality, that is
     *   how long the search query can be
     *   Defaults to 1000
     * 
     * SERVER_DATA_MIN_UPDATE_TIME
     *   The minimum amount of time the server data should update, this is basically
     *   currency factor information
     *   This is a number in milliseconds
     *   Defaults to 259200000 or 3 days
     * 
     * SERVER_MAPPING_TIME
     *   The time cycle it takes for the server to refresh and add new sitemaps
     *   This is a number in milliseconds
     *   Defaults to 86400000 or 1 day
     * 
     * MAX_REMOTE_LISTENERS_PER_SOCKET
     *   How many listeners can be added per socket
     *   This specifies the number of items and search the client can keep track of at once
     *   Defaults to 100
     */
    constants: {

    },

    /**
     * This section contains the primary and custom services for itemize to run
     * and basically is what you use to setup plugins and whatever does not fit
     * the standard itemize as well as to install third party services
     * 
     * Check the documentation to see how to install a given service as well
     * as how to setup a custom service
     */
    services: {

    },
}`;