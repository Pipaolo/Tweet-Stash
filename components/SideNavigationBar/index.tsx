import { FaHome } from 'react-icons/fa';
import { GrGallery } from 'react-icons/gr';
import { HiOutlineDocumentDuplicate } from 'react-icons/hi';

import { INavigationItem } from './types';
import { DesktopSideNavigationBar } from './DesktopSideNavigationBar';
import { MobileSideNavigationBar } from './MobileSideNavigationBar';

const navigationItems: INavigationItem[] = [
  {
    name: 'Home',
    route: '/home',
    icon: <FaHome />,
  },
  {
    name: 'Saved Retweets',
    route: '/retweets',
    icon: <HiOutlineDocumentDuplicate />,
  },
  {
    name: 'Retweet Gallery',
    route: '/gallery',
    icon: <GrGallery />,
  },
];

export const SideNavigationBar = () => {
  return (
    <>
      <MobileSideNavigationBar
        display={['block', 'block', 'none']}
        navItems={navigationItems}
      />
      <DesktopSideNavigationBar
        display={['none', 'none', 'flex']}
        navItems={navigationItems}
      />
    </>
  );
};
