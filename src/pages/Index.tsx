
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { BookOpen, PenLine, FileOutput, Lightbulb, Share2 } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-brand-50 to-indigo-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:flex lg:flex-col lg:justify-center">
                <h1 className="text-4xl tracking-tight font-bold text-gray-900 sm:text-5xl md:text-6xl font-heading">
                  <span className="block">Create stunning</span>
                  <span className="block text-brand-600">eBooks with ease</span>
                </h1>
                <p className="mt-3 text-base text-gray-700 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                  Design, write, and publish beautiful ebooks with our all-in-one platform. 
                  No design skills required - just your imagination.
                </p>
                <div className="mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Button size="lg" asChild>
                      <Link to="/register">Get Started</Link>
                    </Button>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Button variant="outline" size="lg" asChild>
                      <Link to="/login">Sign In</Link>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="mt-12 lg:mt-0 lg:col-span-6">
                <div className="lg:relative lg:h-full">
                  <img
                    className="h-auto w-full rounded-lg shadow-xl lg:absolute lg:inset-0 lg:w-full lg:h-full object-cover"
                    src="https://images.unsplash.com/photo-1544716278-e513176f20b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                    alt="Person writing a book"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 font-heading">
                Everything you need to create professional eBooks
              </h2>
              <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-600">
                Our platform combines powerful editing tools with intuitive design features
              </p>
            </div>

            <div className="mt-16">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {/* Feature 1 */}
                <div className="flex flex-col items-center p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-3 rounded-full bg-brand-100 text-brand-600">
                    <PenLine className="h-8 w-8" />
                  </div>
                  <h3 className="mt-4 text-xl font-medium text-gray-900">Rich Text Editor</h3>
                  <p className="mt-3 text-base text-gray-600 text-center">
                    Powerful WYSIWYG editor with formatting tools and chapter management
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="flex flex-col items-center p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-3 rounded-full bg-brand-100 text-brand-600">
                    <FileOutput className="h-8 w-8" />
                  </div>
                  <h3 className="mt-4 text-xl font-medium text-gray-900">Format Conversion</h3>
                  <p className="mt-3 text-base text-gray-600 text-center">
                    Export your eBooks in multiple formats including EPUB, MOBI, and PDF
                  </p>
                </div>

                {/* Feature 3 */}
                <div className="flex flex-col items-center p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-3 rounded-full bg-brand-100 text-brand-600">
                    <Lightbulb className="h-8 w-8" />
                  </div>
                  <h3 className="mt-4 text-xl font-medium text-gray-900">AI Writing Assistant</h3>
                  <p className="mt-3 text-base text-gray-600 text-center">
                    Get real-time suggestions for grammar, spelling, and style improvements
                  </p>
                </div>

                {/* Feature 4 */}
                <div className="flex flex-col items-center p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-3 rounded-full bg-brand-100 text-brand-600">
                    <BookOpen className="h-8 w-8" />
                  </div>
                  <h3 className="mt-4 text-xl font-medium text-gray-900">Professional Templates</h3>
                  <p className="mt-3 text-base text-gray-600 text-center">
                    Start with beautiful pre-designed templates for various genres
                  </p>
                </div>

                {/* Feature 5 */}
                <div className="flex flex-col items-center p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-3 rounded-full bg-brand-100 text-brand-600">
                    <Share2 className="h-8 w-8" />
                  </div>
                  <h3 className="mt-4 text-xl font-medium text-gray-900">Publishing & Distribution</h3>
                  <p className="mt-3 text-base text-gray-600 text-center">
                    Publish directly to major platforms or sell through our marketplace
                  </p>
                </div>

                {/* Feature 6 */}
                <div className="flex flex-col items-center p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-3 rounded-full bg-brand-100 text-brand-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="mt-4 text-xl font-medium text-gray-900">Multimedia Support</h3>
                  <p className="mt-3 text-base text-gray-600 text-center">
                    Add images, audio, and video to create rich interactive eBooks
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-brand-600">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <h2 className="text-3xl font-bold tracking-tight text-white font-heading sm:text-4xl">
              <span className="block">Ready to start writing?</span>
              <span className="block text-brand-100">Create your first eBook today.</span>
            </h2>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
              <div className="inline-flex rounded-md shadow">
                <Button size="lg" className="bg-white text-brand-600 hover:bg-brand-50" asChild>
                  <Link to="/register">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          <div className="mt-8 flex justify-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Facebook</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>

            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>

            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">GitHub</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
          <p className="mt-8 text-center text-base text-gray-500">
            &copy; 2025 BookCraft. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
