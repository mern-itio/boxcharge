import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { Button } from "@/components/ui/button";
import {
  Bold, Italic, Strikethrough, List, ListOrdered, Quote, Code,
  Heading1, Heading2, Heading3, Link as LinkIcon, Image as ImageIcon,
  Undo, Redo, Minus, Upload, FolderOpen,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { recordMedia } from "@/lib/cms.functions";
import { uploadCmsImage } from "@/lib/mediaUpload";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { MediaPickerDialog } from "./MediaPickerDialog";

interface Props {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  className?: string;
}

export function RichTextEditor({ value, onChange, placeholder, className }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false, HTMLAttributes: { class: "text-primary underline" } }),
      Image.configure({ HTMLAttributes: { class: "rounded-lg max-w-full h-auto" } }),
      Placeholder.configure({ placeholder: placeholder ?? "Start writing…" }),
    ],
    content: value || "",
    onUpdate: ({ editor: ed }) => onChange(ed.getHTML()),
    editorProps: {
      attributes: {
        class: "prose prose-invert max-w-none min-h-[400px] focus:outline-none px-4 py-3",
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "", { emitUpdate: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, editor]);

  if (!editor) return <div className="min-h-[400px] rounded-md border border-border/60 bg-card/30" />;

  return (
    <div className={cn("rounded-md border border-border/60 bg-card/30", className)}>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}

function Toolbar({ editor }: { editor: Editor }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const qc = useQueryClient();
  const recordFn = useServerFn(recordMedia);

  const btn = (active: boolean) =>
    cn("h-8 w-8 p-0", active && "bg-primary/20 text-foreground");

  function insertImage(url: string) {
    editor.chain().focus().setImage({ src: url }).run();
  }

  async function handleFile(file: File) {
    setUploading(true);
    try {
      const url = await uploadCmsImage(file, recordFn);
      qc.invalidateQueries({ queryKey: ["cms", "media"] });
      insertImage(url);
      toast.success("Image inserted");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  function addLink() {
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("URL", prev ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }

  return (
    <>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) void handleFile(f);
        }}
      />
      <div className="flex flex-wrap items-center gap-0.5 border-b border-border/60 p-1.5">
        <Button type="button" size="sm" variant="ghost" className={btn(editor.isActive("heading", { level: 1 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}><Heading1 className="h-4 w-4" /></Button>
        <Button type="button" size="sm" variant="ghost" className={btn(editor.isActive("heading", { level: 2 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}><Heading2 className="h-4 w-4" /></Button>
        <Button type="button" size="sm" variant="ghost" className={btn(editor.isActive("heading", { level: 3 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}><Heading3 className="h-4 w-4" /></Button>
        <Separator />
        <Button type="button" size="sm" variant="ghost" className={btn(editor.isActive("bold"))} onClick={() => editor.chain().focus().toggleBold().run()}><Bold className="h-4 w-4" /></Button>
        <Button type="button" size="sm" variant="ghost" className={btn(editor.isActive("italic"))} onClick={() => editor.chain().focus().toggleItalic().run()}><Italic className="h-4 w-4" /></Button>
        <Button type="button" size="sm" variant="ghost" className={btn(editor.isActive("strike"))} onClick={() => editor.chain().focus().toggleStrike().run()}><Strikethrough className="h-4 w-4" /></Button>
        <Button type="button" size="sm" variant="ghost" className={btn(editor.isActive("code"))} onClick={() => editor.chain().focus().toggleCode().run()}><Code className="h-4 w-4" /></Button>
        <Separator />
        <Button type="button" size="sm" variant="ghost" className={btn(editor.isActive("bulletList"))} onClick={() => editor.chain().focus().toggleBulletList().run()}><List className="h-4 w-4" /></Button>
        <Button type="button" size="sm" variant="ghost" className={btn(editor.isActive("orderedList"))} onClick={() => editor.chain().focus().toggleOrderedList().run()}><ListOrdered className="h-4 w-4" /></Button>
        <Button type="button" size="sm" variant="ghost" className={btn(editor.isActive("blockquote"))} onClick={() => editor.chain().focus().toggleBlockquote().run()}><Quote className="h-4 w-4" /></Button>
        <Button type="button" size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => editor.chain().focus().setHorizontalRule().run()}><Minus className="h-4 w-4" /></Button>
        <Separator />
        <Button type="button" size="sm" variant="ghost" className={btn(editor.isActive("link"))} onClick={addLink}><LinkIcon className="h-4 w-4" /></Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          className="h-8 w-8 p-0"
          disabled={uploading}
          title="Upload image from computer"
          onClick={() => fileRef.current?.click()}
        >
          <Upload className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          className="h-8 w-8 p-0"
          title="Insert from media library"
          onClick={() => setPickerOpen(true)}
        >
          <FolderOpen className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          className="h-8 w-8 p-0"
          title="Insert image by URL"
          onClick={() => {
            const url = window.prompt("Image URL");
            if (url) insertImage(url);
          }}
        >
          <ImageIcon className="h-4 w-4" />
        </Button>
        <Separator />
        <Button type="button" size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => editor.chain().focus().undo().run()}><Undo className="h-4 w-4" /></Button>
        <Button type="button" size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => editor.chain().focus().redo().run()}><Redo className="h-4 w-4" /></Button>
      </div>
      <MediaPickerDialog
        open={pickerOpen}
        onOpenChange={setPickerOpen}
        onSelect={insertImage}
        title="Insert image"
      />
    </>
  );
}

function Separator() {
  return <div className="mx-1 h-5 w-px bg-border/60" />;
}
