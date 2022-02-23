import { Extension } from '@tiptap/core';
import { Node as ProsemirrorNode, NodeType } from 'prosemirror-model';
import { PluginKey, Plugin } from 'prosemirror-state';

const nodeEqualsType = (node: ProsemirrorNode, types: NodeType[]): boolean => {
  return types.includes(node.type);
};

export default Extension.create({
  name: 'trailingNode',

  addProseMirrorPlugins() {
    const key = new PluginKey(this.name);

    const disableNodeTypes = Object.entries(this.editor.schema.nodes)
      .map(([, node]) => node)
      .filter(node => {
        return ['paragraph', 'heading'].includes(node.name);
      });

    return [
      new Plugin<boolean>({
        key,
        state: {
          init: (_, state) => {
            const { tr: transaction } = state;
            const { lastChild } = transaction.doc;
            if (!lastChild) {
              return false;
            }
            return !nodeEqualsType(lastChild, disableNodeTypes);
          },
          apply: (transaction, value) => {
            if (!transaction.docChanged) {
              return value;
            }
            const { lastChild } = transaction.doc;
            if (!lastChild) {
              return false;
            }
            return !nodeEqualsType(lastChild, disableNodeTypes);
          },
        },
        appendTransaction: (_, __, state) => {
          const { doc, schema, tr: transaction } = state;
          const shouldInsertNodeAtEnd: boolean = key.getState(state);
          if (!shouldInsertNodeAtEnd) {
            return;
          }
          const endPosition = doc.content.size;
          const type = schema.nodes['paragraph'];
          return transaction.insert(endPosition, type.create());
        },
      }),
    ];
  },
});
