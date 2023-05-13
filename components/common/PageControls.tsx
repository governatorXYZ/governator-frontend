import { Button, chakra, Flex, Icon, Input, Text } from '@chakra-ui/react';
import { useState } from 'react'
import { FaEllipsisH } from 'react-icons/fa';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'

interface IPageControlsProps {
  totalPages: number;
  currentPage: number;
  previousPage: () => void;
  nextPage: () => void;
  goToPage: (page: number) => void;
  pageToDisplay?: number;
}

interface IMoreButtonProps {
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
}

const MoreButton = ({ 
  currentPage,
  totalPages,
  goToPage
}: IMoreButtonProps) => {
  const remainingPages = Array.from(
    { length: totalPages - currentPage },
    (_, index) => currentPage + index + 1
  );

  return (
    <Menu>
      <MenuButton
        as={Button}
        borderRightRadius={0}
        borderLeftRadius={0}
        bg='#303F56'
      >
        <Icon as={FaEllipsisH} />
      </MenuButton>
      <MenuList bg='#303F56'>
        {remainingPages.map((page) => (
          <MenuItem onClick={() => goToPage(page)} key={page}> 
            {page}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )

}

const PageControls: React.FC<IPageControlsProps> = ({ 
  previousPage,
  currentPage,
  totalPages,
  nextPage,
  goToPage,
  pageToDisplay=9
}) => {
  const [startPage, setStartPage] = useState(1);

  const handleNextPage = () => {
    if (currentPage + 1 > startPage + pageToDisplay - 1) {
      setStartPage(Math.min(startPage + pageToDisplay, totalPages - pageToDisplay + 1));
    }
    nextPage();
  };

  const handlePreviousPage = () => {
    if (currentPage - 1 < startPage) {
      setStartPage(Math.max(startPage - pageToDisplay, 1));
    }
    previousPage();
  };

  const buttonArray: Array<number | null> = Array.from(
    { length: pageToDisplay },
    (_, i) => startPage + i
  );

  return (
    <Flex
      justify='center'
      align='center'
      color='white'
    >
      <Button
        borderRightRadius={0}
        onClick={handlePreviousPage}
        bg='#303F56'
      >
        <Icon as={FiChevronLeft} />
      </Button>
      {buttonArray.map((button) => button ? (
        <Button
          bg={button === currentPage ? 'gray' : '#303F56' }
          key={button}
          onClick={() => goToPage(button)}
          borderRightRadius={0}
          borderLeftRadius={0}
        >
          {button}
        </Button>
      ) : null)}
      <Button
        borderLeftRadius={0}
        onClick={handleNextPage}
        bg='#303F56'
      >
        <Icon as={FiChevronRight} />
      </Button>
    </Flex>
  );

};

export default PageControls;