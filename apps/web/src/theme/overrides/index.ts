import { Theme } from '@mui/material/styles';
import merge from 'lodash/merge';

import Accordion from 'src/theme/overrides/components/accordion';
import Alert from 'src/theme/overrides/components/alert';
import AppBar from 'src/theme/overrides/components/appbar';
import Autocomplete from 'src/theme/overrides/components/autocomplete';
import Avatar from 'src/theme/overrides/components/avatar';
import Backdrop from 'src/theme/overrides/components/backdrop';
import Badge from 'src/theme/overrides/components/badge';
import Breadcrumbs from 'src/theme/overrides/components/breadcrumbs';
import Button from 'src/theme/overrides/components/button';
import ButtonGroup from 'src/theme/overrides/components/button-group';
import Card from 'src/theme/overrides/components/card';
import Checkbox from 'src/theme/overrides/components/checkbox';
import Chip from 'src/theme/overrides/components/chip';
import CssBaseline from 'src/theme/overrides/components/css-baseline';
import DataGrid from 'src/theme/overrides/components/data-grid';
import MuiDatePicker from 'src/theme/overrides/components/date-picker';
import Dialog from 'src/theme/overrides/components/dialog';
import Drawer from 'src/theme/overrides/components/drawer';
import Fab from 'src/theme/overrides/components/fab';
import Link from 'src/theme/overrides/components/link';
import Lists from 'src/theme/overrides/components/list';
import LoadingButton from 'src/theme/overrides/components/loading-button';
import Menu from 'src/theme/overrides/components/menu';
import Pagination from 'src/theme/overrides/components/pagination';
import Paper from 'src/theme/overrides/components/paper';
import Popover from 'src/theme/overrides/components/popover';
import Progress from 'src/theme/overrides/components/progress';
import RadioButton from 'src/theme/overrides/components/radio-button';
import Rating from 'src/theme/overrides/components/rating';
import Select from 'src/theme/overrides/components/select';
import Skeleton from 'src/theme/overrides/components/skeleton';
import Slider from 'src/theme/overrides/components/slider';
import Stack from 'src/theme/overrides/components/stack';
import Stepper from 'src/theme/overrides/components/stepper';
import SvgIcon from 'src/theme/overrides/components/svg-icon';
import Switch from 'src/theme/overrides/components/switch';
import Table from 'src/theme/overrides/components/table';
import Tabs from 'src/theme/overrides/components/tabs';
import TextField from 'src/theme/overrides/components/textfield';
import Timeline from 'src/theme/overrides/components/timeline';
import ToggleButton from 'src/theme/overrides/components/toggle-button';
import Tooltip from 'src/theme/overrides/components/tooltip';
import TreeView from 'src/theme/overrides/components/tree-view';
import Typography from 'src/theme/overrides/components/typography';

export function componentsOverrides(theme: Theme) {
  const components = merge(
    Fab(theme),
    Tabs(theme),
    Chip(theme),
    Card(theme),
    Menu(theme),
    Link(theme),
    Stack(theme),
    Badge(theme),
    Lists(theme),
    Table(theme),
    Paper(theme),
    Alert(theme),
    Switch(theme),
    Select(theme),
    Button(theme),
    Rating(theme),
    Dialog(theme),
    AppBar(theme),
    Avatar(theme),
    Slider(theme),
    Drawer(theme),
    Stepper(theme),
    Tooltip(theme),
    Popover(theme),
    SvgIcon(theme),
    Checkbox(theme),
    DataGrid(theme),
    Skeleton(theme),
    Timeline(theme),
    TreeView(theme),
    Backdrop(theme),
    Progress(theme),
    TextField(theme),
    Accordion(theme),
    Typography(theme),
    Pagination(theme),
    RadioButton(theme),
    ButtonGroup(theme),
    Breadcrumbs(theme),
    CssBaseline(theme),
    Autocomplete(theme),
    ToggleButton(theme),
    MuiDatePicker(theme),
    LoadingButton(theme)
  );

  return components;
}
