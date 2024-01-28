import { Theme } from '@mui/material/styles';

import Accordion from 'src/theme/overrides/Accordion';
import Alert from 'src/theme/overrides/Alert';
import Autocomplete from 'src/theme/overrides/Autocomplete';
import Avatar from 'src/theme/overrides/Avatar';
import Backdrop from 'src/theme/overrides/Backdrop';
import Badge from 'src/theme/overrides/Badge';
import Breadcrumbs from 'src/theme/overrides/Breadcrumbs';
import Button from 'src/theme/overrides/Button';
import ButtonGroup from 'src/theme/overrides/ButtonGroup';
import Card from 'src/theme/overrides/Card';
import Checkbox from 'src/theme/overrides/Checkbox';
import Chip from 'src/theme/overrides/Chip';
import ControlLabel from 'src/theme/overrides/ControlLabel';
import DataGrid from 'src/theme/overrides/DataGrid';
import Dialog from 'src/theme/overrides/Dialog';
import Drawer from 'src/theme/overrides/Drawer';
import Fab from 'src/theme/overrides/Fab';
import Input from 'src/theme/overrides/Input';
import Link from 'src/theme/overrides/Link';
import Lists from 'src/theme/overrides/List';
import LoadingButton from 'src/theme/overrides/LoadingButton';
import Menu from 'src/theme/overrides/Menu';
import Pagination from 'src/theme/overrides/Pagination';
import Paper from 'src/theme/overrides/Paper';
import Popover from 'src/theme/overrides/Popover';
import Progress from 'src/theme/overrides/Progress';
import Radio from 'src/theme/overrides/Radio';
import Rating from 'src/theme/overrides/Rating';
import Select from 'src/theme/overrides/Select';
import Skeleton from 'src/theme/overrides/Skeleton';
import Slider from 'src/theme/overrides/Slider';
import Stepper from 'src/theme/overrides/Stepper';
import SvgIcon from 'src/theme/overrides/SvgIcon';
import Switch from 'src/theme/overrides/Switch';
import Table from 'src/theme/overrides/Table';
import Tabs from 'src/theme/overrides/Tabs';
import Timeline from 'src/theme/overrides/Timeline';
import ToggleButton from 'src/theme/overrides/ToggleButton';
import Tooltip from 'src/theme/overrides/Tooltip';
import TreeView from 'src/theme/overrides/TreeView';
import Typography from 'src/theme/overrides/Typography';

export default function ComponentsOverrides(theme: Theme) {
  return Object.assign(
    Fab(theme),
    Tabs(theme),
    Chip(theme),
    Card(theme),
    Menu(theme),
    Link(theme),
    Input(theme),
    Radio(theme),
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
    Accordion(theme),
    Typography(theme),
    Pagination(theme),
    ButtonGroup(theme),
    Breadcrumbs(theme),
    Autocomplete(theme),
    ControlLabel(theme),
    ToggleButton(theme),
    LoadingButton(theme)
  );
}
