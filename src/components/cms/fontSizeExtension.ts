import { Extension } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    fontSize: {
      setFontSize: (size: string) => ReturnType;
      unsetFontSize: () => ReturnType;
    };
  }
}

/** Inline font-size control without extra TipTap packages. */
export const FontSize = Extension.create({
  name: "fontSize",
  addOptions() {
    return {
      types: ["paragraph", "heading", "listItem"],
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) => element.style.fontSize || null,
            renderHTML: (attributes) => {
              if (!attributes.fontSize) return {};
              return { style: `font-size: ${attributes.fontSize}` };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setFontSize:
        (fontSize: string) =>
        ({ commands }) =>
          this.options.types.every((type: string) =>
            commands.updateAttributes(type, { fontSize }),
          ),
      unsetFontSize:
        () =>
        ({ commands }) =>
          this.options.types.every((type: string) =>
            commands.updateAttributes(type, { fontSize: null }),
          ),
    };
  },
});
