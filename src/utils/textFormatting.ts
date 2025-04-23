
import { DocumentElement, TextElement, TextStyle } from "@/types/editor";

export const getBlockPrefix = (type: string): string => {
  switch (type) {
    case 'heading-1': return '# ';
    case 'heading-2': return '## ';
    case 'heading-3': return '### ';
    case 'list-item': return '- ';
    case 'list-numbered': return '1. ';
    case 'quote': return '> ';
    case 'divider': return '---\n';
    default: return '';
  }
};

export const createTextElement = (type: DocumentElement['type'], text: string): TextElement => {
  const style: TextStyle = {
    bold: text.includes('**'),
    italic: text.includes('_'),
    underline: text.includes('~')
  };

  return {
    type,
    children: [{
      text: text.replace(/\*\*|_|~/g, ''),
      style
    }]
  };
};

export const parseContent = (content: DocumentElement[]): string => {
  return content
    .map(element => {
      if ('src' in element) {
        return `[Image: ${element.alt || 'No description'}]`;
      }
      
      if ('children' in element) {
        const prefix = getBlockPrefix(element.type);
        const content = element.children.map(child => {
          let text = child.text;
          if (child.style?.bold) text = `**${text}**`;
          if (child.style?.italic) text = `_${text}_`;
          if (child.style?.underline) text = `~${text}~`;
          return text;
        }).join('');
        return `${prefix}${content}`;
      }
      
      return '';
    })
    .join('\n\n');
};

