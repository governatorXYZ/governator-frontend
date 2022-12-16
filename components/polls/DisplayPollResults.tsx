import { Flex, VStack, Text, Tooltip, Center, Box } from '@chakra-ui/react'

import {Poll} from 'interfaces'
import { BiBarChartSquare } from 'react-icons/bi'
import Card from 'components/common/Card'
import PollGraph from 'components/polls/PollGraph'
import {useState, useEffect} from "react";

// import TimeGraph from 'components/polls/TimeGraph'

type DisplayPollResultsProps = {
    pollData: Poll,
    voteData?: any,
    totalVotes?: string,
}

const deltaT = (date1: string | number, date2: string | number) => {
    let deltaT_ms = null;
    try {
        deltaT_ms = new Date(date1).getTime() - new Date(date2).getTime()
    } catch {
        deltaT_ms = 1000;
    }
    return deltaT_ms;
}

const getCountdown = (pollData : Poll) => {
    const deltaT_ms = deltaT(pollData.end_time, Date.now())
    const days = Math.floor(deltaT_ms / (1000*60*60*24))
    const hours = Math.floor((deltaT_ms - (days*1000*60*60*24)) / (1000*60*60))
    const minutes = Math.floor((deltaT_ms - (hours*1000*60*60 + days*1000*60*60*24)) / (1000*60))
    const seconds = Math.floor((deltaT_ms - (minutes*1000*60 + hours*1000*60*60 + days*1000*60*60*24)) / (1000))
    return {days, hours, minutes, seconds}
}

const Timer: React.FC<DisplayPollResultsProps> = ({pollData}) => {

    const [countDown, setCountDown] = useState(getCountdown(pollData));
    const [isActive, setIsActive] = useState(true);

    const pad = (num: number) => {
        return num < 10 ? '0' + num : num;
    }

    useEffect(() => {
        let interval: any = null;
        if (isActive) {
          interval = setInterval(() => {
            setCountDown(getCountdown(pollData));
          }, 1000);
        } else if (!isActive) {
          clearInterval(interval);
        }
        return () => clearInterval(interval);
      });

    return (
        <Tooltip 
            hasArrow 
            label={new Date(pollData.end_time).toLocaleDateString() + ' ' + new Date(pollData.end_time).toLocaleTimeString()} 
            bg='dark-1'
        >
            <Center>
                <Text>
                {
                    pad(countDown.days) + ' : ' + 
                    pad(countDown.hours) + ' : ' + 
                    pad(countDown.minutes) + ' : ' + 
                    pad(countDown.seconds) 
                }   
                </Text>
            </Center>

        </Tooltip>
    )
}

const ShieldBlock: React.FC<DisplayPollResultsProps> = ({pollData, totalVotes}) => {

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
                width='100%'
            >
                <div id="parent">
                    <Box style={{width:'100%', height:'10%', backgroundColor: 'blue', zIndex: '10', position: 'absolute'}}>
                        <Center><Text as='b' color='white'>Result Shielded</Text></Center>
                    </Box>

                    <Box style={{width:'100%', height:'100%', zIndex: '10', position: 'absolute'}}>
                        <Center style={{position: 'relative', top:'14%',  paddingLeft: 'auto', paddingRight: 'auto'}}>
                            <Text as='b'>Total votes</Text>
                        </Center>
                        <Center style={{position: 'relative', top:'14%',  paddingLeft: 'auto', paddingRight: 'auto'}}>
                            <Text as='b' fontSize='3xl'>{totalVotes}</Text>
                        </Center>
                        <Center style={{position: 'relative', top:'15%',  paddingLeft: 'auto', paddingRight: 'auto'}}>
                            <Text as='b'>Unlocks in</Text>
                        </Center>
                        <Center style={{position: 'relative', top:'17%',  paddingLeft: 'auto', paddingRight: 'auto'}}>
                            <Text as='b' fontSize='3xl'><Timer pollData={pollData} /></Text>
                        </Center>
                    </Box>
                    <div id="shield">
                    </div>
                </div>
            </Flex>
        </VStack>
    )
}

const resultBlock: React.FC<DisplayPollResultsProps> = ({pollData, voteData, totalVotes}) => {

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
                width='100%'
                height='100px'>
                <Card title='Total Votes:' value={totalVotes ?? 'NaN'} />
            </Flex>
            <Flex width={450}>
                <PollGraph
                    pollData={pollData}
                    voteData={voteData.aggregate as {
                    _id: string
                    percent: string
                    vote_power: string
                }[]}
                />
            </Flex>
        </VStack>
    )
}

const DisplayPollResults: React.FC<DisplayPollResultsProps> = ({pollData, voteData, totalVotes}) => {

    return (
        <div>
            {
            deltaT(pollData.end_time, Date.now()) > 0 ? 

            ShieldBlock({pollData, totalVotes}) :

            resultBlock({pollData, voteData, totalVotes})        
            }
        </div>
    )

}

export default DisplayPollResults
