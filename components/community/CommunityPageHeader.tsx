import {
  Heading,
  Button,
  HStack,
  Image,
  Flex,
} from '@chakra-ui/react'
import { useRouter } from 'next/router';

interface CommunityPageHeaderProps {
  icon?: string;
  name?: string;
}

const CommunityPageHeader = ({ icon, name }: CommunityPageHeaderProps) => {

  const router = useRouter();

  return (
    <HStack
      justify={{
        base: 'center',
        md: 'space-between'
      }}
      pt='25px'
      px='32px'
    >
      <Flex>
        { icon && <Image
          alt={`icon of ${name} discord server`}
          borderRadius='full'
          bg='#D9D9D9'
          src={icon}
          w='50px'
          h='50px'
          mr='16px'
        /> }
        <Heading
          color='white'
        >{ name }</Heading>
      </Flex>
      <Flex>
      { icon && <Flex
          bg='linear-gradient(to left, #FE35FB, #00FFFF 100%)'
          borderRadius='full'
          justify={'center'}
          align={'center'}
          p='2px'
          overflow={'hidden'}
        >
          <Button
            leftIcon={<Image src="/images/bar-chart-10.svg" alt="bar chart icon" />}
            onClick={() => router.push('/polls/create')}
            bg='#2a303a'
            color='white'
            borderRadius={'full'}
          >
            Create Poll
          </Button> 
        </Flex> }
      </Flex>
    </HStack>
  );
}

export default CommunityPageHeader
