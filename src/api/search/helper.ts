import { ISearchDocumentResponse, ISearchOptions, ISearchResults } from './types';

export function convertResponse(
  searchResult: ISearchDocumentResponse,
  queryString: string,
  { offset, limit }: ISearchOptions,
): ISearchResults<ISearchDocumentResponse> {
  const [totalNumberOfDocs, ...records] = Array.isArray(searchResult) ? searchResult : [searchResult];

  const result = {
    meta: {
      totalResults: Number(totalNumberOfDocs),
      offset,
      limit,
      queryString,
    },
    docs: records.map(itm => itm.uttr),
    rawDocs: searchResult,
  };
  return result;
}
