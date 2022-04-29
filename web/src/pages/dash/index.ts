import { Dash } from '../../containers'
import { permissionWrapper } from '../../utils/permissionWrapper'

export default permissionWrapper(Dash, ['ADMIN', 'EDITOR'])
