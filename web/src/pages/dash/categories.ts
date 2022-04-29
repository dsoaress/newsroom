import { Categories } from '../../containers'
import { permissionWrapper } from '../../utils/permissionWrapper'

export default permissionWrapper(Categories, ['ADMIN', 'EDITOR'])
