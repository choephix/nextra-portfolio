import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const GalleryBackground = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  filter: blur(24px);
  transition: background 1.5s linear, filter 0.5s linear;

  &:hover {
    filter: blur(12px);
    transition: background 1.5s linear, filter 0.25s linear;
  }
`;

/**
 * Thumb image with rounded corners (12px) and a height of 120px.
 * Margin is 0.5rem.
 */
const Thumb = styled.img`
  height: 120px;
  width: auto;
  border-radius: 12px;
  margin: 0.5rem;
`;

/* A React component that is using the useState and useEffect hooks to create a gallery of images that
will scroll through the images every 3 seconds. */
const Gallery = () => {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  React.useEffect(() => {
    const handleResize = () => setWidth(ref.current?.offsetWidth || 0);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [!!ref.current]);

  const [images, setImages] = useState([]);
  useEffect(() => {
    setImages([
      `https://picsum.photos/seed/${Math.random()}/400/300`,
      `https://picsum.photos/seed/${Math.random()}/200/300`,
      `https://picsum.photos/seed/${Math.random()}/400/300`,
      `https://picsum.photos/seed/${Math.random()}/400/300`,
      `https://picsum.photos/seed/${Math.random()}/500/300`,
    ]);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setImages([...images.slice(1), images[0]]);
    }, 3000);
    return () => clearInterval(intervalId);
  }, [images]);

  return (
    <div
      ref={ref}
      className='gallery'
      style={{
        width: '100%',
        height: '400px',
        position: 'relative',
        background: 'skyblue',
      }}
    >
      <GalleryBackground style={{ backgroundImage: `url(${images[0]})` }}></GalleryBackground>
      {width} x 400
      <GallerySlider images={[...images, ...images, ...images]} />
    </div>
  );
};

/**
 *
 */
function GallerySlider(props: { images: string[] }) {
  const { images } = props;

  images.push(...images);

  return (
    <div
      className='image-list'
      style={{
        width: '100%',
        position: 'absolute',
        bottom: '12px',
        left: '12px',
      }}
    >
      <div
        style={{
          display: 'flex',
          animation: 'scrolling-images 30s linear infinite',
          overflow: 'hidden',
          width: '100%',
        }}
      >
        {images.map((image, index) => (
          <Thumb key={index} src={image} alt={`image${index}`} />
        ))}
      </div>
    </div>
  );
}

export default Gallery;
