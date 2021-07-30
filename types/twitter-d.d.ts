import 'twitter-d';

declare module 'twitter-d' {
  interface Status {
    text?: string;
    isSaved?: boolean;
  }
}
