import { ActivatedRoute, Router } from "@angular/router";
import { GenericT } from "../../model/generic-t";
import { SubmenuItem } from "../../page/submenu/model/submenu-item";
import { CrudService } from "../../service/crud.service";
import { PageQuery } from "../model/page-query";

export class BasePage<T extends GenericT> {

    protected entities: T[] = [];
    protected entitySelected: number | null = null;
    protected submenuItems: SubmenuItem[] = [];
    constructor(protected service: CrudService<T>,
        protected route: ActivatedRoute,
        protected router: Router
    ) { }

    async loadEntities(sortAttribute: string = 'id'): Promise<void> {
        const page: PageQuery = new PageQuery();
        page.sort = sortAttribute;
        this.service.readAll(page).subscribe({
            next: entities => {
                this.entities = entities;
                if (entities.length === 1) {
                    this.changeEntitySelected(entities[0].id!);
                }
            },
            error: error => {
                alert('Error loading entities: ' + error);
            }
        });
    }

    changeEntitySelected(id: number) {
    // If entitySelected is set, you are on /vehicles/:id or a child
    if (this.entitySelected) {
      // Replace only the id segment, keep children
      this.router.navigate(['../', id], {
        relativeTo: this.route,
        replaceUrl: true,
      });
    } else {
      // You are on /vehicles, go to /vehicles/:id
      this.router.navigate([id], {
        relativeTo: this.route,
        replaceUrl: true,
      });
    }
  }
}
