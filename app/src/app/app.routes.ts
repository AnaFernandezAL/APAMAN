import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';

import { Home } from './pages/home/home';
import { comoAyudar } from './pages/comoAyudar/comoAyudar';
import { contacto } from './pages/contacto/contacto';
import { preguntasFrec } from './pages/preguntasFrec/preguntasFrec';
import { proyectos } from './pages/proyectos/proyectos';
import { SobreNos } from './pages/SobreNos/SobreNos';
import { servicios } from './pages/Servicios/servicios';


export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        component: Home,
        title: 'Inicio'
      },
      {
        path: 'nosotros',
        component: SobreNos,
        title: 'Quiénes somos'
      },
      {
        path: 'proyecto',
        component: proyectos,
        title: 'Proyecto'
      },
      {
        path: 'como-ayudar',
        component: comoAyudar,
        title: 'Cómo ayudar'
      },
      {
        path: 'preguntas',
        component: preguntasFrec,
        title: 'Preguntas frecuentes'
      },
      {
        path: 'contacto',
        component: contacto,
        title: 'Contacto'
      },
      {
        path: 'servicios',
        component: servicios,
        title: 'Servicios'
      },
    ]
  },

  {
    path: '**',
    redirectTo: ''
  }
];