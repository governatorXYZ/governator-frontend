import { Box, Text, Flex, Image, Heading, GridItem } from '@chakra-ui/react'

interface ITeamMember {
  name: string;
  role: string | null;
  image: string | null;
  alumni: boolean;
}

interface TeamMemberProps {
  member: ITeamMember;
  grid: boolean;
}

const TeamMember: React.FC<TeamMemberProps> = ({ member, grid = true }) => {

  const TeamMemberContainer = grid ? GridItem : Box;

  return (
  <TeamMemberContainer>
    <Flex
      flexDir='column'
      alignItems='center'
      justifyContent='center'
      color='whiteAlpha.800'
    >
      { member.image ? (<Image
        borderRadius='full'
        alignSelf='center'
        src={member.image}
        alt={member.name}
        boxSize='150px'
        mb='16px'
      />) : (<Box mb='16px' bg='gray.600' borderRadius='full' w='150px' h='150px'/>) }
      <Heading
        fontSize='xl'
        as='h2'
        mb='8px'
      >{member.name}</Heading>
      { member.role && (<Heading
        fontSize='sm'
        mb='4px'
        as='h4'
      >{member.role}</Heading>) }
    </Flex>
  </TeamMemberContainer>
  )
}

export default TeamMember
