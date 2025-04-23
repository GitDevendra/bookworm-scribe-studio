
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
import { DocumentElement } from "@/types/editor";

interface EditorToolbarProps {
  onFormatText: (formatType: 'bold' | 'italic' | 'underline') => void;
  onFormatBlock: (formatType: DocumentElement['type']) => void;
}

const EditorToolbar = ({ onFormatText, onFormatBlock }: EditorToolbarProps) => {
  return (
    <div className="bg-white border-b border-gray-200 p-2">
      <div className="flex flex-wrap gap-1">
        {/* Text formatting */}
        <Button 
          variant="ghost" 
          size="icon" 
          aria-label="Bold"
          onClick={() => onFormatText('bold')}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          aria-label="Italic"
          onClick={() => onFormatText('italic')}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          aria-label="Underline"
          onClick={() => onFormatText('underline')}
        >
          <Underline className="h-4 w-4" />
        </Button>
        
        <div className="w-px h-6 bg-gray-200 mx-2 self-center" />
        
        {/* Text alignment */}
        <Button 
          variant="ghost" 
          size="icon" 
          aria-label="Align Left"
          onClick={() => onFormatBlock('paragraph')}
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          aria-label="Align Center"
          onClick={() => onFormatBlock('paragraph')}
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          aria-label="Align Right"
          onClick={() => onFormatBlock('paragraph')}
        >
          <AlignRight className="h-4 w-4" />
        </Button>
        
        <div className="w-px h-6 bg-gray-200 mx-2 self-center" />
        
        {/* Block formatting */}
        <Button 
          variant="ghost" 
          size="icon" 
          aria-label="Heading 1"
          onClick={() => onFormatBlock('heading-1')}
        >
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          aria-label="Heading 2"
          onClick={() => onFormatBlock('heading-2')}
        >
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          aria-label="Heading 3"
          onClick={() => onFormatBlock('heading-3')}
        >
          <Heading3 className="h-4 w-4" />
        </Button>
        
        <div className="w-px h-6 bg-gray-200 mx-2 self-center" />
        
        <Button 
          variant="ghost" 
          size="icon" 
          aria-label="Bullet List"
          onClick={() => onFormatBlock('list-item')}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          aria-label="Numbered List"
          onClick={() => onFormatBlock('list-numbered')}
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
          onClick={() => onFormatBlock('quote')}
        >
          <Quote className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          aria-label="Divider"
          onClick={() => onFormatBlock('divider')}
        >
          <Minus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default EditorToolbar;

