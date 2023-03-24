<template>
  <div class="rteWrapper">
    <div class="w-full">
      <div class="btnsWrapper" v-if="editor">
        <div class="rte__format">
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
            <Icon
              class="text-2xl"
              name="material-symbols:format-strikethrough"
            />
          </button>
          <button
            title="Clear format"
            class="btnEditor"
            @click="editor.chain().focus().unsetAllMarks().run()"
          >
            <Icon class="text-2xl" name="material-symbols:format-clear" />
          </button>
        </div>
        <div class="rte__size">
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
            title="Paragraph"
            class="btnEditor"
            @click="editor.chain().focus().setParagraph().run()"
            :class="{ 'is-active': editor.isActive('paragraph') }"
          >
            <Icon class="text-2xl" name="material-symbols:format-paragraph" />
          </button>
        </div>
        <div class="rte__alignment">
          <button
            class="btnEditor"
            @click="editor.chain().focus().setTextAlign('left').run()"
            :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }"
          >
            <Icon class="text-2xl" name="material-symbols:format-align-left" />
          </button>
          <button
            class="btnEditor"
            @click="editor.chain().focus().setTextAlign('center').run()"
            :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }"
          >
            <Icon
              class="text-2xl"
              name="material-symbols:format-align-center"
            />
          </button>
          <button
            class="btnEditor"
            @click="editor.chain().focus().setTextAlign('right').run()"
            :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }"
          >
            <Icon class="text-2xl" name="material-symbols:format-align-right" />
          </button>
          <button
            class="btnEditor"
            @click="editor.chain().focus().setTextAlign('justify').run()"
            :class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }"
          >
            <Icon
              class="text-2xl"
              name="material-symbols:format-align-justify"
            />
          </button>
        </div>
        <div class="rte__list">
          <button
            title="Unordered List"
            class="btnEditor"
            @click="editor.chain().focus().toggleBulletList().run()"
            :class="{ 'is-active': editor.isActive('bulletList') }"
          >
            <Icon
              class="text-2xl"
              name="material-symbols:format-list-bulleted"
            />
          </button>
          <button
            title="Ordered List"
            class="btnEditor"
            @click="editor.chain().focus().toggleOrderedList().run()"
            :class="{ 'is-active': editor.isActive('orderedList') }"
          >
            <Icon
              class="text-2xl"
              name="material-symbols:format-list-numbered"
            />
          </button>
        </div>
        <div class="rte__misc">
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
        </div>

        <div class="rte__do">
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
      </div>
      <editor-content
        class="w-full border hover:border-[#3F2A56] rounded-md mt-7 duration-300 border-neutral-700"
        :editor="editor"
      />
    </div>
  </div>
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

lowlight.registerLanguage("html", html);
lowlight.registerLanguage("css", css);
lowlight.registerLanguage("js", js);
lowlight.registerLanguage("ts", ts);
lowlight.registerLanguage("scss", scss);

const { modelValue } = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const editor = useEditor({
  content: `${modelValue}`,
  onUpdate: () => {
    emit("update:modelValue", editor.value.getHTML());
  },
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
      class: "outline-none p-5 min-h-[400px] border-blue-200",
    },
  },
});
</script>

<style>
@import "./Tiptap.module.scss";
</style>
