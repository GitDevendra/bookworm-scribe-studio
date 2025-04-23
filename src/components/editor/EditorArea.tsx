
import { Book } from "@/types/editor";

interface EditorAreaProps {
  book: Book;
  content: string;
  currentChapter: { title: string };
  onContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSelect: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const EditorArea = ({ book, content, currentChapter, onContentChange, onSelect }: EditorAreaProps) => {
  return (
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
          onChange={onContentChange}
          onSelect={onSelect}
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
  );
};

export default EditorArea;

