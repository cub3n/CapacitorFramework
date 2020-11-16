import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CameraResultType, CameraSource } from '@capacitor/core';
import { Capacitor, Plugins } from '@capacitor/core/dist/esm/global';

@Component({
  selector: 'app-cam',
  templateUrl: './cam.component.html',
  styleUrls: ['./cam.component.css']
})
export class CamComponent{
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
}
