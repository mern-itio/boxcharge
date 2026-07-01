import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { Button } from "@/components/ui/button";
import {
  Bold, Italic, Strikethrough, List, ListOrdered, Quote, Code,
  Heading1, Heading2, Heading3, Link as LinkIcon, Image as ImageIcon,
  Undo, Redo, Minus, Upload, FolderOpen, Type,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { recordMedia } from "@/lib/cms.functions";
import { uploadCmsImage } from "@/lib/mediaUpload";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { MediaPickerDialog } from "./MediaPickerDialog";
import { FontSize } from "./fontSizeExtension";

interface Props {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  className?: string;
}

const FONT_SIZES = [
  { label: "Small", value: "0.875rem" },
  { label: "Normal", value: "1rem" },
  { label: "Large", value: "1.125rem" },
  { label: "XL", value: "1.25rem" },
  { label: "2XL", value: "1.5rem" },
];

export function RichTextEditor({ value, onChange, placeholder, className }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: { keepMarks: true, keepAttributes: true },
        orderedList: { keepMarks: true, keepAttributes: true },
      }),
      Link.configure({ openOnClick: false, HTMLAttributes: { class: "text-primary underline" } }),
      Image.configure({ HTMLAttributes: { class: "cms-inline-image" } }),
      Placeholder.configure({ placeholder: placeholder ?? "Start writing…" }),
      FontSize,
    ],
    content: value || "",
    onUpdate: ({ editor: ed }) => onChange(ed.getHTML()),
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "cms-editor max-w-none min-h-[400px] focus:outline-none px-4 py-3",
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
  const [uploadFilename, setUploadFilename] = useState("");
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
      const url = await uploadCmsImage(file, recordFn, {
        filename: uploadFilename.trim() || file.name,
      });
      qc.invalidateQueries({ queryKey: ["cms", "media"] });
      insertImage(url);
      setUploadFilename("");
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
        <div className="flex items-center gap-1 px-1">
          <Type className="h-3.5 w-3.5 text-muted-foreground" />
          <select
            className="h-8 rounded-md border border-input bg-card px-2 text-xs text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            defaultValue=""
            onChange={(e) => {
              const size = e.target.value;
              if (!size) editor.chain().focus().unsetFontSize().run();
              else editor.chain().focus().setFontSize(size).run();
              e.target.value = "";
            }}
            aria-label="Font size"
          >
            <option value="">Size</option>
            {FONT_SIZES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
        <Separator />
        <Button type="button" size="sm" variant="ghost" className={btn(editor.isActive("bulletList"))} onClick={() => editor.chain().focus().toggleBulletList().run()} title="Bullet list"><List className="h-4 w-4" /></Button>
        <Button type="button" size="sm" variant="ghost" className={btn(editor.isActive("orderedList"))} onClick={() => editor.chain().focus().toggleOrderedList().run()} title="Numbered list"><ListOrdered className="h-4 w-4" /></Button>
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
      <div className="border-b border-border/60 px-3 py-2">
        <input
          type="text"
          value={uploadFilename}
          onChange={(e) => setUploadFilename(e.target.value)}
          placeholder="Optional file name for next upload (e.g. hero-banner.png)"
          className="h-8 w-full rounded-md border border-input bg-transparent px-2 text-xs"
        />
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
