import { Button } from "@chakra-ui/react";

interface I_ButtonProps {
  text: string
  onClick: () => void;
}

const CustomButton: React.FC<I_ButtonProps> = ({ ...props }) => {

  return (
    <Button
      variant='ghost'
      size='sm'
      color='purple.500'
      _active={{
        color: 'white',
        backgroundColor: 'purple.300',
      }}
      _hover={{
        color: 'white',
        backgroundColor: 'purple.500',
      }}
      onClick={props.onClick}
    >{props.text}</Button>
  );

};

export default CustomButton;