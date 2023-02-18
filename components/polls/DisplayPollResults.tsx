import { 
    AccordionButton,
    AccordionPanel,
    AccordionItem,
    Accordion,
    ListItem,
    Heading,
    Tooltip,
    Spinner,
    Center,
    VStack,
    Stack,
    Flex, 
    Text,
    List,
    Box,
 } from '@chakra-ui/react'
 import { Icon } from '@chakra-ui/icon'

import {Poll} from 'interfaces'
import { BiBarChartSquare } from 'react-icons/bi';
import Card from 'components/common/Card';
import PollGraph from 'components/polls/PollGraph';
import { useState, useEffect, useMemo } from "react";
import useStrategies from 'hooks/useStrategies'
import { useTimer } from 'hooks/useTimer';
import type { Timer } from 'hooks/useTimer';
import type { BlockHeight } from 'interfaces';
import type { VoteData } from 'hooks/useVoteData';

// import TimeGraph from 'components/polls/TimeGraph'

type PollData = {
    pollData: Poll;
    voteData: VoteData;
    totalVotes: string;
}

type DisplayPollResultsProps = PollData;

type ResultBlockProps = PollData;

type PollResultStack = PollData & {
    strategy?: PollStrategy;
    locked: boolean;
    duration?: Duration;
    endTime?: Date;
}

// type for PollStrategy
type PollStrategy = {
    name: string;
    type: string;
    blockHeight: BlockHeight[];
}

// poll timer props.
type PollTimerProps = {
    duration: Duration;
    endTime: Date;
}

type ShieldBlockProps = {
    totalVotes: string;
    duration?: Duration;
    endTime?: Date;
}

const Timer: React.FC<PollTimerProps> = ({ duration, endTime }) => {


    const pad = (num?: number) => (num?.toString().padStart(2, '0') ?? '00');
    const [label, _setLabel] = useState<string>(`${endTime.toLocaleDateString()} ${endTime.toLocaleTimeString()}`);
    
    const timerDisplay = useMemo(
        () => `${pad(duration.days)} : ${pad(duration.hours)} : ${pad(duration.minutes)} : ${pad(duration.seconds)}`,
        [duration]
    );

    return (
        <Tooltip 
            label={label}
            bg='dark-1'
            hasArrow
        >
            <Center>
                <Text>{ timerDisplay }</Text>
            </Center>
        </Tooltip>
    )
}

const ShieldBlock: React.FC<ShieldBlockProps> = ({ 
    totalVotes,
    duration,
    endTime
}) => {

    return (
        <Center>
            <div id="parent">
                <Box style={{ width: '100%', height: '10%', backgroundColor: 'blue', zIndex: '10', position: 'absolute' }}>
                    <Center><Text as='b' color='white'>Result Shielded</Text></Center>
                </Box>
                <Box style={{ width: '100%', height: '100%', zIndex: '10', position: 'absolute' }}>
                    <Center style={{ position: 'relative', top: '14%', paddingLeft: 'auto', paddingRight: 'auto' }}>
                        <Text as='b'>Total votes</Text>
                    </Center>
                    <Center style={{ position: 'relative', top: '14%', paddingLeft: 'auto', paddingRight: 'auto' }}>
                        <Text as='b' fontSize='3xl'>{totalVotes ?? (<Spinner />)}</Text>
                    </Center>
                    <Center style={{ position: 'relative', top: '15%', paddingLeft: 'auto', paddingRight: 'auto' }}>
                        <Text as='b'>Unlocks in</Text>
                    </Center>
                    <Center style={{ position: 'relative', top: '17%', paddingLeft: 'auto', paddingRight: 'auto' }}>
                        <Text as='b' fontSize='3xl'>
                            { duration && endTime ? <Timer duration={duration} endTime={endTime} /> : (<Spinner size="3xl" />) }
                        </Text>
                    </Center>
                </Box>
                <div id="shield">
                </div>
            </div>
        </Center>
    )
}

