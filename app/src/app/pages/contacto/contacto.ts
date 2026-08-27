import {
  AfterViewInit,
  Component,
  signal
} from '@angular/core';

import { RouterModule } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';

import { MatButtonModule } from '@angular/material/button';

import {
  importLibrary,
  setOptions
} from '@googlemaps/js-api-loader';

import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-contacto',

  standalone: true,

  imports: [
    RouterModule,
    MatIconModule,
    MatButtonModule
  ],

  templateUrl: './contacto.html',

  styleUrl: './contacto.css'
})
export class contacto implements AfterViewInit {

  private map!: google.maps.Map;

  private userMarker?: google.maps.Marker;

  private routePolylines: google.maps.Polyline[] = [];


  private readonly apamanLocation = {
    lat: 10.1016831,
    lng: -84.3826968
  };


  locationLoading = signal(false);

  locationError = signal<string | null>(null);

  routeInfo = signal<{
    distance: string;
    duration: string;
  } | null>(null);


  googleMapsUrl =
    `https://www.google.com/maps/dir/?api=1&destination=${this.apamanLocation.lat},${this.apamanLocation.lng}`;


  async ngAfterViewInit(): Promise<void> {

    setOptions({
      key: environment.googleMapsApiKey,
      v: 'weekly'
    });


    const {
      Map
    } = await importLibrary('maps');


    this.map = new Map(
      document.getElementById('apaman-map') as HTMLElement,
      {
        center: this.apamanLocation,
        zoom: 16,

        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true
      }
    );


    this.crearMarcadorApaman();
  }


  private crearMarcadorApaman(): void {

    new google.maps.Marker({
      map: this.map,
      position: this.apamanLocation,
      title: 'APAMAN - Hogar de Ancianos José del Olmo'
    });

  }


  obtenerUbicacion(): void {

    this.locationError.set(null);
    this.routeInfo.set(null);
    this.locationLoading.set(true);


    if (!navigator.geolocation) {

      this.locationLoading.set(false);

      this.locationError.set(
        'Este navegador no permite obtener tu ubicación.'
      );

      return;
    }


    navigator.geolocation.getCurrentPosition(

      async position => {

        const ubicacionUsuario = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };


        this.locationLoading.set(false);


        this.crearMarcadorUsuario(
          ubicacionUsuario
        );


        await this.calcularRuta(
          ubicacionUsuario
        );
      },


      error => {

        this.locationLoading.set(false);


        if (
          error.code === error.PERMISSION_DENIED
        ) {

          this.locationError.set(
            'Debes permitir el acceso a tu ubicación para calcular la ruta.'
          );
        }

        else if (
          error.code === error.POSITION_UNAVAILABLE
        ) {

          this.locationError.set(
            'Tu ubicación no está disponible en este momento.'
          );
        }

        else if (
          error.code === error.TIMEOUT
        ) {

          this.locationError.set(
            'La solicitud de ubicación tardó demasiado.'
          );
        }

        else {

          this.locationError.set(
            'No fue posible obtener tu ubicación.'
          );
        }
      },


      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  }


  private crearMarcadorUsuario(
  posicion: google.maps.LatLngLiteral
): void {

  if (this.userMarker) {
    this.userMarker.setMap(null);
  }

  this.userMarker = new google.maps.Marker({
    map: this.map,
    position: posicion,
    title: 'Tu ubicación'
  });

}


  private async calcularRuta(
    ubicacionUsuario: google.maps.LatLngLiteral
  ): Promise<void> {

    try {

      const {
        Route
      } = await importLibrary('routes');


      const {
        routes
      } = await Route.computeRoutes({

        origin: ubicacionUsuario,

        destination: this.apamanLocation,

        travelMode:
          google.maps.TravelMode.DRIVING,

        fields: [
          'path',
          'distanceMeters',
          'durationMillis',
          'viewport'
        ]
      });


      if (
        !routes ||
        routes.length === 0
      ) {

        this.locationError.set(
          'No se pudo calcular una ruta hasta APAMAN.'
        );

        return;
      }


      const ruta = routes[0];


      for (
        const polyline of this.routePolylines
      ) {

        polyline.setMap(null);
      }


      this.routePolylines =
        await ruta.createPolylines();


      for (
        const polyline of this.routePolylines
      ) {

        polyline.setMap(this.map);
      }


      if (ruta.viewport) {

        this.map.fitBounds(
          ruta.viewport
        );
      }


      const kilometros =
        ruta.distanceMeters
          ? ruta.distanceMeters / 1000
          : 0;


      const minutos =
        ruta.durationMillis
          ? Math.round(
              ruta.durationMillis / 60000
            )
          : 0;


      this.routeInfo.set({
        distance:
          `${kilometros.toFixed(1)} km`,

        duration:
          `${minutos} min`
      });


      this.googleMapsUrl =
        'https://www.google.com/maps/dir/?api=1' +
        `&origin=${ubicacionUsuario.lat},${ubicacionUsuario.lng}` +
        `&destination=${this.apamanLocation.lat},${this.apamanLocation.lng}` +
        '&travelmode=driving';
    }

    catch (error) {

      console.error(
        'Error calculando la ruta:',
        error
      );


      this.locationError.set(
        'Ocurrió un problema al calcular la ruta.'
      );
    }
  }
}