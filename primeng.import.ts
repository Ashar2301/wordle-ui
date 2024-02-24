// ===========================================================================
// File: APP.MODULE-PRIMENG.ts
import { SharedModule, Header, Footer } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { Dialog, DialogModule } from 'primeng/dialog';
import { ConfirmDialog, ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { ListboxModule } from 'primeng/listbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { PanelModule } from 'primeng/panel';
import { CalendarModule } from 'primeng/calendar';
import { AccordionModule } from 'primeng/accordion';
import { TabViewModule } from 'primeng/tabview';
import { FocusTrapModule } from 'primeng/focustrap';
import { CheckboxModule } from 'primeng/checkbox';
import { TreeTableModule } from 'primeng/treetable';
import { TreeModule } from 'primeng/tree';
import { ChipsModule } from 'primeng/chips';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {ChartModule} from 'primeng/chart';  
import {ToastModule} from 'primeng/toast';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {TabMenuModule} from 'primeng/tabmenu';
import {MenuItem} from 'primeng/api';
import {InputTextareaModule} from 'primeng/inputtextarea';
//
export const APP_PRIMENG_MODULE = [
  SharedModule,
  TableModule,
  DialogModule,
  ConfirmDialogModule,
  DropdownModule,
  MenubarModule,
  ButtonModule,
  ListboxModule,
  RadioButtonModule,
  PanelModule,
  AccordionModule,
  CalendarModule,
  TabViewModule,
  FocusTrapModule,
  CheckboxModule,
  TreeTableModule,
  TreeModule,
  ChipsModule,
  CardModule,
  DividerModule,
  DynamicDialogModule,
  ChartModule,
  ToastModule,
  ToggleButtonModule,
  OverlayPanelModule,
  TabMenuModule,
  InputTextareaModule
];
//
export const APP_PRIMENG_COMPONENTS = [Dialog, ConfirmDialog, Header, Footer];
//
import { ConfirmationService } from 'primeng/api';
//
export const APP_PRIMENG_PROVIDERS = [ConfirmationService];
// ===========================================================================
