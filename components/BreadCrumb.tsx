import React, { useMemo } from 'react'
import { useRouter } from 'next/router'
import {
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { capitalize } from 'lodash'

export interface T_crumbs {
  href: string
  name: string
  disabled?: boolean
}

type GovcrumbProps = {
  currentServerName?: string
}

const Govcrumb: React.FC<GovcrumbProps> = ({ currentServerName }) => {
  // const [crumb, setCrumb] = useState<T_crumbs[]>([])

  const router = useRouter()
  const guildId = router.asPath.split('/')[2]

  const isServerPage = router.asPath === '/dashboard';

  function buildCrumbs(path: string): T_crumbs[] {
    const paths = path.split('/')
    const crumbs: T_crumbs[] = []
    let baseUrl = '/dashboard'
    const communityUrl = '/community'

    paths.forEach((p, i) => {
      if (i === 1) {
        crumbs.push({
          href: baseUrl,
          name: 'Dashboard',
          disabled: isServerPage,
        })
      } else if (i === 2) {
        baseUrl = `${communityUrl}/${guildId}`
        crumbs.push({
          href: baseUrl,
          name: currentServerName || 'Loading...',
          disabled: router.asPath === communityUrl,
        })
      } else if (i >= 3) {
        baseUrl = `${baseUrl}/${p}`
        crumbs.push({
          href: baseUrl,
          name: capitalize(p),
        })
      }
    })

    return crumbs
  }

  const crumb = useMemo<T_crumbs[]>(
    () => buildCrumbs(router.asPath) ?? [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.query, currentServerName]
  );

  return (
    <Breadcrumb
      spacing='8px'
      separator={<ChevronRightIcon color='gray.500' />}
      color='gray.300'
    >
      {crumb.map((_crumb: T_crumbs, idx: number) => {
        return (
          <BreadcrumbItem key={idx}>
            {_crumb.disabled ? (
              <Text>{_crumb.name}</Text>
            ) : (
              <BreadcrumbLink href={_crumb.href}>{_crumb.name}</BreadcrumbLink>
            )}
          </BreadcrumbItem>
        )
      })}
    </Breadcrumb>
  )
}

export default Govcrumb
