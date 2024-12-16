/* eslint-disable max-len */
export type ISearchUtteranceParams = {
  q: string;
  offset: string;
  limit: string;
  sortBy: string;
  order: string;
  fuzzy?: string;
};

export interface ISearchOptions {
  offset: number;
  limit: number;
  sortBy: string;
  ascending: boolean;
}

export interface ISearchUtteranceContext {
  useFuzzy: boolean;
  queryString: string;
  options: ISearchOptions;
}

export interface ISearchResults<T> {
  meta: {
    totalResults: number;
    offset: number;
    limit: number;
    queryString: string;
  };
  docs: string[];
  rawDocs: T;
}

/**
 * Secondary Index for RediSearch
 * The schema below matches the data from secondary index `idx:cb:utterance`
 */

export interface FTSearchParameters {
  /**
   * The 'FILTER' parameter.  If set, and numeric_field is defined as a numeric field in FT.CREATE, we will limit results to those having numeric values ranging between min and max. min and max follow ZRANGE syntax, and can be -inf , +inf and use ( for exclusive ranges.
   */
  filter?: {
    /**
     * The numeric_field argument of the 'FILTER' parameter
     */
    field: string;
    /**
     * The min argument of the 'FILTER' parameter
     */
    min: number;
    /**
     * The max argument of the 'FILTER' parameter
     */
    max: number;
  }[];
  /**
   *  The 'RETURN' parameter. Use this keyword to limit which fields from the document are returned.
   */
  return?: {
    num?: number;
    fields: {
      /**
       * The name of the field.
       */
      field: string;
      /**
       * The 'AS' parameter following a "field" name, used by index type "JSON".
       */
      as?: string;
    }[];
  };
  sortBy?: {
    /**
     * The field argument of the 'SORTBY' parameter
     */
    field: string;
    /**
     * The sort argument of the 'SORTBY' parameter
     */
    sort: 'ASC' | 'DESC';
  };
  /**
   * The 'LIMIT' parameter. If the parameters appear after the query, we limit the results to the offset and number of results given.
   */
  limit?: {
    /**
     * The first argument of the 'LIMIT' parameter
     */
    first: number;
    /**
     * The num argument of the 'LIMIT' parameter
     */
    num: number;
  };
}

export interface ISearchDocumentParams {
  indexName: string;
  query: string;
  useFuzzy?: boolean;
  options?: FTSearchParameters;
}

export type ISearchDocumentData = {
  key: string;
  grp: string;
  itt: string;
  lineId: string;
  ftype: 'test' | 'train';
  prjId: string;
  uttr: string;
};

export type ISearchRecords = [number, ...ISearchDocumentData[]];

export type ISearchRecordCount = number;

export type ISearchDocumentResponse = ISearchRecords | ISearchRecordCount;
