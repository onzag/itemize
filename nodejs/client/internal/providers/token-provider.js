"use strict";
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
exports.TokenContext = react_1.default.createContext(null);
function TokenProvider(props) {
    return (react_1.default.createElement(ssr_provider_1.SSRContext.Consumer, null, (ssrContext) => (react_1.default.createElement(ActualTokenProvider, Object.assign({ ssrContext: ssrContext }, props)))));
}
exports.TokenProvider = TokenProvider;
class ActualTokenProvider extends react_1.default.Component {
    constructor(props) {
        super(props);
        const initialState = {
            token: null,
            id: null,
            role: constants_1.GUEST_METAROLE,
            isLoggingIn: false,
            isReady: false,
            error: null,
        };
        if (props.ssrContext) {
            initialState.token = props.ssrContext.user.token || null;
            initialState.id = props.ssrContext.user.id || null;
            initialState.role = props.ssrContext.user.role || constants_1.GUEST_METAROLE;
            initialState.isReady = true;
        }
        this.state = initialState;
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.dismissError = this.dismissError.bind(this);
    }
    shouldComponentUpdate(nextProps, nextState) {
        return !deep_equal_1.default(this.state, nextState) ||
            nextProps.localeContext !== this.props.localeContext;
    }
    componentDidMount() {
        // happens if SSR happened, it has already
        // been validated by the server side render service
        // sometimes this doesn't happen nevertheless
        if (this.state.isReady) {
            this.props.onProviderStateSet(this.state, this.logout);
            return;
        }
        const storedToken = localStorage.getItem("token");
        if (storedToken !== null) {
            this.login(null, null, storedToken, true);
        }
        else {
            const newState = {
                ...this.state,
                isReady: true,
            };
            this.props.onProviderStateSet(newState, this.logout);
            this.setState(newState);
        }
    }
    async login(username, password, token, doNotShowLoginError) {
        if (this.state.isLoggingIn) {
            console.warn("Tried to login while logging in");
            return null;
        }
        this.setState({
            isLoggingIn: true,
        });
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
        const error = data.errors ? data.errors[0].extensions : null;
        const isOffline = error && error.code === constants_1.ENDPOINT_ERRORS.CANT_CONNECT;
        let tokenDataId = null;
        let tokenDataRole = null;
        let tokenDataToken = null;
        if (!isOffline) {
            const tokenData = data.data && data.data.token;
            tokenDataId = tokenData ? tokenData.id : null;
            tokenDataRole = tokenData ? tokenData.role : constants_1.GUEST_METAROLE;
            tokenDataToken = tokenData ? tokenData.token : null;
            if (tokenDataToken !== null) {
                localStorage.setItem("token", tokenDataToken);
                localStorage.setItem("role", tokenDataRole);
                localStorage.setItem("id", tokenDataId.toString());
                document.cookie = "token=" + tokenDataToken + ";path=/";
                document.cookie = "role=" + tokenDataRole + ";path=/";
                document.cookie = "id=" + tokenDataId + ";path=/";
            }
            else {
                localStorage.removeItem("token");
                localStorage.removeItem("role");
                localStorage.removeItem("id");
                document.cookie = "token=;expires=Thu, 01-Jan-1970 00:00:01 GMT;path=/";
                document.cookie = "role=;expires=Thu, 01-Jan-1970 00:00:01 GMT;path=/";
                document.cookie = "id=;expires=Thu, 01-Jan-1970 00:00:01 GMT;path=/";
            }
        }
        else {
            tokenDataId = parseInt(localStorage.getItem("id")) || null;
            tokenDataRole = localStorage.getItem("role") || constants_1.GUEST_METAROLE;
            tokenDataToken = localStorage.getItem("token");
        }
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
        if (tokenDataToken !== null) {
            console.log("user", tokenDataId, tokenDataRole, "logged in");
        }
        else {
            console.log("credentials deemed invalid", error);
            this.cleanAndDestroyLoggedData();
        }
        this.props.onProviderStateSet(newState, this.logout);
        this.setState(newState);
        if (tokenDataId) {
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
            if (cache_1.default.isSupported) {
                const cachedValue = await cache_1.default.instance.getCachedValue("GET_MOD_users__IDEF_user", tokenDataId, null, fields);
                if (cachedValue && cachedValue.value && cachedValue.value.DATA) {
                    cachedData.app_country = cachedValue.value.DATA.app_country;
                    cachedData.app_currency = cachedValue.value.DATA.app_currency;
                    cachedData.app_language = cachedValue.value.DATA.app_language;
                    console.log("cached user locale is", cachedData);
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
            if (!isOffline) {
                const userLanguageData = await gql_querier_1.gqlQuery(gql_querier_1.buildGqlQuery({
                    name: "GET_MOD_users__IDEF_user",
                    args: {
                        token: tokenDataToken,
                        language: this.props.localeContext.language.split("-")[0],
                        id: tokenDataId,
                    },
                    fields,
                }));
                if (userLanguageData && userLanguageData.data && userLanguageData.data.GET_MOD_users__IDEF_user) {
                    const localeUserData = userLanguageData.data.GET_MOD_users__IDEF_user.DATA;
                    // we still check everything just in case the user is blocked
                    if (localeUserData) {
                        console.log("user locale is", localeUserData);
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
                    if (cache_1.default.isSupported) {
                        const newCachedValue = userLanguageData.data.GET_MOD_users__IDEF_user;
                        cache_1.default.instance.mergeCachedValue("GET_MOD_users__IDEF_user", tokenDataId, null, newCachedValue, fields);
                    }
                }
            }
        }
        return {
            id: tokenDataId || null,
            role: tokenDataRole || constants_1.GUEST_METAROLE,
            error: error || null,
        };
    }
    cleanAndDestroyLoggedData() {
        // removing the user data
        localStorage.removeItem("TOKEN");
        localStorage.removeItem("ID");
        localStorage.removeItem("ROLE");
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
    dismissError() {
        this.setState({
            error: null,
        });
    }
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
