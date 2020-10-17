"use strict";
/**
 * Contains the search loader with an already paginated component
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchLoaderWithPagination = void 0;
const PagedSearchLoader_1 = require("../../components/search/PagedSearchLoader");
const react_1 = __importDefault(require("react"));
const mui_core_1 = require("../mui-core");
const snackbar_1 = __importDefault(require("./snackbar"));
/**
 * Has a search loader section and provides its own pagination component that is to be displayed with
 * already handlers to update the navigation page, it uses the LocationStateReader in order to keep its
 * page so it means that it builds history in it
 *
 * TODO support searchId to keep navigation in sync
 *
 * @param props the search loader props
 */
function SearchLoaderWithPagination(props) {
    return (react_1.default.createElement(PagedSearchLoader_1.PagedSearchLoader, { pageSize: props.pageSize }, (arg) => {
        const handlePageChange = (e, value) => {
            arg.goToPage(value - 1);
        };
        const pagination = (arg.pageCount === 0 ?
            null :
            react_1.default.createElement(mui_core_1.Pagination, { count: arg.pageCount, color: "primary", page: arg.currentPage + 1, onChange: handlePageChange }));
        // TODO add the search results to say when there's an acutal search and say when there are no results
        return (react_1.default.createElement(react_1.default.Fragment, null,
            props.children(arg, pagination, !!(arg.searchId && arg.pageCount === 0)),
            react_1.default.createElement(snackbar_1.default, { id: props.id, i18nDisplay: arg.error, open: !!arg.error, onClose: arg.dismissError, severity: "error" })));
    }));
}
exports.SearchLoaderWithPagination = SearchLoaderWithPagination;
