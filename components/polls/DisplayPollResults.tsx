import { 
    Flex, VStack, Text, Grid,
} from '@chakra-ui/react';

import { Poll } from 'interfaces'
import { BiBarChartSquare } from 'react-icons/bi'
import Card from 'components/common/Card'
import PollGraph from 'components/polls/PollGraph'

const results = [{
    id: 1,
    title: 'Option 1',
    count: 20,
},{
    id: 2,
    title: 'Option 2',
    count: 30,
},{
    id: 3,
    title: 'Option 3',
    count: 80,
}]

type DisplayPollResultsProps = {
    pollData: Poll
}
  
const DisplayPollResults: React.FC<DisplayPollResultsProps> = ({pollData}) => {

    return (
        <VStack spacing='16px'>
            <Flex
                color='gray.100'
                fontSize='2xl'
                fontWeight='600'
                mt='3rem'
                alignItems='center'
                mx='auto'
                maxW='max-content'>
                <BiBarChartSquare fontSize='36px' />
                <Text as='span' display='block' align='center' ml='1rem'>
                    {pollData.title || 'Loading...'}
                </Text>
            </Flex>
            <Flex
                justifyContent='space-evenly'
                alignItems='center'
                width='100%'>
                <Card title='Total Votes:' value='100' />
                <Card title='Unique Voters:' value='85' />
            </Flex>

            <Flex width={450}>
                <PollGraph data={results}/>
            </Flex>

            <Grid>
                Voters
            </Grid>
        </VStack>
    )

}

export default DisplayPollResults;