
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Book, Chapter, DocumentElement, createEmptyBook } from "../types/editor";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";

interface EbookContextType {
  book: Book | null;
  currentChapterId: string | null;
  isLoading: boolean;
  saveBook: () => Promise<void>;
  updateMetadata: (metadata: Partial<Book['metadata']>) => void;
  updateTheme: (theme: Partial<Book['theme']>) => void;
  addChapter: () => void;
  updateChapter: (chapterId: string, updates: Partial<Chapter>) => void;
  deleteChapter: (chapterId: string) => void;
  setCurrentChapter: (chapterId: string) => void;
  updateChapterContent: (chapterId: string, content: DocumentElement[]) => void;
  loadBook: (bookId: string) => Promise<void>;
  createNewBook: () => void;
}

const EbookContext = createContext<EbookContextType | undefined>(undefined);

export const EbookProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [book, setBook] = useState<Book | null>(null);
  const [currentChapterId, setCurrentChapterId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Save book to localStorage for now (will be replaced with API calls)
  const saveBook = async () => {
    if (!book) return;
    
    try {
      const updatedBook = {
        ...book,
        updatedAt: new Date().toISOString(),
      };
      
      // For now, just save to localStorage
      localStorage.setItem(`book_${book.id}`, JSON.stringify(updatedBook));
      setBook(updatedBook);
      
      toast.success("Book saved successfully");
    } catch (error) {
      console.error("Error saving book:", error);
      toast.error("Failed to save book");
    }
  };

  // Load a book by ID
  const loadBook = async (bookId: string) => {
    setIsLoading(true);
    try {
      // For now, just load from localStorage
      const bookData = localStorage.getItem(`book_${bookId}`);
      
      if (bookData) {
        const loadedBook = JSON.parse(bookData) as Book;
        setBook(loadedBook);
        
        // Set the first chapter as current if no chapter is selected
        if (loadedBook.chapters.length > 0) {
          setCurrentChapterId(loadedBook.chapters[0].id);
        }
      } else {
        // If book doesn't exist, create a new one
        createNewBook();
      }
    } catch (error) {
      console.error("Error loading book:", error);
      toast.error("Failed to load book");
      createNewBook();
    } finally {
      setIsLoading(false);
    }
  };

  // Create a new book
  const createNewBook = () => {
    if (!user) return;
    
    const newBook = createEmptyBook(user.id);
    setBook(newBook);
    
    if (newBook.chapters.length > 0) {
      setCurrentChapterId(newBook.chapters[0].id);
    }
    
    // Save the new book to localStorage
    localStorage.setItem(`book_${newBook.id}`, JSON.stringify(newBook));
  };

  // Update book metadata
  const updateMetadata = (metadata: Partial<Book['metadata']>) => {
    if (!book) return;
    
    setBook(prevBook => {
      if (!prevBook) return null;
      
      return {
        ...prevBook,
        metadata: {
          ...prevBook.metadata,
          ...metadata,
        },
      };
    });
  };

  // Update book theme
  const updateTheme = (theme: Partial<Book['theme']>) => {
    if (!book) return;
    
    setBook(prevBook => {
      if (!prevBook) return null;
      
      return {
        ...prevBook,
        theme: {
          ...prevBook.theme,
          ...theme,
        },
      };
    });
  };

  // Add a new chapter
  const addChapter = () => {
    if (!book) return;
    
    const newChapterId = `chapter-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const newChapter: Chapter = {
      id: newChapterId,
      title: `Chapter ${book.chapters.length + 1}`,
      content: [
        {
          type: 'paragraph',
          children: [{ text: '' }]
        }
      ]
    };
    
    setBook(prevBook => {
      if (!prevBook) return null;
      
      return {
        ...prevBook,
        chapters: [...prevBook.chapters, newChapter],
      };
    });
    
    // Set the new chapter as the current chapter
    setCurrentChapterId(newChapterId);
  };

  // Update a chapter
  const updateChapter = (chapterId: string, updates: Partial<Chapter>) => {
    if (!book) return;
    
    setBook(prevBook => {
      if (!prevBook) return null;
      
      return {
        ...prevBook,
        chapters: prevBook.chapters.map(chapter => 
          chapter.id === chapterId ? { ...chapter, ...updates } : chapter
        ),
      };
    });
  };

  // Delete a chapter
  const deleteChapter = (chapterId: string) => {
    if (!book || book.chapters.length <= 1) return;
    
    setBook(prevBook => {
      if (!prevBook) return null;
      
      const updatedChapters = prevBook.chapters.filter(chapter => chapter.id !== chapterId);
      
      return {
        ...prevBook,
        chapters: updatedChapters,
      };
    });
    
    // If the deleted chapter was the current chapter, set the first chapter as current
    if (chapterId === currentChapterId && book.chapters.length > 1) {
      const nextChapter = book.chapters.find(chapter => chapter.id !== chapterId);
      if (nextChapter) {
        setCurrentChapterId(nextChapter.id);
      }
    }
  };

  // Set the current chapter
  const setCurrentChapter = (chapterId: string) => {
    setCurrentChapterId(chapterId);
  };

  // Update chapter content
  const updateChapterContent = (chapterId: string, content: DocumentElement[]) => {
    if (!book) return;
    
    setBook(prevBook => {
      if (!prevBook) return null;
      
      return {
        ...prevBook,
        chapters: prevBook.chapters.map(chapter => 
          chapter.id === chapterId ? { ...chapter, content } : chapter
        ),
      };
    });
  };

  return (
    <EbookContext.Provider
      value={{
        book,
        currentChapterId,
        isLoading,
        saveBook,
        updateMetadata,
        updateTheme,
        addChapter,
        updateChapter,
        deleteChapter,
        setCurrentChapter,
        updateChapterContent,
        loadBook,
        createNewBook,
      }}
    >
      {children}
    </EbookContext.Provider>
  );
};

export const useEbook = () => {
  const context = useContext(EbookContext);
  if (context === undefined) {
    throw new Error("useEbook must be used within an EbookProvider");
  }
  return context;
};
