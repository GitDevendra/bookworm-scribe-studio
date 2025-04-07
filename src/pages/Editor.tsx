
import { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { EbookProvider, useEbook } from "@/context/EbookContext";
import { ArrowLeft, Book, Save, Settings } from "lucide-react";
import EditorNavigation from "@/components/editor/EditorNavigation";
import EditorContent from "@/components/editor/EditorContent";
import { toast } from "sonner";

// Wrapper component that provides EbookContext
const EditorWrapper = () => {
  return (
    <EbookProvider>
      <EditorMain />
    </EbookProvider>
  );
};

// Main editor component
const EditorMain = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const templateId = searchParams.get('template');
  const { user } = useAuth();
  const { book, isLoading, loadBook, createNewBook, saveBook, updateMetadata } = useEbook();

  useEffect(() => {
    if (!user) return;

    // Load or create a book
    if (id && id !== 'new') {
      loadBook(id);
    } else {
      // New book, possibly from a template
      createNewBook();
      
      // If we have a template ID, we would load the template here
      if (templateId) {
        // In a real implementation, load template based on templateId
        console.log("Loading template:", templateId);
      }
    }
  }, [id, templateId, user]);

  const handleSave = async () => {
    await saveBook();
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Failed to load book</h2>
          <p className="mt-2 text-gray-600">There was an error loading your book.</p>
          <Button onClick={handleBackToDashboard} className="mt-4">
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Editor Header */}
      <header className="bg-white border-b border-gray-200 py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={handleBackToDashboard}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center">
              <Book className="h-5 w-5 text-brand-600 mr-2" />
              <Input
                value={book.metadata.title}
                onChange={(e) => updateMetadata({ title: e.target.value })}
                className="bg-transparent border-none h-auto p-0 text-lg font-medium focus:ring-0"
                placeholder="Untitled Book"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
            <Button>
              Export
            </Button>
          </div>
        </div>
      </header>

      {/* Editor Main Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
          <Tabs defaultValue="chapters" className="flex flex-col h-full">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="chapters">Chapters</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="chapters" className="flex-1 overflow-y-auto p-4">
              <EditorNavigation />
            </TabsContent>
            
            <TabsContent value="settings" className="flex-1 overflow-y-auto p-4">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">Book Metadata</h3>
                  <Separator className="my-2" />
                  
                  <div className="space-y-3 mt-4">
                    <div className="space-y-1">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={book.metadata.title}
                        onChange={(e) => updateMetadata({ title: e.target.value })}
                        placeholder="Book title"
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <Label htmlFor="author">Author</Label>
                      <Input
                        id="author"
                        value={book.metadata.author}
                        onChange={(e) => updateMetadata({ author: e.target.value })}
                        placeholder="Author name"
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={book.metadata.description || ''}
                        onChange={(e) => updateMetadata({ description: e.target.value })}
                        placeholder="Book description"
                        className="h-24"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </aside>

        {/* Editor Content Area */}
        <main className="flex-1 overflow-hidden flex flex-col">
          <EditorContent />
        </main>
      </div>
    </div>
  );
};

export default EditorWrapper;
