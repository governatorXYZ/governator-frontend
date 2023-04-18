import {
  TabPanels,
  TabPanel,
  TabList,
  Flex,
  Tabs,
  Box,
  Tab,
} from '@chakra-ui/react'
import { PollResponseDto } from 'governator-sdk';
import CommunityPollCard from './CommunityPollCard';

interface CommunityPollCardProps {
  livePolls: PollResponseDto[];
  closedPolls: PollResponseDto[];
}

const CommunityPollLists = ({
  livePolls,
  closedPolls
}: CommunityPollCardProps) => {

  const ClosedPolls = closedPolls.map((poll) => (
    <CommunityPollCard
      channel={poll.client_config[0]}
      description={poll.description}
      author={poll.author_user_id}
      endDate={poll.end_time}
      title={poll.title}
      id={poll._id}
      key={poll._id}
    />
  ));

  const LivePolls = livePolls.map((poll) => (
    <CommunityPollCard
      channel={poll.client_config[0]}
      description={poll.description}
      author={poll.author_user_id}
      endDate={poll.end_time}
      title={poll.title}
      key={poll._id}
      id={poll._id}
    />
  ));

  return (
    <Box>
        <Tabs align='center'>
          <TabList
            borderColor='#7F9AC7'
            color='rgba(255,255,255,0.3)'
            borderBottomWidth='0.5px'
            pb='2px'
          >
            <Tab
              borderBottomWidth='3px'
              _selected={{
                color: 'rgba(255,255,255,1)',
                borderBottomColor: '#7F9AC7'                
              }}
              px='0'
              mr='1em'
            >
              Live Polls
            </Tab>
            <Tab
              borderBottomWidth='4px'
              _selected={{
                color: 'rgba(255,255,255,1)',
                borderBottomColor: '#7F9AC7'                
              }}
              px='0'
            >
              Closed Polls
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              { livePolls.length > 0 ? (LivePolls) : (              <Flex
                borderRadius='10px'
                justify='center'
                align='center'
                color='white'
                bg='#303F56'
                w='810px'
                h='300px'
              >
                There are no live polls in your communities.
              </Flex>) }
            </TabPanel>
            <TabPanel>
              { closedPolls.length > 0 ? (
                ClosedPolls
              ) : (
              <Flex
                borderRadius='10px'
                justify='center'
                align='center'
                color='white'
                bg='#303F56'
                w='810px'
                h='300px'
              >
                There are no live polls in your communities.
              </Flex>) }
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
  );
}

export default CommunityPollLists
