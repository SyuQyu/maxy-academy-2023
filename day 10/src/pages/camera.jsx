import React, { useEffect, useRef } from 'react';
import { Page, Navbar, BlockTitle, Button } from 'framework7-react';

const CameraPage = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error('Error accessing the camera:', error);
    }
  };

  const stopCamera = () => {
    const videoElement = videoRef.current;

    if (videoElement && videoElement.srcObject) {
      const stream = videoElement.srcObject;
      const tracks = stream.getTracks();

      tracks.forEach(track => track.stop());
    }
  };

  const takePhoto = () => {
    const video = videoRef?.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const { videoWidth, videoHeight } = video;

    canvas.width = videoWidth;
    canvas.height = videoHeight;
    context.drawImage(video, 0, 0, videoWidth, videoHeight);
    const photoDataUrl = canvas.toDataURL('image/png');
    document.getElementById('photo').setAttribute('src', photoDataUrl);
  };

  useEffect(() => {
    startCamera();

    return () => {
      stopCamera();
    };
  }, []);

  const handleBackClick = () => {
    stopCamera();
  };

  return (
    <Page>
      <Navbar title="Camera" onBackClick={handleBackClick} backLink="Back" />
      <BlockTitle>Access Camera</BlockTitle>
      <div className='camera'>
        <Button fill onClick={takePhoto}>Take Photo</Button>
        <video id='video' ref={videoRef} autoPlay playsInline />
      </div>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <BlockTitle>Output Camera</BlockTitle>
      <div className='output'>
        <img id='photo' alt='Captured Photo' />
      </div>
    </Page>
  );
};

export default CameraPage;
