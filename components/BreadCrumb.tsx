import React from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'

import { GovBotContext, T_crumbs } from './context-provider/provider'

const Govcrumb: React.FC = () => {
  return (
    <GovBotContext.Consumer>
      {({state, dispatch}) => {

        console.log({GOVCRUMBS: state.crumbs})

        return (
          <Breadcrumb
            spacing='8px'
            separator={<ChevronRightIcon color='gray.500' />}
            color='gray.300'>
            {state.crumbs.map((_crumb: T_crumbs, idx: number) => {
              return (
                <BreadcrumbItem key={idx}>
                  <BreadcrumbLink href={_crumb.href}>
                    {_crumb.name}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              )
            })}
          </Breadcrumb>
        )
      }}
    </GovBotContext.Consumer>
  )
}

export default Govcrumb
