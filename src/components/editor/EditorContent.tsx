
import { useEffect, useState } from "react";
import { useEbook } from "@/context/EbookContext";
import { DocumentElement } from "@/types/editor";
import EditorToolbar from "./EditorToolbar";
import EditorArea from "./EditorArea";
import { createTextElement, getBlockPrefix, parseContent } from "@/utils/textFormatting";

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

