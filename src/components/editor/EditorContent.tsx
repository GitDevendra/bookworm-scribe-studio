
import { useEffect, useState } from "react";
import { useEbook } from "@/context/EbookContext";
import { DocumentElement, TextElement } from "@/types/editor";
import { Button } from "@/components/ui/button";
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft,
  AlignCenter, 
  AlignRight,
  Heading1, 
  Heading2, 
  Heading3, 
  List, 
  ListOrdered,
  Image,
  Quote,
  Minus
} from "lucide-react";

const EditorContent = () => {
  const { book, currentChapterId, updateChapterContent } = useEbook();
  const [content, setContent] = useState<string>("");
  const [selectionStart, setSelectionStart] = useState<number>(0);
  const [selectionEnd, setSelectionEnd] = useState<number>(0);

  // Get the current chapter
  const currentChapter = book?.chapters.find(chapter => chapter.id === currentChapterId);

  useEffect(() => {
    if (currentChapter) {
      const contentText = currentChapter.content
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
      
      setContent(contentText);
    }
  }, [currentChapter]);

  const getBlockPrefix = (type: string): string => {
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

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    
    const paragraphs: DocumentElement[] = newContent.split('\n\n')
      .filter(text => text.trim())
      .map(text => {
        // Check for block-level formatting
        if (text.startsWith('# ')) {
          return createTextElement('heading-1', text.slice(2));
        } else if (text.startsWith('## ')) {
          return createTextElement('heading-2', text.slice(3));
        } else if (text.startsWith('### ')) {
          return createTextElement('heading-3', text.slice(4));
        } else if (text.startsWith('- ')) {
          return createTextElement('list-item', text.slice(2));
        } else if (text.match(/^\d+\. /)) {
          return createTextElement('list-numbered', text.replace(/^\d+\. /, ''));
        } else if (text.startsWith('> ')) {
          return createTextElement('quote', text.slice(2));
        } else if (text.startsWith('---')) {
          return createTextElement('divider', '');
        }

        // Handle regular paragraphs with inline formatting
        return createTextElement('paragraph', text);
      });
    
    if (currentChapterId) {
      updateChapterContent(currentChapterId, paragraphs);
    }
  };

  const createTextElement = (type: DocumentElement['type'], text: string): TextElement => {
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

  const handleSelectionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSelectionStart(e.target.selectionStart);
    setSelectionEnd(e.target.selectionEnd);
  };

  const applyFormatting = (formatType: 'bold' | 'italic' | 'underline') => {
    const symbol = {
      bold: '**',
      italic: '_',
      underline: '~'
    }[formatType];

    const before = content.substring(0, selectionStart);
    const selection = content.substring(selectionStart, selectionEnd);
    const after = content.substring(selectionEnd);

    const newContent = `${before}${symbol}${selection}${symbol}${after}`;
    setContent(newContent);
    handleContentChange({ target: { value: newContent } } as React.ChangeEvent<HTMLTextAreaElement>);
  };

  const applyBlockFormat = (formatType: DocumentElement['type']) => {
    const lines = content.split('\n');
    let currentLine = 0;
    let currentPos = 0;

    // Find the current line
    while (currentPos + lines[currentLine].length < selectionStart) {
      currentPos += lines[currentLine].length + 1;
      currentLine++;
    }

    const prefix = getBlockPrefix(formatType);
    lines[currentLine] = prefix + lines[currentLine].replace(/^(#+ |> |- |\d+\. |---)/, '');

    const newContent = lines.join('\n');
    setContent(newContent);
    handleContentChange({ target: { value: newContent } } as React.ChangeEvent<HTMLTextAreaElement>);
  };

  if (!book || !currentChapter) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">No chapter selected</p>
      </div>
    );
  }

  return (
    <>
      {/* Toolbar */}
      <div className="bg-white border-b border-gray-200 p-2">
        <div className="flex flex-wrap gap-1">
          {/* Text formatting */}
          <Button 
            variant="ghost" 
            size="icon" 
            aria-label="Bold"
            onClick={() => applyFormatting('bold')}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            aria-label="Italic"
            onClick={() => applyFormatting('italic')}
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            aria-label="Underline"
            onClick={() => applyFormatting('underline')}
          >
            <Underline className="h-4 w-4" />
          </Button>
          
          <div className="w-px h-6 bg-gray-200 mx-2 self-center" />
          
          {/* Text alignment */}
          <Button 
            variant="ghost" 
            size="icon" 
            aria-label="Align Left"
            onClick={() => applyBlockFormat('paragraph')}
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            aria-label="Align Center"
            onClick={() => applyBlockFormat('paragraph')}
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            aria-label="Align Right"
            onClick={() => applyBlockFormat('paragraph')}
          >
            <AlignRight className="h-4 w-4" />
          </Button>
          
          <div className="w-px h-6 bg-gray-200 mx-2 self-center" />
          
          {/* Block formatting */}
          <Button 
            variant="ghost" 
            size="icon" 
            aria-label="Heading 1"
            onClick={() => applyBlockFormat('heading-1')}
          >
            <Heading1 className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            aria-label="Heading 2"
            onClick={() => applyBlockFormat('heading-2')}
          >
            <Heading2 className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            aria-label="Heading 3"
            onClick={() => applyBlockFormat('heading-3')}
          >
            <Heading3 className="h-4 w-4" />
          </Button>
          
          <div className="w-px h-6 bg-gray-200 mx-2 self-center" />
          
          <Button 
            variant="ghost" 
            size="icon" 
            aria-label="Bullet List"
            onClick={() => applyBlockFormat('list-item')}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            aria-label="Numbered List"
            onClick={() => applyBlockFormat('list-numbered')}
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
          
          <div className="w-px h-6 bg-gray-200 mx-2 self-center" />
          
          <Button 
            variant="ghost" 
            size="icon" 
            aria-label="Insert Image"
            onClick={() => console.log('Image upload not implemented yet')}
          >
            <Image className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            aria-label="Block Quote"
            onClick={() => applyBlockFormat('quote')}
          >
            <Quote className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            aria-label="Divider"
            onClick={() => applyBlockFormat('divider')}
          >
            <Minus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Editor area */}
      <div className="flex-1 overflow-auto p-6 bg-gray-50">
        <div 
          className="max-w-3xl mx-auto bg-white shadow-sm rounded-md p-8"
          style={{ 
            fontFamily: book.theme.fontFamily,
            fontSize: `${book.theme.fontSize}px`,
            lineHeight: book.theme.lineHeight,
            color: book.theme.textColor,
            backgroundColor: book.theme.backgroundColor 
          }}
        >
          <h1 
            className="text-2xl font-bold mb-6 border-b pb-2"
            style={{ 
              fontFamily: book.theme.headerFontFamily || book.theme.fontFamily,
              color: book.theme.accentColor 
            }}
          >
            {currentChapter.title}
          </h1>
          
          <textarea
            value={content}
            onChange={handleContentChange}
            onSelect={handleSelectionChange}
            className="w-full h-full min-h-[60vh] focus:outline-none resize-none"
            style={{ 
              fontFamily: book.theme.fontFamily,
              fontSize: `${book.theme.fontSize}px`,
              lineHeight: book.theme.lineHeight,
              color: book.theme.textColor,
              backgroundColor: book.theme.backgroundColor
            }}
            placeholder="Start writing your chapter here..."
          />
        </div>
      </div>
    </>
  );
};

export default EditorContent;
