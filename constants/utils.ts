import _ from 'lodash'

type Loadable = { state: "loading" } | { state: "hasData",  data: any } | { state: "hasError",  error: any }

const utils = Object.freeze({
    isAuthenticated: (session: Loadable) => (session.state === 'hasData' && session.data && !_.isEmpty(session.data)),
    isLoading: (session: Loadable) => (session.state === 'loading')
});

export default utils