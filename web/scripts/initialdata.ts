import 'isomorphic-unfetch'

import { getInitialData } from '../src/services/initialdata'

getInitialData().catch(console.error)
