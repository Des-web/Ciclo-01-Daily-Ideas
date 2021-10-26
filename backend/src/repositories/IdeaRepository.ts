import { EntityRepository, Repository } from 'typeorm'

import Idea from '../entities/Idea'

@EntityRepository(Idea)
class IdeaRepository extends Repository<Idea> { }

export default IdeaRepository
