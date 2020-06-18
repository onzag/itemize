"use strict";
// import { IPropertyViewProps } from ".";
// import React from "react";
// import Moment from "moment";
// import { getLocalizedDateFormat, getLocalizedDateTimeFormat, getLocalizedTimeFormat } from "../../../util";
// import { DATETIME_FORMAT, DATE_FORMAT, TIME_FORMAT } from "../../../constants";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// export default class PropertyViewDateTime extends React.Component<IPropertyViewProps, {}> {
//   public shouldComponentUpdate(nextProps: IPropertyViewProps) {
//     return this.props.language !== nextProps.language ||
//       this.props.state.value !== nextProps.state.value;
//   }
//   public render() {
//     if (this.props.state.value === null) {
//       return <div/>;
//     }
//     const type = this.props.property.getType();
//     let format: string;
//     let dbFormat: string;
//     if (type === "date") {
//       format = getLocalizedDateFormat(false);
//       dbFormat = DATE_FORMAT;
//     } else if (type === "datetime") {
//       format = getLocalizedDateTimeFormat(false);
//       dbFormat = DATETIME_FORMAT;
//     } else {
//       format = getLocalizedTimeFormat(false);
//       dbFormat = TIME_FORMAT;
//     }
//     return (
//       <div className={this.props.classes.container}>
//         {Moment(this.props.state.value as string, dbFormat).format(format)}
//       </div>
//     );
//   }
// }
const react_1 = __importDefault(require("react"));
const deep_equal_1 = __importDefault(require("deep-equal"));
const moment_1 = __importDefault(require("moment"));
const util_1 = require("../../../../util");
const constants_1 = require("../../../../constants");
class PropertyViewDateTime extends react_1.default.Component {
    constructor(props) {
        super(props);
    }
    shouldComponentUpdate(nextProps) {
        // This is optimized to only update for the thing it uses
        return !deep_equal_1.default(this.props.state.value, nextProps.state.value) ||
            nextProps.property !== this.props.property ||
            nextProps.renderer !== this.props.renderer ||
            nextProps.capitalize !== this.props.capitalize ||
            !!this.props.rtl !== !!nextProps.rtl ||
            this.props.language !== nextProps.language ||
            !deep_equal_1.default(this.props.rendererArgs, nextProps.rendererArgs);
    }
    render() {
        const type = this.props.property.getType();
        let format;
        let dbFormat;
        if (type === "date") {
            format = util_1.getLocalizedDateFormat();
            dbFormat = constants_1.DATE_FORMAT;
        }
        else if (type === "datetime") {
            format = util_1.getLocalizedDateTimeFormat();
            dbFormat = constants_1.DATETIME_FORMAT;
        }
        else {
            format = util_1.getLocalizedTimeFormat();
            dbFormat = constants_1.TIME_FORMAT;
        }
        let momentValue = null;
        if (this.props.state.value && this.props.state.value !== "Invalid Date") {
            momentValue = moment_1.default(this.props.state.value, dbFormat).utc();
            if (!momentValue.isValid()) {
                momentValue = null;
            }
        }
        const RendererElement = this.props.renderer;
        const rendererArgs = {
            args: this.props.rendererArgs,
            rtl: this.props.rtl,
            currentValue: this.props.state.value,
            momentValue,
            dbFormat,
            defaultFormat: format,
            defaultFormattedValue: momentValue ? momentValue.format(format) : null,
        };
        return react_1.default.createElement(RendererElement, Object.assign({}, rendererArgs));
    }
}
exports.PropertyViewDateTime = PropertyViewDateTime;
