"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const gql_querier_1 = require("../../../gql-querier");
const constants_1 = require("../../../constants");
const cache_1 = __importDefault(require("../workers/cache"));
exports.TokenContext = react_1.default.createContext(null);
class TokenProvider extends react_1.default.Component {
    constructor(props) {
        super(props);
        // we get the stored token, if there's none
        // then we should render right away
        const storedToken = localStorage.getItem("TOKEN");
        this.state = {
            token: null,
            id: null,
            role: constants_1.GUEST_METAROLE,
            isLoggingIn: false,
            // by setting this flag as true if there is none
            // otherwise we need to check the token for validity or
            // expiration, if we can
            isReady: !storedToken,
            error: null,
        };
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.dismissError = this.dismissError.bind(this);
    }
    componentDidMount() {
        const storedToken = localStorage.getItem("TOKEN");
        if (storedToken !== null) {
            this.login(null, null, storedToken, true);
        }
        else {
            this.props.onProviderStateSet(this.state);
        }
    }
    async login(username, password, token, doNotShowLoginError) {
        if (this.state.isLoggingIn) {
            console.warn("Tried to login while logging in");
            return;
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
        const tokenData = data.data && data.data.token;
        const tokenDataId = tokenData ? tokenData.id : null;
        const tokenDataRole = tokenData ? tokenData.role : null;
        const tokenDataToken = tokenData ? tokenData.token : null;
        if (tokenDataToken !== null) {
            localStorage.setItem("TOKEN", tokenDataToken);
            localStorage.setItem("ROLE", tokenDataRole);
            localStorage.setItem("ID", tokenDataId.toString());
        }
        else {
            localStorage.removeItem("TOKEN");
            localStorage.removeItem("ROLE");
            localStorage.removeItem("ID");
        }
        const error = data.errors ? data.errors[0].extensions : null;
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
        }
        this.props.onProviderStateSet(newState);
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
    logout() {
        if (this.state.isLoggingIn) {
            console.warn("Tried to logout while logging in");
            return;
        }
        localStorage.removeItem("TOKEN");
        cache_1.default.instance.deleteCachedValue("GET_MOD_users__IDEF_user", this.state.id, null);
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
        return (<exports.TokenContext.Provider value={{
            ...this.state,
            login: this.login,
            logout: this.logout,
            dismissError: this.dismissError,
        }}>
        {this.props.children}
      </exports.TokenContext.Provider>);
    }
}
exports.TokenProvider = TokenProvider;
exports.LocationStateContext = react_1.default.createContext(null);
