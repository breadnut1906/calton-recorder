import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonicUiModule } from 'src/app/modules/ionic-ui/ionic-ui.module';
// import * as faceapi from 'face-api.js';

import '@mediapipe/face_detection';
import '@tensorflow/tfjs-core';
import * as faceDetection from '@tensorflow-models/face-detection';

@Component({
  selector: 'app-face-detection',
  templateUrl: './face-detection.page.html',
  styleUrls: ['./face-detection.page.scss'],
  standalone: true,
  imports: [ IonicUiModule ]
})
export class FaceDetectionPage implements OnInit {

  // video!: HTMLVideoElement;

  // videoElement: HTMLVideoElement | undefined;
  // overlayElement: HTMLCanvasElement | undefined;
  // videoStream: MediaStream | undefined;

  // // faceDetectionInterval: any;

  // // modelPath: string = 'assets/models/faceapijs';

  // constructor() { }

  // async ngOnInit(): Promise<void> {
  //   // await this.onLoadModels();
  // }

  // ngOnDestroy(): void { }

  // ngAfterViewInit() { }

  // // async onLoadModels() {
  // //   try {
  // //     await Promise.all([        
  // //       faceapi.nets.tinyFaceDetector.loadFromUri('assets/models/faceapijs'),
  // //       faceapi.nets.faceLandmark68Net.loadFromUri('assets/models/faceapijs'),
  // //       // faceapi.nets.faceLandmark68TinyNet.loadFromUri('assets/models/faceapijs'),
  // //       faceapi.nets.faceRecognitionNet.loadFromUri('assets/models/faceapijs'),
  // //       faceapi.nets.faceExpressionNet.loadFromUri('assets/models/faceapijs'),
  // //       // faceapi.nets.tinyYolov2.loadFromUri('assets/models/faceapijs'),
  // //       // faceapi.nets.faceLandmark68TinyNet.loadFromUri('assets/models/faceapijs'),
  // //       // faceapi.nets.ssdMobilenetv1.loadFromUri('assets/models/faceapijs'),
  // //       // faceapi.nets.mtcnn.loadFromUri('assets/models/faceapijs')
  // //       // faceapi.nets.ageGenderNet.loadFromUri('assets/models/faceapijs'),
  // //     ]).then(() => {
  // //       console.log('Models loaded');
  // //     })
  // //   } catch (error) {
  // //     console.error('Error loading models', error);
  // //   }
  // // }

  // async onStartVideo() {
  //   try {
  //     const model = faceDetection.SupportedModels.MediaPipeFaceDetector;
      
  //     const detectorConfig: faceDetection.MediaPipeFaceDetectorTfjsModelConfig = {
  //       runtime: 'tfjs'
  //     }
  //     const detector = await faceDetection.createDetector(model, detectorConfig);    
  
  //     this.videoElement = document.querySelector('video') as HTMLVideoElement;
  //     this.overlayElement = document.querySelector('canvas') as HTMLCanvasElement;
  
  //     navigator.mediaDevices.getUserMedia({ video: {} })
  //       .then(stream => {
  //         this.videoElement!.srcObject = stream;
  //         this.videoStream = stream;  // Store the stream to stop later
  //       })
  //       .catch(err => console.error('Error accessing webcam', err));
  
  //     this.videoElement.addEventListener('loadedmetadata', async () => {
  //       const faces = await detector.estimateFaces(this.videoElement!);
  
  //       console.log(faces);
        
  //       // const displaySize = { width: this.videoElement!.videoWidth, height: this.videoElement!.videoHeight };
  //       // faceapi.matchDimensions(this.overlayElement!, displaySize); // Match dimensions here
  
  //       // this.faceDetectionInterval = setInterval(async () => {
  //       //   const detections = await faceapi.detectAllFaces(this.videoElement!, new faceapi.TinyFaceDetectorOptions())
  //       //     .withFaceLandmarks()
  //       //     .withFaceExpressions();
  
  //       //   const resizedDetections = faceapi.resizeResults(detections, displaySize);
  //       //   const canvasCtx = this.overlayElement!.getContext('2d')!;
  //       //   canvasCtx.clearRect(0, 0, this.overlayElement!.width, this.overlayElement!.height);
  //       //   faceapi.draw.drawDetections(this.overlayElement!, resizedDetections);
  //       //   faceapi.draw.drawFaceLandmarks(this.overlayElement!, resizedDetections);
  //       //   faceapi.draw.drawFaceExpressions(this.overlayElement!, resizedDetections);        
  //       // }, 100);
  //     });
  //   } catch (error) {
  //     console.error('Error on start video' ,error);
      
