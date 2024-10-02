import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonicUiModule } from 'src/app/modules/ionic-ui/ionic-ui.module';
import * as tf from '@tensorflow/tfjs';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';

@Component({
  selector: 'app-face-detection',
  templateUrl: './face-detection.page.html',
  styleUrls: ['./face-detection.page.scss'],
  standalone: true,
  imports: [ IonicUiModule ]
})
export class FaceDetectionPage implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('video', { static: false }) video!: ElementRef;
  @ViewChild('canvas', { static: false }) canvas!: ElementRef;
  private detector!: faceLandmarksDetection.FaceLandmarksDetector;

  constructor() { }

  ngOnInit(): void { }

  ngOnDestroy(): void { }

  async ngAfterViewInit() {
    await this.setupCamera();
    
    // Create the detector using SupportedModels
    this.detector = await faceLandmarksDetection.createDetector(
      faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh, 
      {
        runtime: 'mediapipe',  // Use 'tfjs' for TensorFlow.js backend
        maxFaces: 1,
        refineLandmarks: true,  // Optional: set to true to get refined landmarks
        modelType: 'lite', // Use 'full' or 'lite' based on your needs
      } as faceLandmarksDetection.MediaPipeFaceMeshMediaPipeModelConfig 
    );
    this.detectFace();
  }

  async setupCamera() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    this.video.nativeElement.srcObject = stream;
    return new Promise((resolve) => {
      this.video.nativeElement.onloadedmetadata = () => {
        resolve(null);
      };
    });
  }

  async detectFace() {
    const ctx = this.canvas.nativeElement.getContext('2d');

    const detect = async () => {
      ctx.drawImage(this.video.nativeElement, 0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
      
      // Directly pass the video element
      const predictions = await this.detector.estimateFaces(this.video.nativeElement);

      if (predictions.length > 0) {
        predictions.forEach((prediction: any) => {
          const boundingBox = prediction.boundingBox; // Accessing bounding box
          ctx.beginPath();
          ctx.rect(
            boundingBox.topLeft[0],
            boundingBox.topLeft[1],
            boundingBox.bottomRight[0] - boundingBox.topLeft[0],
            boundingBox.bottomRight[1] - boundingBox.topLeft[1]
          );
          ctx.lineWidth = 2;
          ctx.strokeStyle = 'red';
          ctx.stroke();
        });
      }

      requestAnimationFrame(detect);
    };

    detect();
  }
}
