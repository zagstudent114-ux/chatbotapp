import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Upload, FileText, Trash2, Loader2 } from 'lucide-react';

interface Document {
  id: string;
  title: string;
  content: string;
  document_type: string;
  created_at: string;
}

export function KnowledgeBasePanel() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [docType, setDocType] = useState<'nutrition_guideline' | 'meal_plan' | 'fitness_protocol'>(
    'nutrition_guideline'
  );
  const [error, setError] = useState('');

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('knowledge_base')
      .select('id, title, content, document_type, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading documents:', error);
    } else {
      setDocuments(data || []);
    }
    setLoading(false);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setUploadLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/process-document`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            title,
            content,
            document_type: docType,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to process document');
      }

      setTitle('');
      setContent('');
      await loadDocuments();
    } catch (err: any) {
      setError(err.message || 'Failed to upload document');
    } finally {
      setUploadLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this document?')) return;

    const { error } = await supabase.from('knowledge_base').delete().eq('id', id);

    if (error) {
      console.error('Error deleting document:', error);
    } else {
      await loadDocuments();
    }
  };

  return (
    <div className="h-full bg-gray-50 overflow-hidden flex">
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Knowledge Base</h2>
          <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
            Upload nutrition guidelines, meal plans, and fitness protocols to enhance the AI's knowledge.
          </p>

          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-4 md:mb-6">
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4 flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Upload New Document
            </h3>

            <form onSubmit={handleUpload} className="space-y-3 md:space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Document Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="e.g., High-Protein Diet Guidelines"
                  className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Document Type
                </label>
                <select
                  value={docType}
                  onChange={(e) => setDocType(e.target.value as any)}
                  className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="nutrition_guideline">Nutrition Guideline</option>
                  <option value="meal_plan">Meal Plan</option>
                  <option value="fitness_protocol">Fitness Protocol</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  rows={8}
                  placeholder="Paste your document content here..."
                  className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-mono text-xs md:text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={uploadLoading}
                className="w-full bg-emerald-600 text-white px-4 py-2 md:py-3 text-sm md:text-base rounded-lg font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {uploadLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    Upload Document
                  </>
                )}
              </button>
            </form>
          </div>

          <div>
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">Uploaded Documents</h3>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 text-emerald-600 animate-spin" />
              </div>
            ) : documents.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 text-center">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-sm md:text-base text-gray-600">No documents uploaded yet</p>
              </div>
            ) : (
              <div className="space-y-2 md:space-y-3">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="bg-white rounded-lg shadow-sm p-4 flex items-start justify-between"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <FileText className="w-4 h-4 text-emerald-600" />
                        <h4 className="font-semibold text-gray-900">{doc.title}</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {doc.document_type.replace('_', ' ').toUpperCase()}
                      </p>
                      <p className="text-xs text-gray-500 line-clamp-2">{doc.content}</p>
                    </div>
                    <button
                      onClick={() => handleDelete(doc.id)}
                      className="text-red-600 hover:text-red-700 transition-colors ml-4"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