  //   }
  // }

  // onStopVideo() {
  //   if (this.videoStream) {
  //     this.videoStream.getTracks().forEach(track => track.stop()); // Stop each track
  //   }

  //   // Clear the overlay canvas
  //   const canvasCtx = this.overlayElement!.getContext('2d');
  //   if (canvasCtx) {
  //     canvasCtx.clearRect(0, 0, this.overlayElement!.width, this.overlayElement!.height);
  //   }
  // }

  showVideo: boolean = false;
  videoRef: any;
  stream: MediaStream | null = null;

  modelConfig: any;
  detector: any;
  model: any;
  isLoading: boolean = false;

  canvas: any;
  ctx: any;
  isDetecting: boolean = false;
  intervalId: any;

  errorMessage: string | null = null;

  faces: any;
  isCaptureImages: boolean = false;

  constructor() { }

  async ngOnInit() {
    await this.createModel();
  }

  async startCamera() {
    this.isLoading = true;
    await this.initCam();
    this.isLoading = false;
    this.showVideo = true;
  }

  async initCam() {
    try {
      this.videoRef = document.getElementById('video');
      this.videoRef.style.transform = 'scaleX(-1)';

      this.canvas = document.getElementById('canvas');
      this.ctx = this.canvas.getContext('2d');
      // await new Promise((resolve) => setTimeout(resolve, 2000));

      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream) => {
          this.stream = stream;
          this.videoRef.srcObject = stream;
        })
        .catch((err) => {
          console.error('Error accessing webcam:', err);
          this.errorMessage =
            'Webcam access error. Check connection and permissions. Stop and Retry.';
        });
    } catch (error) {
      console.error('Error in initCam:', error);
      this.errorMessage =
        'Something went wrong while initializing the webcam. Please stop and retry.';
    }
  } 

  async createModel() {
    this.model = faceDetection.SupportedModels.MediaPipeFaceDetector;

    this.modelConfig = {
      runtime: 'mediapipe',
      solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/face_detection',
    };

    this.detector = await faceDetection.createDetector(
      this.model,
      this.modelConfig
    );    
  }

  toggleDetection() {
    if (this.isDetecting) {
      // Start detection
      this.intervalId = setInterval(() => {
        this.predictedFaces();
      }, 0);
    } else {
      // Stop detection
      clearInterval(this.intervalId);
    }
  }

  async predictedFaces() {
    if (!this.detector) {
      console.error('Detector is not initialized');
      return;
    }

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // Draw the flipped video frame
    this.ctx.save();
    this.ctx.scale(-1, 1);
    this.ctx.drawImage(
      this.videoRef,
      -this.canvas.width,
      0,
      this.canvas.width,
      this.canvas.height
    );
    this.ctx.restore();

    const predictedFaces = await this.detector.estimateFaces(this.videoRef, {
      flipHorizontal: true,
    });    

    // Draw bounding boxes and keypoints
    //https://github.com/tensorflow/tfjs-models/tree/master/face-detection
    predictedFaces.forEach(
      (pred: {
        box: { xMin: any; yMin: any; width: any; height: any };
        keypoints: any[];
      }) => {
        // Draw the main face box
        this.ctx.beginPath();
        this.ctx.lineWidth = 4;
        this.ctx.strokeStyle = '#49ae16';
        this.ctx.rect(
          pred.box.xMin,
          pred.box.yMin,
          pred.box.width,
          pred.box.height
        );
        this.ctx.stroke();

        // Draw landmarks
        this.ctx.fillStyle = 'red';
        pred.keypoints.forEach((keypoint) => {
          this.ctx.fillRect(keypoint.x, keypoint.y, 5, 5);
        });
      }
    );

    if (this.isCaptureImages) {
      const imageDataURL = this.canvas.toDataURL('image/png');
      this.faces = {
        predictedFaces,
        image: imageDataURL
      }
    }
  }

  stopCamera() {
    if (this.stream) {
      // Stop all tracks of the stream
      this.stream.getTracks().forEach((track) => track.stop());
      this.videoRef.srcObject = null; // Clear the video source
      this.stream = null; // Reset the stream variable
    }
  
    // Optionally reset the canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvas.style.display = 'none'; // Hide the canvas if needed
  
    this.showVideo = false;
    this.isDetecting = false; // Reset detecting state if applicable
    this.errorMessage = ''; // Clear any error messages
    clearInterval(this.intervalId);
  }
}
