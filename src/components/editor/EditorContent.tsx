
import { useEffect, useState, useRef } from "react";
import { useEbook } from "@/context/EbookContext";
import { DocumentElement } from "@/types/editor";
import EditorToolbar from "./EditorToolbar";
import EditorArea from "./EditorArea";
import { 
  createTextElement, 
  parseContent, 
  applyFormatting as applyTextFormatting,
  applyBlockFormat as applyBlockFormatting
} from "@/utils/textFormatting";

const EditorContent = () => {
  const { book, currentChapterId, updateChapterContent } = useEbook();
  const [content, setContent] = useState<string>("");
  const [selectionStart, setSelectionStart] = useState<number>(0);
  const [selectionEnd, setSelectionEnd] = useState<number>(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const currentChapter = book?.chapters.find(chapter => chapter.id === currentChapterId);

  useEffect(() => {
    if (currentChapter) {
      const contentText = parseContent(currentChapter.content);
      setContent(contentText);
    }
  }, [currentChapter]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    
    // Split text by paragraphs (double newlines)
    const paragraphs = newContent.split('\n\n')
      .filter(text => text.trim());
    
    // Parse each paragraph into the appropriate DocumentElement
    const documentElements: DocumentElement[] = paragraphs.map(text => {
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
      return createTextElement('paragraph', text);
    });
    
    if (currentChapterId) {
      updateChapterContent(currentChapterId, documentElements);
    }
  };

  const handleSelectionChange = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    setSelectionStart(target.selectionStart);
    setSelectionEnd(target.selectionEnd);
  };

  const applyFormatting = (formatType: 'bold' | 'italic' | 'underline') => {
    if (!textareaRef.current) return;
    
    // Get current selection positions before we modify the text
    const currentStart = textareaRef.current.selectionStart;
    const currentEnd = textareaRef.current.selectionEnd;
    
    // Only proceed if there is a selection
    if (currentStart === currentEnd) {
      return;
    }
    
    const newContent = applyTextFormatting(content, currentStart, currentEnd, formatType);
    setContent(newContent);
    handleContentChange({ target: { value: newContent } } as React.ChangeEvent<HTMLTextAreaElement>);
    
    // Focus back on the textarea after formatting
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        
        // Try to restore selection approximately
        // This is a simple approach - might need refinement for complex formatting
        textareaRef.current.selectionStart = currentStart;
        textareaRef.current.selectionEnd = currentEnd;
      }
    }, 0);
  };

  const applyBlockFormat = (formatType: DocumentElement['type']) => {
    if (!textareaRef.current) return;
    
    const currentStart = textareaRef.current.selectionStart;
    const newContent = applyBlockFormatting(content, currentStart, formatType);
    setContent(newContent);
    handleContentChange({ target: { value: newContent } } as React.ChangeEvent<HTMLTextAreaElement>);
    
    // Focus back on the textarea after formatting
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 0);
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
      <EditorToolbar 
        onFormatText={applyFormatting}
        onFormatBlock={applyBlockFormat}
      />
      <EditorArea
        book={book}
        content={content}
        currentChapter={currentChapter}
        onContentChange={handleContentChange}
        onSelect={handleSelectionChange}
        textareaRef={textareaRef}
      />
    </>
  );
};

export default EditorContent;
