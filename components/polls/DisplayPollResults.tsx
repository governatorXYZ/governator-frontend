import { Flex, VStack, Text } from '@chakra-ui/react'

import { Poll } from 'interfaces'
import { BiBarChartSquare } from 'react-icons/bi'
import Card from 'components/common/Card'
import PollGraph from 'components/polls/PollGraph'
// import TimeGraph from 'components/polls/TimeGraph'

type DisplayPollResultsProps = {
    pollData: Poll,
    voteData: any,
}
  
const DisplayPollResults: React.FC<DisplayPollResultsProps> = ({pollData, voteData}) => {

    const totalVotes = voteData && voteData.reduce((acc: number,cur: any) => {
        return acc += cur.count
    },0)

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
                <Card title='Total Votes:' value={totalVotes} />
                {/* <Card title='Unique Voters:' value='85' /> */}
            </Flex>

            <Flex width={450}>
                <PollGraph data={voteData}/>
            </Flex>
            {/* <Flex width={450}>
                <TimeGraph />
            </Flex> */}
        </VStack>
    )

}

export default DisplayPollResults
