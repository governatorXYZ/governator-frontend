import React from 'react'
import { atom, useAtom } from 'jotai';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
export interface T_crumbs {
  href: string,
  name: string
}[]

export const crumbAtom = atom([{
  href: '/server-select',
  name: 'servers'
}]);

const Govcrumb: React.FC = () => {

  const [crumb, setCrumb] = useAtom(crumbAtom);

  return (
    <Breadcrumb
      spacing='8px'
      separator={<ChevronRightIcon color='gray.500' />}
      color='gray.300'>
      {crumb.map((_crumb: T_crumbs, idx: number) => {
        return (
          <BreadcrumbItem key={idx}>
            <BreadcrumbLink href={_crumb.href}>{_crumb.name}</BreadcrumbLink>
          </BreadcrumbItem>
        )
      })}
    </Breadcrumb>
  )
}

export default Govcrumb
