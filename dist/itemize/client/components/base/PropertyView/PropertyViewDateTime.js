"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const moment_1 = __importDefault(require("moment"));
const util_1 = require("../../../../util");
const constants_1 = require("../../../../constants");
class PropertyViewDateTime extends react_1.default.Component {
    shouldComponentUpdate(nextProps) {
        return this.props.language !== nextProps.language ||
            this.props.state.value !== nextProps.state.value;
    }
    render() {
        if (this.props.state.value === null) {
            return <div />;
        }
        const type = this.props.property.getType();
        let format;
        let dbFormat;
        if (type === "date") {
            format = util_1.getLocalizedDateFormat(false);
            dbFormat = constants_1.DATE_FORMAT;
        }
        else if (type === "datetime") {
            format = util_1.getLocalizedDateTimeFormat(false);
            dbFormat = constants_1.DATETIME_FORMAT;
        }
        else {
            format = util_1.getLocalizedTimeFormat(false);
            dbFormat = constants_1.TIME_FORMAT;
        }
        return (<div className={this.props.classes.container}>
        {moment_1.default(this.props.state.value, dbFormat).format(format)}
      </div>);
    }
}
exports.default = PropertyViewDateTime;
