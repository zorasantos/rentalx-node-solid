import { Category } from '../../model/Category';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

class ListCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute(): Category[] | null {
    const categories = this.categoriesRepository.list();
    return categories;
  }
}

export { ListCategoryUseCase };
