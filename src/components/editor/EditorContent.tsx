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
          if ('src' in element) { // Type guard for ImageElement
            return `[Image: ${element.alt || 'No description'}]`;
          }
          
          if ('children' in element) {
            return element.children.map(child => {
              let text = child.text;
              if (child.style?.bold) text = `**${text}**`;
              if (child.style?.italic) text = `_${text}_`;
              if (child.style?.underline) text = `~${text}~`;
              return text;
            }).join('');
          }
          
          return '';
        })
        .join('\n\n');
      
      setContent(contentText);
    }
  }, [currentChapter]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    
    // Convert text to document elements with formatting
    const paragraphs: DocumentElement[] = newContent.split('\n\n')
      .filter(text => text.trim())
      .map(text => {
        // Check for markdown-style formatting
        const hasFormatting = /(\*\*|_|~)/.test(text);
        
        if (!hasFormatting) {
          return {
            type: 'paragraph',
            children: [{ text }]
          } as TextElement;
        }

        // Handle formatted text
        return {
          type: 'paragraph',
          children: [
            {
              text: text.replace(/\*\*|_|~/g, ''),
              style: {
                bold: text.includes('**'),
                italic: text.includes('_'),
                underline: text.includes('~')
              }
            }
          ]
        } as TextElement;
      });
    
    if (currentChapterId) {
      updateChapterContent(currentChapterId, paragraphs);
    }
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
          <Button variant="ghost" size="icon" aria-label="Align Left">
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Align Center">
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Align Right">
            <AlignRight className="h-4 w-4" />
          </Button>
          
          <div className="w-px h-6 bg-gray-200 mx-2 self-center" />
          
          {/* Block formatting */}
          <Button variant="ghost" size="icon" aria-label="Heading 1">
            <Heading1 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Heading 2">
            <Heading2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Heading 3">
            <Heading3 className="h-4 w-4" />
          </Button>
          
          <div className="w-px h-6 bg-gray-200 mx-2 self-center" />
          
          <Button variant="ghost" size="icon" aria-label="Bullet List">
            <List className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Numbered List">
            <ListOrdered className="h-4 w-4" />
          </Button>
          
          <div className="w-px h-6 bg-gray-200 mx-2 self-center" />
          
          <Button variant="ghost" size="icon" aria-label="Insert Image">
            <Image className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Block Quote">
            <Quote className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Divider">
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
