import { nanoid } from 'nanoid'
const generateUniqueId = () => {
    return nanoid(10)
}

export default generateUniqueId