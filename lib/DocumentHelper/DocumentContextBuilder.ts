import { join } from 'path';
import fs from 'node:fs';

export class DocumentContextBuilder {
  private context: Record<string, any>;

  constructor() {
    this.context = {};
  }

  addImageBase64(): DocumentContextBuilder {
    this.context['addImageBase64'] = (imagePathRelativeToPublic: string) => {
      const path = join(process.cwd(), `./public/${imagePathRelativeToPublic}`);
      const image = fs.readFileSync(path);

      return `data:image/png;base64,${image.toString('base64')}`;
    };

    return this;
  }
  addFontBase64(): DocumentContextBuilder {
    this.context['addFontBase64'] = (fontPathRelativeToPublic: string) => {
      const path = join(process.cwd(), `./public/${fontPathRelativeToPublic}`);
      const font = fs.readFileSync(path);

      return `data:application/font-ttf;base64,${font.toString('base64')}`;
    };

    return this;
  }

  addCurrentYear(): DocumentContextBuilder {
    this.context.currentYear = new Date().getFullYear();
    return this;
  }

  addCustomField(key: string, value: any): DocumentContextBuilder {
    this.context[key] = value;
    return this;
  }

  build(): Record<string, any> {
    return this.context;
  }

  buildCommonContext(): Record<string, any> {
    return this.addCurrentYear().addFontBase64().addImageBase64().build();
  }
}
