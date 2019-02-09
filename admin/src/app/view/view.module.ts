import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigModule } from '../config/config.module';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { ImageCropperModule } from 'ngx-image-cropper';



//PrimNG
import { 
  DataTableModule, 
  ButtonModule, 
  DropdownModule, 
  PanelModule,
  InputTextModule,
  CheckboxModule,
  ProgressSpinnerModule,
  BlockUIModule,
  ConfirmDialogModule,
  GrowlModule,
  MultiSelect,
  MultiSelectModule,
  EditorModule,
  MessageModule,
  MessagesModule,
  InputSwitchModule,
  TabViewModule,
  PickListModule,
  SelectButtonModule,
  FileUploadModule,
  CalendarModule,
  DialogModule,
  Dialog,
  AccordionModule,
  InputMaskModule,
  InputTextareaModule,
  GalleriaModule,
  LightboxModule,
  ScheduleModule,
  ScrollPanelModule,
  TreeTableModule,
  SliderModule,
  GMapModule,
  ChartModule,
  InplaceModule,
  FieldsetModule,
  RadioButtonModule,
  ChipsModule
} from 'primeng/primeng';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import {PaginatorModule} from 'primeng/paginator';

import { EstabelecimentoComponent } from './estabelecimento/estabelecimento.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ConfigModule,
    CurrencyMaskModule,


    //PrimNG
    DataTableModule,
    ButtonModule,
    DropdownModule,
    PanelModule,
    InputTextModule,
    CheckboxModule,
    ProgressSpinnerModule,
    BlockUIModule,
    ConfirmDialogModule,
    GrowlModule,
    MultiSelectModule,
    EditorModule,
    MessagesModule,
    MessageModule,
    InputSwitchModule,
    TabViewModule,
    PickListModule,
    SelectButtonModule,
    FileUploadModule,
    CalendarModule,
    DialogModule,
    AccordionModule,
    InputMaskModule,
    InputTextareaModule,
    GalleriaModule,
    LightboxModule,
    EditorModule,
    ScheduleModule,
    ScrollPanelModule,
    TreeTableModule,
    SliderModule,
    GMapModule,
    ChartModule,
    EditorModule,
    InplaceModule,
    FieldsetModule,
    RadioButtonModule,
    TableModule,
    PaginatorModule,
    ChipsModule,
    MultiSelectModule,

    ImageCropperModule
  ],
  declarations: [
    EstabelecimentoComponent
  ],
  exports : [
    ConfigModule,
  ]
})
export class ViewModule { }
