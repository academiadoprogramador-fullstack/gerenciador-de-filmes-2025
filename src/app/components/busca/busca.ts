import { map } from 'rxjs';

import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-busca',
  imports: [AsyncPipe],
  templateUrl: './busca.html',
})
export class Busca {
  private readonly route = inject(ActivatedRoute);

  protected readonly searchQueryParam$ = this.route.queryParamMap.pipe(
    map((params) => params.get('q'))
  );
}
