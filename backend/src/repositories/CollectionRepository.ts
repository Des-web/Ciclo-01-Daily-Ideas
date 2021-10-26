import { EntityRepository, Repository } from 'typeorm'

import Collection from '../entities/Collection'

@EntityRepository(Collection)
class CollectionRepository extends Repository<Collection> { }

export default CollectionRepository
