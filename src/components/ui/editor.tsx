import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const Editor = ({
  setContent,
  content,
}: {
  setContent: any;
  content: any;
}) => {
  const handleChange = (value: string) => {
    setContent({ ...content, content: value });
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  return (
    <>
      <ReactQuill
        className="h-64"
        value={content.content}
        modules={modules}
        formats={formats}
        onChange={handleChange}
      />
    </>
  );
};
