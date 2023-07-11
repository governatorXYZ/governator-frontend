import NavBar from './NavBar'
import RouteGuard from './RouteGuard'

interface DefaultLayoutProps {
  children: JSX.Element
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => { 
  return (
    <>
      <NavBar />
      <RouteGuard>
        { children }
      </RouteGuard>
    </>
  )
}

export default DefaultLayout
