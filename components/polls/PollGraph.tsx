import { Chart as ChartJS, ArcElement, Tooltip, Legend, LegendItem, ChartData } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

type PollGraphProps = {
  data?: {
    id: number,
    title: string,
    count: number
  }[]
}

const PollGraph: React.FC<PollGraphProps> = ({ data }) => {

  const labels = data.map(_data => _data.title)
  const count = data.map(_data => _data.count)
  const sum = count.reduce((acc,cur) => acc+=cur,0.0)
  
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

  const pollData = {
    labels,
    datasets: [
      {
        label: '# of Votes',
        data: count,
        backgroundColor: backgroundColors.slice(0,labels.length),
        borderColor: borderColors.slice(0,labels.length),
        borderWidth: 1
      }
    ]
  }

  // const options = {
  //   legend: {
  //     display: false
  //   },
  //   legendCallback: (chartInstance: any) => {
  //     <div>hello world</div>
  //   }
  // }

  const options = {
    plugins: {
        legend: {
            display: true,
            position: 'left',
            labels: {
                color: 'white',
                font: {
                  size: 18
                },
                filter: (legendItem, data) => {
                  // First, retrieve the data corresponding to that label
                  const label = legendItem.text
                  const labelIndex = _.findIndex(data.labels, (labelName) => labelName === label) // I'm using lodash here
                  const qtd = data.datasets[0].data[labelIndex]
                  const percentage = (qtd*100/sum).toFixed(2)
                  
                  // Second, mutate the legendItem to include the new text
                  legendItem.text = `${percentage}% - ${legendItem.text}`
                  legendItem.count = qtd
                  
                  // Third, the filter method expects a bool, so return true to show the modified legendItem in the legend
                  return true
                },
                sort: (a: LegendItem, b: LegendItem): number => {
                  if (a.count < b.count) return 1
                  if (a.count > b.count) return -1
                  return 0
                }

            }
        }
    },
    layout: {
      padding: '0px 10px'
    }
}

  const dataBackup = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Pie data={pollData || dataBackup} options={options}/>
  )
}

export default PollGraph