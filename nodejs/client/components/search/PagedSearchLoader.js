"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const deep_equal_1 = __importDefault(require("deep-equal"));
const SearchLoader_1 = __importDefault(require("./SearchLoader"));
class PagedSearchLoader extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0,
        };
        this.goToNextPage = this.goToNextPage.bind(this);
        this.goToPrevPage = this.goToPrevPage.bind(this);
        this.goToPage = this.goToPage.bind(this);
    }
    goToNextPage(hasNextPage) {
        if (hasNextPage) {
            this.goToPage(this.state.currentPage + 1);
        }
    }
    goToPrevPage(hasPrevPage) {
        if (hasPrevPage) {
            this.goToPage(this.state.currentPage - 1);
        }
    }
    goToPage(n) {
        this.setState({
            currentPage: n,
        });
    }
    shouldComponentUpdate(nextProps, nextState) {
        return !deep_equal_1.default(this.state, nextState) ||
            nextProps.pageSize !== this.props.pageSize ||
            nextProps.children !== this.props.children;
    }
    render() {
        return (react_1.default.createElement(SearchLoader_1.default, { pageSize: this.props.pageSize, currentPage: this.state.currentPage }, (arg) => {
            return this.props.children({
                ...arg,
                currentPage: this.state.currentPage,
                goToNextPage: this.goToNextPage.bind(this, arg.hasNextPage),
                goToPrevPage: this.goToPrevPage.bind(this, arg.hasPrevPage),
                goToPage: this.goToPage,
            });
        }));
    }
}
exports.PagedSearchLoader = PagedSearchLoader;
