
import { useEffect, useState } from "react";
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
    
    // Parse content by paragraphs (separated by double newlines)
    const paragraphs: DocumentElement[] = newContent.split('\n\n')
      .filter(text => text.trim())
      .map(text => {
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
      updateChapterContent(currentChapterId, paragraphs);
    }
  };

  const handleSelectionChange = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    setSelectionStart(target.selectionStart);
    setSelectionEnd(target.selectionEnd);
  };

  const applyFormatting = (formatType: 'bold' | 'italic' | 'underline') => {
    const newContent = applyTextFormatting(content, selectionStart, selectionEnd, formatType);
    setContent(newContent);
    handleContentChange({ target: { value: newContent } } as React.ChangeEvent<HTMLTextAreaElement>);
  };

  const applyBlockFormat = (formatType: DocumentElement['type']) => {
    const newContent = applyBlockFormatting(content, selectionStart, formatType);
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
      />
    </>
  );
};

export default EditorContent;
