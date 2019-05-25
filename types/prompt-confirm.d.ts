export = index;
declare class index {
  static ask(question: any, answers: any, ui: any, ...args: any[]): void;
  static extend(Ctor: any, proto: any): void;
  static run(...args: any[]): any;
  constructor(...args: any[]);
  originalDefault: any;
  action(name: any, fn: any): any;
  addEventListener(event: any, fn: any): any;
  addListeners(listeners: any): void;
  ask(callback: any): void;
  dispatch(input: any, key: any): any;
  emit(event: any, ...args: any[]): any;
  end(state: any): void;
  getAnswer(input: any): any;
  getDefault(): any;
  getError(input: any, key: any): any;
  getHelp(input: any, key: any): any;
  hasListeners(event: any): any;
  initListeners(): void;
  listeners(event: any): any;
  mute(): any;
  off(event: any, fn: any, ...args: any[]): any;
  on(event: any, fn: any): any;
  onError(err: any): void;
  once(event: any, fn: any): any;
  only(name: any, fn: any, ...args: any[]): any;
  removeAllListeners(event: any, fn: any, ...args: any[]): any;
  removeEventListener(event: any, fn: any, ...args: any[]): any;
  removeListener(event: any, fn: any, ...args: any[]): any;
  render(state: any): void;
  renderAnswer(): any;
  renderError(context: any): any;
  renderHelp(context: any): any;
  renderMask(input: any): any;
  renderMessage(context: any): any;
  renderOutput(context: any): any;
  resume(): void;
  run(answers?: any): any;
  submitAnswer(answer: any): void;
  transform(input: any): any;
  validate(input: any, key: any, ...args: any[]): any;
  when(answers: any, ...args: any[]): any;
}
declare namespace index {
  class Choices {
    static isChoice(choice: any): any;
    static isChoices(choices: any): any;
    constructor(choices: any, options: any);
    options: any;
    answers: any;
    paginator: any;
    choices: any;
    items: any;
    keymap: any;
    keys: any;
    original: any;
    position: any;
    addChoice(choice: any): any;
    addChoices(choices: any): void;
    check(val: any): any;
    choice(val: any): any;
    clear(): void;
    every(...args: any[]): any;
    filter(...args: any[]): any;
    forEach(...args: any[]): any;
    get(key: any, prop: any): any;
    getChoice(idx: any): any;
    getIndex(key: any): any;
    hasChoice(val: any): any;
    indexOf(...args: any[]): any;
    isChecked(name: any): any;
    isItem(choice: any): any;
    isValidIndex(idx: any): any;
    key(val: any): any;
    pluck(key: any): any;
    radio(): void;
    render(position: any, options: any): any;
    renderChoice(choice: any, position: any, options: any): any;
    separator(separator: any, options: any): any;
    some(...args: any[]): any;
    swap(a: any, b: any): any;
    toChoice(choice: any): any;
    toGroups(choices: any): any;
    toggle(val: any, radio: any): any;
    uncheck(val: any): any;
    update(): void;
    where(val: any): any;
  }
  namespace Choices {
    class Separator {
      static exclude(choice: any): any;
      constructor(options: any);
      isSeparator: any;
      type: any;
      options: any;
      prefix: any;
      line: any;
      raw(): any;
      render(): any;
    }
  }
  class Question {
    static isQuestion(question: any): any;
    constructor(name: any, message: any, options: any, ...args: any[]);
    type: any;
    options: any;
    addChoice(...args: any[]): any;
    addChoices(...args: any[]): any;
    clone(): any;
    getAnswer(val: any): any;
    getChoice(...args: any[]): any;
    getDefault(val: any): any;
    separator(...args: any[]): any;
  }
  namespace Question {
    class Choices {
      static isChoice(choice: any): any;
      static isChoices(choices: any): any;
      constructor(choices: any, options: any);
      options: any;
      answers: any;
      paginator: any;
      choices: any;
      items: any;
      keymap: any;
      keys: any;
      original: any;
      position: any;
      addChoice(choice: any): any;
      addChoices(choices: any): void;
      check(val: any): any;
      choice(val: any): any;
      clear(): void;
      every(...args: any[]): any;
      filter(...args: any[]): any;
      forEach(...args: any[]): any;
      get(key: any, prop: any): any;
      getChoice(idx: any): any;
      getIndex(key: any): any;
      hasChoice(val: any): any;
      indexOf(...args: any[]): any;
      isChecked(name: any): any;
      isItem(choice: any): any;
      isValidIndex(idx: any): any;
      key(val: any): any;
      pluck(key: any): any;
      radio(): void;
      render(position: any, options: any): any;
      renderChoice(choice: any, position: any, options: any): any;
      separator(separator: any, options: any): any;
      some(...args: any[]): any;
      swap(a: any, b: any): any;
      toChoice(choice: any): any;
      toGroups(choices: any): any;
      toggle(val: any, radio: any): any;
      uncheck(val: any): any;
      update(): void;
      where(val: any): any;
    }
    namespace Choices {
      class Separator {
        static exclude(choice: any): any;
        constructor(options: any);
        isSeparator: any;
        type: any;
        options: any;
        prefix: any;
        line: any;
        raw(): any;
        render(): any;
      }
    }
    class Separator {
      static exclude(choice: any): any;
      constructor(options: any);
      isSeparator: any;
      type: any;
      options: any;
      prefix: any;
      line: any;
      raw(): any;
      render(): any;
    }
  }
  class Separator {
    static exclude(choice: any): any;
    constructor(options: any);
    isSeparator: any;
    type: any;
    options: any;
    prefix: any;
    line: any;
    raw(): any;
    render(): any;
  }
}
