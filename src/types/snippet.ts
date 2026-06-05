export type Snippet = {
  title: string;
  code: string;
  language: string;
  tags?: string;
  favourite: boolean;
};

export type StoredSnippet = Snippet & {
  id: number;
  created_at: string;
};

export type SnippetPreview = Pick<
  StoredSnippet,
  'id' | 'title' | 'language' | 'tags' | 'favourite' | 'created_at'
>;

export type SnippetsCount = {
  totalSnippets: number;
  favouriteSnippets: number;
};
