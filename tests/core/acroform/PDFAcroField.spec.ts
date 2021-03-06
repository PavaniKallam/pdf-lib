import {
  PDFAcroTerminal,
  PDFContext,
  PDFString,
  PDFHexString,
} from 'src/index';

describe(`PDFAcroField`, () => {
  it(`returns undefined for missing (DAs)`, () => {
    const context = PDFContext.create();

    const dict = context.obj({
      DA: null,
    });
    const dictRef = context.register(dict);
    const field = PDFAcroTerminal.fromDict(dict, dictRef);

    expect(field.getDefaultAppearance()).toBe(undefined);
  });

  it(`returns normal direct appearance strings (DAs)`, () => {
    const context = PDFContext.create();

    const dict = context.obj({
      DA: PDFString.of('/ZaDb 10 Tf 0 g'),
    });
    const dictRef = context.register(dict);
    const field = PDFAcroTerminal.fromDict(dict, dictRef);

    expect(field.getDefaultAppearance()).toBe('/ZaDb 10 Tf 0 g');
  });

  it(`returns hexadecimal (non-standard) direct appearance strings (DAs)`, () => {
    const context = PDFContext.create();

    const dict = context.obj({
      DA: PDFHexString.fromText('/ZaDb 10 Tf 0 g'),
    });
    const dictRef = context.register(dict);
    const field = PDFAcroTerminal.fromDict(dict, dictRef);

    expect(field.getDefaultAppearance()).toBe('/ZaDb 10 Tf 0 g');
  });
});
