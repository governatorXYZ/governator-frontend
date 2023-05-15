import { Button, Flex, Icon } from '@chakra-ui/react';
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
  remainingPages: Array<number>;
  goToPage: (page: number) => void;
}

const MoreButton = ({ 
  remainingPages,
  goToPage
}: IMoreButtonProps) => {
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

  const buttonArray: Array<number> = Array.from(
    { length: totalPages },
    (_, i) => i + 1
  );

  const buttonMapFn = (button: number) => (
  <Button
    onClick={() => goToPage(button)}
    bg={button === currentPage ? 'gray' : '#303F56' }
    key={button}
    borderRightRadius={0}
    borderLeftRadius={0}
  >
    {button}
  </Button>)

  const firstTwoPages = buttonArray.slice(0, 2).map(buttonMapFn)
  const remainingPages = buttonArray.slice(2, -2);
  const lastTwoPages = buttonArray.slice(-2).map(buttonMapFn);

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
      {firstTwoPages}
      <MoreButton
        goToPage={goToPage}
        remainingPages={remainingPages}
      />
      {lastTwoPages}
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