"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PagedSearchLoader_1 = require("../../components/search/PagedSearchLoader");
const react_1 = __importDefault(require("react"));
const mui_core_1 = require("../mui-core");
const snackbar_1 = __importDefault(require("./snackbar"));
function SearchLoaderWithPagination(props) {
    return (react_1.default.createElement(PagedSearchLoader_1.PagedSearchLoader, { pageSize: props.pageSize }, (arg) => {
        const handlePageChange = (e, value) => {
            arg.goToPage(value - 1);
        };
        const pagination = (arg.pageCount === 0 ?
            null :
            react_1.default.createElement(mui_core_1.Pagination, { count: arg.pageCount, color: "primary", page: arg.currentPage + 1, onChange: handlePageChange }));
        return (react_1.default.createElement(react_1.default.Fragment, null,
            props.children(arg, pagination),
            react_1.default.createElement(snackbar_1.default, { i18nDisplay: arg.error, open: !!arg.error, onClose: arg.dismissError, severity: "error" })));
    }));
}
exports.SearchLoaderWithPagination = SearchLoaderWithPagination;
