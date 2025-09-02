import { http, HttpResponse } from 'msw';

export const handlers = [
  // Mock login endpoint
  http.post('/api/login', () => {
    return HttpResponse.json({
      token: 'mock-token',
      user: { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user' },
    }, { status: 200 });
  }),

  // Mock register endpoint
  http.post('/api/register', () => {
    return HttpResponse.json({
      message: 'User registered successfully',
      user: { id: 2, name: 'Jane Doe', email: 'jane@example.com', role: 'user' },
    }, { status: 201 });
  }),

  // Mock file upload endpoint
  http.post('/api/upload', () => {
    return HttpResponse.json({
      message: 'File uploaded successfully',
      fileId: 'mock-file-id',
    }, { status: 200 });
  }),


  // Mock fetch files endpoint for /storage/files
  http.get('/storage/files', () => {
    return HttpResponse.json({
      files: [
        {
          file_hash: 'hash1',
          filename: 'file1.pdf',
          owner: 'John Doe',
          size: 1024 * 1024, // 1MB in bytes
          upload_date: new Date().toISOString(),
        },
        {
          file_hash: 'hash2',
          filename: 'file2.docx',
          owner: 'Jane Doe',
          size: 2 * 1024 * 1024, // 2MB in bytes
          upload_date: new Date().toISOString(),
        },
      ]
    }, { status: 200 });
  }),

  // Add more handlers as needed for your app
];
