import { AgmMap } from '@agm/core';
import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl} from "@angular/forms";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CameraResultType, CameraSource, Capacitor, Plugins } from '@capacitor/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {  
  public cargada = false;
  public carrusel: SafeResourceUrl[]=[] as SafeResourceUrl[];
  public foto: any;
  takenPicture: any;
  constructor(private sanitizer: DomSanitizer){}
  async takePicture() {    
    try {
      const image = await Plugins.Camera.getPhoto({
        quality: 90,
        source: CameraSource.Camera,
        saveToGallery: true,
        resultType: CameraResultType.DataUrl
      });

      // image.webPath will contain a path that can be set as an image src.
      // You can access the original file using image.path, which can be
      // passed to the Filesystem API to read the raw data of the image,
      // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
      // Can be set to the src of an image now

      let regexpNumber: RegExp = /JPEG.*(.jpg)$/;
      this.cargada = true;
      this.foto = image.path;
      //String a =foto.uri.getPath();

      this.takenPicture = image.webPath;//this.takePicture = imageUrl;
      //this.foto="Pictures/"+this.ruta.substr(this.ruta.search(regexpNumber))
      //this.ruta="file://com.android.externalstorage.documents/document/Pictures/"+this.ruta.substr(this.ruta.search(regexpNumber))
      console.log(this.foto)
      console.log(Capacitor.convertFileSrc(this.foto))
      this.carrusel.push(this.sanitizer.bypassSecurityTrustUrl(image && (image.dataUrl)))
    } catch (error) {
      console.log('prro')

    }

}
  @ViewChild("googleMap") agmMap: AgmMap;
  direccion= new FormGroup({
    sectorText: new FormControl(''),
    ciudadText: new FormControl(''),
    paisText: new FormControl('')
  })  
  lista=[{lat: 51.678418,
    lng: 7.809007}]
  google: any;
  title = 'Web services';
  
  protected map: any;
  defaultCenter = {lat: 55.5815245, lng: 36.8251383};
  currentCenter = Object.assign({}, this.defaultCenter);
  zoom = 3;

  geocode(address: string): Promise<any> {
    console.log(address);    
    const geocoder = new google.maps.Geocoder();
    return new Promise((resolve, reject) => {
      geocoder.geocode(
        {
          address: address
        },
        (results, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            resolve(results[0]);
          } else {
            reject(new Error(status));
          }
        }
      );
    });
  }
  
findPlace() {
  const {sectorText,ciudadText,paisText}=this.direccion.value
  var aux=sectorText+","+ciudadText+","+paisText;
  this.zoom = 14;
  this.geocode(aux).then(place => {
    this.currentCenter = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng()};
  })
  .catch(err => {
    console.log(err);
  });
}  
}
