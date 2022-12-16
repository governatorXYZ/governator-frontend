import { Flex, VStack, Text, Tooltip, Center, Box } from '@chakra-ui/react'

import {Poll} from 'interfaces'
import { BiBarChartSquare } from 'react-icons/bi'
import Card from 'components/common/Card'
import PollGraph from 'components/polls/PollGraph'
import {useState, useEffect} from "react";

// import TimeGraph from 'components/polls/TimeGraph'

type DisplayPollResultsProps = {
    pollData: Poll,
    voteData: any,
    totalVotes: string,
}

type TimerProps = {
    pollData: Poll,
}

const getCountdown = (pollData : Poll) => {
    const deltaT_ms = new Date(pollData.end_time).getTime() - new Date(Date.now()).getTime()
    const days = Math.floor(deltaT_ms / (1000*60*60*24))
    const hours = Math.floor((deltaT_ms - (days*1000*60*60*24)) / (1000*60*60))
    const minutes = Math.floor((deltaT_ms - (hours*1000*60*60 + days*1000*60*60*24)) / (1000*60))
    const seconds = Math.floor((deltaT_ms - (minutes*1000*60 + hours*1000*60*60 + days*1000*60*60*24)) / (1000))
    return {days, hours, minutes, seconds}
}

const Timer: React.FC<TimerProps> = ({pollData}) => {

    const [countDown, setCountDown] = useState(getCountdown(pollData));
    const [isActive, setIsActive] = useState(true);

    const pad = (num: number) => {
        return num < 10 ? '0' + num : num;
    }

    // setCountDown(getCountdown())

    // const {days, hours, minutes, seconds} = getCountdown();

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
            label={'Ends on: ' + new Date(pollData.end_time).toLocaleDateString() + ' ' + new Date(pollData.end_time).toLocaleTimeString() + '\n'} 
            bg='white.400'
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

const DisplayPollResults: React.FC<DisplayPollResultsProps> = ({pollData, voteData, totalVotes}) => {

    // const totalVotes = voteData && voteData.aggregate && voteData.aggregate.reduce((acc: number,cur: any) => {
    //     return acc += cur.count
    // },0)

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
                {/* <Card title='Total Votes:' value={totalVotes} /> */}
            </Flex>

            <Flex
                justifyContent='space-evenly'
                alignItems='center'
                width='100%'
            >
                <div id="parent">
                    <Box style={{width:'100%', height:'100%', zIndex: '10', position: 'absolute'}}>
                        <Center style={{position: 'relative', top:'10%',  paddingLeft: 'auto', paddingRight: 'auto'}}>Total votes</Center>
                        <Center style={{position: 'relative', top:'15%',  paddingLeft: 'auto', paddingRight: 'auto'}}>{totalVotes}</Center>
                        <Center style={{position: 'relative', top:'20%',  paddingLeft: 'auto', paddingRight: 'auto'}}>Result unlocks in</Center>
                        <Center style={{position: 'relative', top:'25%',  paddingLeft: 'auto', paddingRight: 'auto'}}><Timer pollData={pollData} /></Center>
                    </Box>
                        {/* <Center style={{zIndex: '10', position: 'absolute', top:'30%',  paddingLeft: 'auto', paddingRight: 'auto' }}>Total votes</Center><br />
                        <Center style={{zIndex: '10', position: 'absolute', top:'45%', paddingLeft: 'auto', paddingRight: 'auto' }}>{totalVotes}</Center><br />
                        <Center style={{zIndex: '10', position: 'absolute', top:'60%', paddingLeft: 'auto', paddingRight: 'auto' }}> Result unlocks in </Center><br />
                        <Center style={{zIndex: '10', position: 'absolute', top:'75%', left:'33%' }}><Timer pollData={pollData} /></Center> */}
                    <div id="shield">
                    </div>
                </div>
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
            {/* <Flex width={450}>
                <TimeGraph />
            </Flex> */}
        </VStack>
    )

}

export default DisplayPollResults
