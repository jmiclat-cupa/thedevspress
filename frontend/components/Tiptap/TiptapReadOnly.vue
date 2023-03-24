<template>
  <editor-content :editor="editor" />
</template>

<script setup>
import { useEditor, EditorContent, VueNodeViewRenderer } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import { lowlight } from "lowlight/lib/core";
import TextAlign from "@tiptap/extension-text-align";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import scss from "highlight.js/lib/languages/scss";
import CodeBlockComponent from "./CodeBlockComponent.vue";

const { content } = defineProps(["content"]);

lowlight.registerLanguage("html", html);
lowlight.registerLanguage("css", css);
lowlight.registerLanguage("js", js);
lowlight.registerLanguage("ts", ts);
lowlight.registerLanguage("scss", scss);

const editor = useEditor({
  content: `${content}`,
  editable: false,
  extensions: [
    StarterKit,
    TextAlign.configure({
      types: ["heading", "paragraph"],
    }),
    CodeBlockLowlight.extend({
      addNodeView() {
        return VueNodeViewRenderer(CodeBlockComponent);
      },
    }).configure({ lowlight }),
  ],
  editorProps: {
    attributes: {
      class: "px-5 min-h-[calc(100vh-19rem)]",
      style: "user-select: text",
    },
  },
});
</script>

<style lang="scss">
@import "./Tiptap.module.scss";
</style>
