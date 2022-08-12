import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const EditorTip = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello World! 🌎️</p>",
  });
  return (
    <EditorContent
      editor={editor}
      className="rounded-lg border w-full p-2"
      name="content"
      as="textarea"
    />
  );
};

export default EditorTip;
