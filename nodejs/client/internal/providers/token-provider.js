"use strict";
/**
 * The token provider component
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const gql_querier_1 = require("../../../gql-querier");
const constants_1 = require("../../../constants");
const cache_1 = __importDefault(require("../workers/cache"));
const deep_equal_1 = __importDefault(require("deep-equal"));
const ssr_provider_1 = require("./ssr-provider");
const __1 = require("../..");
/**
 * The token context contains the current token state as well as several
 * functions, it should sit inside the application and over the main
 * component
 */
exports.TokenContext = react_1.default.createContext(null);
/**
 * The token provider that creates the token context
 * @param props the props for the token provider
 * @returns a react element
 */
function TokenProvider(props) {
    return (react_1.default.createElement(ssr_provider_1.SSRContext.Consumer, null, (ssrContext) => (react_1.default.createElement(ActualTokenProvider, Object.assign({ ssrContext: ssrContext }, props)))));
}
exports.TokenProvider = TokenProvider;
/**
 * The actual token provider class that actually performs the token
 * management logic
 */
class ActualTokenProvider extends react_1.default.Component {
    constructor(props) {
        super(props);
        // so we start to build our initial state by default
        const initialState = {
            // we have no token, no id, and we are just a GUEST,
            token: null,
            id: null,
            role: constants_1.GUEST_METAROLE,
            isLoggingIn: false,
            isReady: false,
            error: null,
        };
        // now login is done by the actual token provider if it deems
        // necessary when it mounts, but by default it will be a guest
        // and non ready, so the main component that sits under it
        // won't render at all
        // but if we are in the ssr 
        if (props.ssrContext) {
            // then we can set the token from it
            initialState.token = props.ssrContext.user.token || null;
            // and if it specifies the IN_COOKIE for the token
            // which means read from the cookie, for security reasons
            if (initialState.token === "IN_COOKIE") {
                // then we do so
                initialState.token = __1.getCookie("token");
            }
            // now we set the id, role, and we say that we are indeed ready
            // the ssr info means that the server has validated all this
            // so we don't even need to recheck
            initialState.id = props.ssrContext.user.id || null;
            initialState.role = props.ssrContext.user.role || constants_1.GUEST_METAROLE;
            initialState.isReady = true;
        }
        // set the initial state
        this.state = initialState;
        // bind the functions
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.dismissError = this.dismissError.bind(this);
    }
    componentDidMount() {
        // happens if SSR happened, it has already
        // been validated by the server side render service
        if (this.state.isReady) {
            // so we go and call the function for the state being set with our
            // logout function
            this.props.onProviderStateSet(this.state, this.logout);
            return;
        }
        // now we are going to the non-SSR route
        // we get our stored token
        const storedToken = __1.getCookie("token");
        // if we got one of those
        if (storedToken !== null) {
            // we call the login functionality
            this.login(null, null, storedToken, true);
            // otherwise with no stored token
            // aka no user logged in
        }
        else {
            // since the guest is our default, we just make ourselves ready
            const newState = {
                ...this.state,
                isReady: true,
            };
            // we call the function for the provider state set
            // since login which would call it, is not in use
            this.props.onProviderStateSet(newState, this.logout);
            // and then we set the state here
            this.setState(newState);
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        // we only want to upate if these two differ, the ssrContext is static anyway
        return !deep_equal_1.default(this.state, nextState) ||
            nextProps.localeContext !== this.props.localeContext;
    }
    /**
     * The login function in the token provider
     * @param username the username (can also be an email)
     * @param password the password to validate with
     * @param token an alternative token, login with a token rather than the username and password combo,
     * for that make both username an password null and set this one
     * @param doNotShowLoginError avoid showing the login error, basically it won't set the state to error
     * it'd fail silently, this is useful for the initial login, where if we were logged out somehow, we
     * just fail silently and appear not logged in
     * @retuns a promise with the id, role and an error
     */
    async login(username, password, token, doNotShowLoginError) {
        // if we are already logging in
        if (this.state.isLoggingIn) {
            console.warn("Tried to login while logging in");
            return null;
        }
        // now we are logging in
        this.setState({
            isLoggingIn: true,
        });
        // we do the token request
        const data = await gql_querier_1.gqlQuery(gql_querier_1.buildGqlQuery({
            name: "token",
            args: {
                username,
                password,
                token,
            },
            fields: {
                id: {},
                role: {},
                token: {},
            },
        }));
        // and get the error
        const error = data.errors ? data.errors[0].extensions : null;
        // maybe it's offline, in which case we don't want to make the user
        // seem as logged out as that would break the flow
        const isOffline = error && error.code === constants_1.ENDPOINT_ERRORS.CANT_CONNECT;
        // so we need to set these
        let tokenDataId = null;
        let tokenDataRole = null;
        let tokenDataToken = null;
        // if we are not offline
        if (!isOffline) {
            // then let's get the token data our server has given us
            const tokenData = data.data && data.data.token;
            // as well as these
            tokenDataId = tokenData ? tokenData.id : null;
            tokenDataRole = tokenData ? tokenData.role : constants_1.GUEST_METAROLE;
            tokenDataToken = tokenData ? tokenData.token : null;
            // so if we got the token, and assumingly an id and role; aka
            // we are not guests
            if (tokenDataToken !== null) {
                // we set them
                document.cookie = "token=" + tokenDataToken + ";path=/";
                document.cookie = "role=" + tokenDataRole + ";path=/";
                document.cookie = "id=" + tokenDataId + ";path=/";
            }
            else {
                // otherwise we want to remove these cookies
                document.cookie = "token=;expires=Thu, 01-Jan-1970 00:00:01 GMT;path=/";
                document.cookie = "role=;expires=Thu, 01-Jan-1970 00:00:01 GMT;path=/";
                document.cookie = "id=;expires=Thu, 01-Jan-1970 00:00:01 GMT;path=/";
            }
        }
        else {
            // otherwise if we are offline, we are going to trust our cookies
            // for the result
            tokenDataId = parseInt(__1.getCookie("id")) || null;
            tokenDataRole = __1.getCookie("role") || constants_1.GUEST_METAROLE;
            tokenDataToken = __1.getCookie("token");
        }
        // now this will be our new state
        const newState = {
            isLoggingIn: false,
            id: tokenDataId,
            token: tokenDataToken,
            role: tokenDataRole,
            isReady: true,
            // when it's not ready and the login is automatic
            // we might want to ignore errors, user just got
            // logged off automatically, likely his token expired
            // otherwise errors might appear in off places
            error: !doNotShowLoginError ? error : null,
        };
        // we show these logged information
        if (tokenDataToken !== null) {
            console.log("user", tokenDataId, tokenDataRole, "logged in");
        }
        else {
            // but if we have no token, not even in offline mode, aka, we have been
            // logged out at some point, we need to destroy the logged in information
            // from the destruction markers
            console.log("credentials deemed invalid", error);
            this.cleanAndDestroyLoggedData();
        }
        // so now we call the provider state set function
        this.props.onProviderStateSet(newState, this.logout);
        // and then set the state
        this.setState(newState);
        // and that what we did was enough for
        // all, however, now we need to get our localization custom
        // user information to update the UI, so if we got an user
        if (tokenDataId) {
            // we need to get these fields
            const fields = {
                DATA: {
                    app_country: {},
                    app_language: {},
                    app_currency: {},
                },
                last_modified: {},
            };
            const cachedData = {
                app_country: null,
                app_currency: null,
                app_language: null,
            };
            // so if we got a cache, we will give it a go first, regardless
            // this should work in offline mode too
            if (cache_1.default.isSupported) {
                // we get the cached value for this query
                const cachedValue = await cache_1.default.instance.getCachedValue("GET_MOD_users__IDEF_user", tokenDataId, null, fields);
                // and if we got one, we will update
                if (cachedValue && cachedValue.value && cachedValue.value.DATA) {
                    // first saved the cachedData we got
                    cachedData.app_country = cachedValue.value.DATA.app_country;
                    cachedData.app_currency = cachedValue.value.DATA.app_currency;
                    cachedData.app_language = cachedValue.value.DATA.app_language;
                    console.log("cached user locale is", cachedData);
                    // and then we will update if deemed necessary
                    if (this.props.localeContext.country !== cachedData.app_country) {
                        this.props.localeContext.changeCountryTo(cachedData.app_country, true, true);
                    }
                    if (this.props.localeContext.language !== cachedData.app_language) {
                        this.props.localeContext.changeLanguageTo(cachedData.app_language, true);
                    }
                    if (this.props.localeContext.currency !== cachedData.app_currency) {
                        this.props.localeContext.changeCurrencyTo(cachedData.app_currency, true);
                    }
                }
            }
            // now if we are not offline we can actually
            // do this one and actually request the server for info
            if (!isOffline) {
                // we build the grapqhl query for it and run it raw
                const userLanguageData = await gql_querier_1.gqlQuery(gql_querier_1.buildGqlQuery({
                    name: "GET_MOD_users__IDEF_user",
                    args: {
                        token: tokenDataToken,
                        language: this.props.localeContext.language.split("-")[0],
                        id: tokenDataId,
                    },
                    fields,
                }));
                // now if the request actually succeeded
                if (userLanguageData && userLanguageData.data && userLanguageData.data.GET_MOD_users__IDEF_user) {
                    const localeUserData = userLanguageData.data.GET_MOD_users__IDEF_user.DATA;
                    // we still check everything just in case the user is blocked
                    if (localeUserData) {
                        console.log("user locale is", localeUserData);
                        // and now we can try to update if anything
                        if (localeUserData.app_country !== cachedData.app_country &&
                            this.props.localeContext.country !== localeUserData.app_country) {
                            this.props.localeContext.changeCountryTo(localeUserData.app_country, true, true);
                        }
                        if (localeUserData.app_language !== cachedData.app_language &&
                            this.props.localeContext.language !== localeUserData.app_language) {
                            this.props.localeContext.changeLanguageTo(localeUserData.app_language, true);
                        }
                        if (localeUserData.app_currency !== cachedData.app_currency &&
                            this.props.localeContext.currency !== localeUserData.app_currency) {
                            this.props.localeContext.changeCurrencyTo(localeUserData.app_currency, true);
                        }
                    }
                    // and if our cache is supported
                    if (cache_1.default.isSupported) {
                        // we do merge the thing if possible
                        const newCachedValue = userLanguageData.data.GET_MOD_users__IDEF_user;
                        cache_1.default.instance.mergeCachedValue("GET_MOD_users__IDEF_user", tokenDataId, null, newCachedValue, fields);
                    }
                }
            }
        }
        // and now we return the info about this
        return {
            id: tokenDataId || null,
            role: tokenDataRole || constants_1.GUEST_METAROLE,
            error: error || null,
        };
    }
    /**
     * Cleans all the destruction markers
     */
    cleanAndDestroyLoggedData() {
        // removing the user data
        document.cookie = "token=;expires=Thu, 01-Jan-1970 00:00:01 GMT;path=/";
        document.cookie = "role=;expires=Thu, 01-Jan-1970 00:00:01 GMT;path=/";
        document.cookie = "id=;expires=Thu, 01-Jan-1970 00:00:01 GMT;path=/";
        // gathering the destruction markers
        const destructionMarkers = 
        // if we have memcached them, pick those
        window[constants_1.MEMCACHED_DESTRUCTION_MARKERS_LOCATION] ||
            // otherwise get them from local storage
            JSON.parse(localStorage.getItem(constants_1.DESTRUCTION_MARKERS_LOCATION) || "{}");
        // clean them from the memory cache to match local storage
        window[constants_1.MEMCACHED_DESTRUCTION_MARKERS_LOCATION] = {};
        // as we delete from local storage as well
        localStorage.removeItem(constants_1.DESTRUCTION_MARKERS_LOCATION);
        // now we loop over the destruction markers
        Object.keys(destructionMarkers).forEach((qualifiedPathName) => {
            destructionMarkers[qualifiedPathName].forEach((marker) => {
                // and delete everything within it
                cache_1.default.instance.deleteCachedValue(constants_1.PREFIX_GET + qualifiedPathName, marker[0], marker[1]);
            });
        });
    }
    /**
     * Performs the logout process
     */
    logout() {
        if (this.state.isLoggingIn) {
            console.warn("Tried to logout while logging in");
            return;
        }
        this.cleanAndDestroyLoggedData();
        // now we update the state
        this.setState({
            id: null,
            token: null,
            role: constants_1.GUEST_METAROLE,
        });
    }
    /**
     * Removes the current login error
     */
    dismissError() {
        this.setState({
            error: null,
        });
    }
    /**
     * Render function
     */
    render() {
        if (!this.state.isReady) {
            return null;
        }
        return (react_1.default.createElement(exports.TokenContext.Provider, { value: {
                ...this.state,
                login: this.login,
                logout: this.logout,
                dismissError: this.dismissError,
            } }, this.props.children));
    }
}
