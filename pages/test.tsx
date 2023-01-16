import Link from 'next/link';
import Image from 'next/image';

import avatar from 'public/images/photo.jpg';
import avatarBW from 'public/images/photo2.jpg';
import Gallery from '../components/Gallery';

/**
 * It returns a div with a title attribute and a Gallery component
 * @returns A React component.
 */
export default function About() {
  return (
    <div title='About – Lee Robinson'>
      <Gallery />
      <Gallery />
      <Gallery />
    </div>
  );
}
