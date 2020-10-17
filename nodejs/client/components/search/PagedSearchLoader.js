"use strict";
/**
 * Contains the classes for the loading of searches via pages in order to create
 * a pagination in search mode
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagedSearchLoader = void 0;
const react_1 = __importDefault(require("react"));
const SearchLoader_1 = __importDefault(require("./SearchLoader"));
const LocationStateReader_1 = __importDefault(require("../navigation/LocationStateReader"));
/**
 * The page search loader component allows for creating pagination UI elements rather
 * simply, it extends the standard search loader for this, it uses the navigation in order
 * to store its page number so that searches are kept consistent
 */
class PagedSearchLoader extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.goToNextPage = this.goToNextPage.bind(this);
        this.goToPrevPage = this.goToPrevPage.bind(this);
        this.goToPage = this.goToPage.bind(this);
        this.onSearchDataChange = this.onSearchDataChange.bind(this);
    }
    goToNextPage(currentPage, hasNextPage, setState) {
        if (hasNextPage) {
            // current page is 0 indexed whereas the qs parameter is 1 indexed for user understanding
            setState({
                p: (currentPage + 2).toString(),
                r: "t",
            });
        }
    }
    goToPrevPage(currentPage, hasPrevPage, setState) {
        if (hasPrevPage) {
            // current page is 0 indexed whereas the qs parameter is 1 indexed for user understanding
            setState({
                p: currentPage.toString(),
                r: "t",
            });
        }
    }
    goToPage(setState, page) {
        setState({
            p: (page + 1).toString(),
            r: "t",
        });
    }
    shouldComponentUpdate(nextProps) {
        return nextProps.pageSize !== this.props.pageSize ||
            nextProps.children !== this.props.children;
    }
    onSearchDataChange(actualP, setState, searchId, wasRestored) {
        if (!wasRestored) {
            if (actualP !== 0) {
                setState({
                    p: "1",
                    r: "t",
                });
            }
            // load the first page, always despite what current page might be
            return 0;
        }
        // load whatever if it was a restoration event
        return null;
    }
    render() {
        return (react_1.default.createElement(LocationStateReader_1.default, { defaultState: { p: "1", r: "f" }, stateIsInQueryString: true }, (state, setState) => {
            let actualP = parseInt(state.p, 10) || 1;
            actualP--;
            return (react_1.default.createElement(SearchLoader_1.default, { pageSize: this.props.pageSize, currentPage: actualP, onSearchDataChange: this.onSearchDataChange.bind(null, actualP, setState) }, (arg) => {
                return this.props.children({
                    ...arg,
                    currentPage: actualP,
                    goToNextPage: this.goToNextPage.bind(this, actualP, arg.hasNextPage, setState),
                    goToPrevPage: this.goToPrevPage.bind(this, actualP, arg.hasPrevPage, setState),
                    goToPage: this.goToPage.bind(this, setState),
                });
            }));
        }));
    }
}
exports.PagedSearchLoader = PagedSearchLoader;
