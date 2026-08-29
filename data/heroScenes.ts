export interface HeroScene {
  id: string;
  video: string;
  poster: string;
  headline: string;
  headlineAccent?: string;
  description: string;
  primary: {
    label: string;
    action: 'play' | 'scroll' | 'link';
    target?: string;
  };
  secondary?: {
    label: string;
    action: 'archive' | 'scroll' | 'link';
    target?: string;
  };
  objectPosition?: string;
}

export const heroScenes: HeroScene[] = [
  {
    id: 'evidence',
    video: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260723_145606_ab143199-b593-4941-bb1b-9afca215416b.mp4',
    poster: '/THE GIRAGON.png',
    headline: 'Everything I Make',
    headlineAccent: 'Leaves Evidence.',
    description: 'Music, imagery, memory and creation assembled into one evolving body of work. Enter the current KingShadP experience.',
    primary: {
      label: 'LISTEN NOW',
      action: 'play',
    },
    secondary: {
      label: 'ENTER THE ARCHIVE →',
      action: 'scroll',
      target: 'archive-index',
    },
    objectPosition: 'center 35%',
  },
  {
    id: 'remembered',
    video: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260723_145606_ab143199-b593-4941-bb1b-9afca215416b.mp4',
    poster: '/ROSE GOLD GIRAGON.png',
    headline: 'Made to Be Heard.',
    headlineAccent: 'Built to Be Remembered.',
    description: 'Sculpted acoustic frequencies meets architectural minimalism in the ongoing KingShadP chronology.',
    primary: {
      label: 'LISTEN NOW',
      action: 'play',
    },
    secondary: {
      label: 'EXPLORE THE WORK →',
      action: 'scroll',
      target: 'the-work',
    },
    objectPosition: 'center 40%',
  },
];
