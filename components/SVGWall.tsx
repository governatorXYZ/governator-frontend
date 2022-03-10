import { Grid } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { sample, uniqueId } from 'lodash'

const getBackgroundColor = () =>
  sample(['#29303A', '#1A202C', '#171923', '#000', '#000', '#000', '#000'])

const SVGBox: React.FC = () => (
  <motion.div
    initial={{
      backgroundColor: getBackgroundColor(),
    }}
    animate={{
      backgroundColor: getBackgroundColor(),
    }}
    transition={{
      ease: 'linear',
      duration: 2,
      delay: 2,
      repeatDelay: 1,
      repeat: Infinity,
      repeatType: 'mirror',
    }}
  />
)

const SVGWall: React.FC = () => (
  <Grid
    height='25px'
    width='120vw'
    templateRows='repeat(2, 1fr)'
    templateColumns='repeat(auto-fill, 12.5px)'
  >
    {Array.from({ length: 4 }).map((_, __) =>
      Array.from({ length: 120 }).map((_, __) => <SVGBox key={uniqueId()} />)
    )}
  </Grid>
)

export default SVGWall
