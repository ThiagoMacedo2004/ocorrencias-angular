import { AuthGuard } from './guards/auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav'

import { AppComponent } from './app.component';
import { HeaderComponent } from './ocorrencias/home/header/header.component';
import { TabelaOcComponent } from './ocorrencias/tabela-oc/tabela-oc.component';
import { DialogOsComponent } from './ocorrencias/dialog-os/dialog-os.component';
import { LoginComponent } from './ocorrencias/login/login.component';
import { ServicesService } from './services/services.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DialogDetalheOcComponent } from './ocorrencias/dialog-detalhe-oc/dialog-detalhe-oc.component';
import { FinalizarOcComponent } from './ocorrencias/finalizar-oc/finalizar-oc.component';
import { MatNativeDateModule, MAT_DATE_LOCALE, MAT_DATE_LOCALE_FACTORY } from '@angular/material/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { HomeComponent } from './ocorrencias/home/home.component';
import { SidebarComponent } from './ocorrencias/home/sidebar/sidebar.component';

import { GerarOsComponent } from './ocorrencias/gerar-os/gerar-os.component';






@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TabelaOcComponent,
    DialogOsComponent,
    LoginComponent,
    DialogDetalheOcComponent,
    FinalizarOcComponent,
    HomeComponent,
    SidebarComponent,
    GerarOsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    MatDividerModule,
    MatListModule,
    MatSidenavModule
   
  ],
  providers: [
    ServicesService,
    LoginComponent,
    AuthGuard,
    {
      provide: MAT_DATE_LOCALE,
      useValue: 
        'pt-BR'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
