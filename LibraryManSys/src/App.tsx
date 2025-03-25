import React, { useState } from 'react';
import { Book, AddBookFormData } from './types';
import { BookList } from './components/BookList';
import { AddBookForm } from './components/AddBookForm';
import { Library, Search } from 'lucide-react';

const initialBooks: Book[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    isbn: '978-0743273565',
    status: 'available',
    coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400',
    publishedYear: 1925,
  },
  {
    id: '2',
    title: '1984',
    author: 'George Orwell',
    isbn: '978-0451524935',
    status: 'borrowed',
    coverUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400',
    publishedYear: 1949,
  },
];

function App() {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddBook = (data: AddBookFormData) => {
    const newBook: Book = {
      ...data,
      id: Date.now().toString(),
      status: 'available',
    };
    setBooks([...books, newBook]);
  };

  const handleStatusChange = (id: string) => {
    setBooks(books.map(book => 
      book.id === id
        ? { ...book, status: book.status === 'available' ? 'borrowed' : 'available' }
        : book
    ));
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.isbn.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Library size={32} />
            Library Management System
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <AddBookForm onSubmit={handleAddBook} />
            </div>
            
            <div className="md:w-2/3">
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search books by title, author, or ISBN..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <BookList
                books={filteredBooks}
                onStatusChange={handleStatusChange}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;