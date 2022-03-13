import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'

export interface T_crumbs {
  href: string,
  name: string
}[]

const Govcrumb: React.FC = () => {

  const [crumb, setCrumb] = useState([]);

  const router = useRouter();

  useEffect(() => {

    const path = router.asPath
    const paths = path.split('/')
    const crumbs: T_crumbs[] = []

    console.log({paths})

    if (paths.length >= 2) {
      crumbs.push({
        href: '/servers',
        name: 'Servers'
      })
    }
    if (paths.length >= 3) {
      crumbs.push({
        href: `/servers/${router.query.serverId}`,
        name: 'Dashboard'
      })
    }

    setCrumb(crumbs)

  },[router.query])

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
