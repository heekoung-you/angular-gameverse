import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-image-playground',
  templateUrl: './image-playground.component.html',
  styleUrls: ['./image-playground.component.scss'],
})
export class ImagePlaygroundComponent {
  uploadedImage: File | null = null;
  originalImageUrl: string | null = null;
  scaledImg: HTMLImageElement | null = null;
  scaledWidth = 0;
  scaledHeight = 0;
  fileName = '';
  hasCroppedImage = false;
  @ViewChild('imageCanvas') imageCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('croppedCanvas') croppedCanvas!: ElementRef<HTMLCanvasElement>;

  isDragging = false;
  startX = 0;
  startY = 0;
  endX = 0;
  endY = 0;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    console.log(file);
    console.log(event);
    this.fileName = file.name;
    this.originalImageUrl = URL.createObjectURL(file);

    const img = new Image();
    img.src = this.originalImageUrl;

    img.onload = () => {
      const canvas = this.imageCanvas.nativeElement;
      const ctx = canvas.getContext('2d');

      const maxWidth = 800;
      const maxHeight = 600;

      let width = img.width;
      let height = img.height;

      // Calculate the new dimensions while maintaining the aspect ratio
      if (width > maxWidth || height > maxHeight) {
        const widthRatio = maxWidth / width;
        const heightRatio = maxHeight / height;
        const scale = Math.min(widthRatio, heightRatio);

        width = width * scale;
        height = height * scale;
      }

      canvas.width = width;
      canvas.height = height;

      ctx?.drawImage(img, 0, 0, width, height);

      // Save scaled image + dimensions
      this.scaledImg = img;
      this.scaledWidth = width;
      this.scaledHeight = height;
    };
  }

  onMouseDown(event: MouseEvent) {
    this.isDragging = true;
    const canvas = this.imageCanvas.nativeElement;
    const rect = canvas.getBoundingClientRect();
    this.startX = event.clientX - rect.left;
    this.startY = event.clientY - rect.top;
  }

  onMouseMove(event: MouseEvent) {
    if (!this.isDragging || !this.scaledImg) return;

    const canvas = this.imageCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();

    this.endX = event.clientX - rect.left;
    this.endY = event.clientY - rect.top;

    // Redraw scaled image
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
    ctx?.drawImage(this.scaledImg, 0, 0, this.scaledWidth, this.scaledHeight);

    // Draw selection rectangle
    ctx?.beginPath();
    ctx?.rect(this.startX, this.startY, this.endX - this.startX, this.endY - this.startY);
    ctx?.stroke();
  }

  onMouseUp() {
    this.isDragging = false;
  }

  cropImage() {
    const canvas = this.imageCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    const croppedCanvas = this.croppedCanvas.nativeElement;
    const croppedCtx = croppedCanvas.getContext('2d');

    const width = this.endX - this.startX;
    const height = this.endY - this.startY;

    croppedCanvas.width = width;
    croppedCanvas.height = height;

    const imageData = ctx?.getImageData(this.startX, this.startY, width, height);
    croppedCtx?.putImageData(imageData!, 0, 0);
    this.hasCroppedImage = true;
  }

  downloadCroppedImage() {
    const croppedCanvas = this.croppedCanvas.nativeElement;
    if (!this.hasCroppedImage) {
      alert('No cropped image available to download.');
      return;
    }
    const dataUrl = croppedCanvas.toDataURL('image/png');

    //console.log('Downloading cropped image...', this.croppedCanvas);
    let downloadFileName = 'cropped_image.png';
    if (this.fileName) {
      const parts = this.fileName.split('.');
      const baseName = parts.slice(0, -1).join('.');
      downloadFileName = `${baseName}-cropped.png`; // keep PNG for consistency
    }

    const newFileName = prompt('Enter a filename:', downloadFileName);
    if (!newFileName) return;

    // Create a temporary link
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = newFileName; // this triggers the Save As dialog
    link.click();
    this.hasCroppedImage = false;

    const ctx = croppedCanvas.getContext('2d')!;
    ctx.clearRect(0, 0, croppedCanvas.width, croppedCanvas.height);
  }
}
