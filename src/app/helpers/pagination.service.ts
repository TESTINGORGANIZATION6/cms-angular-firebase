import { Injectable } from '@angular/core';

const viewMore = {
  startIndex: 1,
  endIndex: 5,
  rowsPerPage: 25
};

@Injectable({
  providedIn: 'root'
})

export class CommonPaginationService {

  GetPagingOptions() {
    const pagingOptions = {
      pageSizes: [25, 50, 100],
      pageSize: viewMore.rowsPerPage,
      currentPage: 1,
      totalRecords: 0,
      totalPages: 0
    };
    return pagingOptions;
  }

  GetSortingOptions() {
    const sortingOptions = {
      columnName: '',
      columnOrder: 'ASC'
    };
    return sortingOptions;
  }

  SetSortingOptions(sortingOptions: any, columnName: any) {
    sortingOptions.columnName = columnName;
    if (sortingOptions.columnOrder === 'ASC') {
      sortingOptions.columnOrder = 'DESC';
    } else {
      sortingOptions.columnOrder = 'ASC';
    }
  }

  SetPagingOptions(pagingOptions: any, currentPage: number, totalRecords: number) {
    pagingOptions.currentPage = currentPage;
    pagingOptions.totalRecords = totalRecords;
    pagingOptions.totalPages = Math.ceil(totalRecords / pagingOptions.pageSize);
  }

}
