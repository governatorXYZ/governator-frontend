import { Box, Text, Flex, Image, Heading, GridItem } from '@chakra-ui/react'

interface ITeamMember {
  name: string;
  role: string | null;
  image: string | null;
  alumni: boolean;
}

interface TeamMemberProps {
  member: ITeamMember;
  grid?: boolean;
}

const TeamMember: React.FC<TeamMemberProps> = ({ member, grid = true }) => {

  const TeamMemberContainer = grid ? GridItem : Box;

  const MemberImage = () => {
    if (!member.image) return (
      <Box mb='16px' bg='gray.600' borderRadius='full' w='150px' h='150px' overflow={'hidden'} position='relative'>
        <Box position='absolute'
          w='100%'
          h='100%'
          top='25%'
          right='25%'
          bg='gray.500'
          borderRadius={'60px 75px 40px 0'}
          
        />
      </Box>
    );

    return (
      <Image
        borderRadius='full'
        alignSelf='center'
        src={member.image}
        alt={member.name}
        boxSize='150px'
        mb='16px'
      />
    )
  }

  const MemberRole = () => {
    if (!member.role) return null;

    return (
      <Heading
        fontSize='sm'
        mb='4px'
        as='h4'
      >{member.role}</Heading>
    )
  }

  return (
  <TeamMemberContainer>
    <Flex
      flexDir='column'
      alignItems='center'
      justifyContent='center'
      color='whiteAlpha.800'
    >
      <MemberImage />
      <Heading
        fontSize='xl'
        as='h2'
        mb='8px'
      >{member.name}</Heading>
      <MemberRole />
    </Flex>
  </TeamMemberContainer>
  )
}

export default TeamMember
