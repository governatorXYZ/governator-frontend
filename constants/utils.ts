import _ from 'lodash'

type SessionData = { state: "loading" } | { state: "hasData",  data: any } | { state: "hasError",  error: any }

const utils = Object.freeze({
    isAuthenticated: (session: SessionData) => (session.state === 'hasData' && session.data && !_.isEmpty(session.data))
});

export default utils