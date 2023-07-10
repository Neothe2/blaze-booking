import {
  Component,
  ElementRef,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Plugins, Capacitor } from '@capacitor/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { EventEmitter } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
})
export class ImagePickerComponent implements OnInit {
  selectedImage: string | undefined;
  @Output() imagePick = new EventEmitter<string>();
  @ViewChild('filePicker') filePicker!: ElementRef<HTMLInputElement>;
  usePicker = false;

  constructor(private platform: Platform) {}

  ngOnInit() {
    console.log('Mobile: ' + this.platform.is('mobile'));
    console.log('Hybrid: ' + this.platform.is('hybrid'));
    console.log('iOS: ' + this.platform.is('ios'));
    console.log('Android: ' + this.platform.is('android'));
    console.log('Desktop: ' + this.platform.is('desktop'));

    if (
      (this.platform.is('mobile') && !this.platform.is('hybrid')) ||
      this.platform.is('desktop')
    ) {
      this.usePicker = true;
    }
  }

  onFileChosen(event: any) {
    const pickedFile = event.target.files[0];
    if (!pickedFile) {
      return;
    } else {
      const fr = new FileReader();
      fr.onload = () => {
        const dataUrl = fr.result;
        this.selectedImage = dataUrl as string;
        this.imagePick.emit(this.selectedImage);
      };
      fr.readAsDataURL(pickedFile);
    }
  }

  onPickImage() {
    if (!Capacitor.isPluginAvailable('Camera') || this.usePicker) {
      this.filePicker.nativeElement.click();
      return;
    }
    Camera.getPhoto({
      quality: 50,
      source: CameraSource.Prompt,
      correctOrientation: true,
      width: 600,
      resultType: CameraResultType.DataUrl,
    })
      .then((image) => {
        console.log('abcd');
        this.selectedImage = image.dataUrl;
        this.imagePick.emit(image.dataUrl);
      })
      .catch((error) => {
        console.error(error);
      });

    console.log('camera');
  }
}
