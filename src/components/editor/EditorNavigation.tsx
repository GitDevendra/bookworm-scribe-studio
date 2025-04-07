
import { useEbook } from "@/context/EbookContext";
import { Button } from "@/components/ui/button";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Pencil, PlusCircle, Trash2 } from "lucide-react";
import { useState } from "react";

const EditorNavigation = () => {
  const { book, currentChapterId, addChapter, updateChapter, deleteChapter, setCurrentChapter } = useEbook();
  const [editingChapterId, setEditingChapterId] = useState<string | null>(null);
  const [editedTitle, setEditedTitle] = useState("");

  if (!book) return null;

  const handleStartEditing = (chapterId: string, title: string) => {
    setEditingChapterId(chapterId);
    setEditedTitle(title);
  };

  const handleSaveTitle = (chapterId: string) => {
    if (editedTitle.trim()) {
      updateChapter(chapterId, { title: editedTitle });
    }
    setEditingChapterId(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent, chapterId: string) => {
    if (e.key === "Enter") {
      handleSaveTitle(chapterId);
    } else if (e.key === "Escape") {
      setEditingChapterId(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Chapters</h3>
        <Button variant="ghost" size="sm" onClick={addChapter}>
          <PlusCircle className="h-4 w-4 mr-1" />
          Add
        </Button>
      </div>

      <div className="space-y-1">
        {book.chapters.map((chapter) => (
          <div 
            key={chapter.id}
            className={`flex items-center justify-between p-2 rounded ${
              currentChapterId === chapter.id ? "bg-brand-100" : "hover:bg-gray-100"
            }`}
          >
            <div 
              className="flex-1 cursor-pointer"
              onClick={() => setCurrentChapter(chapter.id)}
            >
              {editingChapterId === chapter.id ? (
                <Input
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  onBlur={() => handleSaveTitle(chapter.id)}
                  onKeyDown={(e) => handleKeyDown(e, chapter.id)}
                  autoFocus
                  className="h-7 py-0"
                />
              ) : (
                <span className="truncate">{chapter.title}</span>
              )}
            </div>
            <div className="flex space-x-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-7 w-7"
                onClick={() => handleStartEditing(chapter.id, chapter.title)}
              >
                <Pencil className="h-3.5 w-3.5" />
              </Button>
              {book.chapters.length > 1 && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Chapter</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete "{chapter.title}"? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => deleteChapter(chapter.id)}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditorNavigation;
