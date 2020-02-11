"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const PropertyEntryField_1 = __importDefault(require("./PropertyEntryField"));
const core_1 = require("@material-ui/core");
const react_quill_min_js_1 = __importDefault(require("react-quill/dist/react-quill.min.js"));
const deep_equal_1 = __importDefault(require("deep-equal"));
const Toolbar_1 = __importDefault(require("@material-ui/core/Toolbar"));
const uuid_1 = __importDefault(require("uuid"));
require("react-quill/dist/quill.core.css");
require("../../../internal/theme/quill.scss");
// TODO implement missing toolbar functionality
function RichTextEditorToolbar(props) {
    return (<Toolbar_1.default id={props.id}>
      <core_1.IconButton title={props.i18n[props.language].format_bold} classes={{ root: "ql-bold" }}>
        <core_1.Icon>format_bold</core_1.Icon>
      </core_1.IconButton>
      <core_1.IconButton title={props.i18n[props.language].format_italic} classes={{ root: "ql-italic" }}>
        <core_1.Icon>format_italic</core_1.Icon>
      </core_1.IconButton>
      <core_1.IconButton title={props.i18n[props.language].format_underline} classes={{ root: "ql-underline" }}>
        <core_1.Icon>format_underline</core_1.Icon>
      </core_1.IconButton>
      <core_1.IconButton title={props.i18n[props.language].format_title} classes={{ root: "ql-header" }} value="1">
        <core_1.Icon>title</core_1.Icon>
      </core_1.IconButton>
      <span className="ql-divider"/>
      <core_1.IconButton title={props.i18n[props.language].format_quote} classes={{ root: "ql-blockquote" }}>
        <core_1.Icon>format_quote</core_1.Icon>
      </core_1.IconButton>
      <span className="ql-divider"/>
      <core_1.IconButton title={props.i18n[props.language].format_list_numbered} classes={{ root: "ql-list" }} value="ordered">
        <core_1.Icon>format_list_numbered</core_1.Icon>
      </core_1.IconButton>
      <core_1.IconButton title={props.i18n[props.language].format_list_bulleted} classes={{ root: "ql-list" }} value="bullet">
        <core_1.Icon>format_list_bulleted</core_1.Icon>
      </core_1.IconButton>
      <span className="ql-divider"/>
      <core_1.IconButton title={props.i18n[props.language].format_add_image} classes={{ root: "" }}>
        <core_1.Icon>insert_photo</core_1.Icon>
      </core_1.IconButton>
      <core_1.IconButton title={props.i18n[props.language].format_add_video} classes={{ root: "" }}>
        <core_1.Icon>video_library</core_1.Icon>
      </core_1.IconButton>
      <core_1.IconButton title={props.i18n[props.language].format_add_file} classes={{ root: "" }}>
        <core_1.Icon>attach_file</core_1.Icon>
      </core_1.IconButton>
    </Toolbar_1.default>);
}
class RichTextEditor extends react_1.default.Component {
    constructor(props) {
        super(props);
        // whether it is focused or not
        this.state = {
            focused: false,
        };
        this.uuid = "uuid-" + uuid_1.default.v4();
        // basic functions
        this.onChange = this.onChange.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }
    shouldComponentUpdate(nextProps, nextState) {
        // we use this too
        return nextProps.property !== this.props.property ||
            !deep_equal_1.default(this.state, nextState) ||
            !deep_equal_1.default(this.props.state, nextProps.state) ||
            !!this.props.poked !== !!nextProps.poked ||
            !!this.props.forceInvalid !== !!nextProps.forceInvalid ||
            nextProps.language !== this.props.language ||
            nextProps.i18n !== this.props.i18n ||
            nextProps.icon !== this.props.icon;
    }
    onChange(value) {
        // on change, these values are basically empty
        // so we set to null, however in some circumstances
        // they are unavoidable, use a value larger than 1 for min
        // if the field is not nullable
        if (value === "<p><br></p>" ||
            value === "<p><span class=\"ql-cursor\">\ufeff</span></p>") {
            this.props.onChange(null, null);
            return;
        }
        this.props.onChange(value, null);
    }
    // basically get the state onto its parent of the focus and blur
    onFocus() {
        this.setState({
            focused: true,
        });
    }
    onBlur() {
        this.setState({
            focused: false,
        });
    }
    render() {
        // this is the editor value
        const editorValue = this.props.state.value ?
            this.props.state.value :
            "";
        // basic data
        const i18nData = this.props.property.getI18nDataFor(this.props.language);
        const i18nLabel = i18nData && i18nData.label;
        const i18nDescription = i18nData && i18nData.description;
        const i18nPlaceholder = i18nData && i18nData.placeholder;
        // invalid reason
        const invalidReason = this.props.state.invalidReason;
        let i18nInvalidReason = null;
        if ((this.props.poked || this.props.state.userSet) &&
            invalidReason && i18nData &&
            i18nData.error && i18nData.error[invalidReason]) {
            i18nInvalidReason = i18nData.error[invalidReason];
        }
        // the icon as usual
        const icon = this.props.icon;
        const iconComponent = icon ? (<core_1.Icon classes={{ root: this.props.classes.icon }}>{icon}</core_1.Icon>) : null;
        // we return the component, note how we set the thing to focused
        return (<div className={this.props.classes.container}>
        <div>
          <core_1.InputLabel classes={{
            root: this.props.classes.label,
            focused: "focused",
        }} focused={this.state.focused}>
            {i18nLabel}{iconComponent}
          </core_1.InputLabel>
          {i18nDescription ? <div className={this.props.classes.description}>
            <core_1.Icon>keyboard_arrow_down</core_1.Icon>{i18nDescription}</div> : null}
          <RichTextEditorToolbar id={this.uuid} i18n={this.props.i18n} language={this.props.language}/>
          <react_quill_min_js_1.default className={this.props.classes.quill + (this.state.focused ? " focused" : "")} disabled={this.props.state.enforced} modules={{
            toolbar: {
                container: "#" + this.uuid,
            },
        }} theme={null} placeholder={i18nPlaceholder} value={editorValue} onChange={this.onChange} onFocus={this.onFocus} onBlur={this.onBlur}/>
        </div>
        <div className={this.props.classes.errorMessage}>
          {i18nInvalidReason}
        </div>
      </div>);
    }
}
function PropertyEntryText(props) {
    if (!props.property.isRichText()) {
        return <PropertyEntryField_1.default {...props}/>;
    }
    return <RichTextEditor {...props}/>;
}
exports.default = PropertyEntryText;
