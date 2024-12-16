import { convertResponse } from './helper';
import { ISearchDocumentParams, ISearchDocumentResponse, ISearchOptions, ISearchResults } from './types';

// MockedData: A simple RedisSearch method that performs a search. For demo purposes
type SearchParams = { indexName: string; query: string; useFuzzy: boolean; options: ISearchDocumentParams['options'] };
const mockedRedisearch = {
  search: (param: SearchParams): ISearchDocumentResponse => {
    // Do some magic here

    global.logger.debug('Searching redis for', param);
    return 0;
  },
};

class SearchService {
  public async search(
    qryString: string,
    opts: ISearchOptions,
    useFuzzy = false,
  ): Promise<ISearchResults<ISearchDocumentResponse>> {
    const options: ISearchDocumentParams['options'] = {
      sortBy: { field: opts.sortBy, sort: opts.ascending ? 'ASC' : 'DESC' },
      limit: { first: opts.offset, num: opts.limit },
    };

    const searchResults = await mockedRedisearch.search({
      indexName: 'idx:cb:utterance',
      query: !useFuzzy ? `@uttr:'${qryString}'` : `${qryString}`,
      useFuzzy,
      options,
    });

    return convertResponse(searchResults, qryString, opts);
  }
}

export default new SearchService();
