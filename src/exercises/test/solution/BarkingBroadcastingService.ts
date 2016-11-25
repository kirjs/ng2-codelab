export class BarkTranslatingService {
  mapping = {
    'a': 'а',
    'b': 'б',
    'c': 'ц',
    'd': 'д',
    'e': 'е',
    'f': 'ф',
    'g': 'ж',
    'h': 'х',
    'i': 'и',
    'j': 'дж',
    'k': 'к',
    'l': 'л',
    'm': 'м',
    'n': 'н',
    'o': 'о',
    'p': 'п',
    'q': 'к',
    'r': 'р',
    's': 'с',
    't': 'т',
    'u': 'у',
    'v': 'в',
    'w': 'в',
    'x': 'кс',
    'y': 'ы',
    'z': 'з',
  };

  constructor() {

  }

  translate(a: string) {
    return a.split('').map((a) =>
      this.mapping[a] ? this.mapping[a] : a
    ).join();
  }
}
