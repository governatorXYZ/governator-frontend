import { 
    Flex
} from '@chakra-ui/react';

import Card from 'components/common/Card'

const results = [{
    id: 1,
    title: 'Option 1',
    count: 20,
},{
    id: 2,
    title: 'Option 2',
    count: 20,
},{
    id: 3,
    title: 'Option 3',
    count: 20,
}]

const DisplayPollResults: React.FC = ({...props}) => {

    return (
        <Flex {...props}
            justifyContent='space-evenly'
            alignItems='center'
            >
            <Card title='Total Votes:' value='100' />
            <Card title='Unique Voters:' value='85' />

            {/* Graph Section */}
        </Flex>
    )

}

export default DisplayPollResults;