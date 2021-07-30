import { Button } from '@chakra-ui/react';
import { MouseEventHandler, ReactElement } from 'react';
import { DisplayType } from './types';

interface IProps {
  displayType: DisplayType;
  isActive?: boolean;
  children?: ReactElement;
  icon?: ReactElement;
  onClick?: MouseEventHandler;
}
export const SideNavigationItem = ({ displayType, ...props }: IProps) => {
  const renderDesktopAndMobile = () => {
    return (
      <Button
        leftIcon={props.icon}
        w="full"
        borderRadius="20px"
        border={props.isActive ? '0px' : '2px'}
        bg={props.isActive ? 'blue.400' : ''}
        textColor={props.isActive ? 'white' : ''}
        borderColor="blue.400"
        onClick={props.onClick}
      >
        {props.children}
      </Button>
    );
  };
  const renderTablet = () => {
    return (
      <Button
        leftIcon={props.icon}
        w="full"
        borderRadius="20px"
        border={props.isActive ? '0px' : '2px'}
        bg={props.isActive ? 'blue.400' : ''}
        textColor={props.isActive ? 'white' : ''}
        borderColor="blue.400"
        onClick={props.onClick}
      >
        {props.children}
      </Button>
    );
  };

  switch (displayType) {
    case DisplayType.Desktop:
      return renderDesktopAndMobile();
    case DisplayType.Mobile:
      return renderDesktopAndMobile();
    default:
      return renderTablet();
  }
};