const Loader = () => (
    <Flex
      justify='center'
      align='center'
      h='100%'
      p='2rem'
    >
      <Spinner color='white' size='xl' />
    </Flex>
  );

const ResultBlock: React.FC<ResultBlockProps> = ({pollData, voteData, totalVotes}) => {

    // if undefined loading...
    if (!voteData) return (<Loader />)

    // if aggregate is empty, no data.
    if (voteData.aggregate.length === 0) return (
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
        </Flex>
    );
    
    // otherwise render the chart.
    return (
        <>
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
        </>
    );
}

const BlockHeightsTable: React.FC<{ blockHeight: Array<BlockHeight> | number }> = ({ blockHeight }) => {
    return (
        <List>
            {Array.isArray(blockHeight) ? (blockHeight.map((item: any) => {
                return (
                    <ListItem key={item.chain_id}>
                        <Text paddingLeft='10px' pt='2' fontSize='sm' color='gray.100'>
                            Chain ID: {item.chain_id}, Block: {item.block} 
                        </Text>
                    </ListItem>
                )
            })) : (
                <ListItem>
                    <Text paddingLeft='10px' pt='2' fontSize='sm' color='gray.100'>
                        Block: {blockHeight}
                    </Text>
                </ListItem>
            )}
        </List>        
    )
}

const PollResultStack: React.FC<PollResultStack> = ({
    pollData,
    voteData,
    totalVotes,
    strategy,
    locked,
    duration,
    endTime
}) => {
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
                    style={{ outline: 'none' }}
                    defaultIndex={[0, 1, 2]}
                    allowMultiple
                >
                    <AccordionItem style={{ outline: 'none', borderWidth: '0px' }}>
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

                    <AccordionItem style={{ outline: 'none', borderWidth: '0px' }}>
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
                                { strategy ? (
                                    <>
                                        <Text pt='2' fontSize='sm' color='gray.100'>
                                            {`Name: ${strategy.name ?? ''}`}
                                        </Text>
                                        <Text pt='2' fontSize='sm' color='gray.100'>
                                            {`Type: ${strategy.type ?? ''}`}
                                        </Text>
                                        <Text pt='2' fontSize='sm' color='gray.100'>Block height</Text>
                                        <BlockHeightsTable blockHeight={strategy.blockHeight} />
                                    </>
                                ) : (<Flex alignItems={'center'} justifyContent={'center'}><Spinner color='white' size='3xl' /></Flex>) }
                            </VStack>
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem style={{ outline: 'none', borderWidth: '0px' }}>
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
                           { locked ? (<ShieldBlock
                                totalVotes={totalVotes}
                                duration={duration}
                                endTime={endTime}
                            />) : (<ResultBlock
                                pollData={pollData}
                                voteData={voteData}
                                totalVotes={totalVotes}
                             />)}
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </Stack>

        </VStack>
    )
}

const DisplayPollResults: React.FC<DisplayPollResultsProps> = ({
    pollData,
    voteData,
    totalVotes
}) => {
    const [strategy, setStrategy] = useState<PollStrategy>();
    const { duration, isTimeUp, endTime } = useTimer(pollData.end_time)
    const { strategies } = useStrategies();
    
    useEffect(() => {
        if (pollData.strategy_config && pollData.strategy_config.length > 0) {
            const [firstStrategy] = pollData.strategy_config;
            const { strategy_id, strategy_type: type, block_height: blockHeight } = firstStrategy;

            const name = strategies.find(({ value }: { label: string, value: string }) => value === strategy_id)?.label ?? 'N/A';
            setStrategy({
                name,
                type,
                blockHeight
            });
        }
    }, [strategies, pollData.strategy_config]);

    return (
        <PollResultStack
            pollData={pollData}
            voteData={voteData}
            totalVotes={totalVotes}
            strategy={strategy}
            locked={!isTimeUp}
            duration={duration}
            endTime={endTime}
        />
    )

}

export default DisplayPollResults
