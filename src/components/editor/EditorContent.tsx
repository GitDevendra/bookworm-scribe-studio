
import { useEffect, useState } from "react";
import { useEbook } from "@/context/EbookContext";
import { DocumentElement } from "@/types/editor";
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

  // Get the current chapter
  const currentChapter = book?.chapters.find(chapter => chapter.id === currentChapterId);

  useEffect(() => {
    if (currentChapter) {
      // This is a simplified approach. In a real implementation,
      // we would need a more sophisticated way to convert document elements to HTML
      // and vice versa when using a WYSIWYG editor
      const contentText = currentChapter.content
        .map(element => {
          if (element.type === 'image') {
            return `[Image: ${element.alt || 'No description'}]`;
          }
          
          if ('children' in element) {
            return element.children.map(child => child.text).join('');
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
    
    // In a real implementation, we would convert the text to proper document elements
    // For now, just create a simple paragraph element
    const paragraphs: DocumentElement[] = newContent.split('\n\n')
      .filter(text => text.trim())
      .map(text => ({
        type: 'paragraph',
        children: [{ text }]
      }));
    
    if (currentChapterId) {
      updateChapterContent(currentChapterId, paragraphs);
    }
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
          <Button variant="ghost" size="icon" aria-label="Bold">
            <Bold className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Italic">
            <Italic className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Underline">
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
          
          {/* Simple textarea for now, will be replaced with a rich editor */}
          <textarea
            value={content}
            onChange={handleContentChange}
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
