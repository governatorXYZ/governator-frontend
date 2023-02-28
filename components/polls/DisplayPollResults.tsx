import { 
    Flex, 
    VStack,
    Text,
    Tooltip,
    Center,
    Box,
    Stack,
    Heading,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Td,
    Tr,
    Table,
    List,
    UnorderedList,
    ListItem,
    Spinner
 } from '@chakra-ui/react'
 import { Icon } from '@chakra-ui/icon'

import {Poll} from 'interfaces'
import { BiBarChartSquare } from 'react-icons/bi'
import Card from 'components/common/Card'
import PollGraph from 'components/polls/PollGraph'
import {useState, useEffect} from "react";
import useStrategies from 'hooks/useStrategies'

// import TimeGraph from 'components/polls/TimeGraph'

type DisplayPollResultsProps = {
    pollData: Poll,
    voteData?: any,
    totalVotes?: string,
    onCountdownComplete?: (toggle: boolean) => void
    result?: any
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
    const MS_PER_DAY = 1000*60*60*24
    const MS_PER_HOUR = 1000*60*60
    const MS_PER_MINUTE = 1000*60
    const MS_PER_SECOND = 1000
    const deltaT_ms = deltaT(pollData.end_time, Date.now())
    const days = Math.floor(deltaT_ms / MS_PER_DAY) ? Math.floor(deltaT_ms / MS_PER_DAY) : 0
    const hours = Math.floor((deltaT_ms - (days*MS_PER_DAY)) / MS_PER_HOUR) ? Math.floor((deltaT_ms - (days*MS_PER_DAY)) / MS_PER_HOUR) : 0
    const minutes = Math.floor((deltaT_ms - (hours*MS_PER_HOUR + days*MS_PER_DAY)) / MS_PER_MINUTE) ? Math.floor((deltaT_ms - (hours*MS_PER_HOUR + days*MS_PER_DAY)) / MS_PER_MINUTE) : 0
    const seconds = Math.floor((deltaT_ms - (minutes*MS_PER_MINUTE + hours*MS_PER_HOUR + days*MS_PER_DAY)) / MS_PER_SECOND) ? Math.floor((deltaT_ms - (minutes*MS_PER_MINUTE + hours*MS_PER_HOUR + days*MS_PER_DAY)) / MS_PER_SECOND) : 0
    return {days, hours, minutes, seconds}
}

