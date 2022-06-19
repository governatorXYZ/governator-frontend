import { Button } from "@chakra-ui/react";

interface I_ButtonProps {
  text: string
  color: string
  onClick: () => void;
}

const CustomButton: React.FC<I_ButtonProps> = ({ ...props }) => {

  return (
    <Button
      variant='ghost'
      size='sm'
      color={`${props.color}.500`}
      _active={{
        color: 'white',
        backgroundColor: `${props.color}.300`,
      }}
      _hover={{
        color: 'white',
        backgroundColor: `${props.color}.500`,
      }}
      onClick={props.onClick}
    >{props.text}</Button>
  );

};

export default CustomButton;