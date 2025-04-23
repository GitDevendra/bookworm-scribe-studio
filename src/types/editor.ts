export type ElementType = 'paragraph' | 'heading-1' | 'heading-2' | 'heading-3' | 'image' | 'list-item' | 'list-numbered' | 'quote' | 'divider';

export interface TextStyle {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  align?: 'left' | 'center' | 'right';
  code?: boolean;
  color?: string;
  backgroundColor?: string;
}

export interface TextContent {
  text: string;
  style?: TextStyle;
}

export interface ImageElement {
  type: 'image';
  src: string;
  alt?: string;
  caption?: string;
}

export interface TextElement {
  type: ElementType;
  children: TextContent[];
}

export type DocumentElement = TextElement | ImageElement;

export interface Chapter {
  id: string;
  title: string;
  content: DocumentElement[];
}

export interface BookMetadata {
  title: string;
  author: string;
  description?: string;
  coverImage?: string;
  language?: string;
  isbn?: string;
  publisher?: string;
  publicationDate?: string;
  genre?: string[];
  tags?: string[];
}

export interface BookTheme {
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  paragraphSpacing: number;
  textColor: string;
  backgroundColor: string;
  accentColor: string;
  headerFontFamily?: string;
}

export interface Book {
  id: string;
  metadata: BookMetadata;
  chapters: Chapter[];
  theme: BookTheme;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export const defaultTheme: BookTheme = {
  fontFamily: 'Georgia, serif',
  fontSize: 16,
  lineHeight: 1.6,
  paragraphSpacing: 1.2,
  textColor: '#333333',
  backgroundColor: '#ffffff',
  accentColor: '#4361ee',
  headerFontFamily: 'Poppins, sans-serif'
};

export const createEmptyBook = (userId: string): Book => {
  const id = `book-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const now = new Date().toISOString();
  
  return {
    id,
    metadata: {
      title: 'Untitled Book',
      author: '',
      description: '',
    },
    chapters: [
      {
        id: `chapter-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        title: 'Chapter 1',
        content: [
          {
            type: 'paragraph',
            children: [{ text: 'Start writing your book here...' }]
          }
        ]
      }
    ],
    theme: defaultTheme,
    createdAt: now,
    updatedAt: now,
    userId
  };
};
