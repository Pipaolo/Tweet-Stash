import { useMediaQuery } from '@chakra-ui/react';
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
  const [isDesktop, isTablet] = useMediaQuery([
    '(min-width:1024px)',
    '(min-width:768px)',
  ]);

  const renderNavigationBar = () => {
    if (isDesktop) {
      return <DesktopSideNavigationBar navItems={navigationItems} />;
    } else if (isTablet) {
      return <DesktopSideNavigationBar navItems={navigationItems} />;
    } else {
      return <MobileSideNavigationBar navItems={navigationItems} />;
    }
  };

  return renderNavigationBar();
};
