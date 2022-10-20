import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  templateUrl: './cook-book.component.html',
  styleUrls: ['./cook-book.component.scss']
})
export class CookBookComponent implements OnInit {

  ingredients: any[] = [];
  loading = true;
  error: any;

  constructor(
    private apollo: Apollo
  ) { }

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: gql`
          {
            allIngredients {
              id
              name
              category {
                id
                name
              }
            }
          }
        `
      })
      .valueChanges.subscribe((result: any) => {
        this.ingredients = result.data?.allIngredients
        this.loading = result.loading
        this.error = result.error
      })
  }
}
