import { Login } from '../../containers'
import { permissionWrapper } from '../../utils/permissionWrapper'

export default permissionWrapper(Login, 'guest')
