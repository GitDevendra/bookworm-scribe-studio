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
  const hasBold = text.includes('**');
  const hasItalic = text.includes('_');
  const hasUnderline = text.includes('~');

  const style: TextStyle = {
    bold: hasBold,
    italic: hasItalic,
    underline: hasUnderline
  };

  let cleanText = text;
  if (hasBold) cleanText = cleanText.replace(/\*\*(.*?)\*\*/g, '$1');
  if (hasItalic) cleanText = cleanText.replace(/_(.*?)_/g, '$1');
  if (hasUnderline) cleanText = cleanText.replace(/~(.*?)~/g, '$1');

  return {
    type,
    children: [{
      text: cleanText,
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

export const applyFormatting = (
  content: string, 
  selectionStart: number, 
  selectionEnd: number, 
  formatType: 'bold' | 'italic' | 'underline'
): string => {
  const symbol = {
    bold: '**',
    italic: '_',
    underline: '~'
  }[formatType];

  const before = content.substring(0, selectionStart);
  const selection = content.substring(selectionStart, selectionEnd);
  const after = content.substring(selectionEnd);

  const regex = formatType === 'bold' ? /\*\*(.*?)\*\*/g : 
               formatType === 'italic' ? /_(.*?)_/g : /~(.*?)~/g;
  
  if (selection.match(regex)) {
    const cleanSelection = selection.replace(regex, '$1');
    return before + cleanSelection + after;
  }
  
  return `${before}${symbol}${selection}${symbol}${after}`;
};

export const applyBlockFormat = (
  content: string,
  selectionStart: number,
  formatType: DocumentElement['type']
): string => {
  const lines = content.split('\n');
  let currentLine = 0;
  let currentPos = 0;

  while (currentLine < lines.length && currentPos + lines[currentLine].length < selectionStart) {
    currentPos += lines[currentLine].length + 1;
    currentLine++;
  }

  if (currentLine >= lines.length) {
    return content;
  }

  const prefix = getBlockPrefix(formatType);
  
  lines[currentLine] = lines[currentLine].replace(/^(#+ |> |- |\d+\. |---)/, '');
  
  if (formatType !== 'paragraph') {
    lines[currentLine] = prefix + lines[currentLine];
  }

  return lines.join('\n');
};
