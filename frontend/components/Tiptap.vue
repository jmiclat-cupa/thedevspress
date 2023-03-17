<template>
  <div class="rteWrapper">
    <div class="btnsWrapper" v-if="editor">
      <button
        title="Bold"
        class="btnEditor"
        @click="editor.chain().focus().toggleBold().run()"
        :disabled="!editor.can().chain().focus().toggleBold().run()"
        :class="{ 'is-active': editor.isActive('bold') }"
      >
        <Icon class="text-2xl" name="material-symbols:format-bold" />
      </button>
      <button
        title="Italic"
        class="btnEditor"
        @click="editor.chain().focus().toggleItalic().run()"
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        :class="{ 'is-active': editor.isActive('italic') }"
      >
        <Icon class="text-2xl" name="material-symbols:format-italic" />
      </button>
      <button
        title="Strikethrough"
        class="btnEditor"
        @click="editor.chain().focus().toggleStrike().run()"
        :disabled="!editor.can().chain().focus().toggleStrike().run()"
        :class="{ 'is-active': editor.isActive('strike') }"
      >
        <Icon class="text-2xl" name="material-symbols:format-strikethrough" />
      </button>
      <button
        title="Clear format"
        class="btnEditor"
        @click="editor.chain().focus().unsetAllMarks().run()"
      >
        <Icon class="text-2xl" name="material-symbols:format-clear" />
      </button>
      <button
        title="Paragraph"
        class="btnEditor"
        @click="editor.chain().focus().setParagraph().run()"
        :class="{ 'is-active': editor.isActive('paragraph') }"
      >
        <Icon class="text-2xl" name="material-symbols:format-paragraph" />
      </button>
      <button
        title="Heading 1"
        class="btnEditor"
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
      >
        <Icon class="text-2xl" name="material-symbols:format-h1" />
      </button>
      <button
        title="Heading 2"
        class="btnEditor"
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
      >
        <Icon class="text-2xl" name="material-symbols:format-h2" />
      </button>
      <button
        title="Heading 3"
        class="btnEditor"
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
      >
        <Icon class="text-2xl" name="material-symbols:format-h3" />
      </button>
      <button
        title="Heading 4"
        class="btnEditor"
        @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
      >
        <Icon class="text-2xl" name="material-symbols:format-h4" />
      </button>
      <button
        title="Unordered List"
        class="btnEditor"
        @click="editor.chain().focus().toggleBulletList().run()"
        :class="{ 'is-active': editor.isActive('bulletList') }"
      >
        <Icon class="text-2xl" name="material-symbols:format-list-bulleted" />
      </button>
      <button
        title="Ordered List"
        class="btnEditor"
        @click="editor.chain().focus().toggleOrderedList().run()"
        :class="{ 'is-active': editor.isActive('orderedList') }"
      >
        <Icon class="text-2xl" name="material-symbols:format-list-numbered" />
      </button>
      <button
        title="Code Block"
        class="btnEditor"
        @click="editor.chain().focus().toggleCodeBlock().run()"
        :class="{ 'is-active': editor.isActive('codeBlock') }"
      >
        <Icon class="text-2xl" name="material-symbols:code" />
      </button>
      <button
        title="Horzontal Rule"
        class="btnEditor"
        @click="editor.chain().focus().setHorizontalRule().run()"
      >
        <Icon class="text-2xl" name="material-symbols:horizontal-rule" />
      </button>

      <button
        title="Undo"
        class="btnEditor"
        @click="editor.chain().focus().undo().run()"
        :disabled="!editor.can().chain().focus().undo().run()"
      >
        <Icon class="text-2xl" name="material-symbols:undo" />
        Undo
      </button>
      <button
        title="Redo"
        class="btnEditor"
        @click="editor.chain().focus().redo().run()"
        :disabled="!editor.can().chain().focus().redo().run()"
      >
        <Icon class="text-2xl" name="material-symbols:redo" />
        Redo
      </button>
    </div>
    <editor-content
      class="w-full border border-neutral-700 rounded-md my-5"
      :editor="editor"
    />
  </div>
</template>

<script setup>
import { useEditor, EditorContent, VueNodeViewRenderer } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import { lowlight } from "lowlight/lib/core";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import scss from "highlight.js/lib/languages/scss";
import CodeBlock from "./CodeBlock.vue";

lowlight.registerLanguage("html", html);
lowlight.registerLanguage("css", css);
lowlight.registerLanguage("js", js);
lowlight.registerLanguage("ts", ts);
lowlight.registerLanguage("scss", scss);

const editor = useEditor({
  content: "",
  onUpdate: () => {},
  extensions: [
    StarterKit,
    CodeBlockLowlight.extend({
      addNodeView() {
        return VueNodeViewRenderer(CodeBlock);
      },
    }).configure({ lowlight }),
  ],
  editorProps: {
    attributes: {
      class: "outline-none p-5 ",
    },
  },
});
</script>

<style>
@import "./Tiptap.module.scss";
</style>
