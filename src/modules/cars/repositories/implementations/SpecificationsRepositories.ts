import { Specification } from '../../model/Specification';
import { ISpecificationsRepository, ICreateSpecificationDTO } from '../ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationsRepository {
  private specifications: Specification[];
  constructor() {
    this.specifications = [];
  }

  create({ description, name }: ICreateSpecificationDTO): void {
    const specification = new Specification();
    Object.assign(specification, {
      description,
      name,
      created_at: new Date()
    });

    this.specifications.push(specification);
  }

  findByName(name: string): Specification | undefined {
    const specification = this.specifications.find((specification) => specification.name === name);
    return specification;
  }
}

export { SpecificationsRepository };
