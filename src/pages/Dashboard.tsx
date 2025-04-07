
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header";
import { BookOpen, MoreVertical, Plus, Search } from "lucide-react";

// Sample template data
const templates = [
  { id: "template-1", title: "Novel", description: "For fiction novels and stories", coverUrl: "https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
  { id: "template-2", title: "Academic", description: "For educational and research content", coverUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
  { id: "template-3", title: "Cookbook", description: "For recipes and cooking instructions", coverUrl: "https://images.unsplash.com/photo-1556909211-36987daf7b4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
  { id: "template-4", title: "Poetry", description: "For poems and verses", coverUrl: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
];

// Sample book data
const sampleBooks = [
  { id: "book-1", title: "The Lost City", lastEdited: "2025-04-05T12:00:00Z", coverUrl: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
  { id: "book-2", title: "Science of Tomorrow", lastEdited: "2025-04-03T15:30:00Z", coverUrl: "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
  { id: "book-3", title: "Cooking Basics", lastEdited: "2025-04-01T09:15:00Z", coverUrl: "https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
];

const Dashboard = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [books] = useState(sampleBooks);
  
  // Filter books based on search term
  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    }).format(date);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl font-heading">
                Welcome back, {user?.name}
              </h1>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
              <Button asChild>
                <Link to="/editor/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New eBook
                </Link>
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="myBooks" className="mt-8">
            <TabsList className="mb-6">
              <TabsTrigger value="myBooks">My eBooks</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
            </TabsList>
            
            <TabsContent value="myBooks">
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                  <Input
                    placeholder="Search your eBooks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              {filteredBooks.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No eBooks found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {searchTerm ? "No results match your search criteria." : "Get started by creating a new eBook."}
                  </p>
                  <div className="mt-6">
                    <Button asChild>
                      <Link to="/editor/new">
                        <Plus className="mr-2 h-4 w-4" />
                        Create New eBook
                      </Link>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredBooks.map((book) => (
                    <Card key={book.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <div className="aspect-[4/3] relative">
                        <img
                          src={book.coverUrl}
                          alt={`Cover of ${book.title}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-xl">{book.title}</CardTitle>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Link to={`/editor/${book.id}`} className="flex items-center w-full">
                                  Edit
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>Duplicate</DropdownMenuItem>
                              <DropdownMenuItem>Export</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <CardDescription>
                          Last edited on {formatDate(book.lastEdited)}
                        </CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <Button variant="outline" asChild className="w-full">
                          <Link to={`/editor/${book.id}`}>
                            Continue Editing
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="templates">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {templates.map((template) => (
                  <Card key={template.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="aspect-[4/3] relative">
                      <img
                        src={template.coverUrl}
                        alt={`Template for ${template.title}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{template.title}</CardTitle>
                      <CardDescription>{template.description}</CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button asChild className="w-full">
                        <Link to={`/editor/new?template=${template.id}`}>
                          Use Template
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
