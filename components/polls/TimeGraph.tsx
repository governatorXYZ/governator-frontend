import React from 'react';
import moment from 'moment';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type TimeGraphProps = {
  data?: {
    author_id: string,
    vote: number,
    created_at: string
  }[]
}


const votes = [{
  author_id: 'id_1',
  vote: 1,
  created_at: '2022-03-12 14:30:00.000Z'
},{
  author_id: 'id_2',
  vote: 1,
  created_at: '2022-03-11 14:30:00.000Z'
},{
  author_id: 'id_3',
  vote: 2,
  created_at: '2022-03-22 14:30:00.000Z'
},{
  author_id: 'id_4',
  vote: 2,
  created_at: '2022-03-21 14:30:00.000Z'
},{
  author_id: 'id_5',
  vote: 2,
  created_at: '2022-03-08 14:30:00.000Z'
},{
  author_id: 'id_6',
  vote: 2,
  created_at: '2022-03-13 14:30:00.000Z'
},{
  author_id: 'id_7',
  vote: 2,
  created_at: '2022-03-08 14:30:00.000Z'
},{
  author_id: 'id_8',
  vote: 2,
  created_at: '2022-03-11 14:30:00.000Z'
},{
  author_id: 'id_9',
  vote: 3,
  created_at: '2022-03-20 14:30:00.000Z'
},{
  author_id: 'id_10',
  vote: 3,
  created_at: '2022-03-19 14:30:00.000Z'
},{
  author_id: 'id_11',
  vote: 3,
  created_at: '2022-03-21 14:30:00.000Z'
},{
  author_id: 'id_12',
  vote: 3,
  created_at: '2022-03-14 14:30:00.000Z'
},{
  author_id: 'id_13',
  vote: 3,
  created_at: '2022-03-28 14:30:00.000Z'
}]

export const graphOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Total Votes Over Time',
    },
  },
};

const TimeGraph: React.FC<TimeGraphProps> = ({ data }) => {

  const backgroundColors = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)',
  ]
  const borderColors = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
  ]

  const dates = votes.map(_vote => moment(_vote.created_at))
  const MAX_DATE = moment.max(dates)
  const MIN_DATE = moment.min(dates).startOf('week')
  const weeks: string[] = []
  let week = MIN_DATE;

  while ( week <= MAX_DATE ) {
    weeks.push( week.format('DD/MM/YYYY'));
    week = week.clone().add(1,'week')
  }

  console.log({weeks})

  const options = Array.from(new Set(votes.map(_vote => _vote.vote)))

  /* Create results cumulative sum */
  const votesOverTime: any = options.reduce((acc,_option) => {
    acc[_option] = weeks.reduce((weeks_acc, _week) => {
      weeks_acc[_week] = {
        count: 0,
        voters: []
      }
      return weeks_acc
    },{})
    return acc
  },{})

  console.log({votesOverTime})

  /* Populate votesOverTime */
  votes.map(_vote => {
    const voteDate = moment(_vote.created_at).startOf('week').format('DD/MM/YYYY')
    votesOverTime[_vote.vote][voteDate]['count'] += 1
    votesOverTime[_vote.vote][voteDate]['voters'].push(_vote.author_id)
    return null
  })

  console.log({votesOverTime})

  /* Make results into cumsum */
  /* For each option */
  options.map(_option => {
    let cumSumCount = 0
    /* For each date */
    weeks.map(_week => {
      cumSumCount += votesOverTime[_option][_week]['count']
      votesOverTime[_option][_week]['cumSumCount'] = cumSumCount
    })  
  })

  console.log({votesOverTime})

  /* Define graph data */
  const labels = weeks
  const datasets = options.map((_option,idx) => {
    return {
      label: _option,
      data: Object.values(votesOverTime[_option]).map(_data => _data.cumSumCount),
      borderColor: borderColors[idx],
      backgroundColor: backgroundColors[idx]
    }
  })

  const graphData = {
    labels,
    datasets
  }

  console.log({graphData})

  return (
    <Line data={graphData} options={graphOptions}/>
  )


}

export default TimeGraph;