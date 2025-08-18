import React, { useState, useEffect, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Download, Save, FileText, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import JudgeRubricForm from './JudgeRubricForm';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set up the worker for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface PDFViewerProps {
  scriptId: string;
  scriptTitle: string;
  fileUrl: string;
  reviewId?: string;
  onClose: () => void;
}

interface PageNote {
  page_number: number;
  note_content: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({
  scriptId,
  scriptTitle,
  fileUrl,
  reviewId,
  onClose
}) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [pageNotes, setPageNotes] = useState<{ [key: number]: string }>({});
  const [currentNote, setCurrentNote] = useState('');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Load existing notes when component mounts
  useEffect(() => {
    if (reviewId) {
      loadExistingNotes();
    }
  }, [reviewId]);

  // Update current note when page changes
  useEffect(() => {
    setCurrentNote(pageNotes[pageNumber] || '');
  }, [pageNumber, pageNotes]);

  const loadExistingNotes = async () => {
    try {
      const { data, error } = await supabase
        .from('script_page_notes')
        .select('page_number, note_content')
        .eq('script_review_id', reviewId);

      if (error) throw error;

      const notesMap: { [key: number]: string } = {};
      data?.forEach(note => {
        notesMap[note.page_number] = note.note_content || '';
      });
      setPageNotes(notesMap);
    } catch (error) {
      console.error('Error loading notes:', error);
    }
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoading(false);
  };

  const saveNoteForPage = async () => {
    if (!reviewId) {
      toast({
        title: "Error",
        description: "No review ID found. Please start a review first.",
        variant: "destructive"
      });
      return;
    }

    setSaving(true);
    try {
      // Check if note already exists for this page
      const { data: existingNote } = await supabase
        .from('script_page_notes')
        .select('id')
        .eq('script_review_id', reviewId)
        .eq('page_number', pageNumber)
        .single();

      if (existingNote) {
        // Update existing note
        const { error } = await supabase
          .from('script_page_notes')
          .update({ note_content: currentNote })
          .eq('id', existingNote.id);

        if (error) throw error;
      } else if (currentNote.trim()) {
        // Insert new note only if there's content
        const { error } = await supabase
          .from('script_page_notes')
          .insert({
            script_review_id: reviewId,
            page_number: pageNumber,
            note_content: currentNote
          });

        if (error) throw error;
      }

      // Update local state
      setPageNotes(prev => ({
        ...prev,
        [pageNumber]: currentNote
      }));

      toast({
        title: "Note saved",
        description: `Note for page ${pageNumber} has been saved`,
      });
    } catch (error) {
      console.error('Error saving note:', error);
      toast({
        title: "Error",
        description: "Failed to save note",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    // Save current note before changing page
    if (currentNote !== pageNotes[pageNumber]) {
      saveNoteForPage();
    }
    setPageNumber(newPage);
  };

  const downloadScript = async () => {
    try {
      // Get a signed URL for download
      const { data, error } = await supabase.storage
        .from('scripts')
        .createSignedUrl(fileUrl, 3600); // 1 hour expiry

      if (error) throw error;

      // Open in new tab for download
      window.open(data.signedUrl, '_blank');
      
      toast({
        title: "Download started",
        description: "Your script is being downloaded",
      });
    } catch (error) {
      console.error('Error downloading script:', error);
      toast({
        title: "Error",
        description: "Failed to download script",
        variant: "destructive"
      });
    }
  };

  // Auto-save note when user stops typing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (currentNote !== pageNotes[pageNumber] && currentNote !== '') {
        saveNoteForPage();
      }
    }, 2000); // Auto-save after 2 seconds of no typing

    return () => clearTimeout(timeoutId);
  }, [currentNote]);

  return (
    <div className="fixed inset-0 z-50 bg-portfolio-black overflow-y-auto">
      <div className="flex min-h-screen">
        {/* PDF Viewer Section */}
        <div className="flex-1 flex flex-col bg-gray-900">
        {/* Header */}
        <div className="bg-portfolio-dark border-b border-portfolio-gold/20 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-semibold text-portfolio-gold">{scriptTitle}</h2>
              <span className="text-portfolio-white/60">
                Page {pageNumber} of {numPages}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setScale(scale - 0.1)}
                disabled={scale <= 0.5}
                className="text-portfolio-white border-portfolio-gold/30"
              >
                Zoom -
              </Button>
              <span className="text-portfolio-white px-2">{Math.round(scale * 100)}%</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setScale(scale + 0.1)}
                disabled={scale >= 2}
                className="text-portfolio-white border-portfolio-gold/30"
              >
                Zoom +
              </Button>
              <Button
                size="sm"
                onClick={downloadScript}
                className="bg-portfolio-gold text-black hover:bg-portfolio-gold/90"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={onClose}
                className="text-portfolio-gold border-portfolio-gold hover:bg-portfolio-gold/10"
              >
                Submit Review
              </Button>
            </div>
          </div>
        </div>

        {/* PDF Document */}
        <div className="flex-1 overflow-auto flex justify-center items-center p-4">
          {loading && (
            <div className="flex flex-col items-center">
              <Loader2 className="w-8 h-8 animate-spin text-portfolio-gold" />
              <p className="text-portfolio-white mt-2">Loading PDF...</p>
            </div>
          )}
          <Document
            file={fileUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            className="flex justify-center"
          >
            <Page 
              pageNumber={pageNumber} 
              scale={scale}
              className="shadow-2xl"
              renderTextLayer={true}
              renderAnnotationLayer={true}
            />
          </Document>
        </div>

        {/* Navigation */}
        <div className="bg-portfolio-dark border-t border-portfolio-gold/20 p-4">
          <div className="flex items-center justify-center space-x-4">
            <Button
              onClick={() => handlePageChange(Math.max(1, pageNumber - 1))}
              disabled={pageNumber <= 1}
              className="bg-portfolio-gold text-black hover:bg-portfolio-gold/90 disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            
            <div className="flex items-center space-x-2">
              {Array.from({ length: Math.min(5, numPages || 0) }, (_, i) => {
                const page = Math.max(1, Math.min(pageNumber - 2 + i, (numPages || 1) - 4)) + i;
                if (page > (numPages || 0)) return null;
                return (
                  <Button
                    key={page}
                    size="sm"
                    variant={page === pageNumber ? "default" : "outline"}
                    onClick={() => handlePageChange(page)}
                    className={page === pageNumber 
                      ? "bg-portfolio-gold text-black" 
                      : "text-portfolio-white border-portfolio-gold/30"}
                  >
                    {page}
                  </Button>
                );
              })}
            </div>

            <Button
              onClick={() => handlePageChange(Math.min(numPages || 1, pageNumber + 1))}
              disabled={pageNumber >= (numPages || 1)}
              className="bg-portfolio-gold text-black hover:bg-portfolio-gold/90 disabled:opacity-50"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Notes Section */}
      <div className="w-96 bg-portfolio-dark border-l border-portfolio-gold/20 flex flex-col">
        <Card className="bg-transparent border-none h-full flex flex-col">
          <CardHeader className="border-b border-portfolio-gold/20">
            <CardTitle className="text-portfolio-gold flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Notes for Page {pageNumber}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-4">
            <Textarea
              value={currentNote}
              onChange={(e) => setCurrentNote(e.target.value)}
              placeholder="Add your notes for this page here. There's no character limit - write as much as you need."
              className="flex-1 bg-portfolio-black border-portfolio-gold/30 text-portfolio-white resize-none"
            />
            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm text-portfolio-white/60">
                {currentNote.length > 0 && `${currentNote.length} characters`}
              </div>
              <Button
                onClick={saveNoteForPage}
                disabled={saving}
                className="bg-portfolio-gold text-black hover:bg-portfolio-gold/90"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Note
                  </>
                )}
              </Button>
            </div>
            
            {/* Indicator for pages with notes */}
            <div className="mt-4 pt-4 border-t border-portfolio-gold/20">
              <p className="text-sm text-portfolio-white/60 mb-2">Pages with notes:</p>
              <div className="flex flex-wrap gap-2">
                {Object.keys(pageNotes).map(page => (
                  <Button
                    key={page}
                    size="sm"
                    variant="outline"
                    onClick={() => handlePageChange(parseInt(page))}
                    className="text-portfolio-gold border-portfolio-gold/30 hover:bg-portfolio-gold/10"
                  >
                    Page {page}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      </div>
      
      {/* Judge's Rubric Form - Below PDF Viewer */}
      {reviewId && (
        <JudgeRubricForm 
          scriptTitle={scriptTitle}
          reviewId={reviewId}
        />
      )}
    </div>
  );
};

export default PDFViewer;