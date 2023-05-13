import {
  TabPanels,
  TabPanel,
  TabList,
  Flex,
  Tabs,
  Box,
  Tab,
} from '@chakra-ui/react'
import { PageControls } from 'components/common';
import { PollResponseDto } from 'governator-sdk';
import usePaginator from 'hooks/usePaginator';
import CommunityPollCard from './CommunityPollCard';

interface CommunityPollCardProps {
  livePolls: PollResponseDto[];
  closedPolls: PollResponseDto[];
}

const CommunityPollLists = ({
  livePolls,
  closedPolls
}: CommunityPollCardProps) => {

  const {
    currentPage: closedPollsCurrentPage,
    totalPages: closedPollsTotalPages,
    prevPage: closedPollsPreviousPage,
    nextPage: closedPollsNextPage,
    goToPage: closedPollsGoToPage,
    page: closedPollsPage,
  } = usePaginator<PollResponseDto>(closedPolls);

  const ClosedPolls = closedPollsPage.map((poll: PollResponseDto) => (
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
                w={{
                  base: '100vw',
                  md: '810px'
                }}
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
                w={{
                  base: '100vw',
                  md: '810px'
                }}
                h='300px'
              >
                There are no live polls in your communities.
              </Flex>) }
              <PageControls
                totalPages={closedPollsTotalPages}
                currentPage={closedPollsCurrentPage}
                previousPage={closedPollsPreviousPage}
                nextPage={closedPollsNextPage}
                goToPage={closedPollsGoToPage}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
  );
}

export default CommunityPollLists
