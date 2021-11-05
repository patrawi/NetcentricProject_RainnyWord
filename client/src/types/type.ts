export type wordToRender = {
    id: number;
    word: string;
    location: string;
    destroyed: boolean;
    dangerWord : boolean;
  };

  export type form = {
    username: string;
    password: string;
}

export type wordRand = {
  word: string;
  key: number;
};