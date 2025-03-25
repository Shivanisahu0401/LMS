import React from 'react';
import { Book } from '../types';
import { BookOpen } from 'lucide-react';

interface BookListProps {
  books: Book[];
  onStatusChange: (id: string) => void;
}

export function BookList({ books, onStatusChange }: BookListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map((book) => (
        <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src={book.coverUrl}
            alt={book.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800">{book.title}</h3>
            <p className="text-gray-600">by {book.author}</p>
            <p className="text-sm text-gray-500">ISBN: {book.isbn}</p>
            <p className="text-sm text-gray-500">Year: {book.publishedYear}</p>
            <div className="mt-4 flex items-center justify-between">
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  book.status === 'available'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {book.status}
              </span>
              <button
                onClick={() => onStatusChange(book.id)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
              >
                <BookOpen size={16} />
                {book.status === 'available' ? 'Borrow' : 'Return'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}