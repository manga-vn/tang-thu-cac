declare module 'gray-matter' {
  interface GrayMatterData {
    [key: string]: any;
  }
  interface GrayMatterResult {
    data: GrayMatterData;
    content: string;
    isEmpty: boolean;
    meta: GrayMatterData;
  }
  function grayMatter(input: string): GrayMatterResult;
  function grayMatter<T extends GrayMatterData>(input: string, options?: { [key: string]: any }): GrayMatterResult;
  namespace grayMatter {
    function stringify(obj: any, options?: { [key: string]: any }): string;
  }
  export default grayMatter;
  export = grayMatter;
}
