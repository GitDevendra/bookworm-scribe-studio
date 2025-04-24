
import { useState, useEffect, RefObject } from "react";
import { Book } from "@/types/editor";
import { Textarea } from "@/components/ui/textarea";

interface EditorAreaProps {
  book: Book;
  content: string;
  currentChapter: { title: string };
  onContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSelect: (e: React.SyntheticEvent<HTMLTextAreaElement>) => void;
  textareaRef: RefObject<HTMLTextAreaElement>;
}

const EditorArea = ({ book, content, currentChapter, onContentChange, onSelect, textareaRef }: EditorAreaProps) => {
  const [previewContent, setPreviewContent] = useState<string>("");
  
  useEffect(() => {
    // Convert markdown-style formatting to HTML for preview
    let formattedContent = content;
    formattedContent = formattedContent.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    formattedContent = formattedContent.replace(/_(.*?)_/g, '<em>$1</em>');
    formattedContent = formattedContent.replace(/~(.*?)~/g, '<u>$1</u>');
    formattedContent = formattedContent.replace(/^# (.*?)$/gm, '<h1>$1</h1>');
    formattedContent = formattedContent.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
    formattedContent = formattedContent.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
    formattedContent = formattedContent.replace(/^- (.*?)$/gm, '<li>$1</li>');
    formattedContent = formattedContent.replace(/^\d+\. (.*?)$/gm, '<li>$1</li>');
    formattedContent = formattedContent.replace(/^> (.*?)$/gm, '<blockquote>$1</blockquote>');
    formattedContent = formattedContent.replace(/^---$/gm, '<hr />');
    
    // Replace newlines with line breaks for the preview
    formattedContent = formattedContent.replace(/\n\n/g, '</p><p>');
    formattedContent = formattedContent.replace(/\n/g, '<br />');
    
    setPreviewContent(formattedContent);
  }, [content]);

  return (
    <div className="flex-1 overflow-auto p-6 bg-gray-50">
      <div className="flex flex-col max-w-3xl mx-auto">
        <div 
          className="bg-white shadow-sm rounded-md p-8 mb-4"
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
          
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: `<p>${previewContent}</p>` }}
            style={{ 
              fontFamily: book.theme.fontFamily,
              fontSize: `${book.theme.fontSize}px`,
              lineHeight: book.theme.lineHeight,
              color: book.theme.textColor
            }}
          />
        </div>

        <div
          className="bg-white shadow-sm rounded-md p-8"
          style={{ 
            fontFamily: book.theme.fontFamily,
            backgroundColor: book.theme.backgroundColor 
          }}
        >
          <h2 className="text-lg font-medium mb-4 text-gray-500">Editor</h2>
          <Textarea
            ref={textareaRef}
            value={content}
            onChange={onContentChange}
            onKeyUp={onSelect}
            onMouseUp={onSelect}
            onClick={onSelect}
            className="w-full h-full min-h-[40vh] focus:outline-none resize-none border border-gray-200 p-4 rounded"
            style={{ 
              fontFamily: book.theme.fontFamily,
              fontSize: `${book.theme.fontSize}px`,
              lineHeight: book.theme.lineHeight,
              color: book.theme.textColor,
              backgroundColor: book.theme.backgroundColor,
              whiteSpace: 'pre-wrap'
            }}
            placeholder="Start writing your book here..."
          />
        </div>
      </div>
    </div>
  );
};

export default EditorArea;