const Timer: React.FC<DisplayPollResultsProps> = ({pollData, onCountdownComplete}) => {

    const [countDown, setCountDown] = useState(getCountdown(pollData));

    const pad = (num: number) => {
        return num < 10 ? '0' + num : num;
    }

    useEffect(() => {
        let interval: any = null;
        if (deltaT(pollData.end_time,  Date.now()) <= 1000) {
            console.log('chanhged')
            onCountdownComplete!(false);
            return () => clearInterval(interval);
        }
        else {
          interval = setInterval(() => {
            setCountDown(getCountdown(pollData));
          }, 1000);
        }
        return () => clearInterval(interval);
      }), [countDown];

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

const ShieldBlock: React.FC<DisplayPollResultsProps> = ({pollData, totalVotes, onCountdownComplete}) => {

    return (
        <Center>
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
                    <Text as='b' fontSize='3xl'><Timer pollData={pollData} onCountdownComplete={onCountdownComplete}/></Text>
                </Center>
            </Box>
            <div id="shield">
            </div>
        </div>
        </Center>
    )
}

const ResultBlock: React.FC<DisplayPollResultsProps> = ({pollData, voteData, totalVotes}) => {

    return (
        <div>
            {
                !voteData.aggregate || voteData.aggregate.length === 0 ?
                <Flex
                    borderWidth='3px'
                    p='20px'
                    borderRadius='5'
                    borderColor='gray.600'
                    color='gray.600'
                    fontSize='2xl'
                    fontWeight='600'
                    mt='3rem'
                    alignItems='center'
                    mx='auto'
                    width='50%'
                    // maxW='max-content'
                >
                    <Box width='100%' backgroundColor='blue'>
                    </Box>
                    <VStack>
                    <Box>
                        <BiBarChartSquare fontSize='36px' />
                    </Box>
                    <Box>
                        <Text align='center'>
                            No Data
                        </Text>
                    </Box>
                    </VStack>
                    <Box width='100%' backgroundColor='yellow'>
                    </Box>
                </Flex> :
                <div>
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
                <Box>
                    <Card 
                        title='Total Votes'
                        value={totalVotes ?? '0'}
                    ></Card>
                </Box>
                </div>
            }
        </div>
    )
}

type BlockHeight = Array<{chain_id: string, block: string}>
const blockHeightsTable: React.FC<BlockHeight> = (blockHeight) => {

    if (!blockHeight) return (<Spinner size='xl' color='blue.500' />)

    if (typeof blockHeight === 'number') {
        return <Text color='gray.100'>{blockHeight}</Text>
    }

    return (
        <List>
            {blockHeight.map((item: any) => {
                return (
                    <ListItem key={item.chain_id}>
                        <Text paddingLeft='10px' pt='2' fontSize='sm' color='gray.100'>
                            Chain ID: {item.chain_id}, Block: {item.block} 
                        </Text>
                    </ListItem>
                )
            })}
        </List>        
    )
}

const PollResultStack: React.FC<DisplayPollResultsProps> = ({pollData, result}) => {

    const { strategies } = useStrategies();

    let strategyName = null
    let strategyType = null
    let strategyBlock = null
    if (pollData.strategy_config && pollData.strategy_config.length > 0) {
        strategyName = (strategies.find((strat: {label: string, value: string}) => strat.value === pollData.strategy_config[0].strategy_id ))?.label
        strategyType = pollData.strategy_config[0].strategy_type
        strategyBlock = pollData.strategy_config[0].block_height
    }

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
        ></Flex>

        <Stack 
            spacing='4' 
            width='100%'
            p='5px'
        >
            <Accordion
                style={{outline: 'none'}}
                defaultIndex={[0, 1, 2]}
                allowMultiple
            >
                <AccordionItem style={{outline: 'none', borderWidth: '0px'}}>
                    <h2>
                    <AccordionButton pl='0'>
                        <Box as="span" flex='1' textAlign='left'>
                        <Heading 
                            size='xs' 
                            textTransform='uppercase'
                            color='gray.100'
                        >
                            Description
                        </Heading>
                        </Box>
                        <Icon viewBox="0 0 24 24" aria-hidden>
                            <path
                                fill='white'
                                d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
                            />
                        </Icon>
                    </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <Text pt='2' fontSize='sm' color='gray.100'>
                            {pollData.description}
                        </Text>
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem style={{outline: 'none', borderWidth: '0px'}}>
                    <h2>
                    <AccordionButton pl='0'>
                        <Box as="span" flex='1' textAlign='left'>
                        <Heading 
                            size='xs' 
                            textTransform='uppercase'
                            color='gray.100'
                        >
                            Strategy
                        </Heading>
                        </Box>
                        <Icon viewBox="0 0 24 24" aria-hidden>
                            <path
                                fill='white'
                                d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
                            />
                        </Icon>
                    </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <VStack align='left' paddingLeft='10px'>
                            <Text as='b' pt='2' fontSize='sm' color='gray.100'>
                                Name
                            </Text>
                            <Text paddingLeft='10px' pt='2' fontSize='sm' color='gray.100'>
                                {strategyName ? strategyName : ''}
                            </Text>
                            <Text as='b' pt='2' fontSize='sm' color='gray.100'>
                                Type
                            </Text>
                            <Text paddingLeft='10px' pt='2' fontSize='sm' color='gray.100'>
                                {strategyType ? strategyType: ''}
                            </Text>
                            <Text as='b' pt='2' fontSize='sm' color='gray.100' fontStyle={'bold'}>
                                Block Height
                            </Text>
                            {strategyBlock ? blockHeightsTable(strategyBlock) : ''}
                        </VStack>
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem style={{outline: 'none', borderWidth: '0px'}}>
                    <h2>
                    <AccordionButton pl='0'>
                        <Box as="span" flex='1' textAlign='left'>
                        <Heading 
                            size='xs' 
                            textTransform='uppercase'
                            color='gray.100'
                        >
                            Result
                        </Heading>
                        </Box>
                        <Icon viewBox="0 0 24 24" aria-hidden>
                            <path
                                fill='white'
                                d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
                            />
                        </Icon>
                    </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        {result}
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
      </Stack>
      
    </VStack>
    )
}

const DisplayPollResults: React.FC<DisplayPollResultsProps> = ({pollData, voteData, totalVotes}) => {

    const [locked, setLocked] = useState(true)

    const onCountdownComplete = (toggle: boolean) => {
        setLocked(toggle)
    }

    if(locked) {
        return (
            < PollResultStack
                result={ShieldBlock({pollData, totalVotes, onCountdownComplete})}
                pollData={pollData}
            />
        )
    }
    else {
        return (
            < PollResultStack
                result={ResultBlock({pollData, voteData, totalVotes})}
                pollData={pollData}
            />
        )
    }

}

export default DisplayPollResults
