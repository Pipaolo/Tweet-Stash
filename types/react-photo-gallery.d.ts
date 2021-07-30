import 'react-photo-gallery';
import { Status } from 'twitter-d';

declare module 'react-photo-gallery' {
  interface RenderImageProps {
    tweet?: Status | undefined;
  }
}
