/**
 * A reexport of the material UI core
 * 
 * @module
 */

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Snackbar from "@material-ui/core/Snackbar";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import RootRef from "@material-ui/core/RootRef";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListSubheader from "@material-ui/core/ListSubheader";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CircularProgress from "@material-ui/core/CircularProgress";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import LinkIcon from '@material-ui/icons/Link';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import BorderStyleIcon from '@material-ui/icons/BorderStyle';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import PictureInPictureIcon from '@material-ui/icons/PictureInPicture';
import WebIcon from '@material-ui/icons/Web';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import DeleteIcon from '@material-ui/icons/Delete';
import SettingsIcon from '@material-ui/icons/Settings';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ExtensionIcon from '@material-ui/icons/Extension';
import {
  createStyles,
  withStyles,
  WithStyles,
  Theme,
  ServerStyleSheets,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import Pagination from "@material-ui/lab/Pagination";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import CssBaseline from "@material-ui/core/CssBaseline";
import { PropTypes, Color } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import Backdrop from "@material-ui/core/Backdrop";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormLabel from "@material-ui/core/FormLabel";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FilledInput from "@material-ui/core/FilledInput";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";
import NativeSelect from '@material-ui/core/NativeSelect';
import Chip from "@material-ui/core/Chip";

import TranslateIcon from "@material-ui/icons/Translate";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import BrokenImageIcon from "@material-ui/icons/BrokenImage";
import CloseIcon from "@material-ui/icons/Close";
import RefreshIcon from "@material-ui/icons/Refresh";
import DoneIcon from "@material-ui/icons/Done";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AlernateEmailIcon from "@material-ui/icons/AlternateEmail";
import MailIcon from "@material-ui/icons/MailOutline";
import CopyrightIcon from '@material-ui/icons/Copyright';
import MenuIcon from "@material-ui/icons/Menu";
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import HomeIcon from '@material-ui/icons/Home';
import ImportantDevicesIcon from "@material-ui/icons/ImportantDevices";
import UpdateIcon from "@material-ui/icons/Update";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import PinterestIcon from '@material-ui/icons/Pinterest';
import RedditIcon from '@material-ui/icons/Reddit';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';
import { WeChatIcon, VKIcon } from "./social-icons";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import FaceIcon from "@material-ui/icons/Face";
import ErrorIcon from '@material-ui/icons/Error';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import RestoreIcon from "@material-ui/icons/Restore";
import ClearIcon from "@material-ui/icons/Clear";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import SearchIcon from "@material-ui/icons/Search";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
import TitleIcon from "@material-ui/icons/Title";
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import FormatBoldIcon from "@material-ui/icons/FormatBold";
import CodeIcon from "@material-ui/icons/Code";
import IconVisibilityOff from "@material-ui/icons/VisibilityOff";
import IconVisibility from "@material-ui/icons/Visibility";
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import EditIcon from '@material-ui/icons/Edit';
import CropSquareIcon from '@material-ui/icons/CropSquare';
import SaveIcon from '@material-ui/icons/Save';
import QueueIcon from '@material-ui/icons/Queue';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

export {
  Grid,
  Tooltip,
  Avatar,
  Paper,
  createStyles,
  withStyles,
  WithStyles,
  Container,
  TextField,
  Box,
  Typography,
  Theme,
  Button,
  Snackbar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Badge,
  RootRef,
  InputAdornment,
  IconButton,
  ExpandMoreIcon,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  withMobileDialog,
  Divider,
  Pagination,
  ServerStyleSheets,
  ThemeProvider,
  MuiPickersUtilsProvider,
  createMuiTheme,
  CssBaseline,
  SearchIcon,
  Card,
  CardActions,
  CardContent,
  AddAPhotoIcon,
  BrokenImageIcon,
  Alert,
  AlertTitle,
  PropTypes,
  Color,
  Menu,
  MenuItem,
  AppBar,
  Toolbar,
  DialogContent,
  DialogActions,
  CloseIcon,
  RefreshIcon,
  CircularProgress,
  TranslateIcon,
  DoneIcon,
  AccountCircleIcon,
  AlernateEmailIcon,
  MailIcon,
  CopyrightIcon,
  Backdrop,
  MenuIcon,
  LibraryBooksIcon,
  HomeIcon,
  ImportantDevicesIcon,
  SwipeableDrawer,
  ListItemIcon,
  UpdateIcon,
  DoneOutlineIcon,
  Tabs,
  Tab,
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  PinterestIcon,
  RedditIcon,
  TwitterIcon,
  YouTubeIcon,
  WeChatIcon,
  VKIcon,
  ArrowBackIcon,
  ExitToAppIcon,
  FaceIcon,
  ErrorIcon,
  NotificationsIcon,
  MenuBookIcon,
  PersonPinIcon,
  VerifiedUserIcon,
  RestoreIcon,
  ClearIcon,
  FormControl,
  FormControlLabel,
  Switch,
  Radio,
  RadioGroup,
  FormLabel,
  RemoveCircleOutlineIcon,
  CloudUploadIcon,
  NoteAddIcon,
  SwapHorizIcon,
  InputLabel,
  Select,
  FilledInput,
  AttachFileIcon,
  VideoLibraryIcon,
  InsertPhotoIcon,
  FormatListBulletedIcon,
  FormatListNumberedIcon,
  FormatQuoteIcon,
  TitleIcon,
  FormatUnderlinedIcon,
  FormatItalicIcon,
  FormatBoldIcon,
  CodeIcon,
  IconVisibilityOff,
  IconVisibility,
  GpsFixedIcon,
  EditIcon,
  CardMedia,
  CardActionArea,
  CropSquareIcon,
  MoreHorizIcon,
  ExpandLessIcon,
  LinkIcon,
  Breadcrumbs,
  BorderStyleIcon,
  TouchAppIcon,
  PictureInPictureIcon,
  WebIcon,
  AddCircleIcon,
  CheckBoxOutlineBlankIcon,
  NativeSelect,
  DeleteIcon,
  SettingsIcon,
  TextFieldsIcon,
  ExtensionIcon,
  SaveIcon,
  QueueIcon,
  HighlightOffIcon,
  Chip,
}
